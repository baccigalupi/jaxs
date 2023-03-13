import { replaceNode } from '../changeInstructions.ts';
import { compileForAttributes } from './attributes.js';

export const compileForElement = (source: Element, target: Element) => {
  if (source.tagName !== target.tagName) {
    return [replaceNode(source, target)];
  } else {
    return compileForAttributes(source, target);
  }
};
