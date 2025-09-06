/**
 * Represents the parameters used to filter call logs.
 */
export declare class CallLogFilterParams {
    /**
     * The number of items to display per page.
     */
    private perPage;
    /**
     * The page number to display.
     */
    private page;
    /**
     * The mode of the call.
     */
    private mode;
    /**
     * The type of the call.
     */
    private type;
    /**
     * The status of the call.
     */
    private status;
    /**
     * The direction of the call.
     */
    private direction;
    /**
     * Whether the call has recordings.
     */
    private hasRecording;
    /**
     * The user ID.
     */
    private uid;
    /**
     * The group ID.
     */
    private guid;
    /**
     * Creates a new instance of the CallLogFilterParams class.
     * @param data - The data to initialize the call log filter parameters object.
     */
    /**
     * Sets the direction of the call.
     * @param value - The direction of the call.
     */
    setDirection(value: string): void;
    /**
     * Sets the status of the call.
     * @param value - The status of the call.
     */
    setStatus(value: string): void;
    /**
     * Sets the type of the call.
     * @param value - The type of the call.
     */
    setType(value: string): void;
    /**
     * Sets the number of items to display per page.
     * @param value - The number of items to display per page.
     */
    setPerPage(value: number): void;
    /**
     * Sets the page number to display.
     * @param value - The page number to display.
     */
    setPage(value: number): void;
    /**
     * Sets the mode of the call.
     * @param value - The mode of the call.
     */
    setMode(value: string): void;
    /**
     * Sets whether the call has recordings.
     * @param value - Whether the call has recordings.
     */
    setHasRecordings(value: boolean): void;
    /**
     * Sets the user ID.
     * @param value - The user ID.
     */
    setUid(value: string): void;
    /**
     * Sets the group ID.
     * @param value - The group ID.
     */
    setGuid(value: string): void;
    /**
     * Converts the filter parameters to a map of key-value pairs.
     * @returns A map of key-value pairs representing the filter parameters.
     */
    toMap(): {
        [key: string]: string;
    };
}
