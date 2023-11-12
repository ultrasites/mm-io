import { createSlider } from "solid-slider";
import { For, onMount } from "solid-js";
import Widget from "./components/Widget";
import styles from "./App.module.css";
import "solid-slider/slider.css";
import { defaultConfig } from "./defaultConfig";

function App() {
  const [slider] = createSlider({ loop: true });
  let ref: HTMLDivElement;
  onMount(() => {
    slider(ref);
  });

  const config = defaultConfig;

  const maxItemOnSlide = 8;
  const countSlides = Math.round(defaultConfig.length / maxItemOnSlide);

  return (
    <>
      <div ref={ref!}>
        <div class={styles.slide}>
          <For each={config} fallback={"loading..."}>
            {(widgetConfig) => <Widget config={widgetConfig} />}
          </For>
        </div>
      </div>
    </>
  );
}

export default App;
