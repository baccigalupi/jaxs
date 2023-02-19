// Templates ------
export type RenderKit = {
  document: Document;
  // publish: BusPublisher;
  // state: State;
};

export type Dom = Text | Element;
export type DomCollection = Dom[];

// deno-lint-ignore no-explicit-any
export type Attributes = Record<string, any>;
export type EventAttributes = Record<string, string>;
export type AttributesAndEvents = {
  attributes: Attributes;
  events: EventAttributes;
};

export type TemplateEventListeners = Record<string, EventListener>;