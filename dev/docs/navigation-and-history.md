# Navigation & History

- On app start
  - listen for window `popstate`
    - On `popstate`, publish `location-change` event
  - subscribe to `location-change`
    - On `location-change` set route state from location
-
