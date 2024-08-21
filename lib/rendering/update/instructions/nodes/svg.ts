import { JaxsElement } from '../../../types'
import { compileForAttributes } from './element/attributes'

export const compileForSvg = (source: JaxsElement, target: JaxsElement) => {
  return compileForAttributes(source, target, true)
}
