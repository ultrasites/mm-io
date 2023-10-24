import { JSX } from "solid-js/jsx-runtime";
import Icon from "./Icon";
import styles from "./Widget.module.css";

export interface IWidget {
  onClick?: () => void;
  name: string;
  position: string;
  children?: JSX.Element;
}

export default function Widget(props: IWidget) {
  return (
    <div class={styles.widget}>
      <div>
        <div>
          {props.name} <Icon icon="wifi" mode="success" style="solid" />
        </div>
        <div class={styles.position}>{props.position}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
