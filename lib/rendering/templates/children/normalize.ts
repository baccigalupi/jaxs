import {
  JsxCollection,
  Renderable,
  AttributesWithChildren,
} from '../../../types'
import { replaceTextNodes } from './text'
import { withSvgFlag } from './svg'

export const normalizeJsxChildren = (
  jsxChildren: JsxCollection,
  isSvg: boolean,
) => {
  return normalizeToArray(jsxChildren)
    .map(replaceTextNodes)
    .flat()
    .map(withSvgFlag(isSvg)) as Renderable[]
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
