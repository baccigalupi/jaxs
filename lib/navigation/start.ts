import { locationChangeEvent, linkNavigationEvent } from './events'
import { createRouteState } from './route-state'
import { onLinkClick } from './on-link-click'
import { onLocationChange } from './on-location-change'
import type { App } from '../app'

export const subscribeToNavigation = (app: App) => {
  const { subscribe } = app
  subscribe(linkNavigationEvent, onLinkClick)
}

export const subscribeToHistoryChange = (app: App) => {
  const { publish, subscribe, state, window } = app
  createRouteState(state)
  window.addEventListener('popstate', () => publish(locationChangeEvent, null))
  subscribe(locationChangeEvent, onLocationChange)
}

export const publishLocation = (app: App) => {
  setTimeout(() => app.publish(locationChangeEvent, null), 0)
}

export const startNavigation = (app: App) => {
  subscribeToHistoryChange(app)
  subscribeToNavigation(app)
  publishLocation(app)
}
