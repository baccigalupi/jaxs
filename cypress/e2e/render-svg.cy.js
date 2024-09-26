describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(320, 480)
    cy.visit('/svg.html')
  })

  it('has the correct size because it is correctly setup as svg', () => {
    cy.get('svg').invoke('outerWidth').should('be.eq', 300)
    cy.get('svg').invoke('outerHeight').should('be.eq', 300)
    cy.get('svg g').invoke('outerHeight').should('be.eq', 300)
  })
})
