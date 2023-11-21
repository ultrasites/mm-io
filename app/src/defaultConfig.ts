import { WidgetConfig } from "./components/Widget.utils";
import { MMIO_Config } from "./config";

export const defaultConfig: MMIO_Config = [
  {
    name: "Telefon",
    position: "Fritzbox",
    topics: {
      ring: "ring",
      ringNumber: "ringnumber",
      history: "history",
      phonebook: "phonebook",
      connected: "connected",
    },
    id: "fritzbox",
    type: "PHONE",
    device: "Fritzbox",
  } satisfies WidgetConfig<"PHONE", "Fritzbox">,
  {
    name: "Licht",
    position: "links",
    topics: {
      command: "test",
      connected: "connected",
    },
    id: "shelly-123",
    type: "DIMMED_LIGHT",
    device: "Shelly",
  } satisfies WidgetConfig<"DIMMED_LIGHT", "Shelly">,
];
