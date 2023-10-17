import { createSignal } from "solid-js";
import styles from "./ToggleButton.module.css";

export interface IToggleButton {
  onClick: (isActive: boolean) => void;
}

export default function ToggleButton(props: IToggleButton) {
  const [toggle, setToggle] = createSignal<boolean>(false);
  return (
    <div
      classList={{
        [styles.button]: true,
        [styles.buttonOn]: toggle()
      }}
      onClick={() => {
        setToggle(!toggle());
        props.onClick(toggle());
      }}
    >
      <div class={styles.inlay}>
        <div
          classList={{
            [styles.circle]: true,
            [styles.circleOn]: toggle(),
            [styles.circleOff]: !toggle()
          }}
        ></div>
      </div>
    </div>
  );
}
