describe('Add and remove child nodes with state', () => {
  beforeEach(() => {
    cy.visit('/root.html')
  })

  it('if/else conditional with nested children and toggling conditions', () => {
    cy.get('.member-content').should('not.exist')
    cy.get('.guest-content').contains('that is fine')
    cy.get('form').should.exist
    cy.get('input[type=submit]').should.exist

    cy.get('a.exclusive-link').click()

    cy.get('h1.member-content').contains('Oh great crickets!')
    cy.get('p.member-content').contains('Sing me a tale')
    cy.get('.guest-content').should('not.exist')

    cy.go('back')

    cy.get('.member-content').should('not.exist')
    cy.get('.guest-content').contains('that is fine')
    cy.get('form').should.exist
    cy.get('input[type=submit]').should.exist
  })

  it('show/hide at the root level', () => {
    cy.get('a.exclusive-link').contains('Go to')

    cy.get('a.exclusive-link').click()

    cy.get('a.exclusive-link').should('not.exist')

    cy.go('back')

    cy.get('a.exclusive-link').contains('Go to')
  })
})
