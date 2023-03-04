export class MessageBus {
  constructor() {
    this.listeners = {};
  }

  subscribe(eventName, listener) {
    this.ensureListenerCollection(eventName);

    this.listeners[eventName].push(listener);
  }

  ensureListenerCollection(eventName) {
    if (this.listeners[eventName]) return;

    this.listeners[eventName] = [];
  }

  publish(eventName, payload) {
    if (!this.listeners[eventName]) return false;

    this.listeners[eventName].forEach((listener) => {
      listener(payload, eventName, (eventName, payload) => this.publish(eventName, payload));
    });

    return true;
  }
}

export const createBus = () => {
  return new MessageBus();
};
