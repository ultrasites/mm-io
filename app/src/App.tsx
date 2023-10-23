import "./App.css";
import Button from "./components/Button";
import Icon from "./components/Icon";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";

function App() {
  return (
    <>
      <ToggleButton
        onClick={(_isActive) => {
          return Promise.resolve();
        }}
      />
      <Slider onChange={() => {}} />
      <div style="display: flex">
        <div>Schiebetür (links) Raffstore</div>
        <div style="display: flex; gap: 10px;">
          <Button
            value="RUNTER"
            onClick={() => {
              return Promise.resolve();
            }}
          >
            <i class="fa-solid fa-lightbulb"></i>
          </Button>
          <Button
            value="RUNTER"
            onClick={() => {
              return Promise.resolve();
            }}
          >
            <i class="fa-regular fa-lightbulb"></i>
          </Button>
          <Icon icon="wifi" mode="success" style="solid" />
        </div>
      </div>
    </>
  );
}

export default App;
