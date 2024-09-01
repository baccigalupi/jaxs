import { TextValue, Renderable } from '../../../types'
import { TextTemplate } from '../text'

export const isTextValue = <T>(child: TextValue | T) => {
  return typeof child === 'string' || typeof child === 'number'
}

export const textNode = (content: TextValue) => {
  return new TextTemplate(content)
}

export const replaceTextNodes = (child: TextValue | Renderable) => {
  if (isTextValue(child)) {
    return textNode(child)
  }

  return child
}
