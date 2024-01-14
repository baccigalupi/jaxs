import { JsxId, RenderKit, Template, TextValue } from '../../types';
import { createTextNode } from '../dom/create';

export class TextTemplate implements Template {
  value: string;

  constructor(content: TextValue) {
    this.value = content.toString();
  }

  render(renderKit: RenderKit) {
    const textNode = createTextNode(this.value, renderKit.document);
    if (!textNode) return [];
    (textNode as unknown as JsxId).__jsx = 'TextNode';
    return [textNode];
  }
}
