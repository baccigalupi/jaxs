import {
  describe,
  it,
  expect,
} from '../../devDeps.ts';

import {
  createTestDom,
  domToString,
} from '../support/testDom.js';

import jsx from '../../lib/jsx.js';

describe("Rendering static jsx", () => {
  it("can render a self-closing tag and no attribute", () => {
    const template = <img />;
    const document = createTestDom();

    const [node] = template.render({ document });

    expect(domToString(node)).toEqual('<img>');
  });

  it('can render a self closing tag with an attribute', () => {
    const template = <img src="/foo.jpg" />;
    const document = createTestDom();

    const [node] = template.render({ document });

    expect(domToString(node)).toEqual('<img src="/foo.jpg">');
  });
});