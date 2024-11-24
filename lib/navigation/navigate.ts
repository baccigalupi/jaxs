import { ListenerKit } from '../types'
import { locationChangeEvent } from './events'

export const navigate = (path: string, { publish, window }: ListenerKit) => {
  window.history.pushState(null, '', path)
  publish(locationChangeEvent, null)
}
