describe('My First Test', function() {
  it('Visits the Plainest.site', function() {
    cy.visit('http://localhost:3000');

    cy.get('.post-open-link')
      .first()
      .click();
    cy.wait(1000);
    cy.get('.overlay')
      .first()
      .click();
  });
});
