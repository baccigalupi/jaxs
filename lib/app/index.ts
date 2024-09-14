import type {
  Renderable,
  RenderKit,
  Subscribe,
  PublishFunction,
} from '../types'
import type { State } from '../state'
import type { JaxsBus } from '../bus'
import { render, Root } from '../rendering/templates/root'
import { startNavigation } from '../navigation/start'

export class App {
  window: Window
  document: Document
  publish: PublishFunction<any>
  subscribe: Subscribe
  bus: JaxsBus
  state: State
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

  startNavigation() {
    startNavigation(this)
  }
}
