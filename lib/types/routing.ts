import { StaticTemplate } from '@lib/types/rendering'

export type RouteState = {
  host: string
  path: string
  query: Record<string, string>
}

export type RouteMatcher = (routeState: RouteState) => boolean
export type RenderedRoute = {
  Partial: StaticTemplate
  match: RouteMatcher
}
