import { ICallEventsData } from '../types/callEvents';
import { CometChatCallsException } from './CometChatCallsException';
interface IOngoingCallListener {
    onUserJoined: (user: Partial<ICallEventsData['onUserJoined']>) => void;
    onUserLeft: (user: Partial<ICallEventsData['onUserLeft']>) => void;
    onUserListUpdated: (userList: Partial<ICallEventsData['onUserListUpdated']>) => void;
    onMediaDeviceListUpdated: (devices: Partial<ICallEventsData['onMediaDeviceListUpdated']>) => void;
    onRecordingStarted: (data: Partial<ICallEventsData['onRecordingStarted']>) => void;
    onRecordingStopped: (data: Partial<ICallEventsData['onRecordingStopped']>) => void;
    onUserMuted: (test: Partial<ICallEventsData["onUserMuted"]>) => void;
    onCallSwitchedToVideo: (data: Partial<ICallEventsData['onCallSwitchedToVideo']>) => void;
    onCallEnded: () => void;
    onSessionTimeout: () => void;
    onCallEndButtonPressed: () => void;
    onAudioModesUpdated: (any: any) => void;
    onError: (error: CometChatCallsException) => void;
}
export declare class OngoingCallListener {
    /**
     * This event is triggered when a user joins the call.
     */
    onUserJoined?: IOngoingCallListener["onUserJoined"];
    /**
     * This event is triggered when a user leaves the call.
     */
    onUserLeft?: IOngoingCallListener["onUserLeft"];
    /**
     * This event is triggered when the participant list of the call changes.
     */
    onUserListUpdated?: IOngoingCallListener["onUserListUpdated"];
    /**
     * This event is triggered when an audio mode is updated.
     */
    onAudioModesUpdated?: IOngoingCallListener["onAudioModesUpdated"];
    /**
     * This event is triggered when the call is ended.
     */
    onCallEnded?: IOngoingCallListener["onCallEnded"];
    /**
     * This event is triggered when the call is ended due to session timeout.
     */
    onSessionTimeout?: IOngoingCallListener["onSessionTimeout"];
    /**
     * This event is triggered when end call button is pressed.
     */
    onCallEndButtonPressed?: IOngoingCallListener["onCallEndButtonPressed"];
    /**
     * This event is triggered when an error occurs.
     */
    onError?: IOngoingCallListener["onError"];
    /**
     * This event is triggered when someone starts recording the call.
     */
    onRecordingStarted?: IOngoingCallListener["onRecordingStarted"];
    /**
     * This event is triggered when someone stops recording the call.
     */
    onRecordingStopped?: IOngoingCallListener["onRecordingStopped"];
    /**
     * This event is triggered when a user is muted.
     */
    onUserMuted?: IOngoingCallListener["onUserMuted"];
    /**
     * This event is triggered when an audio call is switched to a video call.
     */
    onCallSwitchedToVideo?: IOngoingCallListener["onCallSwitchedToVideo"];
    constructor(eventObj: Partial<IOngoingCallListener>);
}
export {};
