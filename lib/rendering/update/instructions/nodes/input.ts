import { ChangeInstructions, JaxsElement, JaxsInput } from '../../../../types'
import { changeValue } from '../instructions'

const notInput = (element: JaxsElement) => element.tagName !== 'INPUT'
const valueSame = (sourceElement: JaxsElement, targetElement: JaxsElement) =>
  (sourceElement as JaxsInput).value === (targetElement as JaxsInput).value

export const compileForInputValue = (
  sourceElement: JaxsElement,
  targetElement: JaxsElement,
) => {
  if (notInput(sourceElement) || valueSame(sourceElement, targetElement)) {
    return [] as ChangeInstructions
  }

  const source = sourceElement as JaxsInput
  const target = targetElement as JaxsInput

  return [changeValue(source, target, { name: 'value', value: target.value })]
}
