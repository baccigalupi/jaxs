import { Dom, Instructions } from '../types.ts';
import { compileForDom } from './compileChange/dom.ts';

export const compileChange = (source: Dom, target: Dom): Instructions => {
  return compileForDom(source, target);
};
