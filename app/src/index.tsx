/* @refresh reload */
import { render } from "solid-js/web";
import "./shared.css";

import App from "./App";
import { I18nProvider } from "@amoutonbrady/solid-i18n";
import { dictionary } from "./i18n";
import { AppProvider } from "./components/AppProvider";

if (process.env.NODE_ENV === "development") {
  import("./index.css");
  import("./fontawesome.css");
}

document.addEventListener(
  process.env.NODE_ENV === "development"
    ? "DOMContentLoaded"
    : "DOM_LOADED_FOR_MMIO",
  () => {
    const root = document.getElementById("mm-io-root");
    render(
      () => (
        //@ts-ignore
        <I18nProvider
          dict={dictionary}
          locale={navigator.language
            .substring(navigator.language.indexOf("-") + 1)
            .toLowerCase()}
        >
          <AppProvider>
            <App />
          </AppProvider>
        </I18nProvider>
      ),
      root!
    );
  }
);
