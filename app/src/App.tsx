import "./App.css";
import ToggleButton from "./components/ToggleButton";

function App() {
  return (
    <>
      <ToggleButton onClick={(isActive) => console.log(isActive)} />
    </>
  );
}

export default App;
