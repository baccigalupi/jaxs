import type { ExpandedElement, InputElement, Instructions } from '../../../types';
import { changeValue } from './generate';
import { compileForAttributes } from './attributes';
import { compileForEvents } from './events';

export const compileForElement = (
  source: ExpandedElement,
  target: ExpandedElement,
) => {
  const attributeInstructions = compileForAttributes(source, target);
  const eventInstructions = compileForEvents(source, target);
  const valueInstructions = compileForInputValue(source, target);

  return attributeInstructions
    .concat(eventInstructions)
    .concat(valueInstructions);
};

export const compileForSvg = (
  source: ExpandedElement,
  target: ExpandedElement,
) => {
  return compileForAttributes(source, target, true);
}

const compileForInputValue = (
  sourceElement: ExpandedElement,
  targetElement: ExpandedElement,
) => {
  const instructions = [] as Instructions;
  if (sourceElement.tagName !== 'INPUT') {
    return instructions;
  }

  const source = sourceElement as InputElement;
  const target = targetElement as InputElement;

  if (source.value !== target.value) {
    instructions.push(
      changeValue(
        source,
        target,
        { name: 'value', value: target.value },
      ),
    );
  }

  return instructions;
};
