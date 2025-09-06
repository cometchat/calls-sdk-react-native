export declare const CallConstants: {
    CALL_MODE: {
        DEFAULT: string;
        SPOTLIGHT: string;
        SINGLE: string;
        TILE: string;
        GRID: string;
    };
    CALL_TYPE: {
        AUDIO: string;
        VIDEO: string;
    };
    RECEIVER_TYPE_GROUP: string;
    RECEIVER_TYPE_USER: string;
    CALL_KEYS: {
        CALL_DATA: string;
        CALL_ID: string;
        CALL_SESSION_ID: string;
        CALL_RECEIVER: string;
        CALL_SENDER: string;
        CALL_RECEIVER_TYPE: string;
        CALL_STATUS: string;
        CALL_TYPE: string;
        CALL_INITIATED_AT: string;
        CALL_JOINED_AT: string;
        CALL_LEFT_AT: string;
        CALL_METADATA: string;
        CALL_ENTITIES: string;
        CALL_ENTITY_TYPE: string;
        CALL_ENTITY: string;
        CALL_ENTITY_USER: string;
        CALL_ENTITY_GROUP: string;
    };
    CALL_STATUS: {
        INITIATED: string;
        ONGOING: string;
        UNANSWERED: string;
        REJECTED: string;
        BUSY: string;
        CANCELLED: string;
        ENDED: string;
    };
    AUDIO_INPUT_DEVICES: string;
    AUDIO_OUTPUT_DEVICES: string;
    VIDEO_INPUT_DEVICES: string;
    POST_MESSAGES: {
        TYPES: {
            ACTION_MESSAGE: string;
            HANGUP: string;
            COMETCHAT_RTC_SETTINGS: string;
        };
        ACTIONS: {
            USER_JOINED: string;
            USER_LEFT: string;
            USER_LIST_CHANGED: string;
            INITIAL_DEVICE_LIST: string;
            DEVICE_CHANGE: string;
            LOAD: string;
            CHANGE_AUDIO_INPUT: string;
            CHANGE_AUDIO_OUTPUT: string;
            CHANGE_VIDEO_INPUT: string;
            MUTE_AUDIO: string;
            UNMUTE_AUDIO: string;
            PAUSE_VIDEO: string;
            UNPAUSE_VIDEO: string;
            SWITCH_MODE: string;
            START_SCREENSHARE: string;
            STOP_SCREENSHARE: string;
            END_CALL: string;
            START_RECORDING: string;
            STOP_RECORDING: string;
            RECORDING_TOGGLED: string;
            USER_MUTED: string;
            SCREEN_SHARE_STARTED: string;
            SCREEN_SHARE_STOPPED: string;
        };
    };
    MEDIA_DEVICE: {
        ID: string;
        NAME: string;
        ACTIVE: string;
    };
};
export declare const CALL_ERROR: {
    CALL_ALREADY_INITIATED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    ERROR_IN_CALLING: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    CANNOT_ACCEPT_CALL: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NOT_INITIALIZED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NOT_LOGGED_IN: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    SESSION_ID_REQUIRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    CALL_SETTINGS_REQUIRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    JWT_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export declare const API_ERROR_CODES: {
    AUTH_ERR_AUTH_TOKEN_NOT_FOUND: string;
};
