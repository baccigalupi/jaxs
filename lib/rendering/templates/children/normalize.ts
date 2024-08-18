import { JsxCollection, Template, Props } from '../../../types'
import { replaceTextNodes } from './text'
import { withSvgFlag } from './svg'

export const normalizeJsxChildren = (
  jsxChildren: JsxCollection,
  isSvg: boolean,
) => {
  return normalizeToArray(jsxChildren)
    .map(replaceTextNodes)
    .flat()
    .map(withSvgFlag(isSvg)) as Template[]
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

type AttributesWithChildren = Props & { children?: JsxCollection }
export const ensureJsxChildrenArray = <T>(
  maybeChildren?: JsxCollection,
  attributes = {} as AttributesWithChildren,
) => maybeChildren || attributes.children || []
