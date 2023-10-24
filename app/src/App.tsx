import "./App.css";
import Button from "./components/Button";
import Icon from "./components/Icon";
import Slider from "./components/Slider";
import ToggleButton from "./components/ToggleButton";
import Widget from "./components/Widget";

function App() {
  return (
    <>
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

          <Widget name="Raffstore" position="Schiebetür (links)">
            <ToggleButton
              onClick={(_isActive) => {
                return Promise.resolve();
              }}
            />
          </Widget>
        </div>
      </div>
    </>
  );
}

export default App;
