import { JaxsBusOptions } from '../types'
import { locationChangeEvent } from './events'

export const navigate = (path: string, { publish, window }: JaxsBusOptions) => {
  window.history.pushState(null, '', path)
  publish(locationChangeEvent, null)
}
