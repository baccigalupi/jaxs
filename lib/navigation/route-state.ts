import { JaxsState } from '../state'

export type RouteState = {
  host: string
  path: string
  query: Record<string, string>
}
export const createRouteState = (state: JaxsState) => {
  state.createRecord<RouteState>('route', {
    host: '',
    path: '',
    query: {},
  })
}
