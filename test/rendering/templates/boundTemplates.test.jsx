import { describe, expect, it, spy, xit } from '../../../devDeps.ts';
import { createTestDom, domToString } from '../../support/testDom.js';

import jsx from '../../../lib/jsx.js';
import { bind } from '../../../lib/rendering/templates/bound.ts';

describe('bound template', () => {
  it('renders with state and attributes', () => {
    const viewModel = (state) => ({ ...state.partial });
    const Template = ({ greeting, name }) => <h1>{greeting} {name}!</h1>;

    const state = { partial: { greeting: 'Hello' } };
    const publish = () => {};

    const BoundTemplate = bind(Template, viewModel);
    const template = <BoundTemplate name='Fred' />;

    const document = createTestDom();
    const [node] = template.render({ document, state, publish });

    expect(domToString(node)).toEqual('<h1>Hello Fred!</h1>');
  });
});
