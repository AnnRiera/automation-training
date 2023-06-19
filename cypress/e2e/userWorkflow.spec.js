/// <reference types="cypress" />

const baseUrl = Cypress.env('BASE_URL');
const pickedProductUrl = Cypress.env('PRODUCT_URL');
const { productId, productName, quantity } = require('../../constants');

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
                    cy.wrap(product)
                        .get('[data-product-id="28"]')
                        .siblings('h2')
                        .then((siblings) => {
                            cy.wrap(siblings[0])
                                .invoke('text')
                                .as('priceTag');
                        });

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
                    
                   cy.get('[class="product-information"] span span')
                        .invoke('text')
                        .then((price) => {
                            cy.get('@priceTag')
                                .should('eq', price);
                        });
                });
            
            cy.get('#quantity')
                .clear()
                .type(30);

            cy.get('button[class="btn btn-default cart"]')
                .click();
            
            cy.get('#cartModal [class="modal-body"]')
                .find('a')
                .click();

            cy.get('tbody tr')
                .children()
                .then((child) => {
                    cy.get('@priceTag').should('eq', child[2].innerText);
                    expect(child[3].innerText).contain(quantity);
                });
        });

        // it('should add products to the cart', () => {

        // });
    });
});