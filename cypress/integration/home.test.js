describe('Home Page', () => {
  it('should display a list of courses', () => {

    // could not get this to work for some reason
    // cy.fixture('courses.json').as('coursesJSON');
    // cy.intercept('/api/courses', '@coursesJSON').as("courses");

    // but this worked (from https://docs.cypress.io/api/commands/fixture#Using-the-fixture-StaticResponse-property)
    cy.intercept('GET', '/api/courses', { fixture: 'courses.json'}).as("courses");

    cy.visit('/');
    cy.contains("All Courses");

    cy.wait("@courses");

    cy.get("mat-card").should("have.length", 9);
  });
});
