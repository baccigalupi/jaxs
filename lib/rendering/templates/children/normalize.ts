import { RenderableCollection, Props } from '../../../types'
import { replaceTextNodes } from './text'

export const normalizeJsxChildren = (jsxChildren: RenderableCollection) => {
  return normalizeToArray(jsxChildren).map(replaceTextNodes).flat()
}

export const normalizeToArray = <T>(children: T | T[]): T[] => {
  if (Array.isArray(children)) {
    return children.flat() as T[]
  } else if (!children) {
    return []
  } else {
    return [children]
  }
}

export const ensureJsxChildrenArray = <T>(
  maybeChildren?: RenderableCollection,
  attributes = {} as Props<T>,
) => normalizeJsxChildren(maybeChildren || attributes.children || [])
