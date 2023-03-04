import {
  BusEventName,
  BusPayload,
  BusListener,
  BusListenersMap
} from './types.ts';

export class MessageBus {
  listeners: BusListenersMap;

  constructor() {
    this.listeners = {};
  }

  subscribe(eventName: BusEventName, listener: BusListener) {
    this.ensureListenerCollection(eventName);

    this.listeners[eventName].push(listener);
  }

  ensureListenerCollection(eventName: BusEventName) {
    if (this.listeners[eventName]) return;

    this.listeners[eventName] = [];
  }

  publish(eventName: BusEventName, payload: BusPayload) {
    if (!this.listeners[eventName]) return false;

    this.listeners[eventName].forEach((listener: BusListener) => {
      listener(payload, eventName, (eventName, payload) => this.publish(eventName, payload));
    });

    return true;
  }
}

export const createBus = () => {
  const bus = new MessageBus();

  const publish = (eventName: BusEventName, payload: BusPayload) =>
    bus.publish(eventName, payload);

  const subscribe = (eventName: BusEventName, listener: BusListener) => 
    bus.subscribe(eventName, listener);

  return {
    bus,
    publish,
    subscribe
  }
};
