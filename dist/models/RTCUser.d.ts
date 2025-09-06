export declare class RTCUser {
    private uid;
    private avatar;
    private name;
    private jwt;
    private resource;
    constructor(uid: string);
    setUID(uid: string): void;
    getUID(): string;
    setName(name: string): void;
    getName(): string;
    setAvatar(avatar: string): void;
    getAvatar(): string;
    setJWT(jwt: string): void;
    getJWT(): string;
    setResource(resource: string): void;
    getResource(): string;
}
