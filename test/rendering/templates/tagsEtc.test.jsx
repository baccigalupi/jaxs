import { describe, expect, it, spy, xit } from '../../../devDeps.ts';
import { createTestDom, domToString } from '../../support/testDom.js';

import jsx from '../../../lib/jsx.js';

describe('Rendering static jsx', () => {
  it('can render a self-closing tag and no attribute', () => {
    const template = <img />;
    const document = createTestDom();

    const [node] = template.render({ document });

    expect(domToString(node)).toEqual('<img>');
  });

  it('can render a self closing tag with an attribute', () => {
    const template = <img src='/foo.jpg' />;
    const document = createTestDom();

    const [node] = template.render({ document });

    expect(domToString(node)).toEqual('<img src="/foo.jpg">');
  });

  it('can render a tag with a single child text element', () => {
    const template = <h1>Hello</h1>;

    const document = createTestDom();
    const [node] = template.render({ document });

    expect(domToString(node)).toEqual('<h1>Hello</h1>');
  });

  it('can render a tag with more complex children', () => {
    const greeting = 'kind';
    const template = (
      <h1>
        Hello <span class='bold'>{greeting}</span> world
      </h1>
    );
    const document = createTestDom();

    const [node] = template.render({ document });

    expect(domToString(node)).toEqual(
      '<h1>Hello <span class="bold">kind</span> world</h1>',
    );
  });

  it('publishes the dom even via name to the provided publish function', () => {
    const template = <button onClick='saveSomething'>Save</button>;

    const document = createTestDom();
    const publish = spy();
    const [node] = template.render({ document, publish });

    const clickEvent = new Event('click');
    node.dispatchEvent(clickEvent);

    expect(publish.calls[0].args).toEqual(['saveSomething', clickEvent]);
  });

  it('renders custom types', () => {
    const Link = (props) => {
      const { children, ...rest } = props;
      return <a {...rest} onClick='navigate'>{children}</a>;
    };
    const template = <Link href='/foo/bar'>Go get your foo!</Link>;

    const document = createTestDom();
    const publish = spy();
    const [node] = template.render({ document, publish });

    expect(domToString(node)).toEqual(
      '<a href="/foo/bar">Go get your foo!</a>',
    );

    const clickEvent = new Event('click');
    node.dispatchEvent(clickEvent);

    expect(publish.calls[0].args).toEqual(['navigate', clickEvent]);
  });

  it('renders deeply nested stuff', () => {
    const Link = (props) => {
      const { children, ...rest } = props;
      return <a {...rest} onClick='navigate'>{children}</a>;
    };

    const Page = ({ buttonText, children }) => {
      return (
        <>
          <Link href='/save-the-world'>
            <button>{buttonText}</button> Click here!
          </Link>
          <Link href='/home'>
            Home <img src='/my-image.jpg' />
          </Link>
          {children}
        </>
      );
    };

    const template = (
      <Page buttonText='Save!'>
        <p>Here is some stuff</p>
      </Page>
    );

    const document = createTestDom();
    const publish = spy();
    const nodes = template.render({ document, publish });

    expect(domToString(nodes)).toEqual(
      '<div><a href="/save-the-world"><button>Save!</button> Click here!</a><a href="/home">Home <img src="/my-image.jpg"></a><p>Here is some stuff</p></div>',
    );
  });

  it('renders without issue when a compent returns without rendering dom', () => {
    const Child = ({ visible }) => {
      if (!visible) return;
      return <h1>Hi! I'm visible.</h1>;
    };
    const Template = () => {
      return (
        <div id='wrapper'>
          <Child visible={false} />
        </div>
      );
    };

    const template = <Template />;

    const document = createTestDom();
    const publish = spy();
    const nodes = template.render({ document, publish });

    expect(domToString(nodes)).toContain('<div id="wrapper"></div>');
  });
});
