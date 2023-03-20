import { Instructions } from '../../../types.ts';
import { changeText } from './generate.ts';

export const compileForText = (source: Text, target: Text) => {
  if (source.textContent !== target.textContent) {
    return [changeText(source, target)];
  }

  return [] as Instructions;
};
