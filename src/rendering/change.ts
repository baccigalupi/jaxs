import type {
  AttributeInstructionData,
  EventInstructionData,
  ExpandedElement,
  HtmlChildren,
  InputElement,
  InsertNodeData,
  Instruction,
  RemoveInstructionData,
  UpdateEventInstructionData,
  Updater,
} from '../types';
import {  ChangeInstructions } from '../types'
import { compileChange } from './change/compile';
// import { debug } from '../debugging';

export const change = (
  source: HtmlChildren,
  target: HtmlChildren,
  parent: ExpandedElement,
) => {
  const instructions = compileChange(source, target, parent);

  // debug('instructions', instructions.map((instruction) => instruction.type))

  instructions.forEach((instruction) => {
    performInstruction(instruction);
  });
};

const performInstruction = (instruction: Instruction) => {
  const performer = performers[instruction.type] || noop;
  performer(instruction);
};

const noop: Updater = (_instruction: Instruction) => {};

const changeText: Updater = (instruction: Instruction) => {
  const { source, target } = instruction;
  source.nodeValue = target.textContent;
};

const removeNode: Updater = (instruction: Instruction) => {
  const { source } = instruction;
  source.remove();
  // debug('removeNode called on', source.nodeName)
};

const insertNode: Updater = (instruction: Instruction) => {
  const { target, data } = instruction;
  const { parent, index } = data as InsertNodeData;
  const sibling = parent.childNodes[index];
  if (!sibling) {
    parent.appendChild(target);
  } else if (sibling && sibling !== target) {
    parent.insertBefore(target, sibling);
  }
  // else case, sibling is target and so it is moving to the same place: no-op.
};

const replaceNode: Updater = (instruction: Instruction) => {
  const { source, target } = instruction;
  source.replaceWith(target);
  // debug('replaceNode called on', source.nodeName, 'with', target.nodeName)
  // debug('parent', source.parentElement)
};

const removeAttribute: Updater = (instruction: Instruction) => {
  const { source, data } = instruction;
  const { name, isSvg } = data as RemoveInstructionData;

  if (isSvg) {
    (source as SVGElement).removeAttributeNS(null, name)
  } else {
    (source as ExpandedElement).removeAttribute(name);
  }
};

const addAttribute: Updater = (instruction: Instruction) => {
  const { source, data } = instruction;
  const { name, value, isSvg } = data as AttributeInstructionData;

  if (isSvg) {
    (source as SVGElement).setAttributeNS(null, name, value)
  } else {
    (source as ExpandedElement).setAttribute(name, value);
  }
};

const updateAttribute: Updater = (instruction: Instruction) => {
  addAttribute(instruction);
};

const removeEvent: Updater = (instruction: Instruction) => {
  const data = instruction.data as EventInstructionData;
  const source = instruction.source as ExpandedElement;
  const { name, value } = data;
  (source as ExpandedElement).removeEventListener(name, value);
};

const addEvent: Updater = (instruction: Instruction) => {
  const data = instruction.data as EventInstructionData;
  const source = instruction.source as ExpandedElement;
  const { name, value } = data;
  (source as ExpandedElement).addEventListener(name, value);
};

const updateEvent: Updater = (instruction: Instruction) => {
  const data = instruction.data as UpdateEventInstructionData;
  const source = instruction.source as ExpandedElement;

  const { name, sourceValue, targetValue } = data;

  source.removeEventListener(name, sourceValue);
  source.addEventListener(name, targetValue);
};

const changeValue: Updater = (instruction: Instruction) => {
  const data = instruction.data as AttributeInstructionData;
  const source = instruction.source as InputElement;

  const { value } = data;

  source.value = value;
};

const performers = {
  [ChangeInstructions.changeText]: changeText,
  [ChangeInstructions.removeNode]: removeNode,
  [ChangeInstructions.insertNode]: insertNode,
  [ChangeInstructions.replaceNode]: replaceNode,
  [ChangeInstructions.removeAttribute]: removeAttribute,
  [ChangeInstructions.addAttribute]: addAttribute,
  [ChangeInstructions.updateAttribute]: updateAttribute,
  [ChangeInstructions.removeEvent]: removeEvent,
  [ChangeInstructions.addEvent]: addEvent,
  [ChangeInstructions.updateEvent]: updateEvent,
  [ChangeInstructions.changeValue]: changeValue,
};
