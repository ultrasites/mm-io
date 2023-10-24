import "./App.css";
import Button from "./components/Button";
import Widget from "./components/Widget";

function App() {
  return (
    <>
      <Widget name="Raffstore" position="Schiebetür (links)">
        <Button onClick={() => Promise.resolve()}>
          <i class="fa-solid fa-chevron-up"></i>
        </Button>
        <Button onClick={() => Promise.resolve()}>
          <i class="fa-solid fa-chevron-down"></i>
        </Button>
      </Widget>
    </>
  );
}

export default App;
