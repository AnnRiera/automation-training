/// <reference types="cypress" />

const baseUrl = Cypress.env('BASE_URL');

describe('Home page', () => {
    beforeEach('Reload page', () => {
        cy.visit(baseUrl);
    });

    describe('Testing home page', () => {
        it('should scroll to the middle of the page', () => {
            cy.scrollTo('center');
        });

        it('should pick the Colour Blocked Shirt - Sky Blue and click View product button', () => {

        });
    });
});