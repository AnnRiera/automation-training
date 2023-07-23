
/// <reference types="cypress" />

class ProductDetails {
    getQuantityField() {
        return cy.get('#quantity');
    }

    getAddToCartButton() {
        return cy.get('button[class="btn btn-default cart"]');
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

    getViewCartAnchor() {
        return cy.get('#cartModal [class^="modal-body"]')
                .find('a');
    }

    getAddToCartModal() {
        return cy.get('#cartModal[class^="modal "]');
    }

    checkIfModalExist() {
        return this.getAddToCartButton()
            .click()
            .get('#cartModal[class^="modal "]');
    }
}

module.exports = ProductDetails;