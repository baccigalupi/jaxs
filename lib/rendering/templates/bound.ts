import { eventName } from '../../state'
import { performChange } from '../update/perform-change'
import {
  JaxsElement,
  Props,
  Template,
  RenderKit,
  JaxsNode,
  ViewModel,
  ComponentProps,
  BindArguments,
} from '../../types'
import { modifyDomCache } from './bound/modify-dom-cache'

export class Bound<
  TemplateProps extends ComponentProps,
  StateMap extends ComponentProps,
  BoundProps extends ComponentProps = Partial<TemplateProps>,
> {
  Template: Template<TemplateProps & BoundProps>
  viewModel: ViewModel<TemplateProps, BoundProps, StateMap>
  attributes: Props<BoundProps>
  subscriptions: string[]
  dom: JaxsNode[]
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
    const viewModelProps = this.viewModel(
      renderKit.state.getAll(this.subscriptions) as StateMap,
      this.attributes,
    ) as Props<TemplateProps>

    const props = {
      ...this.attributes,
      ...viewModelProps,
    }

    const template = this.Template(props)

    const dom = !template ? [] : template.render(renderKit)
    return dom
  }

  rerender() {
    if (!this.parentElement && this.dom[0]) {
      const parent = this.dom[0].parentElement
      this.parentElement = parent as unknown as JaxsElement
    }

    const newDom = this.generateDom(this.renderKit as RenderKit)
    const instructions = performChange(
      this.dom,
      newDom,
      this.parentElement as JaxsElement,
    )

    this.dom = modifyDomCache(
      instructions,
      this.dom,
      this.parentElement as JaxsElement,
    )
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

const defaultViewModel = <BoundProps, StateMap>(
  StateMap: StateMap,
  props: Props<BoundProps>,
) => {
  return {
    ...StateMap,
    ...props,
  }
}

export const bind = <
  TemplateProps extends ComponentProps,
  StateMap extends ComponentProps,
  BoundProps extends ComponentProps = Partial<TemplateProps>,
>({
  Template,
  subscriptions,
  viewModel,
}: BindArguments<TemplateProps, StateMap, BoundProps>) => {
  subscriptions ||= [] as string[]
  viewModel ||= defaultViewModel
  return (attributes: Props<BoundProps>) => {
    return new Bound({ Template, viewModel, subscriptions, attributes })
  }
}
