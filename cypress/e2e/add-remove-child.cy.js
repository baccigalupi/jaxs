describe('Add and remove child nodes with state', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234');
  });

  it('if/else conditional children and toggling conditions', () => {
    cy.get('.member-content').should('not.exist');
    cy.get('.guest-content').contains('nothing to see');

    cy.get('a.exclusive-link').click();

    cy.get('.member-content').contains('member');
    cy.get('.guest-content').should('not.exist');

    cy.go('back');

    cy.get('.member-content').should('not.exist');
    cy.get('.guest-content').contains('nothing to see');
  });

  it('show/hide at the root level', () => {
    cy.get('a.exclusive-link').contains('Go to');

    cy.get('a.exclusive-link').click();

    cy.get('a.exclusive-link').should('not.exist');

    cy.go('back');

    cy.get('a.exclusive-link').contains('Go to');
  });
});
