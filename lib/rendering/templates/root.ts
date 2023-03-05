import { Dom, DomCollection, RenderKit, Template } from '../../types.ts';

class Root {
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

  renderAndAttach() {
    this.parentElement = this.getParentElement();
    if (this.parentElement) {
      this.dom = this.render();
      this.dom.forEach((element: Dom) => {
        this.parentElement && this.parentElement.appendChild(element);
      });
      // subscribe to rerender
    }
    return this.parentElement;
  }

  render() {
    return this.template.render(this.renderKit);
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
  root.renderAndAttach();
  return root;
};
