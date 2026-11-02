import { useEffect, useRef, useState } from 'react';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { CometChatPNHelper } from '@cometchat/push-notifications-react-native';
import { CometChatVoipNotifications } from '@cometchat/push-notifications-voip-react-native';
import { OutgoingCall, StatusText } from './OutgoingCall';
import { OutgoingRequest, useAppStore } from '../store/useAppStore';

/** Both sides stop at the ring window, 45 seconds unless the push carries another. */
const RING_TIMEOUT_MS = 45_000;
/** How often a ringing call asks the server for an outcome that has not arrived by push. */
const RING_POLL_MS = 3_000;
/** How long a final line ("No answer", "Declined", …) stays before the screen goes. */
const END_TEXT_MS = 1_500;

/**
 * Feeds `OutgoingCall` and carries out what it decides. A final status of `''` means the screen
 * closes at once.
 */
export function useOutgoingCall(request: OutgoingRequest) {
  const callRef = useRef(new OutgoingCall());
  const call = callRef.current;
  const [statusText, setStatusText] = useState<StatusText>(call.statusText);
  const [canCancel, setCanCancel] = useState(false);
  const cancelRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    let gone = false;

    const render = () => {
      setStatusText(call.statusText);
      setCanCancel(call.canCancel);
    };

    const close = () => {
      if (!gone) {
        gone = true;
        useAppStore.getState().setOutgoing(null);
      }
    };

    const stopRinging = () => {
      cleanups.splice(0).forEach(cleanup => cleanup());
    };

    /** The ring is over. `sendStatus` withdraws it on the server when only we can. */
    const finish = (sendStatus?: 'cancelled' | 'unanswered') => {
      stopRinging();
      render();
      const sessionId = call.sessionId;
      if (sessionId) {
        CometChatVoipNotifications.reportCallEnded(
          sessionId,
          sendStatus === 'cancelled' ? 'cancelled' : 'ended',
        );
        if (sendStatus) {
          CometChatCalls.endCall(sessionId, sendStatus).then(({ error }) => {
            if (error) {
              console.warn('[OutgoingCall] endCall failed', error);
            }
          });
        }
        // Nothing else releases the session `initiateCall` prepared.
        CometChatCalls.getActiveSession()?.leave().catch(() => {});
      }
      if (call.statusText) {
        setTimeout(close, END_TEXT_MS);
      } else {
        close();
      }
    };

    const listen = (sessionId: string) => {
      const session = CometChatCalls.getActiveSession();
      const me = useAppStore.getState().user?.uid;

      if (session) {
        cleanups.push(
          // The callee's phone got the push and prepared the session: it is ringing there.
          session.addEventListener('onParticipantConnected', participant => {
            if (participant.uid !== me && call.participantConnected()) {
              render();
            }
          }),
          // The callee answered: now the caller joins.
          session.addEventListener('onParticipantJoined', participant => {
            if (participant.uid !== me && call.participantJoined()) {
              stopRinging();
              CometChatVoipNotifications.reportCallConnected(sessionId);
              const state = useAppStore.getState();
              state.setActiveCall({ sessionId, callType: request.callType });
              state.setOutgoing(null);
            }
          }),
          session.addEventListener('onConnectionClosed', () => {
            if (call.sessionClosed()) {
              finish(call.needsServerEnd ? 'cancelled' : undefined);
            }
          }),
        );
      }

      // The outcome the backend reports to the caller.
      cleanups.push(
        CometChatVoipNotifications.onCallEnded(event => {
          if (event.sessionId === sessionId && call.serverEnded(event.reason ?? 'ended')) {
            finish();
          }
        }),
      );

      // A decline can miss the push path, so a ringing call also reads the server's call log.
      const poll = setInterval(async () => {
        const status = await fetchServerStatus(sessionId);
        if (status && call.serverEnded(status)) {
          finish();
        }
      }, RING_POLL_MS);
      cleanups.push(() => clearInterval(poll));

      const timer = setTimeout(() => {
        if (call.timeout()) {
          finish('unanswered');
        }
      }, RING_TIMEOUT_MS);
      cleanups.push(() => clearTimeout(timer));
    };

    cancelRef.current = () => {
      if (call.cancel()) {
        finish('cancelled');
      }
    };

    (async () => {
      await CometChatPNHelper.requestCallPermissions();
      const { data, error } = await CometChatCalls.initiateCall(request.receiverId, {
        type: request.callType,
        receiverType: request.receiverType,
        // Always set, in capitals: the settings freeze at prepare, and a video call prepared
        // without this comes up with no camera.
        sessionSettings: {
          sessionType: request.callType === 'video' ? 'VIDEO' : 'VOICE',
        },
      });
      if (error || !data) {
        console.warn('[OutgoingCall] initiateCall failed', error);
        if (call.initiateFailed() && !gone) {
          render();
          setTimeout(close, END_TEXT_MS);
        }
        return;
      }
      if (gone) {
        // The screen left while the request was in flight: withdraw the call it just created.
        CometChatCalls.endCall(data.sessionId, 'cancelled');
        return;
      }
      call.initiated(data.sessionId);
      render();
      CometChatVoipNotifications.reportOutgoingCall(
        data.sessionId,
        request.receiverName,
        request.callType === 'video',
      );
      listen(data.sessionId);
    })();

    return () => {
      stopRinging();
      gone = true;
    };
    // One call per screen: the request never changes while it is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { statusText, canCancel, cancel: () => cancelRef.current() };
}

/** `rejected` or `busy` from the newest call logs, otherwise null. */
async function fetchServerStatus(sessionId: string): Promise<string | null> {
  try {
    const authToken = CometChatCalls.getUserAuthToken();
    if (!authToken) {
      return null;
    }
    const logs = await new CometChatCalls.CallLogRequestBuilder()
      .setLimit(5)
      .setAuthToken(authToken)
      .build()
      .fetchNext();
    const status = logs.find(log => log.getSessionID() === sessionId)?.getStatus();
    return status === 'rejected' || status === 'busy' ? status : null;
  } catch {
    return null;
  }
}
