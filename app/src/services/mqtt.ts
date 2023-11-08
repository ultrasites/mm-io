import * as mqtt from "mqtt/dist/mqtt.min";
import { Subject } from "rxjs";

export interface MqttMessage {
  topic: string;
  message: Buffer;
}

export class MQTT {
  private client: mqtt.MqttClient;
  private subscribedTopics: string[] = [];
  private messages = new Subject<MqttMessage>();

  messages$ = this.messages.asObservable();

  constructor() {
    this.client = mqtt.connect({
      host: "localhost",
      port: 1884,
      protocol: "ws",
      clientId: "mmio",
    });

    this.client.on("connect", (err) => {
      console.error(err);
    });

    this.client.on("message", (topic, message) => {
      this.messages.next({ topic, message });
    });
  }

  subscribe(topic: string) {
    this.client.subscribe(topic);
    this.subscribedTopics.push(topic);
  }

  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  unsubcribe(topic: string) {
    this.client.unsubscribe(topic);
    delete this.subscribedTopics[this.subscribedTopics.indexOf(topic)];
  }
}
