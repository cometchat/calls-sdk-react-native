/**
 * Represents a participant in a call.
 */
export declare class Participant {
    /**
     * The unique identifier of the participant.
     */
    private uid;
    /**
     * The name of the participant.
     */
    private name;
    /**
     * The avatar of the participant.
     */
    private avatar;
    /**
     * The total audio minutes of the participant.
     */
    private totalAudioMinutes;
    /**
     * The total video minutes of the participant.
     */
    private totalVideoMinutes;
    /**
     * The total duration in minutes of the participant.
     */
    private totalDurationInMinutes;
    /**
     * The device ID of the participant.
     */
    private deviceID;
    /**
     * Whether the participant has joined the call or not.
     */
    private hasJoined;
    /**
     * The timestamp when the participant joined the call.
     */
    private joinedAt;
    /**
     * The timestamp when the participant left the call.
     */
    private leftAt;
    /**
     * The media ID of the participant.
     */
    private mid;
    /**
     * The state of the participant.
     */
    private state;
    /**
     * Creates a new instance of Participant.
     * @param object - The object containing the participant data.
     */
    constructor(object: any);
    /**
     * Gets the unique identifier of the participant.
     * @returns The unique identifier of the participant.
     */
    getUid(): string;
    /**
     * Sets the unique identifier of the participant.
     * @param value - The unique identifier of the participant.
     */
    setUid(value: string): void;
    /**
     * Gets the name of the participant.
     * @returns The name of the participant.
     */
    getName(): string;
    /**
     * Sets the name of the participant.
     * @param value - The name of the participant.
     */
    setName(value: string): void;
    /**
     * Gets the avatar of the participant.
     * @returns The avatar of the participant.
     */
    getAvatar(): string;
    /**
     * Sets the avatar of the participant.
     * @param value - The avatar of the participant.
     */
    setAvatar(value: string): void;
    /**
     * Gets the total audio minutes of the participant.
     * @returns The total audio minutes of the participant.
     */
    getTotalAudioMinutes(): number;
    /**
     * Sets the total audio minutes of the participant.
     * @param value - The total audio minutes of the participant.
     */
    setTotalAudioMinutes(value: number): void;
    /**
     * Gets the total video minutes of the participant.
     * @returns The total video minutes of the participant.
     */
    getTotalVideoMinutes(): number;
    /**
     * Sets the total video minutes of the participant.
     * @param value - The total video minutes of the participant.
     */
    setTotalVideoMinutes(value: number): void;
    /**
     * Gets the total duration in minutes of the participant.
     * @returns The total duration in minutes of the participant.
     */
    getTotalDurationInMinutes(): number;
    /**
     * Sets the total duration in minutes of the participant.
     * @param value - The total duration in minutes of the participant.
     */
    setTotalDurationInMinutes(value: number): void;
    /**
     * Gets the device ID of the participant.
     * @returns The device ID of the participant.
     */
    getDeviceID(): string;
    /**
     * Sets the device ID of the participant.
     * @param value - The device ID of the participant.
     */
    setDeviceID(value: string): void;
    /**
     * Gets whether the participant has joined the call or not.
     * @returns Whether the participant has joined the call or not.
     */
    getHasJoined(): boolean;
    /**
     * Sets whether the participant has joined the call or not.
     * @param value - Whether the participant has joined the call or not.
     */
    setHasJoined(value: boolean): void;
    /**
     * Gets the timestamp when the participant joined the call.
     * @returns The timestamp when the participant joined the call.
     */
    getJoinedAt(): number;
    /**
     * Sets the timestamp when the participant joined the call.
     * @param value - The timestamp when the participant joined the call.
     */
    setJoinedAt(value: number): void;
    /**
     * Gets the timestamp when the participant left the call.
     * @returns The timestamp when the participant left the call.
     */
    getLeftAt(): number;
    /**
     * Sets the timestamp when the participant left the call.
     * @param value - The timestamp when the participant left the call.
     */
    setLeftAt(value: number): void;
    /**
     * Gets the media ID of the participant.
     * @returns The media ID of the participant.
     */
    getMid(): string;
    /**
     * Sets the media ID of the participant.
     * @param value - The media ID of the participant.
     */
    setMid(value: string): void;
    /**
     * Gets the state of the participant.
     * @returns The state of the participant.
     */
    getState(): string;
    /**
     * Sets the state of the participant.
     * @param value - The state of the participant.
     */
    setState(value: string): void;
    /**
     * Creates a new instance of Participant from a JSON object.
     * @param object - The JSON object containing the participant data.
     * @returns A new instance of Participant.
     */
    static getParticipantFromJson(object: any): Participant;
}
