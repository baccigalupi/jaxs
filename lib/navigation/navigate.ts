import { ListenerKit } from '../types'
import { locationChangeEvent } from './events'

export const navigate = ({
  payload: path,
  publish,
  window,
}: ListenerKit<string>) => {
  window.history.pushState(null, '', path)
  publish(locationChangeEvent, null)
}
