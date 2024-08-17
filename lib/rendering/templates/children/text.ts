import { TextValue } from '../../../types'

export const isTextValue = <T>(child: TextValue | T) => {
  return typeof child === 'string' || typeof child === 'number'
}
