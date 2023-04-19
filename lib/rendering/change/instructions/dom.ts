import {
  Dom,
  ExpandedElement,
  HtmlChildren,
  Instructions,
} from '../../../types.ts';
import { addNode, removeNode, replaceNode } from './generate.ts';
import { compileForElement } from './element.ts';
import { compileForText } from './text.ts';

enum NodeTypes {
  ElementNode = 1,
  TextNode = 3,
}

export const compileForDom = (source: Dom, target: Dom) => {
  if (source.nodeType !== target.nodeType) {
    return [replaceNode(source, target)];
  } else if (source.nodeType === NodeTypes.ElementNode) {
    const sourceElement = source as ExpandedElement;
    const targetElement = target as ExpandedElement;

    const baseInstructions = compileForElement(
      sourceElement,
      targetElement,
    );
    // NOTE: one or both of the DOM libraries don't have a children
    // attribute/method.
    const childrenInstructions = compileForCollection(
      sourceElement.childNodes,
      targetElement.childNodes,
      sourceElement,
    );

    return baseInstructions.concat(childrenInstructions);
  } else if (source.nodeType === NodeTypes.TextNode) {
    return compileForText(
      source as Text,
      target as Text,
    );
  }

  return [] as Instructions;
};

export const compileForCollection = (
  sourceList: HtmlChildren,
  targetList: HtmlChildren,
  parent: ExpandedElement,
) => {
  const largerLength = calculateLargerLength(sourceList, targetList);
  let instructions = [] as Instructions;

  let index;
  for (index = 0; index < largerLength; index++) {
    const sourceChild = sourceList[index] as ExpandedElement;
    const targetChild = targetList[index] as ExpandedElement;

    if (!sourceChild) {
      instructions.push(addNode(
        targetChild,
        { parent },
      ));
    } else if (!targetChild) {
      instructions.push(removeNode(sourceChild));
    } else {
      instructions = instructions.concat(compileForDom(
        sourceChild,
        targetChild,
      ));
    }
  }

  return instructions;
};

interface Lengthy {
  length: number;
}
const calculateLargerLength = (source: Lengthy, target: Lengthy) => {
  if (source.length >= target.length) return source.length;
  return target.length;
};
