import type {
  Props,
  JaxsNode,
  TagEventAttributes,
  Renderable,
  RenderKit,
  TagAttributes,
  JsxCollection,
} from '../../types'

import { createDecoratedNode } from '../dom/tag'
import { isSvgTag, createSvgNode } from '../dom/svg'
import { separateAttrsAndEvents } from './tag/attributes-and-events'
import { Children } from './children'
import { JsxKey } from './tag/jsx-key'

export class Tag<T> implements Renderable {
  type: string
  events: TagEventAttributes
  attributes: TagAttributes
  props: Props<T>
  children: Children
  isSvg: boolean

  constructor(
    tagType: string,
    props: Props<T>,
    children = [] as JsxCollection,
    isSvg = false,
  ) {
    this.type = tagType

    const { events, attributes } = separateAttrsAndEvents(props)
    this.events = events
    this.attributes = attributes

    this.isSvg = isSvg || isSvgTag(this.type)
    this.children = new Children(children, this.isSvg)
  }

  render(renderKit: RenderKit): JaxsNode[] {
    const dom = this.generateDom(renderKit)
    if (!dom) return []

    this.children.render(renderKit, dom)
    return [dom]
  }

  generateDom(renderKit: RenderKit) {
    if (this.isSvg) {
      return this.generateSvgDom(renderKit)
    } else {
      return this.generateHtmlDom(renderKit)
    }
  }

  generateHtmlDom(renderKit: RenderKit) {
    const node = createDecoratedNode(
      this.type,
      this.attributes,
      this.events,
      renderKit,
    )
    node.__jsx = this.jsxKey()
    return node
  }

  generateSvgDom(renderKit: RenderKit) {
    const node = createSvgNode(this.type, this.attributes, renderKit.document)
    node.__jsx = this.jsxKey()
    return node
  }

  jsxKey() {
    return new JsxKey(this.type, this.attributes).generate()
  }
}
