import { findHref } from './find-href'
import { ListenerKit } from '../types'
import { navigate } from './navigate'

export const onLinkClick = (domEvent: MouseEvent, options: ListenerKit) => {
  if (!domEvent || !domEvent.target) return
  domEvent.preventDefault()

  const href = findHref(domEvent.target as HTMLElement)
  navigate(href, options)
}
