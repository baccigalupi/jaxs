import type { Dom, ExpandedElement, Instructions } from '../../../types';
import { compileForElement } from './element';
import { compileForText } from './text';

enum NodeTypes {
  ElementNode = 1,
  TextNode = 3,
}

export const compileForNodeGenerator =
  (compileForCollection: any) => (source: Dom, target: Dom) => {
    let instructions = [] as Instructions;

    if (source.nodeType === NodeTypes.ElementNode) {
      const sourceElement = source as ExpandedElement;
      const targetElement = target as ExpandedElement;

      const baseInstructions = compileForElement(
        sourceElement,
        targetElement,
      );

      const childrenInstructions = compileForCollection(
        sourceElement.childNodes,
        targetElement.childNodes,
        sourceElement,
      );

      instructions = baseInstructions.concat(childrenInstructions);
    } else if (source.nodeType === NodeTypes.TextNode) {
      instructions = compileForText(
        source as Text,
        target as Text,
      );
    }

    return instructions;
  };
