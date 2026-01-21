import { App } from '.'
import { JaxsBus, createBus } from '../bus'
import { State, createState } from '../state'
import {
  PublishExtended,
  Subscribe,
  RenderKit,
  CreateAppBuilderArguments,
} from '../types'
class AppBuilder {
  window: Window
  document: Document
  publish: PublishExtended<any>
  subscribe: Subscribe
  bus: JaxsBus
  state: State
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

const createApp = (domEnvironment: CreateAppBuilderArguments = {}) => {
  const builder = new AppBuilder(domEnvironment)
  const app = builder.setup()
  app.startNavigation()
  return app
}

export { App, AppBuilder, createApp }
