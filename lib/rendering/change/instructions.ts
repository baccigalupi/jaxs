import {
  JaxsInput,
  ChangeInstructionTypes,
  ChangeInstruction,
  JaxsElement,
  RemoveInstructionData,
  AttributeInstructionData,
  EventInstructionData,
  UpdateEventInstructionData,
  InsertNodeData,
} from '../../types'

export const changeText = (source: Text, target: Text): ChangeInstruction => ({
  source,
  target,
  type: ChangeInstructionTypes.changeText,
  data: {},
})

export const replaceNode = (
  source: JaxsElement,
  target: JaxsElement,
): ChangeInstruction => ({
  source,
  target,
  type: ChangeInstructionTypes.replaceNode,
  data: {},
})

export const removeAttribute = (
  source: JaxsElement,
  target: JaxsElement,
  data: RemoveInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.removeAttribute,
})

export const addAttribute = (
  source: JaxsElement,
  target: JaxsElement,
  data: AttributeInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.addAttribute,
})

export const updateAttribute = (
  source: JaxsElement,
  target: JaxsElement,
  data: AttributeInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.updateAttribute,
})

export const removeEvent = (
  source: JaxsElement,
  target: JaxsElement,
  data: EventInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.removeEvent,
})

export const addEvent = (
  source: JaxsElement,
  target: JaxsElement,
  data: EventInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.addEvent,
})

export const updateEvent = (
  source: JaxsElement,
  target: JaxsElement,
  data: UpdateEventInstructionData,
): ChangeInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructionTypes.updateEvent,
})

export const removeNode = (source: JaxsElement): ChangeInstruction => ({
  source,
  target: source, // for type crap only
  type: ChangeInstructionTypes.removeNode,
  data: {},
})

export const insertNode = (
  target: JaxsElement,
  data: InsertNodeData,
): ChangeInstruction => ({
  target,
  source: target, // for type crap only
  type: ChangeInstructionTypes.insertNode,
  data,
})

export const changeValue = (
  source: JaxsInput,
  target: JaxsInput,
  data: AttributeInstructionData,
): ChangeInstruction => ({
  source,
  target,
  type: ChangeInstructionTypes.changeValue,
  data,
})

export const instructionsSorter = (
  left: ChangeInstruction,
  right: ChangeInstruction,
) => {
  if (left.type > right.type) return 1
  if (left.type < right.type) return -1
  return 0
}
