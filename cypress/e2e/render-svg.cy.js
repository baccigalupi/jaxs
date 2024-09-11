describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/svg.html')
  })

  it('has the correct size because it is correctly setup as svg', () => {
    cy.get('svg').invoke('outerWidth').should('be.eq', 24)
    cy.get('svg').invoke('outerHeight').should('be.eq', 24)
  })
})
