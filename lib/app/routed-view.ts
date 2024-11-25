import { bind } from 'jaxs'
import { buildRouter } from './routing'
import { RenderedRoute } from '../types'
import { RouteState } from 'types'
import { NullTemplate } from '../rendering/null'

export const routedView = (routes: RenderedRoute[]) => {
  const findPage = buildRouter(routes)

  const Template = ({ route }: { route: RouteState }) => {
    const Page = findPage({ route }) || NullTemplate
    return Page()
  }

  return bind({ Template, subscriptions: ['route'] })
}
