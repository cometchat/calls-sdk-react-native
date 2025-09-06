export declare class CallGroup {
    protected guid: string;
    protected name: string;
    protected icon: string;
    constructor(object: any);
    getGuid(): string;
    setGuid(guid: string): void;
    getName(): string;
    setName(name: string): void;
    getIcon(): string;
    setIcon(icon: string): void;
    toString(): string;
    static getGroupFromJson(object: any): CallGroup;
}
