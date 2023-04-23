import {
  BusEventName,
  BusListener,
  BusListenersMap,
  BusOptions,
  BusPayload,
} from './types.ts';

export class MessageBus {
  listeners: BusListenersMap;
  options: BusOptions;

  constructor(options: BusOptions) {
    this.options = options;
    this.listeners = {};
  }

  subscribe(eventName: BusEventName, listener: BusListener) {
    this.ensureListenerCollection(eventName);

    this.listeners[eventName].push(listener);
  }

  publish(eventName: BusEventName, payload: BusPayload) {
    const listeners = this.listeners[eventName];
    if (!listeners) return false;

    listeners.forEach((listener: BusListener) => {
      listener(
        payload,
        this.buildListenerKit(eventName),
      );
    });

    return true;
  }

  ensureListenerCollection(eventName: BusEventName) {
    if (this.listeners[eventName]) return;

    this.listeners[eventName] = [];
  }

  buildListenerKit(eventName: BusEventName) {
    return {
      eventName,
      publish: this.publish.bind(this),
      ...this.options,
    };
  }
}

export const createBus = (options?: BusOptions | undefined) => {
  const bus = new MessageBus(options || {});
  const publish = bus.publish.bind(bus);
  const subscribe = bus.subscribe.bind(bus);

  return {
    bus,
    publish,
    subscribe,
  };
};
