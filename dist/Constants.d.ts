export declare const constants: {
    DEFAULT_STORE: string;
    MSG_VER_PRE: string;
    MSG_VER_POST: string;
};
export declare const ERROR_CODES: {
    API_ERROR: {
        code: string;
    };
};
export declare const REGION: {
    readonly us: "us";
    readonly eu: "eu";
    readonly in: "in";
    readonly US: "us";
    readonly EU: "eu";
    readonly IN: "in";
};
export declare const DEFAULT_VALUES: {
    ZERO: number;
    MSGS_LIMIT: number;
    MSGS_MAX_LIMIT: number;
    USERS_LIMIT: number;
    USERS_MAX_LIMIT: number;
    GROUPS_LIMIT: number;
    GROUPS_MAX_LIMIT: number;
    CONVERSATION_MAX_LIMIT: number;
    CALL_TIMEOUT: number;
    DEFAULT_MSG_ID: number;
    DEFAULT_MAX_TYPING_INDICATOR_LIMIT: number;
    REGION_DEFAULT: string;
    REGION_DEFAULT_EU: string;
    REGION_DEFAULT_US: string;
    REGION_DEFAULT_IN: string;
    REGION_DEFAULT_PRIVATE: string;
};
export declare enum GroupType {
    Public = "public",
    Private = "private",
    Protected = "protected",
    Password = "password"
}
export declare const GROUP_TYPE: {
    PUBLIC: string;
    PRIVATE: string;
    PROTECTED: string;
    PASSWORD: string;
};
export declare enum GroupMemberScope {
    Admin = "admin",
    Moderator = "moderator",
    Member = "member"
}
export declare const GROUP_MEMBER_SCOPE: {
    ADMIN: string;
    MODERATOR: string;
    PARTICIPANT: string;
};
export declare const APPINFO: {
    platform: string;
    sdkVersion: string;
    apiVersion: string;
    sdkVersionWithUnderScore: string;
    userAgent: string;
};
export declare const SDKHeader: {
    platform: string;
    sdkVersion: string;
    sdk: string;
};
export declare const WS: {
    CONVERSATION: {
        TYPE: {
            CHAT: string;
            GROUP_CHAT: string;
        };
    };
};
export declare const ANALYTICS: {
    analyticsHost: string;
    analyticsVersion: string;
};
export declare const LOCAL_STORE: {
    COMMON_STORE: string;
    MESSAGE_LISTENERS_LIST: string;
    USERS_STORE: string;
    MESSAGES_STORE: string;
    KEYS_STORE: string;
    STORE_STRING: string;
    KEY_STRING: string;
    KEY_USER: string;
    KEY_APP_SETTINGS: string;
    KEY_APP_ID: string;
    KEY_DEVICE_ID: string;
    KEY_MESSAGE_LISTENER_LIST: string;
};
export declare const ResponseConstants: {
    RESPONSE_KEYS: {
        KEY_DATA: string;
        KEY_META: string;
        KEY_CURSOR: string;
        KEY_ACTION: string;
        KEY_MESSAGE: string;
        KEY_ERROR: string;
        KEY_ERROR_DETAILS: string;
        KEY_ERROR_CODE: string;
        KEY_ERROR_MESSAGE: string;
        KEY_AUTH_TOKEN: string;
        KEY_WS_CHANNEL: string;
        KEY_IDENTITY: string;
        KEY_SERVICE: string;
        KEY_ENTITIES: string;
        KEY_ENTITITY: string;
        KEY_ENTITYTYPE: string;
        KEY_ATTACHMENTS: string;
        CODE_REQUEST_OK: number;
        CODE_BAD_REQUEST: number;
        UNREAD_UNDELIVERED_KEYS: {
            ENTITY: string;
            ENTITY_TYPE: string;
            ENTITY_Id: string;
            COUNT: string;
        };
        GROUP_MEMBERS_RESPONSE: {
            SUCCESS: string;
            ERROR: string;
            MESSAGE: string;
        };
        KEY_ENTITY_TYPE: {
            USER: string;
            GROUP: string;
        };
    };
};
export declare const DELIVERY_RECEIPTS: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    RECIPIENT: string;
    MESSAGE_ID: string;
    RECEIVED: string;
    DELIVERED_AT: string;
    ID: string;
    TIME: string;
    DELIVERED_TO_ME_AT: string;
};
export declare const READ_RECEIPTS: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    RECIPIENT: string;
    MESSAGE_ID: string;
    READ: string;
    READ_AT: string;
    ID: string;
    TIME: string;
    READ_BY_ME_AT: string;
};
export declare const MessageConstatnts: {
    TYPE: {
        TEXT: string;
        MEDIA: string;
        IMAGE: string;
        VIDEO: string;
        AUDIO: string;
        FILE: string;
        CUSTOM: string;
    };
    CATEGORY: {
        MESSAGE: string;
        ACTION: string;
        CALL: string;
        CUSTOM: string;
    };
    RECEIVER_TYPE: {
        USER: string;
        GROUP: string;
    };
    KEYS: {
        ATTATCHMENT: string;
        ATTATCHMENTS: string;
        ACTION: string;
        TYPE: string;
        DATA: string;
        ID: string;
        MUID: string;
        SENDER: string;
        RECEIVER: string;
        RECEIVER_ID: string;
        CATEGORY: string;
        RECEIVER_TYPE: string;
        SENT_AT: string;
        STATUS: string;
        TEXT: string;
        URL: string;
        METADATA: string;
        RECEIPTS: string;
        MY_RECEIPTS: string;
        CUSTOM_DATA: string;
        CUSTOM_SUB_TYPE: string;
        RESOURCE: string;
    };
    KNOWN_MEDIA_TYPE: {
        IMAGE: any[];
        VIDEO: any[];
        AUDIO: any[];
        FILE: any[];
    };
    PAGINATION: {
        AFFIX: {
            APPEND: string;
            PREPEND: string;
        };
        CURSOR_FILEDS: {
            ID: string;
            SENT_AT: string;
        };
        CURSOR_AFFIX_DEFAULT: string;
        CURSOR_FIELD_DEFAULT: string;
        KEYS: {
            PER_PAGE: string;
            CURSOR_AFFIX: string;
            AFFIX: string;
            CURSOR_FIELD: string;
            CURSOR_VALUE: string;
            UID: string;
            SENT_AT: string;
            ID: string;
            CURRENT_PAGE: string;
            UNREAD: string;
            HIDE_MESSAGES_FROM_BLOCKED_USER: string;
            SEARCH_KEY: string;
            ONLY_UPDATES: string;
            UPDATED_AT: string;
            CATEGORY: string;
            CATEGORIES: string;
            TYPE: string;
            TYPES: string;
            HIDE_REPLIES: string;
            HIDE_DELETED_MESSAGES: string;
            WITH_TAGS: string;
            TAGS: string;
        };
    };
};
export declare const ATTACHMENTS_CONSTANTS: {
    KEYS: {
        EXTENSION: string;
        MIME_TYPE: string;
        NAME: string;
        SIZE: string;
        URL: string;
    };
};
export declare enum MessageCategory {
    ACTION = "action",
    MESSAGE = "message",
    CALL = "call",
    CUSTOM = "custom"
}
export declare const TYPING_NOTIFICATION: {
    RECEIVER_ID: string;
    RECEIVER_TYPE: string;
    META: string;
    KEYS: {
        TYPING_NOTIFICATION: string;
        TIMESTAMP: string;
    };
    ACTIONS: {
        STARTED: string;
        ENDED: string;
    };
};
export declare const ActionConstatnts: {
    ACTION_SUBJECTS: {
        ACTION_ON: string;
        ACTION_BY: string;
        ACTION_FOR: string;
    };
    ACTION_ENTITY_TYPE: {
        GROUP_USER: string;
        USER: string;
        GROUP: string;
        MESSAGE: string;
    };
    ACTION_KEYS: {
        ACTION_CREATED: string;
        ACTION_UPDATED: string;
        ACTION_DELETED: string;
        ENTITIES: string;
        ENTITY: string;
        ENTITY_TYPE: string;
        TYPE_MEMBER_JOINED: string;
        TYPE_MEMBER_LEFT: string;
        TYPE_MEMBER_KICKED: string;
        TYPE_MEMBER_BANNED: string;
        TYPE_MEMBER_UNBANNED: string;
        TYPE_MEMBER_INVITED: string;
        TYPE_MEMBER_ADDED: string;
        ACTION_SCOPE_CHANGED: string;
        ACTION_TYPE_USER: string;
        ACTION_TYPE_GROUP: string;
        ACTION_TYPE_GROUP_MEMBER: string;
        TYPE_MESSAGE_EDITED: string;
        TYPE_MESSAGE_DELETED: string;
        ACTION_TYPE_CALL: string;
        EXTRAS: string;
        SCOPE: string;
        NEW: string;
        OLD: string;
    };
    ActionMessages: {
        ACTION_GROUP_JOINED_MESSAGE: string;
        ACTION_GROUP_LEFT_MESSAGE: string;
        ACTION_MEMBER_KICKED_MESSAGE: string;
        ACTION_MEMBER_BANNED_MESSAGE: string;
        ACTION_MEMBER_UNBANNED_MESSAGE: string;
        ACTION_MEMBER_INVITED_MESSAGE: string;
        ACTION_MESSAGE_EDITED_MESSAGE: string;
        ACTION_MESSAGE_DELETED_MESSAGE: string;
        ACTION_MEMBER_SCOPE_CHANGED: string;
        ACTION_MEMBER_ADDED_TO_GROUP: string;
    };
    ACTION_TYPE: {
        TYPE_MEMBER_JOINED: string;
        TYPE_MEMBER_LEFT: string;
        TYPE_MEMBER_KICKED: string;
        TYPE_MEMBER_BANNED: string;
        TYPE_MEMBER_UNBANNED: string;
        TYPE_MEMBER_INVITED: string;
        TYPE_MEMBER_SCOPE_CHANGED: string;
        TYPE_MESSAGE: string;
        TYPE_MESSAGE_EDITED: string;
        TYPE_MESSAGE_DELETED: string;
        TYPE_MEMBER_ADDED: string;
    };
    ACTIONS: {
        MEMBER_ADDED: string;
        MEMBER_JOINED: string;
        MEMBER_LEFT: string;
        MEMBER_KICKED: string;
        MEMBER_BANNED: string;
        MEMBER_UNBANNED: string;
        MEMBER_INVITED: string;
        MEMBER_SCOPE_CHANGED: string;
        MESSAGE_EDITED: string;
        MESSSAGE_DELETED: string;
        TYPE_USER: string;
        TYPE_GROUP: string;
        TYPE_GROUP_MEMBER: string;
    };
};
export declare const BlockedUsersConstants: {
    REQUEST_KEYS: {
        DIRECTIONS: {
            BOTH: string;
            HAS_BLOCKED_ME: string;
            BLOCKED_BY_ME: string;
        };
    };
};
export declare const CallConstants: {
    readonly CALL_MODE: {
        readonly DEFAULT: "DEFAULT";
        readonly SPOTLIGHT: "SPOTLIGHT";
    };
    readonly AUDIO_MODE: {
        readonly SPEAKER: "SPEAKER";
        readonly EARPIECE: "EARPIECE";
        readonly BLUETOOTH: "BLUETOOTH";
        readonly HEADPHONES: "HEADPHONES";
    };
    readonly CALL_TYPE: {
        readonly AUDIO: "audio";
        readonly VIDEO: "video";
    };
    readonly RECEIVER_TYPE_GROUP: "group";
    readonly RECEIVER_TYPE_USER: "user";
    readonly CALL_KEYS: {
        readonly CALL_DATA: "data";
        readonly CALL_ID: "id";
        readonly CALL_SESSION_ID: "sessionid";
        readonly CALL_RECEIVER: "receiver";
        readonly CALL_SENDER: "sender";
        readonly CALL_INITIATOR: "initiator";
        readonly CALL_RECEIVER_TYPE: "receiverType";
        readonly CALL_STATUS: "status";
        readonly CALL_TYPE: "type";
        readonly CALL_INITIATED_AT: "initiatedAt";
        readonly CALL_JOINED_AT: "joinedAt";
        readonly CALL_LEFT_AT: "leftAt";
        readonly CALL_METADATA: "metadata";
        readonly CALL_ENTITIES: "entities";
        readonly CALL_ENTITY_TYPE: "entityType";
        readonly CALL_ENTITY: "entity";
        readonly CALL_ENTITY_USER: "user";
        readonly CALL_ENTITY_GROUP: "group";
    };
    readonly CALL_STATUS: {
        readonly INITIATED: "initiated";
        readonly ONGOING: "ongoing";
        readonly UNANSWERED: "unanswered";
        readonly REJECTED: "rejected";
        readonly BUSY: "busy";
        readonly CANCELLED: "cancelled";
        readonly ENDED: "ended";
    };
    readonly ZOOM_BUTTON_DEFAULT_PARAMS: {
        readonly position: "bottom-right";
        readonly visible: true;
    };
    readonly FULL_SCREEN_BUTTON_DEFAULT_PARAMS: {
        readonly position: "bottom-right";
        readonly visible: true;
    };
    readonly USER_LIST_BUTTON_DEFAULT_PARAMS: {
        readonly position: "bottom-right";
        readonly visible: true;
    };
    readonly NAME_LABEL_DEFAULT_PARAMS: {
        readonly position: "bottom-left";
        readonly visible: true;
        readonly color: "#333333";
    };
    readonly MAIN_VIDEO_CONTAINER_SETTINGS: {
        readonly KEYS: {
            readonly POSITION: "position";
            readonly VISIBILITY: "visibility";
            readonly COLOR: "color";
        };
    };
};
export declare const GroupConstants: {
    KEYS: {
        NAME: string;
        GUID: string;
        TYPE: string;
        PASSWORD: string;
        ICON: string;
        DESCRIPTION: string;
        OWNER: string;
        METADATA: string;
        CREATED_AT: string;
        UPDATED_AT: string;
        HAS_JOINED: string;
        WS_CHANNEL: string;
        TAGS: string;
    };
};
export declare const GroupMemersConstans: {
    KEYS: {
        SCOPE: string;
        UID: string;
        GUID: string;
        USER: string;
        NAME: string;
    };
};
export declare const UserConstants: {
    UID: string;
    NAME: string;
    AUTH_TOKEN: string;
    AVATAR: string;
    LAST_ACTIVE_AT: string;
    LINK: string;
    META_DATA: string;
    ROLE: string;
    STATUS: string;
    STATUS_MESSAGE: string;
    USER_NAME: string;
    TAGS: string;
    SORT_BY: {
        NAME: string;
        STATUS: string;
    };
    SORT_ORDER: {
        ASCENDING: string;
        DESCENDING: string;
    };
};
export declare const Errors: {
    ERROR_IO_EXCEPTION: string;
    ERROR_JSON_EXCEPTION: string;
    ERROR_PASSWORD_MISSING: string;
    ERROR_LIMIT_EXCEEDED: string;
    ERROR_USER_NOT_LOGGED_IN: string;
    ERROR_INVALID_GUID: string;
    ERROR_PASSWORD_MISSING_MESSAGE: string;
    ERROR_LIMIT_EXCEEDED_MESSAGE: string;
    ERROR_USER_NOT_LOGGED_IN_MESSAGE: string;
    ERROR_INVALID_GUID_MESSAGE: string;
    ERROR_DEFAULT_MESSAGE: string;
    ERR_SETTINGS_HASH_OUTDATED: string;
    ERR_NO_AUTH: string;
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
    JWT_NOT_FOUND: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    MODULE_NOT_INSTALLED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export declare const PARAMETER_ERROR: {
    PARAMETER_REQUIRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export declare const GENERAL_ERROR: {
    readonly GENERIC_EXCEPTION: {
        readonly code: "GENERIC_EXCEPTION";
    };
    readonly INVALID_ARGUMENT_EXCEPTION: {
        readonly code: "INVALID_ARGUMENT_EXCEPTION";
    };
    readonly INVALID_PROP_EXCEPTION: {
        readonly code: "INVALID_PROP_EXCEPTION";
    };
    readonly API_ERROR: {
        readonly code: "API_ERROR";
    };
    readonly ERROR_PRESENTER_MODE: {
        readonly code: "ERROR_PRESENTER_MODE";
        readonly message: "Presenter mode is disabled. To use presenter mode, please enable it from the CometChat Apps Dashboard";
    };
    readonly UNKNOWN_API_ERROR: {
        readonly code: "UNKNOWN_API_ERROR";
        readonly message: "There is an unknown issue with the API request. Please check your internet connection and verify the api call.";
    };
};
export declare const ReceiptErrors: {
    MISSING_PARAMETERS: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    INVALID_PARAMETER: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    NO_WEBSOCKET_CONNECTION: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    RECEIPTS_TEMPORARILY_BLOCKED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
    UNKNOWN_ERROR_OCCURRED: {
        code: string;
        name: string;
        message: string;
        details: {};
    };
};
export declare const APP_SETTINGS: {
    APP_SETTINGS: string;
    KEYS: {
        CHAT_HOST: string;
        CHAT_USE_SSL: string;
        GROUP_SERVICE: string;
        CALL_SERVICE: string;
        CHAT_WS_PORT: string;
        CHAT_WSS_PORT: string;
        CHAT_HTTP_BIND_PORT: string;
        CHAT_HTTPS_BIND_PORT: string;
        ADMIN_API_HOST: string;
        CLIENT_API_HOST: string;
        WEBRTC_HOST: string;
        WEBRTC_USE_SSL: string;
        WEBRTC_WS_PORT: string;
        WEBRTC_WSS_PORT: string;
        WEBRTC_HTTP_BIND_PORT: string;
        WEBRTC_HTTPS_BIND_PORT: string;
        EXTENSION_LIST: string;
        EXTENSION_KEYS: {
            ID: string;
            NAME: string;
        };
        JID_HOST_OVERRIDE: string;
        CHAT_HOST_OVERRIDE: string;
        CHAT_HOST_APP_SPECIFIC: string;
        MODE: string;
        CONNECTION_TYPE: string;
        DEFAULT_MODE: string;
        LIMITED_TRANSIENT: string;
        NO_TRANSIENT: string;
        POLLING_ENABLED: string;
        POLLING_INTERVAL: string;
        ANALYTICS_PING_DISABLED: string;
        ANALYTICS_HOST: string;
        ANALYTICS_VERSION: string;
        ANALYTICS_USE_SSL: string;
        SETTINGS_HASH: string;
        SETTINGS_HASH_RECEIVED_AT: string;
        DENY_FALLBACK_TO_POLLING: string;
        APP_VERSION: string;
        MAIN_DOMAIN: string;
        CHAT_API_VERSION: string;
        WS_API_VERSION: string;
        REGION: string;
        EXTENSION_DOMAIN: string;
        WEBRTC_API_SUBDOMAIN: string;
    };
};
export declare const COMMON_UTILITY_CONSTANTS: {
    TYPE_CONSTANTS: {
        BOOLEAN: string;
        STRING: string;
        OBJECT: string;
        NUMBER: string;
    };
};
export declare const CONNECTION_STATUS: {
    CONNECTED: string;
    CONNECTING: string;
    DISCONNECTED: string;
    FEATURE_THROTTLED: string;
};
export declare const API_ERROR_CODES: {
    AUTH_ERR_AUTH_TOKEN_NOT_FOUND: string;
};
export declare const PROSODY_API: {
    DOMAIN_PREFIX: string;
    PATH: {
        ROOM: string;
        ROOM_SIZE: string;
        SESSIONS: string;
    };
    RESPONSE: {
        PARTICIPANTS: string;
    };
    QUERY_PARAMETERS: {
        DOMAIN: string;
        ROOM: string;
    };
};
export declare const ProsodyApiErrors: {
    INVALID_SESSIONID: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
    INVALID_TYPE: {
        code: string;
        name: string;
        message: string;
        details: string;
    };
};
export declare const JWT_API: {
    KEYS: {
        PASSTHROUGH: string;
        EXPAND: string;
    };
};
export declare const ONLINE_MEMBER_COUNT_API: {
    ENDPOINTS: {
        GET_ONLINE_MEMBER_COUNT: string;
    };
    RESPONSE: {
        ONLINE_USERS_COUNT: string;
        GROUPS: string;
    };
    ERRORS: {
        INVALID_GROUPLIST: {
            code: string;
            name: string;
            message: string;
            details: string;
        };
    };
};
