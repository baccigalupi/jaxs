# Development thoughts

- Consider the naming of types/methods especially around Dom stuff
- Add nested tree slices to the store? `store.slice('requests')`
- special attributes:
  - checked on inputs
  - selected: option
  - disabled: button, fieldset, keygen, optgroup, option, select, textarea, input
  - multiple: select
  - readonly: input, textarea - but not certain ones. Also shouldn't be paired with require
  - required: input, textarea - but not certain ones. Shouldn't be paired with readonly or disabled?

# Bundling

There is a really crude bundler setup via this command:
`deno run --allow-env --allow-read --allow-net --allow-write lib/bundle.js`.

All the functions and classes are exposed as globals which makes it kind of
garbage.

# Navigation & related

General setup

1. Window - listen for popstate and trigger 'locationChange'
2. On load - trigger 'locationChange' to make sure initial route/url is considered

locationChange handler

- gets path and query params from url
- stores that data in the routes area, which triggers a re-render
- trigger routeChange (for the request manager)

Router

- listens for data changes on the route data
- looks up the right page and returns it in a bound template
- template gets rendered into dom

Request manager

- listens for routeChange events
- triggers a request if setup

Link navigation in the view

- publish 'navigate' event with href
- history.push href (for back button stuff)
- trigger 'locationChange', which will get the data from location, etc
