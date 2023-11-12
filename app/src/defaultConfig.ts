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
      connected: "connected",
      phonebook: "phonebook",
    },
    id: "fritzbox",
    type: "PHONE",
    device: "Fritzbox",
  } satisfies WidgetConfig<"PHONE", "Fritzbox">,
  {
    name: "Lichterkette",
    position: "Weihnachtsbaum",
    topics: {
      setPower: "",
      connected: "",
    },
    id: "fritzbox",
    type: "PLUG",
    device: "TP-Link Tapo",
  } satisfies WidgetConfig<"PLUG", "TP-Link Tapo">,
];
