
Cypress.Commands.add('getHeader', () => {
    return cy.get('#header');
});

Cypress.Commands.add('getElementByName', (name) => {
    return cy.getHeader().contains(name);
});

Cypress.Commands.add('getElementByAttrib', (tag) => {
    return cy.get(tag);
})