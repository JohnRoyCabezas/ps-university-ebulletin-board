/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('https://ps-university-ebulletin-board.vercel.app/')
  cy.get('.bg-gray-300').click()
  cy.get("input[type='email']").clear().type('user@ebulletin.com')
  cy.get("input[type='password']").clear().type('password')
  cy.get('.mt-16 > .w-full').click()
})

Cypress.Commands.add('adminLogin', () => {
  cy.visit('https://ps-university-ebulletin-board.vercel.app/')
  cy.get('.bg-gray-300').click()
  cy.get("input[type='email']").clear().type('admin@ebulletin.com')
  cy.get("input[type='password']").clear().type('password')
  cy.get('.mt-16 > .w-full').click()
})
