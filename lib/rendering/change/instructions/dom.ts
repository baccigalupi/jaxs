import { Dom, ExpandedElement, Instructions } from '../../../types.ts';
import { replaceNode } from './generate.ts';
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
    return compileForElement(
      source as ExpandedElement,
      target as ExpandedElement,
    );
  } else if (source.nodeType === NodeTypes.TextNode) {
    return compileForText(
      source as Text,
      target as Text,
    );
  }

  return [] as Instructions;
};
