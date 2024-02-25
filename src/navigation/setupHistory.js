import { createRouteState } from './routeState'
export const locationChangeEvent = 'locationChange'
export const routeChangeEvent = 'routeChange'

export const extractQueryParams = (queryString) => {
  return queryString
    .replace(/^\?/, '')
    .split('&')
    .reduce((aggregate, pairString) => {
      if (!pairString) return aggregate

      const pair = pairString.split('=')
      aggregate[pair[0]] = pair[1]
      return aggregate
    }, {})
}

export const onLocationChange = (_payload, { publish, state, window }) => {
  const { host, pathname, search } = window.location
  const path = pathname
  const query = extractQueryParams(search)

  state.route.update({
    host,
    path,
    query
  })

  // subscribe for fetching data and other things
  publish(routeChangeEvent, { host, path, query })
}

export const setupHistory = (app) => {
  const { publish, subscribe, state, window } = app
  createRouteState(state)
  window.addEventListener('popstate', () => publish(locationChangeEvent))
  subscribe(locationChangeEvent, onLocationChange)
}
