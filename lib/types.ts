// Rendering & Dom ------
export type DomEventPublisher = (eventName: string, domEvent: Event) => void;

export type RenderKit = {
  document: Document;
  publish: DomEventPublisher;
  subscribe: BusSubscribe;
  state: State;
};

export type Dom = Text | Element;
export type DomCollection = Dom[];
export type TextValue = string | number;

// deno-lint-ignore no-explicit-any
export type Attributes = Record<string, any>;
export type EventAttributes = Record<string, string>;
export type AttributesAndEvents = {
  attributes: Attributes;
  events: EventAttributes;
};

export type TemplateEventListeners = Record<string, EventListener>;

export interface Template {
  dom: DomCollection;
  render: (
    renderKit: RenderKit,
    parentElement?: Element,
  ) => DomCollection;
}
export type TemplateClass = (attributes: Attributes) => Template;

// deno-lint-ignore no-explicit-any
export type State = Record<string, any>;
export type ViewModel = (state: State) => State;

// Message Bus ----
export type BusEventName = string;
// deno-lint-ignore no-explicit-any
export type BusPayload = any;
export type BusPublish = (eventName: BusEventName, payload: BusPayload) => void;
export type BusSubscribe = (
  eventName: BusEventName,
  listener: BusListener,
) => void;
export type BusListener = (
  payload: BusPayload,
  publish: BusPublish,
  eventName: BusEventName,
) => void;
export type BusListenersMap = Record<BusEventName, BusPayload>;
