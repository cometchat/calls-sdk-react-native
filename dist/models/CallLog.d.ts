import { CallGroup } from "./CallGroup";
import { CallUser } from "./CallUser";
import { Participant } from "./Participant";
import { Recording } from "./Recording";
/**
 * Represents a call log.
 */
export declare class CallLog {
    /**
     * The session ID of the call log.
     */
    private sessionId;
    /**
     * The total audio minutes of the call log.
     */
    private totalAudioMinutes;
    /**
     * The total video minutes of the call log.
     */
    private totalVideoMinutes;
    /**
     * The total duration of the call log.
     */
    private totalDuration;
    /**
     * Whether the call log has a recording.
     */
    private hasRecording;
    /**
     * The time the call was initiated at.
     */
    private initiatedAt;
    /**
     * The call category of the call log.
     */
    private callCategory;
    /**
     * @type {CallUser}
     * The initiator of the call log.
     */
    private initiator;
    /**
     * @type {CallUser | CallGroup}
     * The receiver of the call log.
     */
    private receiver;
    /**
     * The receiver type of the call log.
     */
    private receiverType;
    /**
     * The status of the call log.
     */
    private status;
    /**
     * The total duration in minutes of the call log.
     */
    private totalDurationInMinutes;
    /**
     * The total number of participants in the call log.
     */
    private totalParticipants;
    /**
     * The type of the call log.
     */
    private type;
    /**
     * The message ID of the call log.
     */
    private mid;
    /**
     * The time the call ended at.
     */
    private endedAt;
    /**
     * @type {Participant[]}
     * The participants of the call log.
     */
    private participants;
    /**
     * @type {Recording[]}
     * The recordings of the call log.
     */
    private recordings;
    /**
     * Creates a new instance of CallLog.
     * @param data - The data to initialize the call log with.
     */
    constructor(data: any);
    /**
     * Gets the session ID of the call log.
     * @returns The session ID of the call log.
     */
    getSessionID(): string;
    /**
     * Sets the session ID of the call log.
     * @param value - The session ID to set.
     */
    setSessionID(value: string): void;
    /**
     * Gets the total audio minutes of the call log.
     * @returns The total audio minutes of the call log.
     */
    getTotalAudioMinutes(): number;
    /**
     * Sets the total audio minutes of the call log.
     * @param value - The total audio minutes to set.
     */
    setTotalAudioMinutes(value: number): void;
    /**
     * Gets the total video minutes of the call log.
     * @returns The total video minutes of the call log.
     */
    getTotalVideoMinutes(): number;
    /**
     * Sets the total video minutes of the call log.
     * @param value - The total video minutes to set.
     */
    setTotalVideoMinutes(value: number): void;
    /**
     * Gets the total duration of the call log.
     * @returns The total duration of the call log.
     */
    getTotalDuration(): string;
    /**
     * Sets the total duration of the call log.
     * @param value - The total duration to set.
     */
    setTotalDuration(value: string): void;
    /**
     * Gets whether the call log has a recording.
     * @returns Whether the call log has a recording.
     */
    getHasRecording(): boolean;
    /**
     * Sets whether the call log has a recording.
     * @param value - Whether the call log has a recording.
     */
    setHasRecording(value: boolean): void;
    /**
     * Gets the time the call was initiated at.
     * @returns The time the call was initiated at.
     */
    getInitiatedAt(): number;
    /**
     * Sets the time the call was initiated at.
     * @param value - The time the call was initiated at.
     */
    setInitiatedAt(value: number): void;
    /**
     * Gets the call category of the call log.
     * @returns The call category of the call log.
     */
    getCallCategory(): string;
    /**
     * Sets the call category of the call log.
     * @param value - The call category to set.
     */
    setCallCategory(value: string): void;
    /**
     * Gets the initiator of the call log.
     * @returns The initiator of the call log.
     */
    getInitiator(): CallUser;
    /**
     * Sets the initiator of the call log.
     * @param value - The initiator to set.
     */
    setInitiator(value: CallUser): void;
    /**
     * Gets the receiver of the call log.
     * @returns The receiver of the call log.
     */
    getReceiver(): CallUser | CallGroup;
    /**
     * Sets the receiver of the call log.
     * @param value - The receiver to set.
     */
    setReceiver(value: CallUser | CallGroup): void;
    /**
     * Gets the receiver type of the call log.
     * @returns The receiver type of the call log.
     */
    getReceiverType(): string;
    /**
     * Sets the receiver type of the call log.
     * @param value - The receiver type to set.
     */
    setReceiverType(value: string): void;
    /**
     * Gets the status of the call log.
     * @returns The status of the call log.
     */
    getStatus(): string;
    /**
     * Sets the status of the call log.
     * @param value - The status to set.
     */
    setStatus(value: string): void;
    /**
     * Gets the total duration in minutes of the call log.
     * @returns The total duration in minutes of the call log.
     */
    getTotalDurationInMinutes(): number;
    /**
     * Sets the total duration in minutes of the call log.
     * @param value - The total duration in minutes to set.
     */
    setTotalDurationInMinutes(value: number): void;
    /**
     * Gets the total number of participants in the call log.
     * @returns The total number of participants in the call log.
     */
    getTotalParticipants(): number;
    /**
     * Sets the total number of participants in the call log.
     * @param value - The total number of participants to set.
     */
    setTotalParticipants(value: number): void;
    /**
     * Gets the type of the call log.
     * @returns The type of the call log.
     */
    getType(): string;
    /**
     * Sets the type of the call log.
     * @param value - The type to set.
     */
    setType(value: string): void;
    /**
     * Gets the message ID of the call log.
     * @returns The message ID of the call log.
     */
    getMid(): string;
    /**
     * Sets the message ID of the call log.
     * @param value - The message ID to set.
     */
    setMid(value: string): void;
    /**
     * Gets the time the call ended at.
     * @returns The time the call ended at.
     */
    getEndedAt(): number;
    /**
     * Sets the time the call ended at.
     * @param value - The time the call ended at.
     */
    setEndedAt(value: number): void;
    /**
     * Gets the participants of the call log.
     * @returns The participants of the call log.
     */
    getParticipants(): Participant[];
    /**
     * Sets the participants of the call log.
     * @param value - The participants to set.
     */
    setParticipants(value: Participant[]): void;
    /**
     * Gets the recordings of the call log.
     * @returns The recordings of the call log.
     */
    getRecordings(): Recording[];
    /**
     * Sets the recordings of the call log.
     * @param value - The recordings to set.
     */
    setRecordings(value: Recording[]): void;
    /**
     * Creates a new instance of CallLog from JSON data.
     * @param data - The JSON data to create the call log from.
     * @returns A new instance of CallLog created from the JSON data.
     */
    static callLogFromJson(data: any): CallLog;
}
