import { Dom, Instructions } from '../../types.ts';
import { replaceNode } from '../changeInstructions.ts';

enum NodeTypes {
  ElementNode = 1,
  TextNode = 3,
}

export const compileForDom = (source: Dom, target: Dom) => {
  const instructions: Instructions = [];

  if (source.nodeType !== target.nodeType) {
    instructions.push(
      replaceNode(source, target),
    );
  } else if (source.nodeType === NodeTypes.ElementNode) {
    instructions.concat(
      // compileForElement(source, target)
      [],
    );
  } else if (source.nodeType === NodeTypes.TextNode) {
    instructions.concat(
      // compileForText(source, target);
      [],
    );
  }

  return instructions;
};
