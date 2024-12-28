import { State } from '../state'
import type { RouteState } from '../types'

export const createRouteState = (state: State) => {
  state.create<RouteState>('route', {
    host: '',
    path: '',
    query: {},
  })
}
