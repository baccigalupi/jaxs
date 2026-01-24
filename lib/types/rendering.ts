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

export type BoundViewModel<TemplateProps, BoundProps, StateMap> = (
  StateMap: StateMap,
  props?: Props<BoundProps>,
) => Partial<TemplateProps>

type DefaultViewModel<BoundProps, StateMap> = (
  StateMap: StateMap,
  props: Props<BoundProps>,
) => StateMap & Props<BoundProps>

export type ViewModel<TemplateProps, BoundProps, StateMap> =
  | BoundViewModel<TemplateProps, BoundProps, StateMap>
  | DefaultViewModel<BoundProps, StateMap>

export type ViewModelResult<TemplateProps, BoundProps, StateMap> =
  | Partial<TemplateProps>
  | (StateMap & Props<BoundProps>)

export type ComponentProps = Record<string, unknown>
export type BindArguments<
  TemplateProps extends ComponentProps,
  StateMap extends ComponentProps,
  BoundProps extends ComponentProps = Partial<TemplateProps>,
> = {
  Template: Template<TemplateProps>
  viewModel?: ViewModel<TemplateProps, BoundProps, StateMap>
  subscriptions?: string[]
}
