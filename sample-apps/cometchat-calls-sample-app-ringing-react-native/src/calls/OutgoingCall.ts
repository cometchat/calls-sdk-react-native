/**
 * State of one outgoing call, from the tap on a row until the call is joined or over.
 *
 * Deliberately free of React and of the SDKs so it can be unit-tested on its own:
 * `useOutgoingCall` feeds it SDK events and user actions and renders whatever it says.
 *
 * Every input is idempotent and returns `true` only when it moved the state, so a duplicate SDK
 * event or a double-tapped button changes nothing, and side effects (the ring timer, `endCall`,
 * closing the screen) hang off the return value.
 *
 *     initiating ──initiated(id)──▶ ringing ──participantJoined──▶ joined
 *         │                           ├──cancel─────────▶ ended(cancelled)
 *         └─initiateFailed─▶ ended(failed)
 *                                     ├──timeout────────▶ ended(timeout)
 *                                     ├──serverEnded────▶ ended(declined / busy / closed)
 *                                     └──sessionClosed──▶ ended(closed), or ended(lost) when no
 *                                                         callee device had connected
 *
 * `initiating` has no session ID yet, so nothing can be cancelled from it: the end button stays
 * disabled until `initiated`, and the timeout cannot start before then either.
 */
export type EndReason =
  | 'cancelled'
  | 'timeout'
  | 'failed'
  | 'closed'
  | 'lost'
  | 'declined'
  | 'busy';

export type OutgoingState =
  | { name: 'initiating' }
  | { name: 'ringing'; sessionId: string; remoteConnected: boolean }
  | { name: 'joined'; sessionId: string }
  | { name: 'ended'; sessionId: string | null; reason: EndReason };

export type StatusText =
  | 'Calling…'
  | 'Ringing…'
  | 'No answer'
  | 'Call failed'
  | 'Call ended'
  | 'Declined'
  | 'Busy'
  | '';

export class OutgoingCall {
  state: OutgoingState = { name: 'initiating' };

  get sessionId(): string | null {
    return this.state.name === 'initiating' ? null : this.state.sessionId;
  }

  get canCancel(): boolean {
    return this.state.name === 'ringing';
  }

  get statusText(): StatusText {
    switch (this.state.name) {
      case 'initiating':
        return 'Calling…';
      case 'ringing':
        return this.state.remoteConnected ? 'Ringing…' : 'Calling…';
      case 'joined':
        return '';
      case 'ended':
        switch (this.state.reason) {
          case 'cancelled':
            return '';
          case 'timeout':
            return 'No answer';
          case 'failed':
          case 'lost':
            return 'Call failed';
          case 'closed':
            return 'Call ended';
          case 'declined':
            return 'Declined';
          case 'busy':
            return 'Busy';
        }
    }
  }

  /** `initiateCall` succeeded. */
  initiated(sessionId: string): boolean {
    if (this.state.name !== 'initiating') {
      return false;
    }
    this.state = { name: 'ringing', sessionId, remoteConnected: false };
    return true;
  }

  /** `initiateCall` failed: nothing exists on the server, so this ends the call outright. */
  initiateFailed(): boolean {
    if (this.state.name !== 'initiating') {
      return false;
    }
    this.state = { name: 'ended', sessionId: null, reason: 'failed' };
    return true;
  }

  /** The callee's device prepared the session: "Calling…" becomes "Ringing…". */
  participantConnected(): boolean {
    if (this.state.name !== 'ringing' || this.state.remoteConnected) {
      return false;
    }
    this.state = { ...this.state, remoteConnected: true };
    return true;
  }

  /** The callee answered. Ignored after a cancel: the cancel wins. */
  participantJoined(): boolean {
    if (this.state.name !== 'ringing') {
      return false;
    }
    this.state = { name: 'joined', sessionId: this.state.sessionId };
    return true;
  }

  /** The caller pressed the end button. */
  cancel(): boolean {
    return this.endRinging('cancelled');
  }

  /** Nobody answered in time. */
  timeout(): boolean {
    return this.endRinging('timeout');
  }

  /**
   * The outcome reached the caller: through the push (`onCallEnded`) or the server's call log.
   * `rejected` and `busy` name the callee's decision; anything else is the call simply being over.
   */
  serverEnded(status: string): boolean {
    if (status === 'rejected') {
      return this.endRinging('declined');
    }
    if (status === 'busy') {
      return this.endRinging('busy');
    }
    if (status === 'unanswered') {
      return this.endRinging('timeout');
    }
    return this.endRinging('closed');
  }

  /**
   * The prepared session went away while ringing. After a callee device connected it is the server
   * closing the room. Before that it is our own prepare failing: the callee's phone may already be
   * ringing, so the caller must still end the call (`needsServerEnd`).
   */
  sessionClosed(): boolean {
    if (this.state.name !== 'ringing') {
      return false;
    }
    return this.endRinging(this.state.remoteConnected ? 'closed' : 'lost');
  }

  /** Whether the server still holds a ring only this device can withdraw. */
  get needsServerEnd(): boolean {
    return this.state.name === 'ended' && this.state.reason === 'lost';
  }

  private endRinging(reason: EndReason): boolean {
    if (this.state.name !== 'ringing') {
      return false;
    }
    this.state = { name: 'ended', sessionId: this.state.sessionId, reason };
    return true;
  }
}
