import type { JaxsBusEventMatcher, JaxsBusListener } from 'jaxs-bus'
import type { JaxsState } from 'jaxs-state'

// DOM
export type TextValue = string | number
type NullValues = undefined | null
export interface JsxIded {
  __jsx?: string
}
export type JsxChangeId = {
  element: JsxIded
  index: number
}
export type EventMap = {
  domEvent: string
  busEvent: string
  listener: EventListener
}
export type TagEventMaps = Record<string, EventMap>
interface JsxEventMapped {
  eventMaps: TagEventMaps
}
export type JaxsElement = Element & JsxIded & JsxEventMapped
export type JaxsText = Text & JsxIded
export type JaxsNode = JaxsElement | JaxsText
export type JaxsNodes = JaxsNode[]

export type ReactSourceObject = {
  fileName: string
  lineNumber: string
  columnNumber: string
}

interface SourceMap {
  __source?: ReactSourceObject
}
export type PropValue =
  | TextValue
  | NullValues
  | boolean
  | ReactSourceObject
  | JsxCollection
export type Props = {
  __source?: ReactSourceObject
  children?: JsxCollection
  [key: string]: PropValue
}
export type TagAttributes = SourceMap & Record<string, string>
export type TagEventAttributes = Record<string, string>
export type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}

// Message bus types
export type DomPublish = (eventName: string, domEvent: Event) => void
export type Subscribe = (
  matcher: JaxsBusEventMatcher,
  listener: JaxsBusListener<any>,
) => void

// jsx and rendering

export type RenderKit = {
  document: Document
  window: Window
  publish: DomPublish
  subscribe: Subscribe
  state: JaxsState
  parent?: JaxsNode | null
}

export interface Template {
  render: (renderKit: RenderKit, parentElement?: JaxsElement) => JaxsNode[]
  isSvg: boolean
}
export type TemplateGenerator = (props: Props) => Template
export type JsxCollection = (Template | TextValue)[]
