import {
  locationChangeEvent,
  linkNavigationEvent,
  navigationEvent,
} from './events'
import { createRouteState } from './route-state'
import { onLinkClick } from './on-link-click'
import { onLocationChange } from './on-location-change'
import { navigate } from './navigate'
import type { App } from '../app'
import type { ListenerKit } from '../types'

export const subscribeToNavigation = (app: App) => {
  const { subscribe } = app
  subscribe(linkNavigationEvent, onLinkClick)
  subscribe(navigationEvent, (path: string, busOptions: ListenerKit) => {
    navigate(path, busOptions)
  })
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
