import { describe, expect, it, spy, xit } from '../../devDeps.ts';

import { createApp } from '../../lib/app.ts';

describe('navigation related events', () => {
  it('the app sets up everything for link navigation', () => {
    const pushSpy = spy();
    window.history = {
      pushState: pushSpy,
    };
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird',
    };
    const app = createApp();
    const locationChangeListener = spy();
    app.subscribe('locationChange', locationChangeListener);
    const event = {
      target: { getAttribute: () => '/foo/bar' },
      preventDefault: () => {},
    };

    app.publish('navigate', event);

    expect(locationChangeListener.calls.length).toEqual(1);
    expect(pushSpy.calls.length).toEqual(1);
    expect(pushSpy.calls[0].args[2]).toEqual('/foo/bar');
    expect(app.getState()).toEqual({
      route: {
        host: 'www.example.com',
        path: '/foo/bar',
        query: {
          zardoz: 'weird',
        },
      },
    });
  });
});
