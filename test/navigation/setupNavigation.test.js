import { beforeEach, describe, expect, it, spy, xit } from '../../devDeps.ts';

import { createApp } from '../../lib/app.ts';

describe('navigation related events', () => {
  const setupWindow = (pushSpy) => {
    window.history = {
      pushState: pushSpy,
    };
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird',
    };
  };

  it('the app sets up everything for link navigation from the dom', () => {
    const pushSpy = spy();
    setupWindow(pushSpy);

    const app = createApp();
    const locationChangeListener = spy();
    app.subscribe('locationChange', locationChangeListener);

    const event = {
      target: { getAttribute: () => '/foo/bar' },
      preventDefault: () => {},
    };
    app.publish('goToHref', event);

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

  it('provides a way to programmatically navigate via publishing an event', () => {
    const pushSpy = spy();
    setupWindow(pushSpy);

    const app = createApp();
    const locationChangeListener = spy();
    app.subscribe('locationChange', locationChangeListener);

    app.publish('navigate', '/my/path');

    expect(locationChangeListener.calls.length).toEqual(1);
    expect(pushSpy.calls.length).toEqual(1);
    expect(pushSpy.calls[0].args[2]).toEqual('/my/path');
  });
});
