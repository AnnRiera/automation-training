/// <reference types="cypress" />

const ProductDetails = require('../../../pages/productDetails');
const  productId  = Cypress.env('PRODUCT_ID');
const productDetails = new ProductDetails();

describe('TC - User workflow for Product details page', () => {
    beforeEach('load home page', () => {
        cy.visit(`/product_details/${productId}`);
    });

    it('[TC-PD-01] should check if quantity field is available', () => {
        productDetails.getQuantityField()
            .should('not.be.disabled');
    });

    it('[TC-PD-02] should check if quantity field is not empty', () => {
        productDetails.getQuantityField()
            .invoke('attr', 'value')
            .should('not.be.empty');
    });

    it('[TC-PD-03] should check if quantity field accepts negative values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(-1)
            .invoke('attr', 'value')
            .then((attr) => {
                expect(attr).not.be.NaN;
                expect(Number(attr)).not.be.lessThan(0);
            });
    });

    it('[TC-PD-04] should check if quantity field accepts string values', () => {
        productDetails.getQuantityField()
            .clear()
            .type('Test')
            .should('be.empty');
    });

    it('[TC-PD-05] should check if Add to cart button exist', () => {
        productDetails.getAddToCartButton()
            .should('exist');
    });

    it('[TC-PD-06] should check if Add to cart button is enabled', () => {
        productDetails.getAddToCartButton()
            .should('be.enabled');
    });
});