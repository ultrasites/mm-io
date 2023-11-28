import { WidgetConfig, WidgetType } from "../../Widget.utils";
import { StateType } from "../../State";
import Slider from "../../Slider";
import WidgetHeader from "../WidgetHeader";

export interface IWidgetDetails {
  config: WidgetConfig<WidgetType, "Shelly">;
  values: {
    connected: boolean;
    uptime: number;
    state: StateType;
    value?: number;
  };
}

export default function WidgetDetails(props: IWidgetDetails) {
  return (
    <div>
      <WidgetHeader
        name={props.config.name}
        mode={props.values.connected ? "success" : "error"}
        position={props.config.position}
      />
      <Slider
        onChange={(percent) => {
          console.log(percent);
        }}
        onInput={(percent) => {
          console.log(percent);
        }}
      />
    </div>
  );
}
