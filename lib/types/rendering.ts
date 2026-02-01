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
export type StaticTemplate = () => Renderable | undefined
export type TypedTemplate<T> = (props: Props<T>) => Renderable | undefined
export type Template<T> = StaticTemplate | TypedTemplate<T>
export type RenderableCollection = Renderable[]

export type ViewModel<TemplateProps, BoundProps, StateMap> = (
  StateMap: StateMap,
  props: Props<BoundProps>,
) => Partial<TemplateProps>

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
  viewModel: ViewModel<TemplateProps, BoundProps, StateMap>
  subscriptions: string[]
}

export type SimpleViewModel<ViewModelProps, TemplateProps> = (
  props: ViewModelProps,
) => Partial<TemplateProps>

export type WithViewModelArguments<
  TemplateProps extends ComponentProps,
  ViewModelProps extends ComponentProps,
> = {
  Template: Template<TemplateProps>
  viewModel: SimpleViewModel<ViewModelProps, TemplateProps>
}
