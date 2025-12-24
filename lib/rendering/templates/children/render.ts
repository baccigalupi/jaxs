import { Renderable, RenderKit, JaxsNode, JaxsElement } from '../../../types'

export const recursiveRender = (
  children: Renderable[],
  renderKit: RenderKit,
  parentElement?: JaxsElement,
  rendered = [] as JaxsNode[],
): JaxsNode[] => {
  return children
    .reduce(renderReducer(renderKit, parentElement), rendered)
    .flat()
}

/* three options for children
  1. there is no view
  2. view is an array, recurse
  3. view is a renderable thing, Tag or Text or Template
*/
const renderReducer =
  (renderKit: RenderKit, parentElement?: JaxsElement) =>
  (aggregate: JaxsNode[], view: Renderable): JaxsNode[] => {
    if (!view) {
      return aggregate
    } else if (Array.isArray(view)) {
      const dom = recursiveRender(
        view,
        renderKit,
        parentElement,
        aggregate,
      ) as JaxsNode[]
      return dom
    } else {
      view
        .render(renderKit, parentElement)
        .forEach((template) => aggregate.push(template))

      return aggregate
    }
  }
