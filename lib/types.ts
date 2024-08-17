import type { JaxsBusEventMatcher, JaxsBusListener } from 'jaxs-bus'
import type { JaxsState } from 'jaxs-state'

// DOM
export type TextValue = string | number
export type TagAttributes = Record<string, TextValue>
interface JsxIded {
  __jsx?: string
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
export type TagEventAttributes = Record<string, string>
export type TagAttributesAndEvents = {
  attributes: TagAttributes
  events: TagEventAttributes
}

// Message bus types
export type DomPublish = (eventName: string, domEvent: Event) => void
export type Subscribe<T> = (
  matcher: JaxsBusEventMatcher,
  listener: JaxsBusListener<T>,
) => void

// state types

export type RenderKit<T> = {
  document: Document
  window: Window
  publish: DomPublish
  subscribe: Subscribe<T>
  state: JaxsState
  parent?: JaxsNode | null
}

export interface Renderable<T> {
  render: (renderKit: RenderKit<T>) => JaxsNode[]
}
