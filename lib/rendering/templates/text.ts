import { Renderable, TextValue, RenderKit, JaxsNode } from '../../types'
import { createTextNode } from '../dom/text'

export class TextTemplate implements Renderable {
  value: string

  constructor(content: TextValue) {
    this.value = content.toString()
  }

  render(renderKit: RenderKit) {
    const textNode = createTextNode(this.value, renderKit.document)
    ;(textNode as JaxsNode).__jsx = 'TextNode'
    return [textNode]
  }
}
