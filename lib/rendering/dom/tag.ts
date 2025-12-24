import { isString } from '../../state/is'
import type {
  JaxsElement,
  TagAttributes,
  TagEventAttributes,
  EventMaps,
  DomPublish,
  RenderKit,
} from '../../types'

export const createNode = (type: string, document: Document) => {
  return document.createElement(type)
}

export const setAttributesOnElement = (
  element: Element,
  attributes: TagAttributes,
) => {
  for (const key in attributes) {
    if (key === '__self') continue
    const attributeValue = attributes[key].toString()
    if (key === 'value') {
      const input = element as HTMLInputElement
      if (input.value !== attributeValue) {
        input.value = attributeValue
      }
    } else if (isString(attributeValue) && attributeValue.trim() === '') {
      element.removeAttribute(key)
    } else {
      element.setAttribute(key, attributeValue)
    }
  }
}

export const setEventsOnElement = (
  element: JaxsElement,
  events: TagEventAttributes,
  publish: DomPublish,
) => {
  const eventMaps = {} as EventMaps

  for (const domEvent in events) {
    const eventName = events[domEvent]
    const listener = (event: Event) => publish(eventName, event)
    element.addEventListener(domEvent, listener)

    eventMaps[domEvent] = {
      domEvent: domEvent,
      busEvent: eventName,
      listener: listener,
    }
  }

  element.eventMaps = eventMaps
}

export const createDecoratedNode = (
  type: string,
  attributes: TagAttributes,
  events: TagEventAttributes,
  renderKit: RenderKit,
) => {
  const dom = createNode(type, renderKit.document)
  setAttributesOnElement(dom, attributes)
  setEventsOnElement(dom as unknown as JaxsElement, events, renderKit.publish)
  return dom as unknown as JaxsElement
}
