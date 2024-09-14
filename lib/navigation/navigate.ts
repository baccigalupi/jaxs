import { BusOptions } from '../types'
import { locationChangeEvent } from './events'

export const navigate = (path: string, { publish, window }: BusOptions) => {
  window.history.pushState(null, '', path)
  publish(locationChangeEvent, null)
}
