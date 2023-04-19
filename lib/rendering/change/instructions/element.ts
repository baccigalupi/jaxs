import { ExpandedElement } from '../../../types.ts';
import { replaceNode } from './generate.ts';
import { compileForAttributes } from './attributes.ts';
import { compileForEvents } from './events.ts';

export const compileForElement = (
  source: ExpandedElement,
  target: ExpandedElement,
) => {
  if (source.tagName !== target.tagName) {
    return [replaceNode(source, target)];
  } else {
    const attributeInstructions = compileForAttributes(source, target);
    const EventInstructionDatas = compileForEvents(source, target);

    return attributeInstructions.concat(EventInstructionDatas);
  }
};
