import { extractQueryParams } from './extract-query-params'
import { routeChangeEvent } from './events'
import { BusOptions } from '../types'

export const onLocationChange = (_: null, listenerOptions: BusOptions) => {
  const { state, publish, window } = listenerOptions
  const { host, pathname, search } = window.location
  const path = pathname
  const query = extractQueryParams(search)

  const route = {
    host,
    path,
    query,
  }

  state.store('route').update(route)

  // notify next in chain about location change ... though now that data events
  // are per store, maybe not necessary
  publish(routeChangeEvent, route)
}
