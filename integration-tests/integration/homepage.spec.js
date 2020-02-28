// / <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubLogin')
    cy.task('stubUserDetailsRetrieval', 'TEST_USER')
  })

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      cy.login()
      // cy.visit('/')

      cy.get('.govuk-body')
        .find('h1')
        .should('have.class', 'govuk-panel__title')
        .should('have.text', 'This is the Interventions Catalogue')
    })
  })
})
