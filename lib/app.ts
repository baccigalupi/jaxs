import { App, BusPublish, BusSubscribe, StateGetter } from './types.ts';
import { createBus } from './messageBus.ts';
import { createStore } from './store.ts';
import { setupHistory } from './navigation/setupHistory.js';
import { setupNavigation } from './navigation/setupNavigation.js';

const setupBus = (app: App) => {
  const { publish, subscribe, bus } = createBus();

  app.publish = publish;
  app.subscribe = subscribe;
  app.bus = bus;
};

const setupState = (app: App) => {
  const { getState, setState, store } = createStore({
    publish: app.publish as BusPublish,
  });
  app.getState = getState;
  app.setState = setState;
  app.store = store;
};

const connectBusToState = (app: App) => {
  const { bus, getState, setState } = app;
  bus.addListenerOptions({ getState, setState });
};

const setupRenderKit = (app: App, document: Document) => {
  app.renderKit = {
    publish: app.publish as BusPublish,
    subscribe: app.subscribe as BusSubscribe,
    state: (app.getState as StateGetter)(),
    document,
  };
};

export const createApp = (document = window.document) => {
  const app = {} as App;

  setupBus(app);
  setupState(app);
  connectBusToState(app);
  setupRenderKit(app, document);
  setupHistory(app);
  setupNavigation(app);

  return app;
};
