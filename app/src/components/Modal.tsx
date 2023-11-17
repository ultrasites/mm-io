import { JSX } from "solid-js/jsx-runtime";
import styles from "./Modal.module.css";

export interface IModal {
  onClickBackground: () => {};
  children: JSX.Element;
}

export default function Modal(props: IModal) {
  return (
    <div onClick={() => props.onClickBackground()} class={styles.background}>
      <div class={styles.content}>{props.children}</div>
    </div>
  );
}
