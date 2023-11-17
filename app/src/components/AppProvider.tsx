import { createContext, JSX } from "solid-js";
import { MQTT } from "../services/mqtt";

export const AppContext = createContext<{
  mqtt: MQTT | undefined;
}>({
  mqtt: undefined,
});

export function AppProvider(props: { children: JSX.Element }) {
  const mqtt = new MQTT();

  return (
    <AppContext.Provider value={{ mqtt }}>{props.children}</AppContext.Provider>
  );
}
