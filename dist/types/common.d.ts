import { CallSettings } from "../models/CallSettings";
export type Position = typeof CallSettings.POSITION[keyof typeof CallSettings.POSITION];
export type AspectRatio = typeof CallSettings.ASPECT_RATIO[keyof typeof CallSettings.ASPECT_RATIO];
export type ColorRGB = `rgb(${number}, ${number}, ${number})`;
export type ColorRGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type ColorHEX = `#${string}`;
type _ColorValue = ColorRGB | ColorRGBA | ColorHEX;
export type ColorValue = _ColorValue | Omit<string, _ColorValue>;
type _Region = "eu" | "us" | "in";
export type Region = _Region | Omit<string, _Region>;
type _THost = `rtc-${_Region}.cometchat.io`;
export type Host = _THost | Omit<string, _THost>;
export interface AudioMode {
    isSelected: boolean;
    mode: string;
}
export {};
