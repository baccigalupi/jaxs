import type {
  Renderable,
  RenderKit,
  Subscribe,
  JaxsPublishFunction,
} from '../types'
import type { JaxsState } from '../state'
import type { JaxsBus } from '../bus'
import { render, Root } from '../rendering/templates/root'
import { startNavigation } from '../navigation'

export class App {
  window: Window
  document: Document
  publish: JaxsPublishFunction<any>
  subscribe: Subscribe
  bus: JaxsBus
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

  startNavigation() {
    startNavigation(this)
  }
}
