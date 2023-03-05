import { Dom, DomCollection, RenderKit, State, Template } from '../../types.ts';

export const stateChangeEvent = 'stateChange';

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

  renderAndAttach(renderKit: RenderKit) {
    this.parentElement = this.getParentElement();
    if (this.parentElement) {
      this.dom = this.render(renderKit);
      this.attach();
      this.subscribeForRerender(renderKit);
    }
    return this.parentElement;
  }

  render(renderKit: RenderKit) {
    return this.template.render(renderKit);
  }

  attach() {
    this.dom.forEach((element: Dom) => {
      this.parentElement && this.parentElement.appendChild(element);
    });
  }

  subscribeForRerender({ subscribe }: RenderKit) {
    subscribe(stateChangeEvent, (state) => this.rerender(state));
  }

  rerender(state: State) {
    const renderKit = { ...this.renderKit, state: state };
    const newDom = this.render(renderKit);
    // do something to update the dom tree here, this lib doesn't work!
    // morphdom(this.dom, newDom);
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
