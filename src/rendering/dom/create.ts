import type {
  Attributes,
  DomEventPublisher,
  EventAttributes,
  EventMaps,
  ExpandedElement,
  InputElement,
  RenderKit,
} from '../../types';

export const setAttributesOnElement = (
  element: Element,
  attributes: Attributes,
) => {
  for (const key in attributes) {
    if (key === '__self') continue;
    if (key === 'value') {
      (element as InputElement).value = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
};

export const setEventsOnElement = (
  element: ExpandedElement,
  events: EventAttributes,
  publish: DomEventPublisher,
) => {
  const eventMaps = {} as EventMaps;

  for (const domEvent in events) {
    const eventName = events[domEvent];
    const listener = (event: Event) => publish(eventName, event);
    element.addEventListener(domEvent, listener);

    eventMaps[domEvent] = {
      domEvent: domEvent,
      busEvent: eventName,
      listener: listener,
    };
  }

  element.eventMaps = eventMaps;
};

export const createNode = (type: string, document: Document) => {
  return document.createElement(type);
};

export const createTextNode = (value: string, document: Document) => {
  return document.createTextNode(value);
};

export const createDecoratedNode = (
  type: string,
  attributes: Attributes,
  events: EventAttributes,
  renderKit: RenderKit,
) => {
  // deno-lint-ignore no-explicit-any
  const dom = createNode(type, renderKit.document) as any as ExpandedElement;
  setAttributesOnElement(dom, attributes);
  setEventsOnElement(dom, events, renderKit.publish);
  return dom;
};
