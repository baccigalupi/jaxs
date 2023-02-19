// Rendering & Dom ------
export type DomEventPublisher = (eventName: string, domEvent: Event) => void;

export type RenderKit = {
  document: Document;
  publish: DomEventPublisher;
  // state: State;
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
