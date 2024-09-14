import { eventName } from '../../state'
import { performChange } from '../update/perform-change'
import {
  JaxsElement,
  JaxsNodes,
  Props,
  Template,
  RenderKit,
  ViewModel,
  BindParams,
  BindSubscriptionList,
  StoreMap,
} from '../../types'

export class Bound<ATTRIBUTES, STATE_MAP> {
  Template: Template<ATTRIBUTES>
  viewModel: ViewModel<ATTRIBUTES, STATE_MAP>
  attributes: Partial<Props<ATTRIBUTES>>
  subscriptions: BindSubscriptionList
  dom: JaxsNodes
  parentElement: JaxsElement | null
  renderKit?: RenderKit

  constructor({ Template, subscriptions, attributes, viewModel }) {
    this.Template = Template
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
      ...this.viewModel(
        renderKit.state.getAll(this.subscriptions) as STATE_MAP,
      ),
    }

    const template = this.Template(props as Props<ATTRIBUTES>)

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

const passthroughViewModel: ViewModel<StoreMap, StoreMap> = (
  storeMap: StoreMap,
) => storeMap

export const bind = <ATTRIBUTES, STATE_MAP>({
  Template,
  viewModel,
  subscriptions,
}: BindParams<ATTRIBUTES, STATE_MAP>) => {
  subscriptions = (subscriptions || []) as BindSubscriptionList
  viewModel = (viewModel || passthroughViewModel) as ViewModel<
    ATTRIBUTES,
    STATE_MAP
  >
  return (attributes: Partial<Props<ATTRIBUTES>>) =>
    new Bound({ Template, viewModel, subscriptions, attributes })
}
