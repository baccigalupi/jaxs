import { DomCollection, RenderKit, Template, TextValue } from '../../types.ts';
import { createTextNode } from '../dom/create.ts';

export class TextTemplate implements Template {
  dom: DomCollection;
  value: string;

  constructor(content: TextValue) {
    this.value = content.toString();
    this.dom = [];
  }

  render(renderKit: RenderKit): DomCollection {
    this.dom = this.generateDom(renderKit);
    return this.dom;
  }

  generateDom(renderKit: RenderKit) {
    const textNode = createTextNode(this.value, renderKit.document);
    if (!textNode) return [];
    return [textNode];
  }
}
