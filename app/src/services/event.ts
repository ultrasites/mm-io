import {
  createGlobalEmitter,
  GlobalEmitter
} from "@solid-primitives/event-bus";

type EventSchema = {
  [key: string]: number | string | null | Record<string, string>;
};

export class Event {
  private emitter: GlobalEmitter<EventSchema>;
  constructor(schema: EventSchema) {
    this.emitter = createGlobalEmitter<typeof schema>();
  }

  emit(
    event: string,
    payload?: string | number | Record<string, string> | null
  ) {
    this.emitter.emit(event, payload ?? null);
  }

  on(
    event: string,
    listener: (
      payload: boolean | string | number | null | Record<string, string>
    ) => {}
  ) {
    this.emitter.on(event, listener);
  }
}
