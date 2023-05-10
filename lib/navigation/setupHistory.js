export const locationChangeEvent = 'locationChange';
export const routeChangeEvent = 'routeChange';

export const extractQueryParams = (queryString) => {
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .reduce((aggregate, pairString) => {
      if (!pairString) return aggregate;

      const pair = pairString.split('=');
      aggregate[pair[0]] = pair[1];
      return aggregate;
    }, {});
};

export const onLocationChange = (_payload, { publish, setState }) => {
  const { host, pathname, search } = window.location;
  const path = pathname;
  const query = extractQueryParams(search);

  setState((state) => {
    if (!state.route) {
      state.route = {};
    }
    state.route.host = host;
    state.route.path = path;
    state.route.query = query;
  }); // triggers re-render for routing views

  // subscribe for fetching data and other things
  publish(routeChangeEvent, { host, path, query });
};

export const setupHistory = (app) => {
  const { publish, subscribe } = app;
  // deno-lint-ignore no-window-prefix
  window.addEventListener('popstate', () => publish(locationChangeEvent));
  subscribe(locationChangeEvent, onLocationChange);
};
