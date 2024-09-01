import { Renderable, RenderKit, JaxsNode } from '../../../types'

/* three options for children
  1. there is no view
  2. view is an array, recurse
  3. view is a renderable thing
*/
export const recursiveRender = (
  children: Renderable[],
  renderKit: RenderKit,
  rendered = [] as JaxsNode[],
): JaxsNode[] => children.reduce(renderReducer(renderKit), rendered).flat()

const renderReducer =
  (renderKit: RenderKit) =>
  (aggregate: JaxsNode[], view: Renderable): JaxsNode[] => {
    if (!view) return aggregate

    if (Array.isArray(view)) {
      const dom = recursiveRender(view, renderKit, aggregate) as JaxsNode[]
      return dom
    }

    view.render(renderKit).forEach((template) => aggregate.push(template))

    return aggregate
  }
