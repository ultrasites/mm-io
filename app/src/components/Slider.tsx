import { createSignal } from "solid-js";
import styles from "./Slider.module.css";

export interface ISlider {
  onChange: (percent: number) => void;
  onInput: (percent: number) => void;
  value?: number;
}

export default function Slider(props: ISlider) {
  const [percent, setPercent] = createSignal<number>(0);
  return (
    <div
      classList={{
        [styles.slider]: true,
      }}
    >
      <input
        onChange={(event) => {
          props.onChange(+event.target.value);
        }}
        onInput={(event) => {
          setPercent(event.target.valueAsNumber);
          props.onInput(+event.target.value);
        }}
        type="range"
        min="0"
        max="100"
        value={props.value ?? 0}
      ></input>
      <div class={styles.percent}>{percent()}%</div>
    </div>
  );
}
