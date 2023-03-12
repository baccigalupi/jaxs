import { Instructions } from '../../types.ts';
import { replaceNode } from '../changeInstructions.ts';

export const compileForElement = (source: Element, target: Element) => {
  const instructions: Instructions = [];

  if (source.tagName !== target.tagName) {
    instructions.push(
      replaceNode(source, target),
    );
  }

  return instructions;
};
