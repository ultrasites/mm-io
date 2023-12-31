import State, { StateType } from "../../State";
import WidgetHeader from "../WidgetHeader";
import styles from "./WidgetDetails.module.css";
import { useI18n } from "@amoutonbrady/solid-i18n";
import * as dayjs from "dayjs";
import { IconMode } from "../../Icon";
import { StatusTypes } from "../info/shelly/Shelly.types";

import relativeTime from "dayjs/plugin/relativeTime";
import Slider from "../../Slider";
import { isLightStatus, shellyActionREST } from "../info/shelly/Shelly.utils";
import { WidgetConfig, WidgetType } from "../../Widget.types";
import Button from "../../Button";

dayjs.extend(relativeTime);
dayjs.locale("de-DE");

export interface IWidgetDetails {
  config: WidgetConfig<WidgetType, "Shelly">;
  values: {
    connected: IconMode;
    uptime?: number;
    state: StateType;
    value?: string;
    shellyState?: StatusTypes;
  };
}

export default function WidgetDetails(props: IWidgetDetails) {
  const [t] = useI18n();

  return (
    <div>
      <WidgetHeader
        name={props.config.name}
        mode={props.values.connected}
        position={props.config.position}
      />
      <section>
        <Slider
          value={
            isLightStatus(props.values.shellyState!)
              ? props.values.shellyState?.brightness
              : 0
          }
          onChange={async (percent) =>
            await shellyActionREST(
              props.config.rest.ip,
              props.config.rest.endpoints.set,
              { brightness: percent }
            )
          }
        />
        <div class={styles.flexGrid}>
          <Button
            disabled={
              isLightStatus(props.values.shellyState!) &&
              props.values.shellyState.ison
            }
            onClick={async () => {
              await shellyActionREST(
                props.config.rest.ip,
                props.config.rest.endpoints.set,
                {
                  turn: "on",
                }
              );

              return Promise.resolve();
            }}
          >
            {t("on")}
          </Button>
          <Button
            disabled={
              isLightStatus(props.values.shellyState!) &&
              !props.values.shellyState.ison
            }
            onClick={async () => {
              await shellyActionREST(
                props.config.rest.ip,
                props.config.rest.endpoints.set,
                {
                  turn: "off",
                }
              );

              return Promise.resolve();
            }}
          >
            {t("off")}
          </Button>
        </div>
      </section>
      <div class={styles.footer}>
        <div>
          <State
            state={props.values.state}
            value={
              isLightStatus(props.values.shellyState!)
                ? props.values.shellyState?.brightness.toString()
                : ""
            }
          />
          %
        </div>
        <div>
          {t("connectedSince")}{" "}
          {props.values.uptime &&
            dayjs()
              .subtract(props.values.uptime, "seconds")
              .format("DD.MM.YYYY HH:mm")}{" "}
          {t("hour")}
        </div>
      </div>
    </div>
  );
}
