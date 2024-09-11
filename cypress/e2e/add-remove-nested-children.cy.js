describe('Add and remove child nodes with state', () => {
  beforeEach(() => {
    cy.visit('/nested-children.html')
  })

  it('it toggles conditional children correctly', () => {
    cy.get('.validation-error').should('not.exist')

    cy.get('input[name=email]').type('hello?')
    cy.get('.validation-error').should('not.exist')

    cy.get('input[name=email]').blur()
    cy.get('.validation-error').contains('Email unknown')
    /* change instructions for blur
      {source: input#email, target: input#email, type: removeNode, data: {…}}
      {target: p.validation-error, source: p.validation-error, type: addNode, data: {…}}
      {target: input#email, source: input#email, type: addNode, data: {…}}
    */

    cy.get('input[name=email]').focus()
    cy.get('input[name=email]').should('exist')
    cy.get('.validation-error').should('not.exist')
    /* On focus
      {source: p.validation-error, target: p.validation-error, type: removeNode, data: {…}}
      {target: input#email, source: input#email, type: addNode, data: {…}}
      {source: input#email, target: input#email, type: removeNode, data: {…}} // trigger blur?
    */
    /*
      change triggered on blur:
      {source: input#email, target: input#email, type: removeNode, data: {…}}
      {target: p.validation-error, source: p.validation-error, type: addNode, data: {…}}
    */

    cy.get('input[name=email]').clear()
    cy.get('input[name=email]').type('kane@example.com')
    cy.get('input[name=email]').blur()
    cy.get('.validation-error').should('not.exist')
  })
})
