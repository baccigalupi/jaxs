import { RenderableCollection } from '@lib/types/rendering'

// DOM & Jax & Jsx
export type TextValue = string | number
export interface JsxIded {
  __jsx?: string
}
export type JsxChangeId = {
  element: JaxsNode
  index: number
}
export type EventMap = {
  domEvent: string
  busEvent: string
  listener: EventListener
}
export type EventMaps = Record<string, EventMap>
interface JsxEventMapped {
  eventMaps: EventMaps
}
export type JaxsElement = Element & JsxIded & JsxEventMapped
export type JaxsText = Text & JsxIded
export type JaxsSvgElement = SVGElement & JsxIded
export type JaxsNode = JaxsElement | JaxsText | JaxsSvgElement
export type JaxsNodes = JaxsNode[] | NodeListOf<JaxsNode>
export type JaxsInput = HTMLInputElement & JsxIded & JsxEventMapped

type NullValues = null | undefined
export type ReactSourceObject = {
  fileName: string
  lineNumber: string
  columnNumber: string
}
interface SourceMap {
  __source?: ReactSourceObject
}
export type Props<T> = Partial<{
  __source?: ReactSourceObject
  children: RenderableCollection
}> &
  T

export type PropValue =
  | TextValue
  | NullValues
  | boolean
  | ReactSourceObject
  | RenderableCollection
export type TagAttributes = SourceMap &
  Record<string, string> & { __source?: ReactSourceObject }
export type TagEventAttributes = Record<string, string>
export type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}
