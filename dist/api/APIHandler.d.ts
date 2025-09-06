/**
 * APIHandler class for handling API requests related to CometChat Calls.
 */
import { CallAppSettings, CallLogFilterParams } from '../models';
import type { IGenerateTokenAPIResult, IVerifyTokenAPIResult } from './helper';
export declare class APIHandler {
    private static appSettings;
    /**
     * Sets the app settings for the APIHandler class.
     * @param appSettings - The CallAppSettings object containing the app settings.
     */
    static setAppSettings(appSettings: CallAppSettings): void;
    /**
     * Generates a call token for the given session ID and app settings.
     * @param authToken - The authentication token.
     * @param sessionID - The session ID for which the token is to be generated.
     * @param appSettings - The CallAppSettings object containing the app settings.
     * @returns A Promise that resolves to an IGenerateTokenAPIResult object.
     */
    static generateToken(authToken: string, sessionID: string, appSettings: CallAppSettings): Promise<IGenerateTokenAPIResult>;
    /**
     * Verifies the given call token for the given app settings.
     * @param callToken - The call token to be verified.
     * @param appSettings - The CallAppSettings object containing the app settings.
     * @returns A Promise that resolves to an IVerifyTokenAPIResult object.
     */
    static verifyToken(callToken: string, appSettings: CallAppSettings): Promise<IVerifyTokenAPIResult>;
    /**
     * Gets the call log list for the given filter parameters and authentication token.
     * @param params - The CallLogFilterParams object containing the filter parameters.
     * @param authToken - The authentication token.
     * @returns A Promise that resolves to an array of call log objects.
     */
    static getCallLogList(params: CallLogFilterParams, authToken: string): Promise<any>;
    /**
     * Gets the call details for the given session ID and authentication token.
     * @param sessionID - The session ID for which the call details are to be fetched.
     * @param authToken - The authentication token.
     * @returns A Promise that resolves to a call details object.
     */
    static getCallDetails(sessionID: string, authToken: string): Promise<any>;
}
