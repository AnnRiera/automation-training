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

Cypress.Commands.add('loginOrSignup', (selector, param) => {
    return cy.get(selector)
                .clear()
                .type(param);
});

Cypress.Commands.add('filledForm', (selector, param) => {
    return cy.get(selector)
                .type(param)
                .invoke('val')
                .should('not.be.empty')
                .and('eq', param);
});

Cypress.Commands.add('handleDate', (selector, param) => {
    return cy.get(selector)
                .select(param)
                .should('not.be.empty')
                .invoke('val')
                .should('not.be.NaN')
                .and('eq', param);
});