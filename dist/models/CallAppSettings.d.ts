import { Host, Region } from '../types/common';
export declare class CallAppSettings {
    private appId;
    private region;
    private host?;
    constructor(builder?: CallAppSettingsBuilder);
    setAppId(appId: string): this;
    setRegion(region: Region): this;
    setHost(host: Host): this;
    getAppId(): string;
    getRegion(): Region;
    getHost(): Host;
}
export declare class CallAppSettingsBuilder {
    appId: string;
    region: Region;
    host?: Host;
    /**
     * Method to set appId of the app.
     * @param {string} appId appId of the app
     * @returns
     */
    setAppId(appId: string): this;
    /**
     * Method to set region of the app.
     * @param {Region} region region of the app.
     * @returns {void}
     */
    setRegion(region: Region): this;
    /**
     * Method to set host/domain of the app.
     * @param {string} host host/domain of the app.
     * @returns {void}
     */
    setHost(host: Host): this;
    /**
     * This method will return an object of the CallsAppSettings class.
     * @returns {CallAppSettings} Returns the CallsAppSettings instance
     */
    build(): CallAppSettings;
}
export declare function validateCallAppSettings(appSettings: CallAppSettings): Promise<true>;
