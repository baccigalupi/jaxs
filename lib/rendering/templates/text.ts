import { Template, TextValue, RenderKit, JaxsNode } from '../../types'
import { createTextNode } from '../dom/text'

export class TextTemplate<T> implements Template<T> {
  value: string

  constructor(content: TextValue) {
    this.value = content.toString()
  }

  render<T>(renderKit: RenderKit<T>) {
    const textNode = createTextNode(this.value, renderKit.document)
    ;(textNode as JaxsNode).__jsx = 'TextNode'
    return [textNode]
  }
}
