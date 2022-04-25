describe('Home Page', () => {

  beforeEach(() => {
    // could not get this to work for some reason
    // cy.fixture('courses.json').as('coursesJSON');
    // cy.intercept('/api/courses', '@coursesJSON').as("courses");

    // but this worked (from https://docs.cypress.io/api/commands/fixture#Using-the-fixture-StaticResponse-property)
    cy.intercept('GET', '/api/courses', { fixture: 'courses.json'}).as("courses");

    cy.visit('/');
  });

  it('should display a list of courses', () => {
    cy.contains("All Courses");

    cy.wait("@courses");

    cy.get("mat-card").should("have.length", 9);
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2);

    cy.get('.mat-tab-label').last().click();

    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);

    cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course');
  });
});
