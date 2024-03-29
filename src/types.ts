// Rendering & Dom ------
import { State } from './state'
export type DomEventPublisher = (eventName: string, domEvent: Event) => void;

export type RenderKit = {
  document: Document;
  window: Window;
  publish: DomEventPublisher;
  subscribe: BusSubscribe;
  state: State;
  parent?: Element | null;
};

export interface JsxId {
  __jsx: string;
}
export interface ExpandedElement extends Element, JsxId {
  eventMaps: EventMaps;
}
export interface InputElement extends ExpandedElement {
  // deno-lint-ignore no-explicit-any
  value: any;
}
export type Dom = Text | ExpandedElement | SVGElement;
export type DomCollection = Dom[];
export type HtmlChildren =
  | HTMLCollection
  | NodeListOf<ChildNode>
  | DomCollection;
export type TextValue = string | number;
export type EventMap = {
  domEvent: string;
  busEvent: string;
  listener: EventListener;
};
export type EventMaps = Record<string, EventMap>;

// deno-lint-ignore no-explicit-any
export type Attributes = Record<string, any>;
export type EventAttributes = Record<string, string>;
export type AttributesAndEvents = {
  attributes: Attributes;
  events: EventAttributes;
};

export type TemplateEventListeners = Record<string, EventListener>;

export interface Template {
  isSvg?: boolean,
  render: (
    renderKit: RenderKit,
    parentElement?: Element,
  ) => DomCollection;
}
export type TemplateClass = (attributes: Attributes) => Template;

export type ViewModel = (state: Record<string,any>) => State;

// Message Bus ----
export type BusEventName = string;
// deno-lint-ignore no-explicit-any
export type BusOptions = Record<string, any>;
// deno-lint-ignore no-explicit-any
export type BusPayload = any;
export type BusPublish = (eventName: BusEventName, payload: BusPayload) => void;
export type BusSubscribe = (
  eventName: BusEventName,
  listener: BusListener,
) => void;
export interface BusListenerKit {
  publish: BusPublish;
  eventName: BusEventName;
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
}
export type BusListener = (
  payload: BusPayload,
  listenerKit: BusListenerKit,
) => void;
export type BusListenersMap = Record<BusEventName, BusPayload>;

// Change instructions
export type RemoveInstructionData = {
  name: string;
  isSvg?: boolean;
};

export type AttributeInstructionData = {
  name: string;
  value: string;
  isSvg?: boolean;
};

export type EventInstructionData = {
  name: string;
  value: EventListener;
};

export type UpdateEventInstructionData = {
  name: string;
  sourceValue: EventListener;
  targetValue: EventListener;
};

export type InsertNodeData = {
  parent: ExpandedElement;
  index: number;
};

type NullData = Record<string, never>;

export type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | InsertNodeData
  | NullData;

export type Instruction = {
  source: Dom;
  target: Dom;
  type: ChangeInstructions;
  data: InstructionData;
};

export type Instructions = Array<Instruction>;

export enum ChangeInstructions {
  removeNode,
  insertNode, // can be to move an existing element in the dom, or to add one
  replaceNode,
  removeAttribute,
  addAttribute,
  updateAttribute,
  removeEvent,
  addEvent,
  updateEvent,
  changeValue,
  changeText,
}

export type Updater = (instruction: Instruction) => void;

export type App = {
  publish?: BusPublish;
  subscribe?: BusSubscribe;
  // deno-lint-ignore no-explicit-any
  bus?: any;
  state?: State
  renderKit: RenderKit;
  render: (template: Template, selector: string) => Template;
  window: Window;
  document: Document;
};

export type DomEnvironment = {
  document?: Document;
  window?: Window; 
}
