import { OngoingCallListener } from './Listner';
import { CallConstants } from '../Constants';
import { AspectRatio, Position } from '../types/common';
export declare class CallSettings {
    static readonly POSITION_TOP_LEFT = "top-left";
    static readonly POSITION_TOP_RIGHT = "top-right";
    static readonly POSITION_BOTTOM_LEFT = "bottom-left";
    static readonly POSITION_BOTTOM_RIGHT = "bottom-right";
    static readonly ASPECT_RATIO_DEFAULT = "default";
    static readonly ASPECT_RATIO_CONTAIN = "contain";
    static readonly ASPECT_RATIO_COVER = "cover";
    static readonly POSITION: {
        readonly TOP_LEFT: "top-left";
        readonly TOP_RIGHT: "top-right";
        readonly BOTTOM_LEFT: "bottom-left";
        readonly BOTTOM_RIGHT: "bottom-right";
    };
    static readonly ASPECT_RATIO: {
        readonly DEFAULT: "default";
        readonly CONTAIN: "contain";
        readonly COVER: "cover";
    };
    private defaultLayout;
    private isAudioOnly;
    private listener;
    private mode;
    private ShowEndCallButton;
    private ShowSwitchCameraButton;
    private ShowMuteAudioButton;
    private ShowPauseVideoButton;
    private ShowAudioModeButton;
    private StartAudioMuted;
    private StartVideoMuted;
    private defaultAudioMode;
    private ShowSwitchToVideoCallButton;
    private AvatarMode;
    private ShowRecordingButton;
    private StartRecordingOnCallStart;
    private MainVideoContainerSetting;
    private EnableVideoTileClick;
    private enableDraggableVideoTile;
    constructor(builder: CallSettingsBuilder);
    isAudioOnlyCall(): boolean;
    isDefaultLayoutEnabled(): boolean;
    getCallEventListener(): OngoingCallListener;
    getMode(): string;
    isEndCallButtonEnabled(): boolean;
    isSwitchCameraButtonEnabled(): boolean;
    isMuteAudioButtonEnabled(): boolean;
    isPauseVideoButtonEnabled(): boolean;
    isAudioModeButtonEnabled(): boolean;
    getStartWithAudioMuted(): boolean;
    getStartWithVideoMuted(): boolean;
    getDefaultAudioMode(): string;
    isAudioToVideoButtonEnabled(): boolean;
    getAvatarMode(): string;
    isRecordingButtonEnabled(): boolean;
    shouldStartRecordingOnCallStart(): boolean;
    getMainVideoContainerSetting(): MainVideoContainerSetting;
    isVideoTileClickEnabled(): boolean;
    isVideoTileDragEnabled(): boolean;
}
type CallModes = typeof CallConstants.CALL_MODE[keyof typeof CallConstants.CALL_MODE];
export declare class CallSettingsBuilder {
    /** @private */ defaultLayout: boolean;
    /** @private */ isAudioOnly: boolean;
    /** @private */ listener: OngoingCallListener;
    /** @private */ mode: CallModes;
    /** @private */ ShowEndCallButton: boolean;
    /** @private */ ShowSwitchCameraButton: boolean;
    /** @private */ ShowMuteAudioButton: boolean;
    /** @private */ ShowPauseVideoButton: boolean;
    /** @private */ ShowAudioModeButton: boolean;
    /** @private */ StartAudioMuted: boolean;
    /** @private */ StartVideoMuted: boolean;
    /** @private */ defaultAudioMode: typeof CallConstants.AUDIO_MODE[keyof typeof CallConstants.AUDIO_MODE];
    /** @private */ ShowSwitchToVideoCallButton: boolean;
    /** @private */ AvatarMode: string;
    /** @private */ ShowRecordingButton: boolean;
    /** @private */ StartRecordingOnCallStart: boolean;
    /** @private */ MainVideoContainerSetting: MainVideoContainerSetting;
    /** @private */ EnableVideoTileClick: boolean;
    /** @private */ enableDraggableVideoTile: boolean;
    /**
     *
     * @param {boolean} defaultLayout
     * This methods shows/hides the default button layout.
     * If set to true the default button layout will be shown.
     * If set to false the default button layout will be hidden.
     * Default value is true
     * @returns
     */
    enableDefaultLayout(defaultLayout: boolean): this;
    /**
     *
     * @param {boolean} isAudioOnly
     * This methods sets the type(audio/video) of the call.
     * If set to true, the call will be strictly an audio call.
     * If set to false, the call will be an audio-video call.
     * Default value is false
     * @returns
     */
    setIsAudioOnlyCall(isAudioOnly: boolean): this;
    /**
     *
     * @param {OngoingCallListener} listener
     * This method sets the call event listener.
     * @returns
     */
    setCallEventListener(listener: OngoingCallListener): this;
    /**
     *
     * @param {string} mode
     * This method sets the mode of the call.
     * @returns
     */
    setMode(mode: CallModes): this;
    /**
     *
     * @param {boolean} showEndCallButton
     * This method shows/hides the end call button.
     * If set to true it will display the end call button.
     * If set to false it will hide the end call button.
     * Default value is true.
     * @returns
     */
    showEndCallButton(showEndCallButton?: boolean): this;
    /**
     *
     * @param {boolean} showSwitchCameraButton
     * This method shows/hides the switch camera button.
     * If set to true it will display the switch camera button.
     * If set to false it will hide the switch camera button.
     * Note: For video call it remains hidden regardless of its value.
     * Default value is true.
     * @returns
     */
    showSwitchCameraButton(showSwitchCameraButton?: boolean): this;
    /**
     *
     * @param {boolean} showMuteAudioButton
     * This method shows/hides the mute audio button.
     * If set to true it will display the mute audio button.
     * If set to false it will hide the mute audio button.
     * Default value is true.
     * @returns
     */
    showMuteAudioButton(showMuteAudioButton?: boolean): this;
    /**
     *
     * @param {boolean} showPauseVideoButton
     * This method shows/hides the pause video button.
     * If set to true it will display the pause video button.
     * If set to false it will hide the pause video button.
     * Note: For video call it remains hidden regardless of its value.
     * Default value is true.
     * @returns
     */
    showPauseVideoButton(showPauseVideoButton?: boolean): this;
    /**
     *
     * @param {boolean} showAudioModeButton
     * This method shows/hides the audio mode button.
     * If set to true it will display the audio mode button.
     * If set to false it will hide the audio mode button.
     * Default value is true.
     * @returns
     */
    showAudioModeButton(showAudioModeButton?: boolean): this;
    /**
     *
     * @param {boolean} audioMuted
     * This method allows the call to be started with audio muted.
     * If set to true, the call will start with audio muted.
     * Default value is false.
     * @returns
     */
    startWithAudioMuted(audioMuted?: boolean): this;
    /**
     *
     * @param {boolean} videoMuted
     * This method allows the call to be started with video muted.
     * If set to true, the call will start with video muted.
     * Note: This method has no effect for audio calls.
     * Default value is false.
     * @returns
     */
    startWithVideoMuted(videoMuted?: boolean): this;
    /**
     *
     * @param {string} audioMode
     * This method will set the default audio mode.
     * @returns
     */
    setDefaultAudioMode(audioMode: typeof CallConstants.AUDIO_MODE[keyof typeof CallConstants.AUDIO_MODE]): this;
    /**
     *
     * @param {boolean} showAudioToVideoSwitchButton
     * This method shows/hides the switch to video call button.
     * If set to true it will display the switch to video call button.
     * If set to false it will hide the switch to video call button.
     * Note: For video call it remains hidden regardless of its value.
     * Default value is true.
     * @returns
     */
    showSwitchToVideoCallButton(showAudioToVideoSwitchButton?: boolean): this;
    /**
     *
     * @param {string} mode
     * This method sets the mode of avatar.
     * The avatar mode can be circle, square or fullscreen.
     * Default value is circle.
     * @returns
     */
    setAvatarMode(mode?: 'circle' | 'square' | 'fullscreen'): this;
    /**
     *
     * @param {boolean} showRecordingButton
     * This method shows/hides the recording button.
     * If set to true it will display the recording button.
     * If set to false it will hide the recording button.
     * Default value is false.
     * @returns
     */
    showRecordingButton(showRecordingButton?: boolean): this;
    /**
     *
     * @param {boolean} startRecordingOnCallStart
     * This method starts the recording as soon as the call start.
     * If set to true it will start the recording as soon as the call start.
     * Default value is false.
     * @returns
     */
    startRecordingOnCallStart(startRecordingOnCallStart?: boolean): this;
    /**
     *
     * @param {MainVideoContainerSetting} mainVideoContainerSetting
     * This method can be used to customize the main video container.
     * @returns
     */
    setMainVideoContainerSetting(mainVideoContainerSetting: MainVideoContainerSetting): this;
    /**
     *
     * @param {boolean} enableVideoTileClick
     * This method can be used to enable/disable video tile click functionality in Spotlight mode.
     * By default the video tile is clickable.
     * @returns
     */
    enableVideoTileClick(enableVideoTileClick?: boolean): this;
    /**
     *
     * @param {boolean} enableVideoTileDrag
     * This method can be used to enable/disable video tile drag functionality in Spotlight mode.
     * By default the video tile is draggable.
     * @returns
     */
    enableVideoTileDrag(enableVideoTileDrag?: boolean): this;
    /**
     * This method will return an object of the CallSettings class.
     * @returns {CallSettings}
     */
    build(): CallSettings;
}
export declare class MainVideoContainerSetting {
    private videoFit;
    private zoomButton;
    private fullScreenButton;
    private userListButton;
    private nameLabel;
    /**
     *
     * @param {string} mainVideoAspectRatio
     * This method is used to set the aspect ratio of main video.
     * The default value is `contain`.
     * @returns
     */
    setMainVideoAspectRatio(mainVideoAspectRatio?: AspectRatio): void;
    /**
     *
     * @param {Position} position
     * @param {boolean} visibility
     * This method is used to set the position & visibility parameter of the full screen button.
     * By default the full screen button is visible in the `bottom-right` position.
     * @returns
     */
    setFullScreenButtonParams(position?: Position, visibility?: boolean): void;
    /**
     *
     * @param {Position} position
     * @param {boolean} visibility
     * @param {string} backgroundColor
     * This method is used to set the position, visibility & background color of the name label.
     * By default the name label is visible in the `bottom-left` position with a background-color `#333333`
     * @returns
     */
    setNameLabelParams(position?: Position, visibility?: boolean, backgroundColor?: string): void;
    /**
     *
     * @param {Position} position
     * @param {boolean} visibility
     * This method is used to set the position & visibility parameter of the zoom button.
     * By default the zoom button is visible in the `bottom-right` position.
     * @returns
     */
    setZoomButtonParams(position?: Position, visibility?: boolean): void;
    /**
     *
     * @param {Position} position
     * @param {boolean} visibility
     * This method is used to set the position & visibility parameter of the user list button.
     * By default the user list button is visible in the `bottom-right` position.
     * @returns
     */
    setUserListButtonParams(position?: Position, visibility?: boolean): void;
}
export {};
