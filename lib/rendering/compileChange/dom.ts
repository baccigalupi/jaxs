import { Dom, Instructions } from '../../types.ts';
import { replaceNode } from '../changeInstructions.ts';
import { compileForElement } from './element.ts';

enum NodeTypes {
  ElementNode = 1,
  TextNode = 3,
}

export const compileForDom = (source: Dom, target: Dom) => {
  let instructions: Instructions = [];

  if (source.nodeType !== target.nodeType) {
    instructions.push(
      replaceNode(source, target),
    );
  } else if (source.nodeType === NodeTypes.ElementNode) {
    const elementInstructions = compileForElement(
      source as Element,
      target as Element,
    );
    instructions = instructions.concat(elementInstructions);
  } else if (source.nodeType === NodeTypes.TextNode) {
    instructions = instructions.concat(
      // compileForText(source, target);
      [],
    );
  }

  return instructions;
};
