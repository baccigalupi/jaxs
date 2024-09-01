import { eventName } from '../../jaxs-state'
import { performChange } from '../update/perform-change'
import {
  JaxsElement,
  JaxsNodes,
  Props,
  JaxsTemplate,
  RenderKit,
} from '../../types'

export class Bound<T> {
  Template: JaxsTemplate<T>
  viewModel: JaxsViewModel<T>
  attributes: Partial<Props<T>>
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
      ...this.viewModel(renderKit.state.getAll(this.subscriptions)),
    }

    const template = this.Template(props as Props<T>)

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

const passthroughViewModel: JaxsViewModel<StoreMap> = (storeMap: StoreMap) =>
  storeMap

type StoreValue =
  | string
  | number
  | boolean
  | null
  | StoreValue[]
  | { [key: string]: StoreValue }

// TODO: figure out how to tie the
// subscriptions to the store keys, and the view model to the store keys

// type StoreMap<SUBSCRIPTIONS> = {
//   [key in keyof SUBSCRIPTIONS]: StoreValue
// }
type StoreMap = {
  [key: string]: StoreValue
}

export type JaxsViewModel<ATTRIBUTES> = (
  storeMap: StoreMap,
) => Partial<ATTRIBUTES>
type BindSubscriptionList = string[]

type BindParams<T> = {
  Template: JaxsTemplate<T>
  viewModel?: JaxsViewModel<T>
  subscriptions?: BindSubscriptionList
}
export const bind = <T>({
  Template,
  viewModel,
  subscriptions,
}: BindParams<T>) => {
  subscriptions = (subscriptions || []) as BindSubscriptionList
  viewModel = (viewModel || passthroughViewModel) as JaxsViewModel<T>
  return (attributes: Partial<Props<T>>) =>
    new Bound({ Template, viewModel, subscriptions, attributes })
}
