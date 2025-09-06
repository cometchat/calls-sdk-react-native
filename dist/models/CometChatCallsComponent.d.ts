import React from 'react';
import { CallSettings } from './CallSettings';
type MyState = {
    errored: boolean;
};
export declare class CometChatCallsComponent extends React.Component<{
    callSettings: CallSettings;
    callToken: string;
}, MyState> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
