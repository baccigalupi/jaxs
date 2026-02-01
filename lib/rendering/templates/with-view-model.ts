import type { ComponentProps, Template } from '@lib/types'

type SimpleViewModel<ViewModelProps, TemplateProps> = (
  props: ViewModelProps,
) => Partial<TemplateProps>

export type WithViewModelArguments<
  TemplateProps extends ComponentProps,
  ViewModelProps extends ComponentProps,
> = {
  Template: Template<TemplateProps>
  viewModel: SimpleViewModel<ViewModelProps, TemplateProps>
}

export const withViewModel = <
  TemplateProps extends ComponentProps,
  ViewModelProps extends ComponentProps,
>({
  Template,
  viewModel,
}: WithViewModelArguments<TemplateProps, ViewModelProps>) => {
  return (viewModelProps: ViewModelProps & Partial<TemplateProps>) => {
    const props = {
      ...viewModelProps,
      ...viewModel(viewModelProps),
    } as TemplateProps

    return Template(props)
  }
}
