import { RenderedRoute, RouteMatcher } from '../types'

export const exactPathMatch =
  (exactPath: string): RouteMatcher =>
  ({ path }) =>
    path === exactPath

export const catchAll: RouteMatcher = () => true

export const buildRouter =
  (pages: RenderedRoute[]) =>
  ({ route }) => {
    const match = pages.find((page) => page.match(route))
    return match && match.Partial
  }
