import { TextValue } from '../../../types'
import { TextTemplate } from '../text'

export const isTextValue = <T>(child: TextValue | T) => {
  return typeof child === 'string' || typeof child === 'number'
}

export const textNode = <T>(content: TextValue) => {
  return new TextTemplate<T>(content)
}
