import {
  AddUpdateAttributeInstruction,
  AddUpdateEventInstruction,
  BasicInstruction,
  ChangeInstructions,
  DetailedInstruction,
  Dom,
  RemoveInstructionData,
} from '../types.ts';

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
  source: Element,
  target: Element,
  data: RemoveInstructionData,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeAttribute,
});

export const addAttribute = (
  source: Element,
  target: Element,
  data: AddUpdateAttributeInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addAttribute,
});

export const updateAttribute = (
  source: Element,
  target: Element,
  data: AddUpdateAttributeInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateAttribute,
});

export const removeEvent = (
  source: Element,
  target: Element,
  data: RemoveInstructionData,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.removeEvent,
});

export const addEvent = (
  source: Element,
  target: Element,
  data: AddUpdateEventInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.addEvent,
});

export const updateEvent = (
  source: Element,
  target: Element,
  data: AddUpdateEventInstruction,
): DetailedInstruction => ({
  source,
  target,
  data,
  type: ChangeInstructions.updateEvent,
});
