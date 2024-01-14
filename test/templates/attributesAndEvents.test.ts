import { describe, expect, test } from 'bun:test'

import {
  separateAttrsAndEvents,
} from '../../src/rendering/dom/attributesAndEvents';

describe('templates, attributes and events', () => {
  test('separateAttrsAndEvents returns separate hashes', () => {
    const combined = {
      onClick: 'submit-something',
      class: 'bg-white text-black',
    };

    const { events, attributes } = separateAttrsAndEvents(combined);

    expect(events).toEqual({ click: 'submit-something' });
    expect(attributes).toEqual({ class: 'bg-white text-black' });
  });
});
