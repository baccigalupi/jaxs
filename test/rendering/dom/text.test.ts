import { expect, describe, it } from 'vitest'
import { createTextNode } from '../../../lib/rendering/dom/text'
import { createTestDom } from '../../support/test-dom';


describe('createTextNode', () => {
  it('creates it correctly', () => {
    const document = createTestDom();
    
    const text = createTextNode('Hello world!', document)

    expect(text.wholeText).toEqual('Hello world!')
  });
});