import type {
  DomCollection,
  RenderKit,
  Template,
} from '../../types';

export class Root {
  template: Template;
  selector: string;
  renderKit: RenderKit;
  dom: DomCollection;
  parentElement: Element | null;

  constructor(template: Template, selector: string, renderKit: RenderKit) {
    this.template = template;
    this.selector = selector;
    this.renderKit = renderKit;
    this.dom = [];
    this.parentElement = null;
  }

  renderAndAttach(renderKit: RenderKit) {
    this.parentElement = this.getParentElement();
    this.dom = this.render({...renderKit, parent: this.parentElement});

    if (this.parentElement) {
      this.attach();
    }
  }

  render(renderKit: RenderKit) {
    return this.template.render(renderKit);
  }

  attach() {
    this.parentElement && (this.parentElement.innerHTML = '');
    this.dom.forEach((element) => {
      this.parentElement && this.parentElement.appendChild(element);
    });
  }

  getParentElement() {
    return this.renderKit.document.querySelector(this.selector);
  }
}

export const render = (
  template: Template,
  selector: string,
  renderKit: RenderKit,
) => {
  const root = new Root(template, selector, renderKit);
  root.renderAndAttach(renderKit);
  return root;
};
