class Bound {
  constructor(TemplateClass, viewModel, attributes) {
    this.TemplateClass = TemplateClass;
    this.viewModel = viewModel;
    this.attributes = attributes || {};
  }

  render(renderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state),
    };

    const template = this.TemplateClass(props);

    this.dom = template.render(renderKit);
    return this.dom;
  }
}

export const bind = (TemplateClass, viewModel) => {
  return (attributes) => new Bound(TemplateClass, viewModel, attributes);
};
