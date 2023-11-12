import { useI18n } from "@amoutonbrady/solid-i18n";
import styles from "./State.module.css";

export type StateType =
  | "on"
  | "off"
  | "slidingDown"
  | "slidingUp"
  | "closed"
  | "open"
  | "connecting"
  | "idle"
  | "error";

export interface IState {
  state: StateType;
  value?: string;
}

export default function State(props: IState) {
  const [t] = useI18n();
  return (
    <>
      <span
        classList={{
          [styles.state]: true,
          [styles.success]: props.state === "on" || props.state === "open",
          [styles.warning]:
            props.state === "slidingDown" ||
            props.state === "slidingUp" ||
            props.state === "connecting",
          [styles.error]:
            props.state === "error" ||
            props.state === "off" ||
            props.state === "closed",
        }}
      >
        {t(props.state)}
      </span>
      {props.value && (
        <span
          classList={{
            [styles.state]: true,
            [styles.value]: true,
          }}
        >
          {props.value}
        </span>
      )}
    </>
  );
}
