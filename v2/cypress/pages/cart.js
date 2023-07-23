/// <reference types="cypress" />

const { quantity } = require('../../constants');
const Home = require('./home');
const ProductDetails = require('./productDetails');

const productDetails = new ProductDetails();
const home = new Home();

class Cart {
    constructor() {
        this.quantityProduct = quantity;
    }

    getSession() {
        cy.visit('/');
        home.scroll();
        home.lookForAProductButton().click();
        productDetails.getQuantityField()
            .clear().type(this.quantityProduct);
        productDetails.getAddToCartButton().click();
        productDetails.getViewCartAnchor().click();
    }

    getProceedToCheckoutButton() {
        return cy.contains('Proceed To Checkout');
    }
}

module.exports = Cart;