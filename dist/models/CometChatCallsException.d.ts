import { ErrorModel } from "./ErrorModel";
export declare class CometChatCallsException {
    code: ErrorModel["code"];
    message?: ErrorModel["message"];
    details?: ErrorModel["details"];
    constructor(errorModel: ErrorModel);
}
