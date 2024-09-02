import type { Renderable, RenderKit, Subscribe } from './types'
import { createState, type JaxsState } from './jaxs-state'
import { createBus, JaxsPublishFunction, type JaxsBus } from 'jaxs-bus'
import { render, Root } from './rendering/templates/root'
// import {
//   locationChangeEvent,
//   setupHistory,
// } from './navigation/setupHistory';
// import { setupNavigation } from './navigation/setupNavigation';

type CreateAppBuilderArguments = {
  window?: Window
  document?: Document
}

export class AppBuilder {
  window: Window
  document: Document
  publish: JaxsPublishFunction<any>
  subscribe: Subscribe
  bus: JaxsBus<any>
  state: JaxsState
  renderKit: RenderKit

  constructor(domEnvironment: CreateAppBuilderArguments) {
    this.setupDomEnvironment(domEnvironment)
  }

  setup() {
    this.setupBus()
    this.setupState()
    this.addBusOptions()
    this.setRenderKit()

    return new App({
      window: this.window,
      document: this.document,
      publish: this.publish,
      subscribe: this.subscribe,
      bus: this.bus,
      state: this.state,
      renderKit: this.renderKit,
    })
  }

  setupDomEnvironment(domEnvironment: CreateAppBuilderArguments) {
    if (domEnvironment.window) {
      this.window = domEnvironment.window
      this.document = this.window.document
    } else if (domEnvironment.document) {
      this.window = domEnvironment.document.defaultView as Window
      this.document = domEnvironment.document
    } else {
      this.window = window
      this.document = document
    }
  }

  setupBus() {
    const { publish, subscribe, bus } = createBus()
    this.publish = publish
    this.subscribe = subscribe
    this.bus = bus
  }

  setupState() {
    this.state = createState(this.publish)
  }

  addBusOptions() {
    this.bus.addListenerOptions({
      state: this.state,
      document: this.document,
      window: this.window,
    })
  }

  setRenderKit() {
    this.renderKit = {
      publish: this.publish,
      subscribe: this.subscribe,
      state: this.state,
      document: this.document,
      window: this.window,
    }
  }
}

export class App {
  window: Window
  document: Document
  publish: JaxsPublishFunction<any>
  subscribe: Subscribe
  bus: JaxsBus<any>
  state: JaxsState
  renderKit: RenderKit
  roots: Root[]

  constructor({ window, document, publish, subscribe, bus, state, renderKit }) {
    this.window = window
    this.document = document
    this.publish = publish
    this.subscribe = subscribe
    this.bus = bus
    this.state = state
    this.renderKit = renderKit
    this.roots = [] as Root[]
  }

  render(template: Renderable, selector: string) {
    const root = render(template, selector, this.renderKit)
    this.roots.push(root)
    return root
  }
}

// const triggerRoute = (app: App) => {
//   const publish = app.publish as BusPublish;
//   setTimeout(() => {
//     publish(locationChangeEvent, null);
//   }, 0);
// };

export const createApp = (domEnvironment: CreateAppBuilderArguments = {}) => {
  const builder = new AppBuilder(domEnvironment)
  const app = builder.setup()
  // app.setupHistory()
  return app
}
