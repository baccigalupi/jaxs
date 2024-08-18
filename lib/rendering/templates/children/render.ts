import { Template, RenderKit, JaxsNodes } from '../../../types'

/* three options for children
  1. there is no view
  2. view is an array, recurse
  3. view is a renderable thing
*/
export const recursiveRender = (
  children: Template[],
  renderKit: RenderKit,
  rendered = [] as JaxsNodes,
): JaxsNodes => children.reduce(renderReducer(renderKit), rendered).flat()

const renderReducer =
  (renderKit: RenderKit) =>
  (aggregate: JaxsNodes, view: Template): JaxsNodes => {
    if (!view) return aggregate

    if (Array.isArray(view)) {
      const dom = recursiveRender(view, renderKit, aggregate) as JaxsNodes
      return dom
    }

    view.render(renderKit).forEach((template) => aggregate.push(template))

    return aggregate
  }
