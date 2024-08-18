import type { JsxCollection, Props, TemplateGenerator } from '../types'
import { Tag } from './templates/tag'
import { Children } from './templates/children'
import { ensureJsxChildrenArray } from './templates/children/normalize'
import { packageJsxAttributes } from './templates/tag/attributes-and-events'

const jsx = (
  type: string | TemplateGenerator,
  attributes: Props,
  ...children: JsxCollection
) => {
  if (typeof type === 'string') {
    return new Tag(type, attributes, children)
  }

  return type(packageJsxAttributes(attributes, children))
}

jsx.fragment = (attributes: Props, maybeChildren: JsxCollection) => {
  const children = ensureJsxChildrenArray(maybeChildren, attributes)
  return new Children(children)
}

export { jsx }