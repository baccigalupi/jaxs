import { Template, TextValue, RenderKit, JaxsNode } from '../../types'
import { createTextNode } from '../dom/text'

export class TextTemplate implements Template {
  value: string
  isSvg: boolean

  constructor(content: TextValue) {
    this.value = content.toString()
    this.isSvg = false
  }

  render(renderKit: RenderKit) {
    const textNode = createTextNode(this.value, renderKit.document)
    ;(textNode as JaxsNode).__jsx = 'TextNode'
    return [textNode]
  }
}
