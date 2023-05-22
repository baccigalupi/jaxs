import { describe, expect, it, spy, xit } from '../../../devDeps.ts';
import { createAltTestDom, createTestDom } from '../../support/testDom.js';

import jsx from '../../../lib/jsx.js';
import { ChangeInstructions } from '../../../lib/types.ts';
import { compileChange } from '../../../lib/rendering/change/compile.ts';
import { compileForElement } from '../../../lib/rendering/change/instructions/element.ts';

const buildRenderKit = () => {
  return {
    document: createAltTestDom(),
    subscribe: spy(),
    publish: spy(),
    state: {},
  };
};

// add/replace/insert/move handled by children tests
describe('compileChange for a elements', () => {
  it('returns an empty instruction set if elements are both text and have the same value', () => {
    const sourceTemplate = (
      <>
        Hello
      </>
    );
    const targetTemplate = (
      <>
        Hello
      </>
    );

    const renderKit = buildRenderKit();
    const parent = renderKit.document.getElementById('app');
    const source = sourceTemplate.render(renderKit);
    const target = targetTemplate.render(renderKit);

    const instructions = compileChange(source, target, parent);

    expect(instructions).toEqual([]);
  });

  it('return a change text instruction if the elements are both text and have different values', () => {
    const sourceTemplate = (
      <>
        hello
      </>
    );
    const targetTemplate = (
      <>
        herro?
      </>
    );

    const renderKit = buildRenderKit();
    const parent = renderKit.document.getElementById('app');
    const source = sourceTemplate.render(renderKit);
    const target = targetTemplate.render(renderKit);

    const instructions = compileChange(source, target, parent);

    expect(instructions).toEqual([{
      source: source[0],
      target: target[0],
      type: ChangeInstructions.changeText,
      data: {},
    }]);
  });

  it(
    'returns attribute change instructions for different elements of the same tag type',
    () => {
      const sourceTemplate = (
        <div
          toBeRemoved='remove-me'
          toBeUpdated='update-me'
          dontUpdate='nope'
        />
      );

      const targetTemplate = (
        <div toBeUpdated='updated' dontUpdate='nope' toBeAdded='add-me' />
      );

      const renderKit = buildRenderKit();
      const parent = renderKit.document.getElementById('app');
      const source = sourceTemplate.render(renderKit);
      const target = targetTemplate.render(renderKit);

      const instructions = compileChange(source, target, parent);
      const [removeAttribute, addAttribute, updateAttribute] = instructions;

      expect(removeAttribute.data).toEqual({ name: 'toberemoved' });
      expect(addAttribute.data).toEqual({
        name: 'tobeadded',
        value: 'add-me',
      });
      expect(updateAttribute.data).toEqual({
        name: 'tobeupdated',
        value: 'updated',
      });
    },
  );

  it('returns change instructions for attributes when the target has more than the source', () => {
    const sourceTemplate = <p>Having a good day?</p>;
    const targetTemplate = (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    );

    const renderKit = buildRenderKit();
    const [source] = sourceTemplate.render(renderKit);
    const [target] = targetTemplate.render(renderKit);

    const instructions = compileForElement(source, target);
    expect(instructions.length).toEqual(1);
    const [instruction] = instructions;
    expect(instruction.type).toEqual(ChangeInstructions.addAttribute);
    expect(instruction.data).toEqual({ name: 'class', value: 'guest-content' });
  });

  it('returns change instructions for attributes when the source has more than the target', () => {
    const sourceTemplate = (
      <p class='guest-content'>Oh nothing to see! Move along ...</p>
    );
    const targetTemplate = <p>Having a good day?</p>;

    const renderKit = buildRenderKit();
    const [source] = sourceTemplate.render(renderKit);
    const [target] = targetTemplate.render(renderKit);

    const instructions = compileForElement(source, target);
    expect(instructions.length).toEqual(1);
    const [instruction] = instructions;
    expect(instruction.type).toEqual(ChangeInstructions.removeAttribute);
    expect(instruction.data).toEqual({ name: 'class' });
  });

  it('identifies value changes for inputs even without an attribute', () => {
    const sourceTemplate = <input />;
    const targetTemplate = <input />;

    const renderKit = buildRenderKit();
    const parent = renderKit.document.getElementById('app');
    const source = sourceTemplate.render(renderKit);
    source[0].value = 'hello';
    const target = targetTemplate.render(renderKit);
    target[0].value = 'hola';

    const instructions = compileChange(source, target, parent);

    expect(instructions.length).toEqual(1);
    const [instruction] = instructions;
    expect(instruction.data.value).toEqual('hola');
    expect(instruction.type).toEqual(ChangeInstructions.changeValue);
  });

  it(
    'returns an add event instruction when an event exists only on the target',
    () => {
      const sourceTemplate = <a>Go</a>;
      const targetTemplate = <a onClick='go-somewhere'>Go</a>;

      const renderKit = buildRenderKit();
      const parent = renderKit.document.getElementById('app');
      const source = sourceTemplate.render(renderKit);
      const target = targetTemplate.render(renderKit);

      const [instruction] = compileChange(source, target, parent);
      expect(instruction.type).toEqual(ChangeInstructions.addEvent);
      expect(instruction.data).toEqual({
        name: 'click',
        value: target[0].eventMaps['click'].listener,
      });
    },
  );

  it(
    'returns an update event instruction when an event value changes',
    () => {
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const targetTemplate = <a onClick='go-somewhere-else'>Go</a>;

      const renderKit = buildRenderKit();
      const parent = renderKit.document.getElementById('app');
      const source = sourceTemplate.render(renderKit);
      const target = targetTemplate.render(renderKit);

      const instructions = compileChange(source, target, parent);

      expect(instructions.length).toEqual(1);
      const [instruction] = instructions;
      expect(instruction.type).toEqual(ChangeInstructions.updateEvent);
      expect(instruction.data).toEqual({
        name: 'click',
        targetValue: target[0].eventMaps['click'].listener,
        sourceValue: source[0].eventMaps['click'].listener,
      });
    },
  );

  it(
    'returns an remove event instruction when the target doesn\'t have it',
    () => {
      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const targetTemplate = <a>Go</a>;

      const renderKit = buildRenderKit();
      const parent = renderKit.document.getElementById('app');
      const source = sourceTemplate.render(renderKit);
      const target = targetTemplate.render(renderKit);

      const [instruction] = compileChange(source, target, parent);
      expect(instruction.type).toEqual(ChangeInstructions.removeEvent);
      expect(instruction.data).toEqual({
        name: 'click',
        value: source[0].eventMaps['click'].listener,
      });
    },
  );

  it('returns changes instruction for both children and parent', () => {
    const sourceTemplate = <p class='invisible'>I am invisible</p>;
    const targetTemplate = <p class='visible'>I am visible</p>;

    const renderKit = buildRenderKit();
    const parent = renderKit.document.getElementById('app');
    const source = sourceTemplate.render(renderKit);
    const target = targetTemplate.render(renderKit);

    const instructions = compileChange(source, target, parent);

    expect(instructions.length).toEqual(2);
    const types = instructions.map((instruction) => instruction.type);
    expect(types).toEqual([
      ChangeInstructions.updateAttribute,
      ChangeInstructions.changeText,
    ]);
  });
});
