import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import { createTestDom } from '../support/testDom.js';

import { ChangeInstructions } from '../../lib/types.ts';
import { compileChange } from '../../lib/rendering/compileChange.ts';

describe('compiledChange for a dom tree', () => {
  it('returns an array with a change instruction if the top level elements are not both the same node type', () => {
    const document = createTestDom();
    const textNode = document.createTextNode('hello');
    const elementNode = document.createElement('h1', {}, 'hello');
    const instructions = compileChange(textNode, elementNode);

    expect(instructions).toEqual([{
      source: textNode,
      target: elementNode,
      type: ChangeInstructions.replaceNode,
    }]);
  });
});
