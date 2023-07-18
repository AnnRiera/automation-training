/// <reference types="cypress" />

const ProductDetails = require('../../../pages/productDetails');
const Home = require('../../../pages/home');
const productId = Cypress.env('PRODUCT_ID');
const { pointQuantity, negativeQuantity, word, zeroValue } = require('../../../../constants');
const productDetails = new ProductDetails();
const home = new Home();

describe('TC-PD - User workflow for Product details page', () => {
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
            .type(negativeQuantity)
            .invoke('val')
            .then((attr) => {
                expect(attr).not.be.NaN;
                expect(attr).not.be.null;
                expect(Number(attr)).be.lessThan(zeroValue);
            });
    });

    it('[TC-PD-04] should check if quantity field accepts string values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(word)
            .should('be.empty');
    });

    it('[TC-PD-05] should check if quantity field accepts decimal values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(pointQuantity)
            .invoke('val')
            .then((attr) => {
                expect(attr).not.be.NaN;
                expect(attr).not.be.undefined;
                expect(attr).not.be.null;
                expect(Number(attr)).eq(pointQuantity);
            });
    });

    it('[TC-PD-06] should check if Add to cart button exist', () => {
        productDetails.getAddToCartButton()
            .should('exist');
    });

    it('[TC-PD-07] should check if Add to cart button is enabled', () => {
        productDetails.getAddToCartButton()
            .should('be.enabled');
    });
});

describe('TC-PD - Contrast data consistence between Home and Product Details', () => {
    it('[TC-PD-09] should check if product name is the same as the picked product', () => {
        cy.visit('/')
        home.lookForAProduct()
            .then((product) => {
                home.lookForAProductInformation(product[21])
                    .then((siblings) => {
                        const value = siblings[2].innerText;
                        cy.wrap(value).as('productName');

                        cy.wrap(siblings[3]).invoke('text').as('productPrice');
    
                        cy.wrap(siblings[0])
                            .invoke('attr', 'src')
                            .then((src) => {
                                cy.wrap(src).as('productImage');
                            });
                    });

                cy.visit(`/product_details/${productId}`);

                cy.get('@productName')
                    .then((value) => {
                        productDetails.getProductName()
                            .then((attr) => {
                                expect(attr[0].innerHTML).contains(value)
                            });
                    });

                cy.get('@productPrice')
                    .then((value) => {
                        productDetails.getProductPrice()
                            .should('eq', value);
                    });
                    
                cy.get('@productImage')
                    .then((value) => {
                        productDetails.getProductImage()
                            .should('eq', value);
                    });
            });
    });
});