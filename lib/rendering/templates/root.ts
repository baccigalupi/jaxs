import {
  DomCollection,
  ExpandedElement,
  RenderKit,
  State,
  Template,
} from '../../types.ts';
import { change } from '../change.ts';
import { stateChangeEvent } from '../../store.ts';

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
    this.dom = this.render(renderKit);

    if (this.parentElement) {
      this.attach();
      this.subscribeForRerender(renderKit);
    }

    return this.parentElement;
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

  subscribeForRerender({ subscribe }: RenderKit) {
    subscribe(stateChangeEvent, (state) => this.rerender(state));
  }

  rerender(state: State) {
    const renderKit = { ...this.renderKit, state: state };
    const newDom = this.render(renderKit);
    change(this.dom, newDom, this.parentElement as ExpandedElement);
    if (
      (this.dom.length === 0 && newDom.length !== 0) ||
      (this.dom.length !== 0 && newDom.length === 0)
    ) {
      this.dom = newDom;
    }
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
