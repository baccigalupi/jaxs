import {
  Attributes,
  RenderKit,
  TemplateClass,
  ViewModel,
} from '../../types';

class Bound {
  TemplateClass: TemplateClass;
  viewModel: ViewModel;
  attributes: Attributes;

  constructor(
    TemplateClass: TemplateClass,
    viewModel: ViewModel,
    attributes: Attributes,
  ) {
    this.TemplateClass = TemplateClass;
    this.viewModel = viewModel;
    this.attributes = attributes || {};
  }

  render(renderKit: RenderKit) {
    const props = {
      ...this.attributes,
      ...this.viewModel(renderKit.state),
    };

    const template = this.TemplateClass(props);

    if (!template) {
      return [];
    } else {
      return template.render(renderKit);
    }
  }
}

export const bind = (TemplateClass: TemplateClass, viewModel: ViewModel) => {
  return (attributes: Attributes) =>
    new Bound(TemplateClass, viewModel, attributes);
};
