import {
  JaxsElement,
  Renderable,
  JsxCollection,
  RenderKit,
  JaxsNodes,
  JaxsNode,
} from '../../types'
import { normalizeJsxChildren } from './children/normalize'
import { recursiveRender } from './children/render'
export class Children implements Renderable {
  collection: Renderable[]
  parentElement?: JaxsElement
  isSvg: boolean

  constructor(jsxChildren: JsxCollection, isSvg = false) {
    this.collection = normalizeJsxChildren(jsxChildren, isSvg)
    this.isSvg = isSvg
  }

  render(renderKit: RenderKit, parentElement: JaxsElement | undefined) {
    this.parentElement = parentElement
    const dom = this.generateDom(renderKit)
    this.attachToParent(dom)
    return dom
  }

  generateDom(renderKit: RenderKit) {
    return recursiveRender(this.collection, renderKit)
  }

  attachToParent(dom: JaxsNodes) {
    if (this.parentElement === undefined) return

    const parent = this.parentElement as JaxsElement
    dom.forEach((node: JaxsNode) => parent.appendChild(node))
  }
}
