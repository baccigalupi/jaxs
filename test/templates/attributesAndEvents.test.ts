import { describe, expect, it } from '../../devDeps.ts';

import {
  separateAttrsAndEvents,
} from '../../lib/rendering/attributesAndEvents.ts';

describe('templates, attributes and events', () => {
  it('separateAttrsAndEvents returns separate hashes', () => {
    const combined = {
      onClick: 'submit-something',
      class: 'bg-white text-black',
    };

    const { events, attributes } = separateAttrsAndEvents(combined);

    expect(events).toEqual({ click: 'submit-something' });
    expect(attributes).toEqual({ class: 'bg-white text-black' });
  });
});
