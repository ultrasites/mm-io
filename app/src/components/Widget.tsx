import { JSX } from "solid-js/jsx-runtime";
import Icon from "./Icon";
import styles from "./Widget.module.css";
import State from "./State";

export interface IWidget {
  onClick?: () => void;
  name: string;
  position: string;
  children?: JSX.Element;
}

export default function Widget(props: IWidget) {
  return (
    <div class={styles.widget}>
      <div class={styles.content}>
        <div>
          <div>
            {props.name} <Icon icon="wifi" mode="success" style="solid" />
          </div>
          <div class={styles.position}>{props.position}</div>
        </div>
        <div>
          <State state="closed" value="98%" />
        </div>
      </div>
      <div class={styles.quickIncludes}>{props.children}</div>
    </div>
  );
}
