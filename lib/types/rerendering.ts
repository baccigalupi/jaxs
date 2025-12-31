import { JaxsElement, JaxsNode, JaxsNodes } from '@lib/types/jsx'
// Change instructions and change compilation
export enum ChangeInstructionTypes {
  removeNode,
  insertNode, // can be to move an existing element in the dom, or to add one
  replaceNode,
  removeAttribute,
  addAttribute,
  updateAttribute,
  removeEvent,
  addEvent,
  updateEvent,
  changeValue,
  changeText,
}

export type RemoveInstructionData = {
  name: string
  isSvg?: boolean
}

export type AttributeInstructionData = {
  name: string
  value: string
  isSvg?: boolean
}

export type EventInstructionData = {
  name: string
  value: EventListener
}

export type UpdateEventInstructionData = {
  name: string
  sourceValue: EventListener
  targetValue: EventListener
}

export type InsertNodeData = {
  parent: JaxsElement
  index: number
}

type NullInstructionData = Record<string, never>

export type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | InsertNodeData
  | NullInstructionData

export type ChangeInstruction = {
  source: JaxsNode
  target: JaxsNode
  type: ChangeInstructionTypes
  data: InstructionData
}

export type ChangeInstructions = Array<ChangeInstruction>

export type InstructionsUpdater = (instruction: ChangeInstruction) => void

export type DiffPair = {
  source: JaxsNode
  target: JaxsNode
}

export type CompileChildren = (
  sourceList: JaxsNodes,
  targetList: JaxsNodes,
  parent: JaxsElement,
) => ChangeInstructions
