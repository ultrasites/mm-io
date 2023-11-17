import * as mqtt from "mqtt/dist/mqtt.min";
import { Subject, filter, map, distinctUntilChanged, tap } from "rxjs";

export interface MqttMessage {
  topic: string;
  message: string;
}

export class MQTT {
  private client: mqtt.MqttClient;
  private messages = new Subject<MqttMessage>();
  subscribedTopics: string[] = [];

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
      this.messages.next({ topic, message: message.toString() });
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

  observe<T>(oTopic: string) {
    return this.messages$.pipe(
      filter(({ topic, message }) => topic === oTopic && message !== "NaN"),
      distinctUntilChanged((prev, cur) => prev.message === cur.message),
      map(({ message }) => (message ? JSON.parse(message) : message) as T)
    );
  }
}
