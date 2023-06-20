/// <reference types="cypress" />

const { productId, productName, quantity, userInfo } = require('../../constants');
const baseUrl = Cypress.env('BASE_URL');
const loginUrl = Cypress.env('LOGIN_URL');
const pickedProductUrl = `${Cypress.env('PRODUCT_URL')}/${productId}`;
const productImg = `${Cypress.env('IMG_PRODUCT')}/${productId}`;

describe('User flow', () => {
    // beforeEach('Reload page', () => {
    //     cy.visit(baseUrl);
    // });

    describe('USE CASE: buying process', () => {
        // beforeEach('Saved all product information', () => {
        //     cy.visit(baseUrl);
        //     cy.scrollTo('center');

        //     // should pick Pure Cotton V-Neck T-Shirt
        //     cy.getProductInfo('[data-product-id="28"]')
        //         .first('p')
        //         .contains('T-Shirt')
        //         .invoke('text')
        //         .as('productName');

        //     cy.getProductInfo('[data-product-id="28"]')
        //         .first('h2')
        //         .contains('Rs')
        //         .invoke('text')
        //         .as('productPrice');
            
        //     cy.getProductInfo('[data-product-id="28"]')
        //         .first('img')
        //         .invoke('attr', 'src')
        //         .as('productUrlImg');
        // });

        it('should view products', () => {
            // should scroll to the middle of the page
            cy.visit(baseUrl);
            cy.scrollTo('center');

            // should pick Pure Cotton V-Neck T-Shirt
            cy.get('.features_items .col-sm-4')
                .then((product) => {
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
                        .should('eq', pickedProductUrl);
                    // check if it's the same product
                    cy.get('[class="product-information"] h2')
                        .should('contain',productName);
                    
                   cy.get('[class="product-information"] span span')
                        .invoke('text')
                        .then((price) => {
                            cy.get('@priceTag')
                                .should('eq', price);
                        });
                    
                    cy.get('[class="view-product"] img')
                        .invoke('attr', 'src')
                        .should('contain', productImg);
                });
        });

        it('should add products to the cart', () => {
            cy.visit(pickedProductUrl);
            cy.get('#quantity')
                .clear()
                .type(quantity);

            cy.get('button[class="btn btn-default cart"]')
                .click();
            
            cy.get('#cartModal [class="modal-body"]')
                .find('a')
                .click();

            cy.get('tbody tr')
                .children()
                .then((child) => {
                    cy.log(productImg)
                    cy.wrap(child[0])
                        .find('img')
                        .invoke('attr', 'src')
                        .should('eq', productImg);

                    cy.wrap(child[1])
                        .get('h4 a')
                        .invoke('text')
                        .should('eq', productName);

                    // cy.get('@productPrice').should('eq', child[2].innerText);

                    expect(child[3].innerText).contain(quantity);
                });

            // should press the checkout button
            cy.contains('Proceed To Checkout')
                .click();

            // should click the register url
            cy.get('#checkoutModal a')
                .click();
            });
    });

    describe('USE CASE: signup process', () => {
        it('should filled the signup form', () => {
            cy.visit(loginUrl);

            cy.loginOrSignup('#form .signup-form [data-qa="signup-name"]', userInfo.name);
            cy.loginOrSignup('#form .signup-form [data-qa="signup-email"]', userInfo.email);
            cy.get('#form .signup-form [data-qa="signup-button"]')
                .click();

            cy.get('#id_gender2')
                .check()
                .should('be.checked');

            cy.get('#name')
                .invoke('val')
                .should('not.be.empty')
                .and('eq', userInfo.name);

            cy.get('#email')
                .invoke('val')
                .should('not.be.empty')
                .and('eq', userInfo.email);

            cy.filledForm('#password', userInfo.password);

            cy.handleDate('#days', userInfo.dayOfBirth);

            cy.handleDate('#months', userInfo.monthOfBirth);

            cy.handleDate('#years', userInfo.yearOfBirth);

            cy.filledForm('#first_name', userInfo.name.split(' ')[0]);

            cy.filledForm('#last_name', userInfo.name.split(' ')[1]);

            cy.filledForm('#company', userInfo.company);
        });
    });
});