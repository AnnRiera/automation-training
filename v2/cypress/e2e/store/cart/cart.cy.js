/// <reference types="cypress" />

const Cart = require('../../../pages/cart');

const cart = new Cart();

describe('TC - User workflow for Cart page (F)', () => {
    beforeEach('load cart page', () => {
        cart.getSession();
        cy.visit('/view_cart');
    });

    it('[TC-C-01] should check if Proceed to Checkout button exist', () => {
        cart.getProceedToCheckoutButton()
            .should('exist');
    });

    it('[TC-C-02] should check if Proceed to Checkout button is visible', () => {
        cart.getProceedToCheckoutButton()
            .should('be.visible');
    });

    it('[TC-C-03] should check if Proceed to Checkout button open up login modal', () => {
        cart.checkModalExistency()
            .wait(200)
            .should('have.class', 'show');
    });

    it('[TC-C-04] should check if Register/Login link exist and contains redirect in login modal', () => {
        cart.checkModalExistency()
            .get('[class="modal-body"] a')
            .invoke('attr', 'href')
            .then((prop) => {
                expect(prop).to.exist;
                expect(prop).contains('/login');
            });
    });
});