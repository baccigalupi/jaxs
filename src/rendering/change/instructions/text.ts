import { Instructions } from '../../../types';
import { changeText } from './generate';

export const compileForText = (source: Text, target: Text) => {
  if (source.textContent !== target.textContent) {
    return [changeText(source, target)];
  }

  return [] as Instructions;
};
