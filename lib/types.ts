// Rendering & Dom ------
export type DomEventPublisher = (eventName: string, domEvent: Event) => void;

export type RenderKit = {
  document: Document;
  publish: DomEventPublisher;
  subscribe: BusSubscribe;
  state: State;
};

export interface ExpandedElement extends Element {
  eventMaps: EventMaps;
}
export interface InputElement extends ExpandedElement {
  // deno-lint-ignore no-explicit-any
  value: any;
  // deno-lint-ignore no-explicit-any
  checked: any;
}
export type Dom = Text | ExpandedElement;
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
  dom: DomCollection;
  render: (
    renderKit: RenderKit,
    parentElement?: Element,
  ) => DomCollection;
}
export type TemplateClass = (attributes: Attributes) => Template;

// deno-lint-ignore no-explicit-any
export type State = Record<string, any>;
export type StateSetter = (initialState: State) => void;
export type ViewModel = (state: State) => State;

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
};

export type AttributeInstructionData = {
  name: string;
  value: string;
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

export type AddNodeData = {
  parent: ExpandedElement;
};

type NullData = Record<string, never>;

export type InstructionData =
  | RemoveInstructionData
  | AttributeInstructionData
  | EventInstructionData
  | UpdateEventInstructionData
  | AddNodeData
  | NullData;

export type Instruction = {
  source: Dom;
  target: Dom;
  type: ChangeInstructions;
  data: InstructionData;
};

export type Instructions = Array<Instruction>;

export enum ChangeInstructions {
  changeText,
  removeNode,
  addNode,
  replaceNode,
  removeAttribute,
  addAttribute,
  updateAttribute,
  removeEvent,
  addEvent,
  updateEvent,
  changeValue,
}

export type Updater = (instruction: Instruction) => void;
