/// <reference types="cypress" />

const Cart = require('../../../pages/cart');
const Home = require('../../../pages/home');
const ProductDetails = require('../../../pages/productDetails');

const productDetails = new ProductDetails();
const home = new Home();
const cart = new Cart();

describe('TC - User workflow for Cart page', () => {
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
});