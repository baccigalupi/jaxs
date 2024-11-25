import { bind } from '../rendering/templates/bound'
import { buildRouter } from './routing'
import { RenderedRoute, RouteState } from '../types'
import { NullTemplate } from '../rendering/null'

export const routedView = (routes: RenderedRoute[]) => {
  const findPage = buildRouter(routes)

  const Template = ({ route }: { route: RouteState }) => {
    const Page = findPage({ route }) || NullTemplate
    return Page()
  }

  return bind({ Template, subscriptions: ['route'] })
}
