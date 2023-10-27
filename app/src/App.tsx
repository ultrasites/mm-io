import { createSlider } from "solid-slider";
import { onMount } from "solid-js";
import Button from "./components/Button";
import Widget, { WidgetConfig } from "./components/Widget";
import styles from "./App.module.css";
import "solid-slider/slider.css";

function App() {
  const config: WidgetConfig<"SHUTTER"> = {
    name: "Raffstore",
    position: "Schiebetür (links)",
    quickIncludes: { topic1: "foo", topic2: "bar" },
    topics: { measurement: "bla" },
    type: "SHUTTER"
  };

  const [slider] = createSlider({ loop: true });
  let ref: HTMLDivElement;
  onMount(() => {
    slider(ref);
  });

  return (
    <>
      <div ref={ref!}>
        <div class={styles.slide}>
          <Widget config={config}>
            <Button disabled onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-up"></i>
            </Button>
            <Button onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-down"></i>
            </Button>
          </Widget>
          <Widget config={config}>
            <Button disabled onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-up"></i>
            </Button>
            <Button onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-down"></i>
            </Button>
          </Widget>
        </div>
        <div class={styles.slide}>
          <Widget config={config}>
            <Button disabled onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-up"></i>
            </Button>
            <Button onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-down"></i>
            </Button>
          </Widget>
          <Widget config={config}>
            <Button disabled onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-up"></i>
            </Button>
            <Button onClick={() => Promise.resolve()}>
              <i class="fa-solid fa-chevron-down"></i>
            </Button>
          </Widget>
        </div>
      </div>
    </>
  );
}

export default App;
