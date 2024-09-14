import type { JsxCollection, Props, Template, Renderable } from '../types'
import { Tag } from './templates/tag'
import { Children } from './templates/children'
import { ensureJsxChildrenArray } from './templates/children/normalize'
import { packageJsxAttributes } from './templates/tag/attributes-and-events'

const jsx = <T>(
  type: string | Template<T>,
  attributes: Props<T>,
  ...children: JsxCollection
): Renderable => {
  if (typeof type === 'string') {
    return new Tag(type, attributes, children)
  }

  return type(packageJsxAttributes(attributes, children))
}

jsx.fragment = <T>(attributes: Props<T>, maybeChildren: JsxCollection) => {
  const children = ensureJsxChildrenArray(maybeChildren, attributes)
  return new Children(children)
}

export { jsx }
