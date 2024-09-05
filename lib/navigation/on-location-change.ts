import { extractQueryParams } from './extract-query-params'
import { routeChangeEvent } from './events'
import { JaxsBusOptions } from '../types'

export const onLocationChange = (_: null, listenerOptions: JaxsBusOptions) => {
  const { state, publish } = listenerOptions
  const { host, pathname, search } = window.location
  const path = pathname
  const query = extractQueryParams(search)

  state.store('route').update({
    host,
    path,
    query,
  })

  // notify next in chain about location change ... though now that data events
  // are per store, maybe not necessary
  publish(routeChangeEvent, listenerOptions)
}
