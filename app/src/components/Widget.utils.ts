export interface WidgetBase<T extends WidgetType, U extends Device> {
  name: string;
  position?: string;
  type: T;
  device: U;
}

export interface WidgetMqttConfig<T extends Device> {
  id: string;
  topics: ConnectedTopic &
    (T extends "Fritzbox"
      ? { ring: string; ringNumber: string; history: string; phonebook: string }
      : T extends "TP-Link Tapo"
      ? { setPower: string }
      : { command: string });
}

export interface ConnectedTopic {
  connected: string;
}

export type WidgetType =
  | "DIMMED_LIGHT"
  | "SHUTTER"
  | "GARAGE_GATE"
  | "PHONE"
  | "PLUG";
export type WidgetControlType = "TOGGLE" | "BUTTON" | "RANGE";
export type Device = "Shelly" | "TP-Link Tapo" | "Fritzbox";

export type WidgetConfig<T extends WidgetType, U extends Device> = WidgetBase<
  T,
  U
> &
  WidgetMqttConfig<U>;

export const isFritzboxPhone = (
  config: WidgetConfig<WidgetType, Device>
): config is WidgetConfig<"PHONE", "Fritzbox"> =>
  (config as WidgetConfig<"PHONE", "Fritzbox">).topics.ring !== undefined;

export const isShelly = (
  config: WidgetConfig<WidgetType, Device>
): config is WidgetConfig<WidgetType, "Shelly"> =>
  (config as WidgetConfig<WidgetType, "Shelly">).topics.command !== undefined;

export const isInfoWidget = (type: WidgetType) => type === "PHONE";

export const generateTopic = (id: string, suffix: string) => `${id}/${suffix}`;
