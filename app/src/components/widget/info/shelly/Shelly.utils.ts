import { WidgetConfig, WidgetType } from "../../../Widget.types";
import { LightStatus, ShutterStatus, StatusTypes } from "./Shelly.types";

export const isDimmedLight = (
  config: WidgetConfig<WidgetType, "Shelly">
): config is WidgetConfig<"DIMMED_LIGHT", "Shelly"> =>
  config.type === "DIMMED_LIGHT";

export const isLightStatus = (status: StatusTypes): status is LightStatus =>
  status.hasOwnProperty("ison");

export const shellyActionREST = async <
  T extends LightStatus | ShutterStatus = LightStatus
>(
  ip: string,
  endpoint: string,
  params?: Record<string, string | number>
) => {
  const queryParams = params
    ? Object.keys(params).map((key, idx) => {
        return `${key}=${params[key]}${
          Object.keys(params).length - 1 === idx ? "" : "&"
        }`;
      })
    : "";

  return JSON.parse(
    await (
      await fetch(
        `http://${ip}/${endpoint}${params ? `?${queryParams}` : ""}`,
        {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
    ).text()
  ) as T;
};
