import { describe, expect, it } from '../../devDeps.ts';
import { jsx } from '../../lib/jaxs.ts';

describe('Tag templates', () => {
  describe('key', () => {
    it('when key is provided it uses that', () => {
      const template = <a href='/foo' key='foo-link' id='something-foo'>Foo</a>;
      expect(template.key()).toEqual('foo-link');
    });

    it('uses the __source when provided', () => {
      const template = <a href='/foo' id='something-foo'>Foo</a>;
      template.attributes.__source = {
        fileName: '/this-test.jsx',
        lineNumber: 12,
        columnNumber: 24,
      };
      expect(template.key()).toEqual('/this-test.jsx:12:24');
    });

    it('uses the id if the key and type is no provided', () => {
      const template = <a href='/foo' id='something-foo'>Foo</a>;
      expect(template.key()).toEqual('a#something-foo');
    });

    it('uses the type/name when those are available', () => {
      const template = <input type='text' name='email' />;
      expect(template.key()).toEqual('input[type=text][name=email]');
    });
  });
});
