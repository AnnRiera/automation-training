
/// <reference types="cypress" />

class ProductDetails {
    getQuantityField() {
        return cy.get('#quantity');
    }

    getAddToCartButton() {
        return cy.get('[type="button"].cart');
    }

    getProductName() {
        return cy.get('.product-details .product-information h2');
    }

    getProductPrice() {
        return cy.get('[class="product-information"] span span')
            .invoke('text');
    }

    getProductImage() {
        return cy.get('[class="view-product"] img')
            .invoke('attr', 'src');
    }
}

module.exports = ProductDetails;