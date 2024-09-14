import { JaxsState } from '../state'
import type { RouteState } from '../types'

export const createRouteState = (state: JaxsState) => {
  state.createRecord<RouteState>('route', {
    host: '',
    path: '',
    query: {},
  })
}
