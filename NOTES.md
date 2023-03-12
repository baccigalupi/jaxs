# Update algorithm

# Passes

Change of dom happens via:

- Some convert the tree into an array of instructions
- Could also do all at once.

Render could also be rolled in? That was my original design.

Need to acertain the performance and other gains.

## Tree pass

### From root:

- if root/node type same
  - update self
  - replace, create, update childrer
    - replace =
- else
  - replace root

### Replace:

    - test: type of node different
      - Element vs Text, 
      - Element type different `a` vs `button`
    - Element.replaceWith() // https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith

### Update:

    - Text: Text.textContent = "new" // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    - Element:
      - Attributes
        - Remove
        - Add
        - Update value
      - Event: should only have one event by design. It can fan out to other events
        - Remove
        - Add
        - Update value: events should have an identifier that is the eventName
      - Children: follow root tree pattern for each

ObjectHash to quickly assert attributes etc
https://www.npmjs.com/package/object-hash
