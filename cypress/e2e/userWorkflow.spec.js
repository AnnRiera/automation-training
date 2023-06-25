/// <reference types="cypress" />

const { productId, productName, quantity, userInfo, comment, originalUser, subject } = require('../../constants');
const baseUrl = Cypress.env('BASE_URL');
const pickedProductUrl = `${Cypress.env('PRODUCT_URL')}/${productId}`;
const productImg = `${Cypress.env('IMG_PRODUCT')}/${productId}`;

describe('User flow', () => {
        it('should view products, add to cart, signup, do the checkout', () => {
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
                            .as('productPrice');
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
                        cy.get('@productPrice')
                            .should('eq', price);
                    });
                
                cy.get('[class="view-product"] img')
                    .invoke('attr', 'src')
                    .should('contain', productImg);
            });
        
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
                cy.wrap(child[0])
                    .find('img')
                    .invoke('attr', 'src')
                    .should('eq', productImg);

                cy.wrap(child[1])
                    .get('h4 a')
                    .invoke('text')
                    .should('eq', productName);

                cy.get('@productPrice').should('eq', child[2].innerText);

                expect(child[3].innerText).contain(quantity);
            });

        // should press the checkout button
        cy.clickOption('Proceed To Checkout');

        // should click the register url
        cy.get('#checkoutModal a')
            .click();

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

        cy.filledForm('#address1', userInfo.address);

        cy.handleDropdowns('#country', userInfo.country)
            .invoke('val')
            .should('eq', userInfo.country);

        cy.filledForm('#state', userInfo.state);

        cy.filledForm('#city', userInfo.city);

        cy.filledForm('#zipcode', userInfo.zipCode);

        cy.filledForm('#mobile_number', userInfo.phoneNumber);

        cy.get('[data-qa="create-account"]')
            .click();

        cy.get('#form .pull-right')
            .find('a')
            .click();

        cy.get('#header')
            .contains('Cart')
            .click();

        // should press the checkout button
        cy.clickOption('Proceed To Checkout');

        // TODO: here you can check if the info match.
        cy.get('#ordermsg textarea')
            .type(comment);

        cy.clickOption('Place Order');

        cy.filledForm('[data-qa="name-on-card"]', userInfo.payment.cardName);

        cy.filledForm('[data-qa="card-number"]', userInfo.payment.cardNumber);

        cy.filledForm('[data-qa="cvc"]', userInfo.payment.cvv);

        cy.filledForm('[data-qa="expiry-month"]', userInfo.payment.expirationMonth);

        cy.filledForm('[data-qa="expiry-year"]', userInfo.payment.expirationYear);

        cy.get('#submit')
            .click();

        cy.get('[data-qa="continue-button"]')
            .click();

        cy.clickOption('Logout');

        cy.get('[data-qa="login-email"]')
            .type(originalUser.user)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', originalUser.user);
            
        cy.get('[data-qa="login-password"]')
            .type(originalUser.password)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', originalUser.password);

        cy.get('[data-qa="login-button"]')
            .click();

        cy.clickOption('Contact us');

        cy.filledForm('[data-qa="name"]', userInfo.name);

        cy.filledForm('[data-qa="email"]', userInfo.email);

        cy.filledForm('[data-qa="subject"]', subject);

        cy.filledForm('#message', comment);

        cy.get('[type="file"]')
            .selectFile('cypress-image.png');

        cy.get('[data-qa="submit-button"]')
            .click();

        cy.clickOption('Logout');
    });
});