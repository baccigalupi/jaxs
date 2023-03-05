import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import { createTestDom } from '../support/testDom.js';

import jsx from '../../lib/jsx.js';
import { bind } from '../../lib/rendering/templates/bound.ts';
import { render } from '../../lib/rendering/templates/root.ts';

describe('root templates', () => {
  it('renders a bound template into the document, in the right place', () => {
    const Template = ({ greeting, userName }) => <h1>{greeting} {userName}!
    </h1>;
    const viewModel = (state) => ({ userName: state.currentUser.name });
    const BoundTemplate = bind(Template, viewModel);

    const document = createTestDom();
    const state = { currentUser: { name: 'Fred', age: 83 } };
    const publish = () => {};
    const subscribe = spy();
    const renderKit = { document, state, publish, subscribe };

    render(<BoundTemplate greeting='Hello' />, '#app', renderKit);

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Fred!</h1>',
    );
  });

  xit('re-renders a bound template', () => {
    const Template = ({ greeting, userName }) => (
      <h1>{greeting} {userName}!</h1>
    );
    const viewModel = (state) => ({ userName: state.currentUser.name });
    const BoundTemplate = bind(Template, viewModel);

    const document = createTestDom();
    const state = { currentUser: { name: 'Fred', age: 83 } };
    const publish = () => {};
    const subscribe = spy();
    const renderKit = { document, state, publish, subscribe };

    render(<BoundTemplate greeting='Hello' />, '#app', renderKit);

    const newState = { currentUser: { name: 'Janet', age: 83 } };
    publish('new-state', newState);

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hello Janet!</h1>',
    );
  });
});
