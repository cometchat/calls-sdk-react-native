import { ListenerHandlers } from './ListnerHandler';
import { AudioMode } from '../types/common';
import { CallAppSettings, CallAppSettingsBuilder } from './CallAppSettings';
import { CallSettings, CallSettingsBuilder } from './CallSettings';
import { CometChatCallsComponentCore as CometChatCallsComponent } from './CometChatCallsComponentCore';
import { CometChatPresenterComponent } from './CometChatPresenterComponent';
import { OngoingCallListener } from './Listner';
import { PresenterSettings, PresenterSettingsBuilder } from './PresenterSettings';
import { CallLog } from './CallLog';
import { CallLogRequestBuilder } from './CometChatCallLogs';
import { CallUser } from "./CallUser";
import { CallGroup } from "./CallGroup";
import { Participant } from './Participant';
import { Recording } from './Recording';
export declare class CometChatCalls {
    private static appSettings;
    private static inProgress;
    static CALL_MODE: {
        readonly DEFAULT: "DEFAULT";
        readonly SPOTLIGHT: "SPOTLIGHT";
    };
    static AUDIO_MODE: {
        readonly SPEAKER: "SPEAKER";
        readonly EARPIECE: "EARPIECE";
        readonly BLUETOOTH: "BLUETOOTH";
        readonly HEADPHONES: "HEADPHONES";
    };
    static addCallEventListener: typeof ListenerHandlers.addCallEventListener;
    static removeCallEventListener: typeof ListenerHandlers.removeCallEventListener;
    static OngoingCallListener: typeof OngoingCallListener;
    static CallSettingsBuilder: typeof CallSettingsBuilder;
    static CallSettings: typeof CallSettings;
    static PresenterSettingsBuilder: typeof PresenterSettingsBuilder;
    static PresenterSettings: typeof PresenterSettings;
    static CallAppSettingsBuilder: typeof CallAppSettingsBuilder;
    static CallAppSettings: typeof CallAppSettings;
    static Component: typeof CometChatCallsComponent;
    static PresenterComponent: typeof CometChatPresenterComponent;
    static CallLogRequestBuilder: typeof CallLogRequestBuilder;
    static CallLog: typeof CallLog;
    static CallUser: typeof CallUser;
    static CallGroup: typeof CallGroup;
    static Participant: typeof Participant;
    static Recording: typeof Recording;
    static generateToken(sessionID: string, authToken: string): Promise<{
        token: string;
    }>;
    static init(appSettings: CallAppSettings): Promise<void>;
    /**
     * Method end on-going call.
     * @returns {void}
     */
    static endSession(): void;
    /**
     * Method to mute/unmute audio stream.
     * @param {boolean} muteAudio
     * @returns {void}
     */
    static muteAudio(muteAudio: boolean): void;
    /**
     * Method to pause/unpause video stream.
     * @param {boolean} pauseVideo
     * @returns {void}
     */
    static pauseVideo(pauseVideo: boolean): void;
    /**
     * Method to resume video stream.
     * @returns {void}
     */
    static resumeVideo(): void;
    /**
     * Method to set audio mode.
     * @param {string} mode
     * @returns {void}
     */
    static setAudioMode(mode: string): void;
    /**
     * Method to switch camera.
     * @returns {void}
     */
    static switchCamera(): void;
    /**
     * Method to get all the available audio output devices.
     * @returns {Promise<AudioMode[]>}
     */
    static getAudioOutputModes(): Promise<AudioMode[]>;
    /**
     * Method to switch from audio call to video call.
     * @returns {void}
     */
    static switchToVideoCall(): void;
    /**
     * Method to Start Call Recording.
     * @returns {void}
     */
    static startRecording(): void;
    /**
     * Method to Stop Call Recording.
     * @returns {void}
     */
    static stopRecording(): void;
    /**
     * Retrieves call details for a given session ID and auth token.
     * @param sessionID - The session ID of the call.
     * @param authToken - The authentication token required to make the API call.
     * @returns A Promise that resolves to a CallLog object containing the call details.
     * @throws {CometChatCallsException} If there is an error retrieving the call details.
     */
    static getCallDetails(sessionID: string, authToken: string): Promise<CallLog>;
}
