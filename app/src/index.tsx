/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";

document.addEventListener(
  process.env.NODE_ENV === "development"
    ? "DOMContentLoaded"
    : "DOM_LOADED_FOR_MMIO",
  () => {
    const root = document.getElementById("mm-io-root");
    render(() => <App />, root!);
  }
);
