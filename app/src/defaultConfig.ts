import { WidgetConfig } from "./components/Widget.utils";
import { MMIO_Config } from "./config";

export const defaultConfig: MMIO_Config = [
  {
    name: "Licht",
    position: "(links)",
    topics: {
      command: "",
      connected: ""
    },
    id: "fritzbox",
    type: "DIMMED_LIGHT",
    device: "Shelly"
  } satisfies WidgetConfig<"DIMMED_LIGHT", "Shelly">,
  {
    name: "Raffstore",
    position: "Schiebetür (rechts)",
    topics: {
      command: "",
      connected: ""
    },
    id: "fritzbox",
    type: "SHUTTER",
    device: "Shelly"
  } satisfies WidgetConfig<"SHUTTER", "Shelly">,
  {
    name: "Lichterkette",
    position: "Weihnachtsbaum",
    topics: {
      setPower: "",
      connected: ""
    },
    id: "fritzbox",
    type: "PLUG",
    device: "TP-Link Tapo"
  } satisfies WidgetConfig<"PLUG", "TP-Link Tapo">,
  {
    name: "Tor",
    position: "Garage",
    topics: {
      setPower: "",
      connected: ""
    },
    id: "fritzbox",
    type: "GARAGE_GATE",
    device: "TP-Link Tapo"
  } satisfies WidgetConfig<"GARAGE_GATE", "TP-Link Tapo">
];
