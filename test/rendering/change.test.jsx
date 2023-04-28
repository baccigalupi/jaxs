import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import {
  createAltTestDom,
  createTestDom,
  domToString,
} from '../support/testDom.js';

import jsx from '../../lib/jsx.js';
import { ChangeInstructions } from '../../lib/types.ts';
import { change } from '../../lib/rendering/change.ts';

const addEmptyEventMaps = (element) => {
  element.eventMaps = {};
  return element;
};

describe('compiledChange for a dom tree', () => {
  it('replace top level text element with a tag', () => {
    const document = createTestDom();
    const parent = document.getElementById('app');

    const textNode = document.createTextNode('hello');
    parent.appendChild(textNode);
    const elementNode = document.createElement('h1', {}, 'hello');

    change([textNode], [elementNode], parent);

    expect(parent.childNodes.length).toEqual(1);
    expect(parent.childNodes[0].nodeName).toEqual('H1');
  });

  it('replace node of different tag types', () => {
    const document = createTestDom();
    const parent = document.getElementById('app');

    const source = addEmptyEventMaps(document.createElement('h1'));
    parent.appendChild(source);
    const target = addEmptyEventMaps(document.createElement('div'));

    change([source], [target], parent);

    expect(parent.childNodes.length).toEqual(1);
    expect(parent.childNodes[0].nodeName).toEqual('DIV');
  });

  it('does nothing for identical tags', () => {
    const document = createTestDom();
    const parent = document.getElementById('app');

    const source = addEmptyEventMaps(document.createTextNode('hello'));
    parent.appendChild(source);
    const target = addEmptyEventMaps(document.createTextNode('hello'));

    change([source], [target], parent);

    expect(parent.childNodes[0]).toEqual(source);
  });

  it(
    'changes the text content of the text node in place',
    () => {
      const document = createTestDom();
      const parent = document.getElementById('app');

      const source = addEmptyEventMaps(document.createTextNode('hello'));
      const target = addEmptyEventMaps(document.createTextNode('herro?'));
      parent.appendChild(source);

      change([source], [target], parent);

      expect(parent.childNodes[0]).toEqual(source);
      expect(parent.childNodes[0].textContent).toEqual('herro?');
    },
  );

  it('changes the value of an input', () => {
    const document = createTestDom(); // have to use for Node.js JSDOM
    // since the deno dom thing is broke around attribute iteration.
    const parent = document.getElementById('app');
    const source = addEmptyEventMaps(document.createElement('input'));
    source.value = 'hello';
    const target = addEmptyEventMaps(document.createElement('input'));
    target.value = 'hola';
    parent.appendChild(source);

    change([source], [target], parent);

    expect(source.value).toEqual('hola');
  });

  it(
    'changes attributes in place when the same tag type',
    () => {
      const document = createAltTestDom(); // have to use for Node.js JSDOM
      // since the deno dom thing is broke around attribute iteration.
      const parent = document.getElementById('app');

      const source = addEmptyEventMaps(document.createElement('div'));
      source.setAttribute('to-be-removed', 'remove-me');
      source.setAttribute('to-be-updated', 'update-me');
      source.setAttribute('dont-update', 'nope');

      const target = addEmptyEventMaps(document.createElement('div'));
      target.setAttribute('to-be-updated', 'updated');
      target.setAttribute('to-be-added', 'add-me');
      target.setAttribute('dont-update', 'nope');

      parent.appendChild(source);

      change([source], [target], parent);

      expect(source.attributes.getNamedItem('to-be-removed')).toEqual(
        null,
      );
      expect(source.attributes.getNamedItem('to-be-updated').value).toEqual(
        'updated',
      );
      expect(source.attributes.getNamedItem('dont-update').value).toEqual(
        'nope',
      );
      expect(source.attributes.getNamedItem('to-be-added').value).toEqual(
        'add-me',
      );
    },
  );

  it(
    'adds as event when an event exists only on the target',
    () => {
      const document = createTestDom();
      const parent = document.getElementById('app');
      const publish = spy();
      const renderKit = { document, publish };

      const sourceTemplate = <a>Go</a>;
      const source = sourceTemplate.render(renderKit);

      const targetTemplate = <a onClick='go-somewhere'>Go</a>;
      const target = targetTemplate.render(renderKit);

      const [sourceNode] = source;
      parent.appendChild(sourceNode);

      change(source, target, parent);

      const clickEvent = new Event('click');
      sourceNode.dispatchEvent(clickEvent);

      expect(publish.calls[0].args).toEqual(['go-somewhere', clickEvent]);
    },
  );

  it(
    'updates an event when a new bus event value is provided',
    () => {
      const document = createTestDom();
      const parent = document.getElementById('app');
      const publish = spy();
      const renderKit = { document, publish };

      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const source = sourceTemplate.render(renderKit);

      const targetTemplate = <a onClick='go-somewhere-else'>Go</a>;
      const target = targetTemplate.render(renderKit);

      const [sourceNode] = source;
      parent.appendChild(sourceNode);

      change(source, target, parent);

      const clickEvent = new Event('click');
      sourceNode.dispatchEvent(clickEvent);

      expect(publish.calls.length).toEqual(1);
      expect(publish.calls[0].args).toEqual(['go-somewhere-else', clickEvent]);
    },
  );

  it(
    'removes an event handler when the target removes the event',
    () => {
      const document = createTestDom();
      const parent = document.getElementById('app');
      const publish = spy();
      const renderKit = { document, publish };

      const sourceTemplate = <a onClick='go-somewhere'>Go</a>;
      const source = sourceTemplate.render(renderKit);

      const targetTemplate = <a>Go</a>;
      const target = targetTemplate.render(renderKit);

      const [sourceNode] = source;
      parent.appendChild(sourceNode);

      change(source, target, parent);

      const clickEvent = new Event('click');
      sourceNode.dispatchEvent(clickEvent);

      expect(publish.calls.length).toEqual(0);
    },
  );

  it('changes dom in parent and child', () => {
    const document = createAltTestDom();
    const parent = document.getElementById('app');
    const publish = () => {};
    const renderKit = { document, publish };

    const sourceTemplate = <p class='invisible'>I am invisible</p>;
    const source = sourceTemplate.render(renderKit);

    const targetTemplate = <p class='visible'>I am visible</p>;
    const target = targetTemplate.render(renderKit);

    const [sourceNode] = source;
    parent.appendChild(sourceNode);

    change(source, target, parent);

    expect(sourceNode.attributes.getNamedItem('class').value).toEqual(
      'visible',
    );
    expect(sourceNode.textContent).toEqual('I am visible');
  });

  it(
    'updates the dom in deeply nested recursiion',
    () => {
      const document = createAltTestDom();
      const parent = document.getElementById('app');
      const publish = spy();
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

      const [sourceNode] = source;
      parent.appendChild(sourceNode);

      change(source, target, parent);

      expect(domToString(sourceNode)).toEqual(
        '<div class="page"><a>Close</a><div class="modal open"><p>I am open!</p></div></div>',
      );
    },
  );

  it('adds a element in the right place', () => {
    const document = createTestDom();
    const parent = document.getElementById('app');
    const publish = spy();
    const renderKit = { document, publish };

    const sourceTemplate = (
      <ol>
        <li>one</li>
        <li>... more</li>
      </ol>
    );
    const source = sourceTemplate.render(renderKit);

    const targetTemplate = (
      <ol>
        <li>one</li>
        <li>two</li>
        <li>... more</li>
      </ol>
    );
    const target = targetTemplate.render(renderKit);

    const [sourceNode] = source;
    parent.appendChild(sourceNode);

    change(source, target, parent);

    expect(sourceNode.childNodes.length).toEqual(3);
    const contents = Array.from(sourceNode.childNodes)
      .map((node) => node.textContent);
    expect(contents).toEqual([
      'one',
      'two',
      '... more',
    ]);
  });
});
