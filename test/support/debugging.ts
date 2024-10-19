import { ChangeInstruction, JaxsElement, JaxsNode } from '../../lib/types'
import { domToString } from './test-dom'

const instructions = [
  'removeNode',
  'insertNode', // can be to move an existing element in the dom, or to add one
  'replaceNode',
  'removeAttribute',
  'addAttribute',
  'updateAttribute',
  'removeEvent',
  'addEvent',
  'updateEvent',
  'changeValue',
  'changeText',
]

export const formatInstruction = ({
  type,
  target,
  source,
  data,
}: ChangeInstruction) => {
  return {
    type: instructions[type],
    target: formatElement(target),
    source: formatElement(source),
    data,
  }
}

export const debugInstruction = (instruction: ChangeInstruction) => {
  console.log('instruction', formatInstruction(instruction))
}

export const formatElement = (element: JaxsNode) => {
  return {
    html: domToString(element),
    __jsx: element.__jsx,
  }
}

export const debugElement = (element: JaxsNode) => {
  console.log(formatElement(element))
}
