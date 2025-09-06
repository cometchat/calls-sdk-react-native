import type { Region, Host } from "../types/common";
interface StringMap {
    [key: string]: string;
}
interface IGETReqObj {
    url: string;
    headers?: StringMap;
}
interface IPOSTReqObj extends IGETReqObj {
    data?: Record<string, unknown>;
}
export interface IGenerateTokenAPIResult {
    error?: null | Record<string, unknown>;
    data?: null | {
        data: {
            token: string;
        };
        error: {
            message: string;
            devMessage: string;
            source: "chat-api" | Omit<string, "chat-api">;
            code: "AUTH_ERR_AUTH_TOKEN_NOT_FOUND" | string;
        };
    };
}
export interface IVerifyTokenAPIResult {
    error?: null | Record<string, unknown>;
    data?: null | {
        data?: {
            callToken: string;
            settings: {
                PRESENTER_MODE_ENABLED: boolean;
                WEBRTC_HOST: Host;
                ANALYTICS_HOST: string;
                ANALYTICS_VERSION: string;
            };
            payload: {
                data: {
                    appId: string;
                    region: Region;
                    authToken: string;
                    user: {
                        uid: string;
                        name: string;
                        avatar: string;
                    };
                    sessionId: string;
                    passthrough: any;
                };
                room: string;
            };
        };
        error?: {
            message: string;
            devMessage: string;
            source: 'chat-api' | Omit<string, 'chat-api'>;
            code: 'AUTH_ERR_AUTH_TOKEN_NOT_FOUND' | string;
        };
    };
}
export declare const postAPI: (postReqObj: IPOSTReqObj) => Promise<IGenerateTokenAPIResult>;
export declare const getAPI: (getReqObj: IGETReqObj) => Promise<IVerifyTokenAPIResult>;
/**
 * Encodes the given data object into a query string.
 * @param data - The data object to be encoded.
 * @returns The encoded query string.
 */
export declare function encodeQueryData(data: any): string;
export {};
