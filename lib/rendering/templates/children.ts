import { DomCollection, RenderKit, Template, TextValue } from '../../types.ts';
import { TextTemplate } from './text.ts';

export const ensureArray = (children: Template | Template[]): Template[] => {
  if (Array.isArray(children)) {
    return children.flat();
  }

  if (!children) {
    return [];
  }

  return [children];
};

/* three options for children
  1. there is no view
  2. view is an array, recurse
  3. view is a renderable thing
*/
const recursiveRender = (
  children: Template[],
  renderKit: RenderKit,
  rendered = [] as DomCollection,
): DomCollection => children.reduce(renderReducer(renderKit), rendered).flat();

const renderReducer =
  (renderKit: RenderKit) =>
  (aggregate: DomCollection, view: Template): DomCollection => {
    if (!view) return aggregate;

    if (Array.isArray(view)) {
      const dom = recursiveRender(view, renderKit, aggregate) as DomCollection;
      return dom;
    }

    view.render(renderKit).forEach((template) => aggregate.push(template));

    return aggregate;
  };

const replaceTextNodes = (child: TextValue | Template) => {
  if (isTextNode(child)) {
    return textNode(child as TextValue);
  }

  return child;
};

const isTextNode = (child: TextValue | Template) => {
  return typeof child === 'string' || typeof child === 'number';
};

const textNode = (content: TextValue) => {
  return new TextTemplate(content);
};

export class Children implements Template {
  collection: Template[];
  dom: DomCollection;
  parentElement: Element | undefined;

  constructor(jsxChildren: Template[]) {
    this.collection = ensureArray(jsxChildren);
    this.collection = this.collection.map(replaceTextNodes) as Template[];
    this.collection = this.collection.flat() as Template[];

    this.dom = [];
  }

  render(renderKit: RenderKit, parentElement: Element | undefined) {
    this.parentElement = parentElement;
    this.dom = this.generateDom(renderKit);
    this.attachToParent();
    return this.dom;
  }

  generateDom(renderKit: RenderKit) {
    return recursiveRender(this.collection, renderKit);
  }

  attachToParent() {
    if (this.parentElement === undefined) return;

    const parent = this.parentElement as Element;
    this.dom.forEach((dom) => parent.appendChild(dom));
  }
}
