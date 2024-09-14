import { State } from '../state'
import type { RouteState } from '../types'

export const createRouteState = (state: State) => {
  state.createRecord<RouteState>('route', {
    host: '',
    path: '',
    query: {},
  })
}
