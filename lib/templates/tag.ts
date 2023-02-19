import {
  Attributes,
  EventAttributes,
  TemplateEventListeners,
  DomCollection,
  RenderKit
} from '../types.ts';

import {
  createDecoratedNode,
} from './dom.js';

import {
  separateAttrsAndEvents,
} from './attributesAndEvents.ts';

export class Tag {
  type: string;
  events: EventAttributes;
  listeners: TemplateEventListeners;
  attributes: Attributes;
  // children: Children;
  dom: DomCollection;

  constructor(
    tagType: string,
    combinedAttributes: Attributes,
    // children: Array<Template>,
  ) {
    this.type = tagType;

    const { events, attributes } = separateAttrsAndEvents(combinedAttributes);
    this.events = events;
    this.attributes = attributes;
    this.listeners = {};

    // this.children = new Children(children);
    this.dom = [];
  }

  render(renderKit: RenderKit): DomCollection {
    const { dom, listeners } = this.generateDom(renderKit);
    if (!dom) return this.dom;

    // this.children.render(renderKit, dom);
    this.dom = [dom];
    this.listeners = listeners as TemplateEventListeners;
    return this.dom;
  }

  generateDom(renderKit: RenderKit) {
    return createDecoratedNode(
      this.type,
      this.attributes,
      this.events,
      renderKit,
    );
  }
}