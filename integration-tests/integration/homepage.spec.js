// / <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      cy.get('.govuk-body')
        .find('h1')
        .should('have.class', 'govuk-panel__title')
        .should('have.text', 'This is the Interventions Catalogue')
    })
  })
})
