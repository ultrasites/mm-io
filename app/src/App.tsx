import "./App.css";
import Button from "./components/Button";
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
      <Slider onChange={(percent) => console.log(percent)} />
      <div style="display: flex">
        <div>Schiebetür (links) Raffstore</div>
        <div style="display: flex; gap: 10px;">
          <Button
            value="Hoch"
            onClick={() => {
              return Promise.resolve();
            }}
          />
          <Button
            value="Runter"
            onClick={() => {
              return Promise.resolve();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
