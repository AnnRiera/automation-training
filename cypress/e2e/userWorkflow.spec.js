/// <reference types="cypress" />

const baseUrl = Cypress.env('BASE_URL');
const pickedProductUrl = Cypress.env('PRODUCT_URL');
const productId = 28;
const productName = 'Pure Cotton V-Neck T-Shirt';

describe('User flow', () => {
    // beforeEach('Reload page', () => {
    //     cy.visit(baseUrl);
    // });

    describe('USE CASE: buying process', () => {
        it('should view products', () => {
            // should scroll to the middle of the page
            cy.visit(baseUrl);
            cy.scrollTo('center');

            // should pick Pure Cotton V-Neck T-Shirt
            cy.get('.features_items .col-sm-4')
                .then((product) => {
                    // TODO: here should get the product price
                    expect(product[21]).contain(productName);
                    cy.wrap(product[21])
                        .contains('View Product')
                        .click();
                    // check if is the same url
                    cy.url()
                        .should('eq', `${pickedProductUrl}/${productId}`);
                    // check if it's the same product
                    cy.get('[class="product-information"] h2')
                        .should('contain',productName);
                });
        });

        // it('should add products to the cart', () => {

        // });
    });
});