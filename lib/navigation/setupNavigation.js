import { findHref } from './findHref.js';
import { locationChangeEvent } from './setupHistory.js';

export const navigateEvent = 'navigate';

export const navigate = (publish, path) => {
  history.pushState(null, '', path);
  publish(locationChangeEvent);
};

export const onNavigate = (domEvent, { publish }) => {
  if (!domEvent || !domEvent.target) return;
  domEvent.preventDefault();

  const href = findHref(domEvent.target);
  navigate(publish, href);
};

export const setupNavigation = (app) => {
  const { subscribe } = app;

  subscribe(navigateEvent, onNavigate);
};
