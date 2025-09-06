import { Host, Region } from "./common";
export interface ICallAppSettings {
    appId: string;
    region: Region;
    host?: Host;
}
