import {
  AttributeInstructionData,
  ChangeInstructions,
  Dom,
  EventInstructionData,
  ExpandedElement,
  InputElement,
  InsertNodeData,
  Instruction,
  RemoveInstructionData,
  UpdateEventInstructionData,
} from '../../../types.ts';

export const changeText = (source: Text, target: Text): Instruction => ({
  source,
  target,
  type: ChangeInstructions.changeText,
  data: {},
});

export const replaceNode = (source: Dom, target: Dom): Instruction => ({
  source,
  target,
  type: ChangeInstructions.replaceNode,
  data: {},
});

export const removeAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: RemoveInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeAttribute,
});

export const addAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AttributeInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addAttribute,
});

export const updateAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AttributeInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateAttribute,
});

export const removeEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: EventInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeEvent,
});

export const addEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: EventInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addEvent,
});

export const updateEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: UpdateEventInstructionData,
): Instruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateEvent,
});

export const removeNode = (
  source: ExpandedElement,
) => ({
  source,
  target: source, // for type crap only
  type: ChangeInstructions.removeNode,
  data: {},
});

export const insertNode = (
  target: ExpandedElement,
  data: InsertNodeData,
) => ({
  target,
  source: target, // for type crap only
  type: ChangeInstructions.insertNode,
  data,
});

export const changeValue = (
  source: InputElement,
  target: InputElement,
  data: AttributeInstructionData,
) => ({
  source,
  target,
  type: ChangeInstructions.changeValue,
  data,
});
