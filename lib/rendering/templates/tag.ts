import {
  Attributes,
  DomCollection,
  EventAttributes,
  RenderKit,
  Template,
} from '../../types.ts';

import { createDecoratedNode } from '../dom/create.ts';
import { separateAttrsAndEvents } from '../dom/attributesAndEvents.ts';
import { Children } from './children.ts';

export class Tag implements Template {
  type: string;
  events: EventAttributes;
  attributes: Attributes;
  children: Children;
  dom: DomCollection;

  constructor(
    tagType: string,
    combinedAttributes: Attributes,
    children: Template[],
  ) {
    this.type = tagType;

    const { events, attributes } = separateAttrsAndEvents(combinedAttributes);
    this.events = events;
    this.attributes = attributes;

    this.children = new Children(children);
    this.dom = [];
  }

  render(renderKit: RenderKit): DomCollection {
    const dom = this.generateDom(renderKit);
    if (!dom) return this.dom;

    this.children.render(renderKit, dom);
    this.dom = [dom];
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
