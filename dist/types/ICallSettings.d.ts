import { ColorValue, Position } from "./common";
export interface ICallSettings {
    screenShareMode?: "default" | "presenter";
    ShowEndCallButton?: boolean;
    ShowRecordingButton?: boolean;
    StartRecordingOnCallStart?: boolean;
    ShowMuteAudioButton?: boolean;
    ShowPauseVideoButton?: boolean;
    ShowScreenShareButton?: boolean;
    ShowSwitchToVideoCallButton?: boolean;
    defaultLayout?: boolean;
    isAudioCall?: boolean;
    isAudioOnly?: boolean;
    user: {
        name: string;
        avatar?: string;
        uid: string;
        jwt?: string;
    };
    mode?: "DEFAULT" | "SPOTLIGHT" | "TILE" | "SIDEBAR";
    StartAudioMuted?: boolean;
    StartVideoMuted?: boolean;
    ShowSwitchModeButton?: boolean;
    ShowVirtualBackgroundSetting?: boolean;
    VirtualBackground?: {
        AllowBackgroundBlur?: boolean;
        AllowUserImages?: boolean;
        ShowDefaultImages?: boolean;
        SetImages?: string[];
        EnforceBackgroundBlur?: 0 | 1 | 2;
        EnforceBackgroundImage?: string;
    };
    AvatarMode?: "circle";
    MainVideoContainerSetting?: {
        videoFit?: "contain" | "cover";
        zoomButton?: {
            visible?: boolean;
            visibility?: boolean;
            position?: Position;
        };
        nameLabel?: {
            visible?: boolean;
            visibility?: boolean;
            position?: Position;
            color?: ColorValue;
        };
        network?: {
            visible?: boolean;
            visibility?: boolean;
            position?: Position;
        };
    };
    customCSS?: string;
    analyticsSettings?: {
        ANALYTICS_HOST: string;
        ANALYTICS_VERSION: string;
        ANALYTICS_PING_DISABLED: boolean;
        ANALYTICS_USE_SSL: boolean;
    };
}
