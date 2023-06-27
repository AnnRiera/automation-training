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

Cypress.Commands.add('handleDropdowns', (selector, param) => {
    return cy.get(selector)
                .select(param);
})

Cypress.Commands.add('handleDate', (selector, param) => {
    return cy.handleDropdowns(selector, param)
                .should('not.be.empty')
                .invoke('val')
                .should('not.be.NaN')
                .and('eq', param);
});

Cypress.Commands.add('clickOption', (selector) => {
    cy.contains(selector)
        .click();
});

Cypress.Commands.add('getAndClick', (selector) => {
    cy.get(selector)
        .click();
})