import React from 'react';
import { CallSettings } from './CallSettings';
import { PresenterSettings } from './PresenterSettings';
type MyState = {
    shouldLoad: boolean;
    errored: boolean;
};
export declare class CometChatCallsComponentCore extends React.Component<{
    callSettings: CallSettings | PresenterSettings;
    callToken: string;
    presenterMode?: boolean;
}, MyState> {
    static ref: any;
    callsettings: CallSettings | PresenterSettings;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
