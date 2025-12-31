import {
  JaxsElement,
  Renderable,
  RenderableCollection,
  RenderKit,
  JaxsNodes,
  JaxsNode,
} from '../../types'
import { normalizeJsxChildren } from './children/normalize'
import { recursiveRender } from './children/render'
export class Children implements Renderable {
  collection: Renderable[]
  parentElement?: JaxsElement

  constructor(jsxChildren: RenderableCollection) {
    this.collection = normalizeJsxChildren(jsxChildren)
  }

  render(renderKit: RenderKit, parentElement?: JaxsElement) {
    this.parentElement = parentElement
    const dom = this.generateDom(renderKit)
    this.attachToParent(dom)
    return dom
  }

  generateDom(renderKit: RenderKit) {
    return recursiveRender(this.collection, renderKit, this.parentElement)
  }

  attachToParent(dom: JaxsNodes) {
    if (this.parentElement === undefined) return

    const parent = this.parentElement as JaxsElement
    dom.forEach((node: JaxsNode) => parent.appendChild(node))
  }
}
