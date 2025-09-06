import { OngoingCallListener } from './Listner';
import { CallConstants } from '../Constants';
export declare class PresenterSettings {
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
    private isPresenter;
    private listener;
    private ShowEndCallButton;
    private ShowSwitchCameraButton;
    private ShowMuteAudioButton;
    private ShowPauseVideoButton;
    private ShowAudioModeButton;
    private StartAudioMuted;
    private StartVideoMuted;
    private defaultAudioMode;
    private ShowRecordingButton;
    constructor(builder: PresenterSettingsBuilder);
    isAudioOnlyCall(): boolean;
    getIsPresenter(): boolean;
    isDefaultLayoutEnabled(): boolean;
    getCallEventListener(): OngoingCallListener;
    isEndCallButtonEnabled(): boolean;
    isSwitchCameraButtonEnabled(): boolean;
    isMuteAudioButtonEnabled(): boolean;
    isPauseVideoButtonEnabled(): boolean;
    isAudioModeButtonEnabled(): boolean;
    getStartWithAudioMuted(): boolean;
    getStartWithVideoMuted(): boolean;
    getDefaultAudioMode(): string;
    isRecordingButtonEnabled(): boolean;
}
export declare class PresenterSettingsBuilder {
    /** @private */ defaultLayout: boolean;
    /** @private */ isAudioOnly: boolean;
    /** @private */ isPresenter: boolean;
    /** @private */ listener: OngoingCallListener;
    /** @private */ ShowEndCallButton: boolean;
    /** @private */ ShowSwitchCameraButton: boolean;
    /** @private */ ShowMuteAudioButton: boolean;
    /** @private */ ShowPauseVideoButton: boolean;
    /** @private */ ShowAudioModeButton: boolean;
    /** @private */ StartAudioMuted: boolean;
    /** @private */ StartVideoMuted: boolean;
    /** @private */ defaultAudioMode: typeof CallConstants.AUDIO_MODE[keyof typeof CallConstants.AUDIO_MODE];
    /** @private */ ShowRecordingButton: boolean;
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
     * @param {boolean} isPresenter
     * This methods sets if the user is a presenter.
     * If set to true, the user will be a presenter (allowed to share video/audio).
     * If set to false, the user will not be a presenter (restricted).
     * Default value is false
     * @returns
     */
    setIsPresenter(isPresenter: boolean): this;
    /**
     *
     * @param {OngoingCallListener} listener
     * This method sets the call event listener.
     * @returns
     */
    setCallEventListener(listener: OngoingCallListener): this;
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
     * @param {boolean} showRecordingButton
     * This method shows/hides the recording button.
     * If set to true it will display the recording button.
     * If set to false it will hide the recording button.
     * Default value is false.
     * @returns
     */
    showRecordingButton(showRecordingButton?: boolean): this;
    /**
     * This method will return an object of the CallSettings class.
     * @returns {PresenterSettings}
     */
    build(): PresenterSettings;
}
