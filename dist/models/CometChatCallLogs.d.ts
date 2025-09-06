import { CallLog } from "./CallLog";
/**
 * Represents a request to fetch call logs.
 */
declare class CallLogRequest {
    /**
     * The maximum number of call logs to fetch.
     */
    private limit;
    /**
     * The total number of pages of call logs.
     */
    private totalPages;
    /**
     * The current page of call logs.
     */
    private currentPage;
    /**
     * The type of call to filter by.
     */
    private callType;
    /**
     * The status of call to filter by.
     */
    private callStatus;
    /**
     * Whether the call has a recording or not.
     */
    private hasRecording;
    /**
     * The category of call to filter by.
     */
    private callCategory;
    /**
     * The direction of call to filter by.
     */
    private callDirection;
    /**
     * The user ID to filter by.
     */
    private uid;
    /**
     * The group ID to filter by.
     */
    private guid;
    /**
     * The authentication token to use for the API call.
     */
    private authToken;
    /**
     * Whether an API call is currently in progress.
     */
    private inProgress;
    /**
     * The timestamp of the last update.
     */
    private updatedAt;
    /**
     * Whether to only fetch updates.
     */
    private onlyUpdates;
    /**
     * The timestamp of the call log.
     */
    private timestamp?;
    /**
     * The ID of the call log.
     */
    private id?;
    /**
     * The affix of the call log.
     */
    private affix;
    /**
     * The last affix of the call log.
     */
    private lastAffix;
    /**
     * The current method of the call log.
     */
    private currentMethod;
    /**
     * The pagination metadata of the call log.
     */
    private paginationMeta;
    /**
     * Creates a new CallLogRequest instance.
     * @param builder The builder object to use for constructing the request.
     */
    constructor(builder: CallLogRequestBuilder);
    /**
     * Fetches the next page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or rejects with a CometChatCallsException if there was an error.
     */
    fetchNext(): Promise<CallLog[]>;
    /**
     * Fetches the previous page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or an empty array if there are no previous pages, or rejects with a CometChatCallsException if there was an error..
     */
    fetchPrevious(): Promise<CallLog[] | []>;
    /**
     * Makes an API call to fetch call logs.
     * @param isFetchNext Whether to fetch the next page of call logs.
     * @returns A promise that resolves to an array of CallLog objects, or rejects with a CometChatCallsException if there was an error.
     */
    private makeAPICall;
    /**
     * Gets the filter parameters for the API call.
     * @param isNext Whether to fetch the next page of call logs.
     * @returns The filter parameters object.
     */
    private getParams;
    /**
     * Parses the API response and returns an array of CallLog objects.
     * @param response The API response string.
     * @returns An array of CallLog objects.
     */
    private getCallLogList;
}
/**
 * A builder class for creating a request to fetch call logs.
 */
export declare class CallLogRequestBuilder {
    limit: number;
    callType: string;
    callStatus: string;
    hasRecording: boolean;
    callCategory: string;
    callDirection: string;
    uid: string;
    guid: string;
    authToken: string;
    /**
     * Sets the limit of call logs to be fetched.
     * @param limit - The number of call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setLimit(limit: number): this;
    /**
     * Sets the type of call to be fetched.
     * @param callType - The type of call to be fetched. Can be either 'video' or 'audio'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallType(callType: 'video' | 'audio'): this;
    /**
     * Sets the status of call to be fetched.
     * @param callStatus - The status of call to be fetched. Can be either 'ongoing', 'busy', 'rejected', 'cancelled', 'ended' or 'missed'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallStatus(callStatus: 'ongoing' | 'busy' | 'rejected' | 'cancelled' | 'ended' | 'missed'): this;
    /**
     * Sets whether the call has recording or not.
     * @param hasRecording - Whether the call has recording or not.
     * @returns The CallLogRequestBuilder object.
     */
    setHasRecording(hasRecording: boolean): this;
    /**
     * Sets the category of call to be fetched.
     * @param callCategory - The category of call to be fetched. Can be either 'call' or 'meet'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallCategory(callCategory: 'call' | 'meet'): this;
    /**
     * Sets the direction of call to be fetched.
     * @param callDirection - The direction of call to be fetched. Can be either 'incoming' or 'outgoing'.
     * @returns The CallLogRequestBuilder object.
     */
    setCallDirection(callDirection: 'incoming' | 'outgoing'): this;
    /**
     * Sets the user ID of the call logs to be fetched.
     * @param uid - The user ID of the call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setUid(uid: string): this;
    /**
     * Sets the group ID of the call logs to be fetched.
     * @param guid - The group ID of the call logs to be fetched.
     * @returns The CallLogRequestBuilder object.
     */
    setGuid(guid: string): this;
    /**
     * Sets the authorization token for the request.
     * @param authToken - The authorization token for the request.
     * @returns The CallLogRequestBuilder object.
     */
    setAuthToken(authToken: string): this;
    /**
     * Builds and returns the CallLogRequest object.
     * @returns The CallLogRequest object.
     */
    build(): CallLogRequest;
}
export {};
