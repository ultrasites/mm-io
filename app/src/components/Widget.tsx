import { JSX } from "solid-js/jsx-runtime";
import Icon from "./Icon";
import styles from "./Widget.module.css";
import State from "./State";
import { onMount, useContext } from "solid-js";
import { AppContext } from "./AppProvider";

export interface WidgetBase<T extends WidgetType> {
  name: string;
  position?: string;
  type: T;
  topics: Record<string, string>;
}

export interface WidgetQuickControl<T extends WidgetType> {
  quickIncludes: T extends "SHUTTER"
    ? { topic1: string; topic2: string }
    : T extends "GARAGE_GATE"
    ? { topic1: string; topic2: string }
    : { topic: string };
}

export type WidgetType = "DIMMED_LIGHT" | "SHUTTER" | "GARAGE_GATE" | "INFO";

export type WidgetConfig<T extends WidgetType> = T extends "INFO"
  ? WidgetBase<T>
  : WidgetBase<T> & WidgetQuickControl<T>;

export interface IWidget {
  onClick?: () => void;
  config: WidgetConfig<WidgetType>;
  children?: JSX.Element;
}

export default function Widget(props: IWidget) {
  const { event } = useContext(AppContext);

  onMount(() => {
    event?.emit("registerWidget", props.config.topics);
  });
  return (
    <div class={styles.widget}>
      <div class={styles.content}>
        <div>
          <div>
            {props.config.name}{" "}
            <Icon icon="wifi" mode="success" style="solid" />
          </div>
          <div class={styles.position}>{props.config.position}</div>
        </div>
        <div>
          <State state="slidingUp" value="98%" />
        </div>
      </div>
      <div class={styles.quickIncludes}>{props.children}</div>
    </div>
  );
}
