/// <reference types="cypress" />

const { quantity, userInfo, comment, subject } = require('../../constants');
const baseUrl = Cypress.env('BASE_URL');


describe('User flow', () => {
    it('should view products, add to cart, signup, do the checkout, leave a comment and logout', () => {
        // should scroll to the middle of the page
        cy.visit(baseUrl);
        cy.scrollTo('center');

        // should pick Pure Cotton V-Neck T-Shirt
        cy.get('.features_items .col-sm-4')
        .then((product) => {
            cy.wrap(product)
                .get('[data-product-id="28"]')
                .siblings()
                .then((siblings) => {
                    const value = siblings[2].innerText;
                    cy.wrap(value)
                        .as('productName');
                
                    cy.wrap(siblings[3])
                        .invoke('text')
                        .as('productPrice');

                    cy.wrap(siblings[0])
                        .invoke('attr', 'src')
                        .then((src) => {
                            cy.wrap(src)
                                .as('productImage');
                        })
                });
            cy.wrap(product[21])
                .contains('View Product')
                .should('exist')
                .should('be.visible')
                .invoke('attr', 'href')
                .then((href) => {
                    cy.wrap(href)
                        .as('productUrl');
                });
            cy.wrap(product[21])
                .contains('View Product')
                .click();
            // check if is the same url
            cy.get('@productUrl')
                .then((url) => {
                    cy.url()
                        .should('contain', url);
                });
            // check if it's the same product
            cy.get('[class="product-information"] h2')
                .invoke('val')
                .then((item) => {
                    cy.get('@productName')
                        .should('exist')
                        .and('contain', item);
                });
            // check if it's the same price
            cy.get('[class="product-information"] span span')
                .invoke('text')
                .then((price) => {
                    cy.get('@productPrice')
                        .should('exist')
                        .and('eq', price);
                });
            // check if it's the same product
            cy.get('[class="view-product"] img')
                .should('exist')
                .should('be.visible')
                .invoke('attr', 'src')
                .then((img) => {
                    cy.get('@productImage')
                        .should('contain', img);
                });
        });

        cy.get('#quantity')
            .clear()
            .type(quantity);

        cy.getAndClick('button[class="btn btn-default cart"]');
        cy.get('#cartModal [class="modal-body"]')
            .find('a')
            .click();

        cy.get('tbody tr')
            .children()
            .then((child) => {
                cy.wrap(child[0])
                    .find('img')
                    .should('be.visible')
                    .invoke('attr', 'src')
                    .then((img) => {
                        cy.get('@productImage')
                            .should('contain', img);
                    });

                cy.wrap(child[1])
                    .get('h4 a')
                    .invoke('text')
                    .then((element) => {
                        cy.get('@productName')
                            .should('eq', element);
                    });

                cy.get('@productPrice').should('eq', child[2].innerText);

                expect(child[3].innerText).contain(quantity);
            });

        // should press the checkout button
        cy.clickOption('Proceed To Checkout');

        // should click the register url
        cy.getAndClick('#checkoutModal a');

        // should filled up the signup form
        cy.loginOrSignup('#form .signup-form [data-qa="signup-name"]', userInfo.name);
        cy.loginOrSignup('#form .signup-form [data-qa="signup-email"]', userInfo.email);
        cy.getAndClick('#form .signup-form [data-qa="signup-button"]');

        // should filled up the extended signup form
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
            
        // should click "Create account" button
        cy.getAndClick('[data-qa="create-account"]');

        // should click "Continue" anchor
        cy.get('#form .pull-right')
            .find('a')
            .click();
        
        // should click Cart option in header
        cy.get('#header')
            .contains('Cart')
            .click();

        // should press the checkout button
        cy.clickOption('Proceed To Checkout');
        // should filled up comment textarea
        cy.get('#ordermsg textarea')
            .type(comment)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', comment);

        // should click "Place order" button
        cy.clickOption('Place Order');

        // should filled up Payment form
        cy.filledForm('[data-qa="name-on-card"]', userInfo.payment.cardName);
        cy.filledForm('[data-qa="card-number"]', userInfo.payment.cardNumber);
        cy.filledForm('[data-qa="cvc"]', userInfo.payment.cvv);
        cy.filledForm('[data-qa="expiry-month"]', userInfo.payment.expirationMonth);
        cy.filledForm('[data-qa="expiry-year"]', userInfo.payment.expirationYear);

        // should click "Submit" button
        cy.getAndClick('#submit');

        // should click "Continue button"
        cy.getAndClick('[data-qa="continue-button"]');

        // should clicked up "Logout" option
        cy.clickOption('Logout');

        // should filled up login form
        cy.get('[data-qa="login-email"]')
            .type(userInfo.email)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', userInfo.email);
            
        cy.get('[data-qa="login-password"]')
            .type(userInfo.password)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', userInfo.password);

        // should clicked up "Login" button
        cy.getAndClick('[data-qa="login-button"]');

        // should clicked up in "Contact us" option in header
        cy.clickOption('Contact us');

        // should filled up contact form
        cy.filledForm('[data-qa="name"]', userInfo.name);
        cy.filledForm('[data-qa="email"]', userInfo.email);
        cy.filledForm('[data-qa="subject"]', subject);
        cy.get('[data-qa="message"]')
            .type(comment)
            .invoke('val')
            .should('not.be.empty')
            .and('eq', comment);

        // should loaded up an image
        cy.get('[type="file"]')
            .selectFile('cypress/fixtures/cypress-image.png');

        // should clicked up "Submit button"
        cy.getAndClick('[data-qa="submit-button"]');

        // should clicked up "Logout" opton in header
        cy.clickOption('Logout');
    });
});