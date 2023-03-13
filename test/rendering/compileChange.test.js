import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import { createAltTestDom, createTestDom } from '../support/testDom.js';

import { ChangeInstructions } from '../../lib/types.ts';
import { compileChange } from '../../lib/rendering/compileChange.ts';

describe('compiledChange for a dom tree', () => {
  it('returns a replace node instruction if the top level elements are not both the same node type', () => {
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

  it('returns a replace node instruction if the top level elements are not both elements, but of different tag types', () => {
    const document = createTestDom();
    const source = document.createElement('h1');
    const target = document.createElement('div');

    const instructions = compileChange(source, target);

    expect(instructions).toEqual([{
      source,
      target,
      type: ChangeInstructions.replaceNode,
    }]);
  });

  it('returns an empty instruction set if elements are both text and have the same value', () => {
    const document = createTestDom();
    const source = document.createTextNode('hello');
    const target = document.createTextNode('hello');

    const instructions = compileChange(source, target);

    expect(instructions).toEqual([]);
  });

  it('return a change text instruction if the elements are both text and have different values', () => {
    const document = createTestDom();
    const source = document.createTextNode('hello');
    const target = document.createTextNode('herro?');

    const instructions = compileChange(source, target);

    expect(instructions).toEqual([{
      source,
      target,
      type: ChangeInstructions.changeText,
    }]);
  });

  it(
    'returns attribute change instructions for different elements of the same tag type',
    () => {
      const document = createAltTestDom(); // have to use for Node.js JSDOM
      // since the deno dom thing is broke around attribute iteration.

      const source = document.createElement('div');
      source.setAttribute('to-be-removed', 'remove-me');
      source.setAttribute('to-be-updated', 'update-me');
      source.setAttribute('dont-update', 'nope');

      const target = document.createElement('div');
      target.setAttribute('to-be-updated', 'updated');
      target.setAttribute('to-be-added', 'add-me');
      target.setAttribute('dont-update', 'nope');

      const instructions = compileChange(source, target);

      const removeInstructions = instructions.filter(
        (instruction) =>
          instruction.type === ChangeInstructions.removeAttribute,
      );
      expect(removeInstructions.length).toEqual(1);
      expect(removeInstructions[0].data).toEqual({ name: 'to-be-removed' });

      const updateInstructions = instructions.filter(
        (instruction) =>
          instruction.type === ChangeInstructions.updateAttribute,
      );
      expect(updateInstructions.length).toEqual(1);
      expect(updateInstructions[0].data).toEqual({
        name: 'to-be-updated',
        value: 'updated',
      });

      const addInstructions = instructions.filter(
        (instruction) => instruction.type === ChangeInstructions.addAttribute,
      );
      expect(addInstructions.length).toEqual(1);
      expect(addInstructions[0].data).toEqual({
        name: 'to-be-added',
        value: 'add-me',
      });
    },
  );
});
