import { findHref } from './findHref'
import { locationChangeEvent } from './setupHistory'

export const linkNavigationEvent = 'goToHref'
export const programmaticNavigationEvent = 'navigate'

export const navigate = (path, { publish, window }) => {
  window.history.pushState(null, '', path)
  publish(locationChangeEvent)
}

export const onLinkClick = (domEvent, { publish, window }) => {
  if (!domEvent || !domEvent.target) return
  domEvent.preventDefault()

  const href = findHref(domEvent.target)
  navigate(href, { publish, window })
}

export const setupNavigation = (app) => {
  const { subscribe } = app

  subscribe(linkNavigationEvent, onLinkClick)
  subscribe(programmaticNavigationEvent, navigate)
}
