class Root {
  constructor(template, selector, renderKit) {
    this.template = template;
    this.selector = selector;
    this.renderKit = renderKit;
    this.dom = [];
  }

  attach() {
    const parent = this.getParentElement();
    this.dom = this.render();
    this.dom.forEach((element) => parent.appendChild(element));
    return parent;
  }

  render() {
    return this.template.render(this.renderKit);
  }

  getParentElement() {
    return this.renderKit.document.querySelector(this.selector);
  }
}

export const render = (template, selector, renderKit) => {
  const root = new Root(template, selector, renderKit)
  root.attach();
  return root;
}