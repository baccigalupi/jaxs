import type { ComponentProps, WithViewModelArguments } from '@lib/types'

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
