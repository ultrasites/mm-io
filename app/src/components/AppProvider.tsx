import { createContext, JSX } from "solid-js";
import { Event } from "../services/event";

export const AppContext = createContext<{ event: undefined | Event }>({
  event: undefined
});

export function AppProvider(props: { children: JSX.Element }) {
  const value = {
    event: new Event({ registerWidget: null })
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
