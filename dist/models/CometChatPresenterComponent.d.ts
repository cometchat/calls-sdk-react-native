import React from 'react';
import { PresenterSettings } from './PresenterSettings';
type MyState = {
    errored: boolean;
};
export declare class CometChatPresenterComponent extends React.Component<{
    presenterSettings: PresenterSettings;
    callToken: string;
}, MyState> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
