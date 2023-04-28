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
