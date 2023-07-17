
/// <reference types="cypress" />

class ProductDetails {
    getQuantityField() {
        return cy.get('#quantity');
    }

    getAddToCartButton() {
        return cy.get('[type="button"].cart');
    }

    getProductName() {
        return cy.get('[class="product-information"] h2');
    }

    getProductPrice() {
        return cy.get('[class="product-information"] span span');
    }

    getProductImage() {
        return cy.get('[class="view-product"] img');
    }
}

module.exports = ProductDetails;