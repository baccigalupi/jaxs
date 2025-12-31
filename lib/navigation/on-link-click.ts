import { findHref } from './find-href'
import { ListenerKit } from '../types'
import { navigate } from './navigate'

export const onLinkClick = (listenerKit: ListenerKit<MouseEvent>) => {
  const domEvent = listenerKit.payload
  if (!domEvent || !domEvent.target) return
  domEvent.preventDefault()

  const href = findHref(domEvent.target as HTMLElement)
  navigate({ ...listenerKit, payload: href })
}
