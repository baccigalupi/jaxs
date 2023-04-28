import {
  Attributes,
  DomCollection,
  RenderKit,
  TemplateClass,
  ViewModel,
} from '../../types.ts';

class Bound {
  TemplateClass: TemplateClass;
  viewModel: ViewModel;
  attributes: Attributes;
  dom: DomCollection;

  constructor(
    TemplateClass: TemplateClass,
    viewModel: ViewModel,
    attributes: Attributes,
  ) {
    this.TemplateClass = TemplateClass;
    this.viewModel = viewModel;
    this.attributes = attributes || {};
    this.dom = [];
  }

  render(renderKit: RenderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state),
    };

    const template = this.TemplateClass(props);

    if (!template) {
      this.dom = [];
    } else {
      this.dom = template.render(renderKit);
    }

    return this.dom;
  }
}

export const bind = (TemplateClass: TemplateClass, viewModel: ViewModel) => {
  return (attributes: Attributes) =>
    new Bound(TemplateClass, viewModel, attributes);
};
