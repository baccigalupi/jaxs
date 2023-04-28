import { describe, expect, it, spy, xit } from '../../../devDeps.ts';
import {
  createAltTestDom,
  createTestDom,
  domToString,
} from '../../support/testDom.js';

import jsx from '../../../lib/jsx.js';
import { bind } from '../../../lib/rendering/templates/bound.ts';
import { render } from '../../../lib/rendering/templates/root.ts';
import { createBus } from '../../../lib/messageBus.ts';

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

  it(
    'updates the dom for the root when a state change event is published',
    () => {
      const Template = ({ greeting, userName }) => (
        <h1>{greeting} {userName}!</h1>
      );
      const viewModel = (state) => ({ userName: state.currentUser.name });
      const BoundTemplate = bind(Template, viewModel);

      const document = createAltTestDom();
      const state = { currentUser: { name: 'Fred', age: 83 } };
      const { publish, subscribe } = createBus();
      const renderKit = { document, state, publish, subscribe };

      render(<BoundTemplate greeting='Hello' />, '#app', renderKit);

      const newState = { currentUser: { name: 'Janet', age: 83 } };
      publish('stateChange', newState);

      expect(document.getElementById('app').innerHTML).toEqual(
        '<h1>Hello Janet!</h1>',
      );
    },
  );

  it('clears the view on re-rerender when there is a no-op', () => {
    const Template = ({ visible }) => {
      if (!visible) return;
      return <h1>Hi! I'm visible.</h1>;
    };
    const viewModel = (state) => state;
    const BoundTemplate = bind(Template, viewModel);

    const document = createAltTestDom();
    const state = { visible: true };
    const { publish, subscribe } = createBus();
    const renderKit = { document, state, publish, subscribe };

    render(<BoundTemplate />, '#app', renderKit);

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>',
    );

    const newState = { visible: false };
    publish('stateChange', newState);

    expect(document.getElementById('app').innerHTML).toEqual(
      '',
    );
  });

  it('re-renders appropirately when the previous render is a no-op', () => {
    const Template = ({ visible }) => {
      if (!visible) return;
      return <h1>Hi! I'm visible.</h1>;
    };
    const viewModel = (state) => state;
    const BoundTemplate = bind(Template, viewModel);

    const document = createAltTestDom();
    const state = { visible: false };
    const { publish, subscribe } = createBus();
    const renderKit = { document, state, publish, subscribe };

    render(<BoundTemplate />, '#app', renderKit);

    expect(document.getElementById('app').innerHTML).toEqual(
      '',
    );

    const newState = { visible: true };
    publish('stateChange', newState);

    expect(document.getElementById('app').innerHTML).toEqual(
      '<h1>Hi! I\'m visible.</h1>',
    );
  });
});
