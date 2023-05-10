import { describe, expect, it, spy, xit } from '../../devDeps.ts';

import { createApp } from '../../lib/app.ts';
import {
  extractQueryParams,
  onLocationChange,
} from '../../lib/navigation/setupHistory.js';

describe('navigation history related stuff', () => {
  it('correctly extracts out query params from the url', () => {
    const searchString = '?foo=bar&zardoz=weird';
    const queryParams = extractQueryParams(searchString);
    expect(queryParams).toEqual({
      foo: 'bar',
      zardoz: 'weird',
    });
  });

  it('gets location from the window and updates the store', () => {
    const app = createApp();
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird',
    };

    onLocationChange(null, app);

    const state = app.getState();
    expect(state).toEqual({
      route: {
        host: 'www.example.com',
        path: '/foo/bar',
        query: {
          zardoz: 'weird',
        },
      },
    });
  });

  it('gets location from the window and updates the store', () => {
    const app = createApp();
    app.publish = spy();
    window.location = {
      host: 'www.example.com',
      pathname: '/foo/bar',
      search: '?zardoz=weird',
    };

    onLocationChange(null, app);

    expect(app.publish.calls[0].args[0]).toEqual('routeChange');
    expect(app.publish.calls[0].args[1]).toEqual({
      host: 'www.example.com',
      path: '/foo/bar',
      query: { zardoz: 'weird' },
    });
  });
});
