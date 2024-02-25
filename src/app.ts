import type { App, BusPublish, BusSubscribe, DomEnvironment } from './types';
import { createBus } from './messageBus';
import { State } from './state'
import {
  locationChangeEvent,
  setupHistory,
} from './navigation/setupHistory';
import { setupNavigation } from './navigation/setupNavigation';
import { render } from './rendering/templates/root';

const setupBus = (app: App) => {
  const { publish, subscribe, bus } = createBus();

  app.publish = publish;
  app.subscribe = subscribe;
  app.bus = bus;
};

const setupState = (app: App) => {
  const state = new State(app.publish as BusPublish);
  app.state = state;
};

const connectBusToState = (app: App) => {
  const { bus } = app;
  bus.addListenerOptions({
    state: app.state,
    document: app.document,
    window: app.window,
  });
};

const setupRenderKit = (app: App) => {
  app.renderKit = {
    publish: app.publish as BusPublish,
    subscribe: app.subscribe as BusSubscribe,
    state: app.state as State,
    document: app.document,
    window: app.window,
  };
};

const triggerRoute = (app: App) => {
  const publish = app.publish as BusPublish;
  setTimeout(() => {
    publish(locationChangeEvent, null);
  }, 0);
};

const addRender = (app: App) => {
  app.render = (template, selector) => {
    return render(template, selector, app.renderKit);
  };
};

const setupDomEnvironment = (app: App, domEnvironment: DomEnvironment) => {
  const { window, document } = domEnvironment
  if (window) {
    app.window = window
    app.document = window.document
  } else if (document) {
    app.window = document.defaultView as Window
    app.document = document
  } else {
    app.window = window
    app.document = window?.document
  }
}

export const createApp = (domEnvironment: DomEnvironment | undefined) => {
  const app = {} as App;
  setupDomEnvironment(app, domEnvironment || {} as DomEnvironment)

  setupBus(app);
  setupState(app);
  connectBusToState(app);
  setupRenderKit(app);
  setupHistory(app);
  setupNavigation(app);
  triggerRoute(app);
  addRender(app);

  return app;
};
