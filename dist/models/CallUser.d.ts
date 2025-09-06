export declare class CallUser {
    protected uid: string;
    protected name: string;
    protected avatar: string;
    constructor(object: any);
    getUid(): string;
    setUid(uid: string): void;
    getName(): string;
    setName(name: string): void;
    getAvatar(): string;
    setAvatar(avatar: string): void;
    toString(): string;
    static getUserFromJson(object: any): CallUser;
}
