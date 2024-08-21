import type { JaxsElement, ChangeInstructions } from '../../../../../types'
import {
  addAttribute,
  removeAttribute,
  updateAttribute,
} from '../../instructions'

export const compileForAttributes = (
  source: JaxsElement,
  target: JaxsElement,
  isSvg = false,
) => {
  const instructions = [] as ChangeInstructions
  const sourceAttributes = source.attributes
  const sourceLength = sourceAttributes.length
  const targetAttributes = target.attributes
  const targetLength = targetAttributes.length

  // NOTE: this implementation sucks, but JSDOM doesn't properly implement
  // .getNamedItem and the deno dom doesn't implement the .length attribute.
  // It's a total test cluster fuck. When there are integration-y tests that
  // I can use for rerender via the DOM, I will get rid of unit tests and
  // improve the implementation. Sucks all around.
  let index: number
  let innerIndex: number
  let matchingAttribute

  // iterate through the source attributes to find removals and updates
  for (index = 0; index < sourceLength; index++) {
    matchingAttribute = null
    const sourceAttribute = sourceAttributes.item(index)
    if (!sourceAttribute) continue

    for (innerIndex = 0; innerIndex < targetLength; innerIndex++) {
      const targetAttribute = targetAttributes.item(innerIndex)
      if (!targetAttribute) continue
      if (sourceAttribute.name == targetAttribute.name) {
        matchingAttribute = targetAttribute
        break
      }
    }

    if (!matchingAttribute) {
      instructions.push(
        removeAttribute(source, target, { name: sourceAttribute.name, isSvg }),
      )
    } else if (sourceAttribute.value !== matchingAttribute.value) {
      instructions.push(
        updateAttribute(source, target, {
          name: sourceAttribute.name,
          value: matchingAttribute.value,
          isSvg,
        }),
      )
    }
  }

  // iterate through the target to find additions
  for (index = 0; index < targetLength; index++) {
    matchingAttribute = null
    const targetAttribute = targetAttributes.item(index)
    if (!targetAttribute) continue

    for (innerIndex = 0; innerIndex < sourceLength; innerIndex++) {
      const sourceAttribute = sourceAttributes.item(innerIndex)
      if (!sourceAttribute) continue
      if (sourceAttribute.name == targetAttribute.name) {
        matchingAttribute = sourceAttribute
        break
      }
    }

    if (!matchingAttribute) {
      instructions.push(
        addAttribute(source, target, {
          name: targetAttribute.name,
          value: targetAttribute.value,
          isSvg,
        }),
      )
    }
  }

  return instructions
}
