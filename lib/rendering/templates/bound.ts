import { eventName } from '../../jaxs-state'
import type { JaxsStore } from 'jaxs-state'
import { performChange } from '../update/perform-change'
import {
  JaxsElement,
  JaxsNodes,
  Props,
  TemplateGenerator,
  RenderKit,
} from '../../types'

type JaxsStoreMap = Record<string, JaxsStore>
type JaxsViewModel = (storeMap: JaxsStoreMap) => Record<string, any>

export class Bound {
  TemplateGenerator: TemplateGenerator
  viewModel: JaxsViewModel
  attributes: Props
  subscriptions: string[]
  dom: JaxsNodes
  parentElement: JaxsElement | null
  renderKit?: RenderKit

  constructor(
    TemplateGenerator: TemplateGenerator,
    viewModel: JaxsViewModel,
    subscriptions: string[],
    attributes: Props,
  ) {
    this.TemplateGenerator = TemplateGenerator
    this.viewModel = viewModel
    this.attributes = attributes
    this.subscriptions = subscriptions
    this.dom = []
    this.parentElement = null
  }

  render(renderKit: RenderKit) {
    this.parentElement = renderKit.parent as JaxsElement
    this.renderKit = renderKit
    this.subscribeForRerender()
    this.dom = this.generateDom(renderKit)
    return this.dom
  }

  generateDom(renderKit: RenderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state.getAll(this.subscriptions)),
    }

    const template = this.TemplateGenerator(props)

    const dom = !template ? [] : template.render(renderKit)
    return dom
  }

  rerender() {
    if (!this.parentElement && this.dom[0]) {
      const parent = this.dom[0].parentElement
      this.parentElement = parent as unknown as JaxsElement
    }

    const newDom = this.generateDom(this.renderKit as RenderKit)
    performChange(this.dom, newDom, this.parentElement as JaxsElement)

    if (this.parentElement) {
      this.dom = Array.from(this.parentElement.childNodes) as JaxsNodes
    }
  }

  subscribeForRerender() {
    const { subscribe } = this.renderKit as RenderKit

    this.subscriptions.forEach((storeName) => {
      subscribe(this.eventName(storeName), () => this.rerender())
    })
  }

  eventName(storeName: string) {
    return `${eventName}:${storeName}`
  }
}

const passThroughViewModel = () => (state: any) => state

type BindParams = {
  Template: TemplateGenerator
  viewModel?: JaxsViewModel
  subscriptions?: string[]
}
export const bind = ({ Template, viewModel, subscriptions }: BindParams) => {
  subscriptions = subscriptions || []
  viewModel = viewModel || passThroughViewModel()
  return (attributes: Props) =>
    new Bound(Template, viewModel, subscriptions, attributes)
}
