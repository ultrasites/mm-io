import { combineLatest, map } from "rxjs";
import { MQTT } from "../../../services/mqtt";
import { WidgetConfig, generateTopic } from "../../Widget.utils";

export const phoneRing$ = (
  mqtt: MQTT,
  config: WidgetConfig<"PHONE", "Fritzbox">,
  callback: (ring: boolean, phoneNumber: string) => void
) =>
  combineLatest([
    mqtt!.observe<boolean>(generateTopic(config.id, config.topics.ring)),
    mqtt!.observe<string>(generateTopic(config.id, config.topics.ringNumber)),
  ]).pipe(map(([ring, phoneNumber]) => callback(ring, phoneNumber)));
