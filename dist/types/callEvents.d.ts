interface User {
    name: string;
    avatar: string;
    isVideoMuted: string;
    isAudioMuted: string;
    isLocalUser: string;
    id: string;
    uid: string;
}
export interface ICallEventsData {
    readonly onUserJoined: {
        name: string;
        avatar: string;
        joinnedAt: string;
        uid: string;
        isAudioMuted: boolean;
        isLocalUser: boolean;
        isVideoMuted: boolean;
    };
    readonly onUserLeft: {
        name: string;
        avatar: string;
        joinnedAt: string;
        uid: string;
    };
    readonly onUserListUpdated: Array<{
        name: string;
        avatar: string;
        uid: string;
    }>;
    readonly onMediaDeviceListUpdated: {
        videoInputDevices: MediaDeviceInfo[];
        audioInputDevices: MediaDeviceInfo[];
        audioOutputDevices: MediaDeviceInfo[];
    };
    readonly onRecordingStarted: Partial<User & {
        recordId: string;
    }>;
    readonly onRecordingStopped: Partial<User & {
        recordId: string;
    }>;
    readonly onCallSwitchedToVideo: {
        sessionId: string;
        initiator: Partial<User>;
    };
    readonly onCallEnded: {};
    readonly onUserMuted: {
        name: string;
        avatar: string;
        uid: string;
    };
}
export {};
