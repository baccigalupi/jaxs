import {
  AddNodeData,
  AttributeInstructionData,
  ChangeInstructions,
  EventInstructionData,
  ExpandedElement,
  HtmlChildren,
  InputElement,
  Instruction,
  RemoveInstructionData,
  UpdateEventInstructionData,
  Updater,
} from '../types.ts';
import { compileChange } from './change/compile.ts';

export const change = (
  source: HtmlChildren,
  target: HtmlChildren,
  parent: ExpandedElement,
) => {
  const instructions = compileChange(source, target, parent);

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
};

// TODO: Gah, how do I figure out what to do, just append I guess. But need a parent from the source
const addNode: Updater = (instruction: Instruction) => {
  const { target, data } = instruction;
  const { parent } = data as AddNodeData;
  parent.appendChild(target);
};

const replaceNode: Updater = (instruction: Instruction) => {
  const { source, target } = instruction;
  source.replaceWith(target);
};

const removeAttribute: Updater = (instruction: Instruction) => {
  const { source, data } = instruction;
  const { name } = data as RemoveInstructionData;

  (source as ExpandedElement).removeAttribute(name);
};

const addAttribute: Updater = (instruction: Instruction) => {
  const { source, data } = instruction;
  const { name, value } = data as AttributeInstructionData;

  (source as ExpandedElement).setAttribute(name, value);
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
  [ChangeInstructions.addNode]: addNode,
  [ChangeInstructions.replaceNode]: replaceNode,
  [ChangeInstructions.removeAttribute]: removeAttribute,
  [ChangeInstructions.addAttribute]: addAttribute,
  [ChangeInstructions.updateAttribute]: updateAttribute,
  [ChangeInstructions.removeEvent]: removeEvent,
  [ChangeInstructions.addEvent]: addEvent,
  [ChangeInstructions.updateEvent]: updateEvent,
  [ChangeInstructions.changeValue]: changeValue,
};
