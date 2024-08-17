import { Renderable, TextValue, RenderKit, JaxsElement } from "../../types";
import { createTextNode } from "../dom/text";

export class TextTemplate<T> implements Renderable<T> {
  value: string;

  constructor(content: TextValue) {
    this.value = content.toString();
  }

  render<T>(renderKit: RenderKit<T>) {
    const textNode = createTextNode(this.value, renderKit.document);
    (textNode as JaxsElement).__jsx = 'TextNode';
    return [textNode];
  }
}