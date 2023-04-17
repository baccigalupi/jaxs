import {
  AddUpdateAttributeInstruction,
  AddUpdateEventInstruction,
  BasicInstruction,
  ChangeInstructions,
  DetailedInstruction,
  Dom,
  ExpandedElement,
  RemoveInstructionData,
} from '../../../types.ts';

export const changeText = (source: Text, target: Text): BasicInstruction => ({
  source,
  target,
  type: ChangeInstructions.changeText,
});

export const replaceNode = (source: Dom, target: Dom): BasicInstruction => ({
  source,
  target,
  type: ChangeInstructions.replaceNode,
});

export const removeAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: RemoveInstructionData,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeAttribute,
});

export const addAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AddUpdateAttributeInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addAttribute,
});

export const updateAttribute = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AddUpdateAttributeInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateAttribute,
});

export const removeEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: RemoveInstructionData,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeEvent,
});

export const addEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AddUpdateEventInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addEvent,
});

export const updateEvent = (
  source: ExpandedElement,
  target: ExpandedElement,
  data: AddUpdateEventInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateEvent,
});

export const removeNode = (
  source: ExpandedElement,
) => ({
  source,
  type: ChangeInstructions.removeNode,
});

export const addNode = (
  target: ExpandedElement,
) => ({
  target,
  type: ChangeInstructions.addNode,
});
