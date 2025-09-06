import { OngoingCallListener } from './Listner';
interface IMultiOngoingCallListener extends OngoingCallListener {
    _name: string;
}
export declare class ListenerHandlers {
    static callHandlers?: IMultiOngoingCallListener[];
    static addCallEventListener(name: string, callListener: OngoingCallListener): void;
    static removeCallEventListener(handler: string): void;
}
export {};
