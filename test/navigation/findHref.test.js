import { describe, expect, it, xit } from '../../devDeps.ts';
import { createTestDom } from '../support/testDom.js';
import { findHref } from '../../lib/navigation/findHref.js';

describe('navigation findHref', () => {
  it('finds the href when it is the direct target node', () => {
    const document = createTestDom('<a id="find-me" href="/foo"></a>');
    const node = document.getElementById('find-me');
    expect(findHref(node)).toEqual('/foo');
  });

  it('finds the href at the nearest parent when not available on target node', () => {
    const document = createTestDom(
      '<a id="find-me" href="/foo"><ul><li id="click-me">Click me</li></ul></a>',
    );
    const node = document.getElementById('click-me');
    expect(findHref(node)).toEqual('/foo');
  });
});
