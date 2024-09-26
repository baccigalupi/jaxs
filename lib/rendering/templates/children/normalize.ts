import { JsxCollection, AttributesWithChildren } from '../../../types'
import { replaceTextNodes } from './text'

export const normalizeJsxChildren = (jsxChildren: JsxCollection) => {
  return normalizeToArray(jsxChildren).map(replaceTextNodes).flat()
}

export const normalizeToArray = <T>(children: T | T[]): T[] => {
  if (Array.isArray(children)) {
    return children.flat() as T[]
  }

  if (!children) {
    return []
  }

  return [children]
}

export const ensureJsxChildrenArray = <T>(
  maybeChildren?: JsxCollection,
  attributes = {} as AttributesWithChildren<T>,
) => maybeChildren || attributes.children || []
