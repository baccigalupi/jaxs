import type { JaxsElement } from '../../../../types'
import { compileForAttributes } from './element/attributes'
import { compileForEvents } from './element/events'
import { compileForInputValue } from './input'

export const compileForElement = (source: JaxsElement, target: JaxsElement) => {
  const attributeInstructions = compileForAttributes(source, target)
  const eventInstructions = compileForEvents(source, target)
  const valueInstructions = compileForInputValue(source, target)

  return attributeInstructions
    .concat(eventInstructions)
    .concat(valueInstructions)
}
