import type { JaxsBusEventMatcher, JaxsBusListener } from 'jaxs-bus';
import type { JaxsState } from 'jaxs-state';

export type TextValue = string | number;


interface JsxIded {
  __jsx?: string;
};
export type DomNode = Element | Text;
export type JaxsElement = DomNode & JsxIded;

// Message bus types
export type DomPublish = (eventName: string, domEvent: Event) => void;
export type Subscribe<T> = (matcher: JaxsBusEventMatcher, listener: JaxsBusListener<T>) => void;

// state types

export type RenderKit<T> = {
  document: Document;
  window: Window;
  publish: DomPublish;
  subscribe: Subscribe<T>;
  state: JaxsState;
  parent?: JaxsElement | null;
};

export interface Renderable<T> {
  render: (renderKit: RenderKit<T>) => JaxsElement[];
}