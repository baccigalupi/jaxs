import { eventName } from '../../state'
import { change } from '../change'

const passThroughViewModel = (state) => state
export class Bound {
  constructor (TemplateClass, viewModel, subscriptions, attributes) {
    this.TemplateClass = TemplateClass
    this.viewModel = viewModel || passThroughViewModel
    this.attributes = attributes || {}
    this.subscriptions = subscriptions
    this.dom = []
  }

  render (renderKit) {
    this.parentElement = renderKit.parent
    this.renderKit = renderKit
    this.subscribeForRerender()
    this.dom = this._render(renderKit)
    return this.dom
  }

  _render (renderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state.value())
    }

    const template = this.TemplateClass(props)

    const dom = !template ? [] : template.render(renderKit)
    return dom
  }

  rerender () {
    if (!this.parentElement) {
      this.parentElement = this.dom[0] && this.dom[0].parentElement
    }
    const newDom = this._render(this.renderKit)
    change(this.dom, newDom, this.parentElement)

    if (this.parentElement) {
      this.dom = Array.from(this.parentElement.childNodes)
    }
  }

  subscribeForRerender () {
    this.subscriptions.forEach((storeName) => {
      this.renderKit.subscribe(eventName(storeName), () => this.rerender())
    })
  }
}

export const bind = ({ Template, viewModel, subscriptions }) => {
  subscriptions = subscriptions || []
  return (attributes) => new Bound(Template, viewModel, subscriptions, attributes)
}
