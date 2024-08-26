import type {
  AttributeInstructionData,
  EventInstructionData,
  InsertNodeData,
  RemoveInstructionData,
  UpdateEventInstructionData,
  Updater,
  ChangeInstruction,
  JaxsNode,
  JaxsElement,
  JaxsInput,
  JaxsSvgElement,
  JaxsNodes,
} from '../../types'
import { ChangeInstructionTypes } from '../../types'
import { compileCollection } from './instructions/collection'

export const performChange = (
  source: JaxsNodes,
  target: JaxsNodes,
  parent: JaxsElement,
) => {
  const instructions = compileCollection(source, target, parent)

  instructions.forEach((instruction) => {
    performInstruction(instruction)
  })
}

const performInstruction = (instruction: ChangeInstruction) => {
  const performer = performers[instruction.type] || noop
  performer(instruction)
}

const noop: Updater = (_instruction: ChangeInstruction) => {}

const changeText: Updater = (instruction: ChangeInstruction) => {
  const { source, target } = instruction
  source.nodeValue = target.textContent
}

const removeNode: Updater = (instruction: ChangeInstruction) => {
  const { source } = instruction
  source.remove()
}

const insertNode: Updater = (instruction: ChangeInstruction) => {
  const { target, data } = instruction
  const { parent, index } = data as InsertNodeData
  const sibling = parent.childNodes[index]
  if (!sibling) {
    parent.appendChild(target)
  } else if (sibling && sibling !== target) {
    parent.insertBefore(target, sibling)
  }
  // else case, sibling is target and so it is moving to the same place: no-op.
}

const replaceNode: Updater = (instruction: ChangeInstruction) => {
  const { source, target } = instruction
  source.replaceWith(target)
}

const removeAttribute: Updater = (instruction: ChangeInstruction) => {
  const { source, data } = instruction
  const { name, isSvg } = data as RemoveInstructionData

  if (isSvg) {
    ;(source as JaxsSvgElement).removeAttributeNS(null, name)
  } else {
    ;(source as JaxsElement).removeAttribute(name)
  }
}

const addAttribute: Updater = (instruction: ChangeInstruction) => {
  const { source, data } = instruction
  const { name, value, isSvg } = data as AttributeInstructionData

  if (isSvg) {
    ;(source as JaxsSvgElement).setAttributeNS(null, name, value)
  } else {
    ;(source as JaxsElement).setAttribute(name, value)
  }
}

const updateAttribute: Updater = (instruction: ChangeInstruction) => {
  addAttribute(instruction)
}

const removeEvent: Updater = (instruction: ChangeInstruction) => {
  const data = instruction.data as EventInstructionData
  const source = instruction.source as JaxsElement
  const { name, value } = data
  source.removeEventListener(name, value)
}

const addEvent: Updater = (instruction: ChangeInstruction) => {
  const data = instruction.data as EventInstructionData
  const source = instruction.source as JaxsElement
  const { name, value } = data
  source.addEventListener(name, value)
}

const updateEvent: Updater = (instruction: ChangeInstruction) => {
  const data = instruction.data as UpdateEventInstructionData
  const source = instruction.source as JaxsElement

  const { name, sourceValue, targetValue } = data

  source.removeEventListener(name, sourceValue)
  source.addEventListener(name, targetValue)
}

const changeValue: Updater = (instruction: ChangeInstruction) => {
  const data = instruction.data as AttributeInstructionData
  const source = instruction.source as JaxsInput

  const { value } = data

  source.value = value
}

const performers = {
  [ChangeInstructionTypes.changeText]: changeText,
  [ChangeInstructionTypes.removeNode]: removeNode,
  [ChangeInstructionTypes.insertNode]: insertNode,
  [ChangeInstructionTypes.replaceNode]: replaceNode,
  [ChangeInstructionTypes.removeAttribute]: removeAttribute,
  [ChangeInstructionTypes.addAttribute]: addAttribute,
  [ChangeInstructionTypes.updateAttribute]: updateAttribute,
  [ChangeInstructionTypes.removeEvent]: removeEvent,
  [ChangeInstructionTypes.addEvent]: addEvent,
  [ChangeInstructionTypes.updateEvent]: updateEvent,
  [ChangeInstructionTypes.changeValue]: changeValue,
}
