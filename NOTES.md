# Development notes

## Rendering

- Is storing the `dom` necessary except in the Root?
- Consider the naming of types/methods especially around Dom stuff

## Data

Use `immer produce` function to create immutable next state. Only 3324k.

```javascript
export const greeting = createStore('foo', publishChange)
  .defaultState({ hello: 'world' })
  .on('proper', (state) => state.hello = 'Theydies and Gentlethems')
  .on('named', (state, name) => state.hello = name);
```
