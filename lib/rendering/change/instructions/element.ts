import { ExpandedElement, InputElement, Instructions } from '../../../types.ts';
import { changeValue } from './generate.ts';
import { compileForAttributes } from './attributes.ts';
import { compileForEvents } from './events.ts';

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
