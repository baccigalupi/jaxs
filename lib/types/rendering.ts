import type { PublishFromDom, Subscribe, State } from '@lib/types'
import { JaxsNode, JaxsElement, Props } from '@lib/types/jsx'

export type RenderKit = {
  document: Document
  window: Window
  publish: PublishFromDom
  subscribe: Subscribe
  state: State
  parent?: JaxsNode | null
}
export interface Renderable {
  render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[]
}
export type StaticTemplate = () => Renderable
export type TypedTemplate<T> = (props: Props<T>) => Renderable
export type Template<T> = StaticTemplate | TypedTemplate<T>
export type RenderableCollection = Renderable[]

export type StoreMap = {
  [key: string]: any
}

export type ViewModel<ATTRIBUTES, STORE_MAP> = (
  storeMap: STORE_MAP,
) => Partial<ATTRIBUTES>
export type BindSubscriptionList = string[]

export type BindParams<T, U> = {
  Template: Template<T>
  viewModel?: ViewModel<T, U>
  subscriptions?: BindSubscriptionList
}
