import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import { createTestDom, domToString } from '../support/testDom.js';

import jsx from '../../lib/jsx.js';
import { bind } from '../../lib/rendering/templates/bound.ts';
import { render } from '../../lib/rendering/templates/root.js';

describe('root templates', () => {
  it('renders a bound template into the document, in the right place', () => {
    const Template = ({ greeting, userName }) => (
      <h1>{greeting} {userName}!</h1>
    );
    const viewModel = (state) => ({ userName: state.currentUser.name });
    const BoundTemplate = bind(Template, viewModel);

    const document = createTestDom();
    const state = { currentUser: { name: 'Fred', age: 83 } };
    const publish = () => {};
    const renderKit = { document, state, publish };

    render(<BoundTemplate greeting="Hello" />, '#app', renderKit);

    expect(document.getElementById('app').innerHTML).toEqual('<h1>Hello Fred!</h1>');
  });
});