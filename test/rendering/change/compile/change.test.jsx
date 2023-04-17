import { describe, expect, it, spy, xit } from '../../../../devDeps.ts';
import { createAltTestDom, createTestDom } from '../../../support/testDom.js';

import jsx from '../../../../lib/jsx.js';
import { ChangeInstructions } from '../../../../lib/types.ts';
import { compileChange } from '../../../../lib/rendering/change/compile.ts';

const addEmptyEventMaps = (element) => {
  element.eventMaps = {};
  return element;
};

describe('compiledChange for a dom tree', () => {
  it('returns a replace node instruction if the top level elements are not both the same node type', () => {
    const document = createTestDom();
    const textNode = document.createTextNode('hello');
    const elementNode = document.createElement('h1', {}, 'hello');

    const instructions = compileChange([textNode], [elementNode]);

    expect(instructions).toEqual([{
      source: textNode,
      target: elementNode,
      type: ChangeInstructions.replaceNode,
    }]);
  });

  it('returns a replace node instruction if the top level elements are not both elements, but of different tag types', () => {
    const document = createTestDom();
    const source = addEmptyEventMaps(document.createElement('h1'));
    const target = addEmptyEventMaps(document.createElement('div'));

    const instructions = compileChange([source], [target]);

    expect(instructions).toEqual([{
      source,
      target,
      type: ChangeInstructions.replaceNode,
    }]);
  });

  it('returns an empty instruction set if elements are both text and have the same value', () => {
    const document = createTestDom();
    const source = addEmptyEventMaps(document.createTextNode('hello'));
    const target = addEmptyEventMaps(document.createTextNode('hello'));

    const instructions = compileChange([source], [target]);

    expect(instructions).toEqual([]);
  });

  it('return a change text instruction if the elements are both text and have different values', () => {
    const document = createTestDom();
    const source = addEmptyEventMaps(document.createTextNode('hello'));
    const target = addEmptyEventMaps(document.createTextNode('herro?'));

    const instructions = compileChange([source], [target]);

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

      const source = addEmptyEventMaps(document.createElement('div'));
      source.setAttribute('to-be-removed', 'remove-me');
      source.setAttribute('to-be-updated', 'update-me');
      source.setAttribute('dont-update', 'nope');

      const target = addEmptyEventMaps(document.createElement('div'));
      target.setAttribute('to-be-updated', 'updated');
      target.setAttribute('to-be-added', 'add-me');
      target.setAttribute('dont-update', 'nope');

      const instructions = compileChange([source], [target]);

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

  it(
    'returns an add event instruction when an event exists only on the target',
    () => {
      const document = createTestDom();
      const publish = () => {};
      const renderKit = { document, publish };
      const sourceTemplate = <a>Go</a>;
      const [source] = sourceTemplate.render(renderKit);
      const targetTemplate = <a onClick='go-somewhere'>Go</a>;
      const [target] = targetTemplate.render(renderKit);

      const [instruction] = compileChange([source], [target]);
      expect(instruction.type).toEqual(ChangeInstructions.addEvent);
      expect(instruction.data).toEqual({
        name: 'click',
        value: target.eventMaps['click'].listener,
      });
    },
  );

  it(
    'returns an update event instruction when an event value changes',
    () => {
      const document = createTestDom();
      const publish = () => {};
      const renderKit = { document, publish };
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const source = sourceTemplate.render(renderKit);
      const targetTemplate = <a onClick='go-somewhere-else'>Go</a>;
      const target = targetTemplate.render(renderKit);

      const instructions = compileChange(source, target);

      expect(instructions.length).toEqual(1);

      const [instruction] = instructions;

      expect(instruction.type).toEqual(ChangeInstructions.updateEvent);
      expect(instruction.data).toEqual({
        name: 'click',
        value: target[0].eventMaps['click'].listener,
      });
    },
  );

  it(
    'returns an remove event instruction when the target doesn\'t have it',
    () => {
      const document = createTestDom();
      const publish = () => {};
      const renderKit = { document, publish };
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const source = sourceTemplate.render(renderKit);
      const targetTemplate = <a>Go</a>;
      const target = targetTemplate.render(renderKit);

      const [instruction] = compileChange(source, target);
      expect(instruction.type).toEqual(ChangeInstructions.removeEvent);
      expect(instruction.data).toEqual({
        name: 'click',
      });
    },
  );

  it('returns changes instruction for both children and parent', () => {
    const document = createAltTestDom();
    const publish = () => {};
    const renderKit = { document, publish };

    const sourceTemplate = <p class='invisible'>I am invisible</p>;
    const source = sourceTemplate.render(renderKit);

    const targetTemplate = <p class='visible'>I am visible</p>;
    const target = targetTemplate.render(renderKit);

    const instructions = compileChange(source, target);

    expect(instructions.length).toEqual(2);
    const types = instructions.map((instruction) => instruction.type);
    expect(types).toEqual([
      ChangeInstructions.updateAttribute,
      ChangeInstructions.changeText,
    ]);
  });

  it(
    'returns change instructions for deeply nested recursive children!',
    () => {
      const document = createAltTestDom();
      const publish = () => {};
      const renderKit = { document, publish };

      const sourceTemplate = (
        <div class='page'>
          <a onClick='open'>Open</a>
          <div class='modal closed'>
            <p>I am invisible</p>
          </div>
        </div>
      );
      const source = sourceTemplate.render(renderKit);

      const targetTemplate = (
        <div class='page'>
          <a onClick='close'>Close</a>
          <div class='modal open'>
            <p>I am open!</p>
          </div>
        </div>
      );
      const target = targetTemplate.render(renderKit);

      const instructions = compileChange(source, target);

      expect(instructions.length).toEqual(4);
      const types = instructions.map((instruction) => instruction.type);
      expect(types).toEqual([
        ChangeInstructions.updateEvent,
        ChangeInstructions.changeText,
        ChangeInstructions.updateAttribute,
        ChangeInstructions.changeText,
      ]);
    },
  );
});
