import { eventName } from '../../jaxs-state'
import { performChange } from '../update/perform-change'
import {
  JaxsElement,
  JaxsNodes,
  Props,
  Component,
  RenderKit,
} from '../../types'

export class Bound<T> {
  Component: Component<T>
  viewModel: JaxsViewModel
  attributes: Partial<Props<T>>
  subscriptions: string[]
  dom: JaxsNodes
  parentElement: JaxsElement | null
  renderKit?: RenderKit

  constructor(
    Component: Component<T>,
    viewModel?: JaxsViewModel,
    subscriptions: string[],
    attributes: Partial<Props<T>>,
  ) {
    this.Component = Component
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

    const template = this.Component(props as Props<T>)

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

type StoreValue =
  | string
  | number
  | boolean
  | null
  | StoreValue[]
  | { [key: string]: StoreValue }
type StoreMap<SUBSCRIPTIONS> = { [key: keyof SUBSCRIPTIONS]: StoreValue }
export type JaxsViewModel<SUBSCRIPTIONS, ATTRIBUTES> = (
  storeMap: StoreMap<SUBSCRIPTIONS>,
) => ATTRIBUTES
type BindSubscriptionList = string[]
type BindParams<T> = {
  Component: Component<T>
  viewModel?: JaxsViewModel<BindSubscriptionList, Partial<T>>
  subscriptions?: BindSubscriptionList
}

export const bind = <T>({
  Component,
  viewModel,
  subscriptions,
}: BindParams<T>) => {
  subscriptions = subscriptions || ([] as const)
  viewModel = viewModel || ((stateMap) => stateMap)
  return (attributes: Partial<Props<T>>) =>
    new Bound(Component, viewModel, subscriptions, attributes)
}
