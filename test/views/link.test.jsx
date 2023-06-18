import { describe, expect, it, spy, xit } from '../../devDeps.ts';
import { createTestDom, domToString } from '../support/testDom.js';

import { Link } from '../../lib/views/link.jsx';
import jsx from '../../lib/jsx.js';
import { createBus } from '../../lib/messageBus.ts';

describe('Link', () => {
  it('renders an archor tag passing along all the attributes', () => {
    const document = createTestDom();
    const publish = spy();

    const template = (
      <Link href='/foo' class='foo-class'>
        <p>Go to foo now!</p>
      </Link>
    );
    const dom = template.render({ document, publish });

    expect(domToString(dom)).toContain(
      '<a href="/foo" class="foo-class"><p>Go to foo now!</p></a>',
    );
  });

  it('adds onClick handling to navigate to the href', () => {
    const document = createTestDom();
    const publish = spy();

    const template = (
      <Link href='/foo' class='foo-class'>
        <p>Go to foo now!</p>
      </Link>
    );
    const [link] = template.render({ document, publish });

    const clickEvent = new Event('click');
    link.dispatchEvent(clickEvent);

    expect(publish.calls[0].args[0]).toEqual('goToHref');
    expect(publish.calls[0].args[1]).toEqual(clickEvent);
  });
});
