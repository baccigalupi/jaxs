import type {
  JaxsElement,
  JaxsNodes,
  RenderKit,
  Renderable,
  JaxsNode,
} from '../../types'

export class Root {
  template: Renderable
  selector: string
  renderKit: RenderKit
  dom: JaxsNodes
  parentElement?: JaxsElement | null

  constructor(template: Renderable, selector: string, renderKit: RenderKit) {
    this.template = template
    this.selector = selector
    this.renderKit = renderKit
    this.dom = []
  }

  renderAndAttach(renderKit: RenderKit) {
    this.parentElement = this.getParentElement() as JaxsElement
    this.dom = this.render({ ...renderKit, parent: this.parentElement })

    if (this.parentElement) {
      this.attach()
    }
  }

  render(renderKit: RenderKit) {
    return this.template.render(renderKit)
  }

  attach() {
    this.parentElement && (this.parentElement.innerHTML = '')
    this.dom.forEach((element: JaxsNode) => {
      this.parentElement && this.parentElement.appendChild(element)
    })
  }

  getParentElement() {
    return this.renderKit.document.querySelector(this.selector)
  }
}

export const render = (
  template: Renderable,
  selector: string,
  renderKit: RenderKit,
) => {
  const root = new Root(template, selector, renderKit)
  root.renderAndAttach(renderKit)
  return root
}
