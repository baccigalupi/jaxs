import type {
  JaxsElement,
  JaxsNode,
  JaxsNodes,
  ChangeInstructions,
  CompileChildren,
} from '../../../types'
import { compileForElement } from './nodes/element'
import { compileForSvg } from './nodes/svg'
import { compileForText } from './nodes/text'
import { elementIsSvg } from '../../dom/svg'

enum NodeTypes {
  ElementNode = 1,
  TextNode = 3,
}

export const compileForNode = (
  source: JaxsNode,
  target: JaxsNode,
  compileChildren: CompileChildren,
) => {
  let instructions = [] as ChangeInstructions

  if (
    source.nodeType === NodeTypes.ElementNode &&
    elementIsSvg(source as JaxsElement)
  ) {
    const sourceElement = source as JaxsElement
    const targetElement = target as JaxsElement
    const baseInstructions = compileForSvg(sourceElement, targetElement)

    const childrenInstructions = compileChildren(
      sourceElement.childNodes as JaxsNodes,
      targetElement.childNodes as JaxsNodes,
      sourceElement,
    )

    instructions = baseInstructions.concat(childrenInstructions)
  } else if (source.nodeType === NodeTypes.ElementNode) {
    const sourceElement = source as JaxsElement
    const targetElement = target as JaxsElement

    const baseInstructions = compileForElement(sourceElement, targetElement)

    const childrenInstructions = compileChildren(
      sourceElement.childNodes as JaxsNodes,
      targetElement.childNodes as JaxsNodes,
      sourceElement,
    )

    instructions = baseInstructions.concat(childrenInstructions)
  } else if (source.nodeType === NodeTypes.TextNode) {
    instructions = compileForText(source as Text, target as Text)
  }

  return instructions
}
