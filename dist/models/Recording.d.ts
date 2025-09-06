/**
 * Represents a recording object.
 */
export declare class Recording {
    /**
     * The recording ID.
     */
    private rid;
    /**
     * The URL of the recording.
     */
    private recording_url;
    /**
     * The start time of the recording.
     */
    private startTime;
    /**
     * The end time of the recording.
     */
    private endTime;
    /**
     * The duration of the recording.
     */
    private duration;
    /**
     * Creates a new instance of the Recording class.
     * @param data - The data to initialize the recording object.
     */
    constructor(data: any);
    /**
     * Gets the recording ID.
     * @returns The recording ID.
     */
    getRid(): string;
    /**
     * Sets the recording ID.
     * @param value - The recording ID to set.
     */
    setRid(value: string): void;
    /**
     * Gets the recording URL.
     * @returns The recording URL.
     */
    getRecordingURL(): string;
    /**
     * Sets the recording URL.
     * @param value - The recording URL to set.
     */
    setRecordingURL(value: string): void;
    /**
     * Gets the start time of the recording.
     * @returns The start time of the recording.
     */
    getStartTime(): number;
    /**
     * Sets the start time of the recording.
     * @param value - The start time of the recording to set.
     */
    setStartTime(value: number): void;
    /**
     * Gets the end time of the recording.
     * @returns The end time of the recording.
     */
    getEndTime(): number;
    /**
     * Sets the end time of the recording.
     * @param value - The end time of the recording to set.
     */
    setEndTime(value: number): void;
    /**
     * Gets the duration of the recording.
     * @returns The duration of the recording.
     */
    getDuration(): number;
    /**
     * Sets the duration of the recording.
     * @param value - The duration of the recording to set.
     */
    setDuration(value: number): void;
    /**
     * Creates a new Recording object from the given JSON data.
     * @param data - The JSON data to create the Recording object from.
     * @returns A new Recording object.
     */
    static getRecordingFromJson(data: any): Recording;
}
