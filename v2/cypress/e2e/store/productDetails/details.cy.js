/// <reference types="cypress" />

const ProductDetails = require('../../../pages/productDetails');
const Home = require('../../../pages/home');
const productId = Cypress.env('PRODUCT_ID');
const { pointQuantity, negativeQuantity, word, zeroValue } = require('../../../../constants');

const productDetails = new ProductDetails();
const home = new Home();

describe('TC-PD - User workflow for Product details page (F)', () => {
    beforeEach('load cart page', () => {
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

    it('[TC-PD-03] should check if Add to cart button exist', () => {
        productDetails.getAddToCartButton()
            .should('exist');
    });

    it('[TC-PD-4] should check if Add to cart button is enabled', () => {
        productDetails.getAddToCartButton()
            .should('be.enabled');
    });

    it('[TC-PD-05] should check if View cart anchor exist', () => {
        productDetails.getViewCartAnchor()
            .should('exist');
    });

    it('[TC-PD-06] should check if View cart anchor has a href property', () => {
        productDetails.getAddToCartButton().click();
        productDetails.getViewCartAnchor()
            .invoke('attr', 'href')
            .should('exist');
    });

    it('[TC-PD-07] should check if quantity field accepts negative values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(negativeQuantity)
            .invoke('val')
            .then((attr) => {
                expect(attr).not.be.NaN;
                expect(attr).not.be.null;
                expect(Number(attr)).be.greaterThan(zeroValue);
            });
    });

    it('[TC-PD-08] should check if quantity field accepts string values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(word)
            .should('be.empty');
    });

    it('[TC-PD-09] should check if quantity field accepts decimal values', () => {
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

    it('[TC-PD-10] should check if quantity field accepts zero values', () => {
        productDetails.getQuantityField()
            .clear()
            .type(zeroValue)
            .invoke('val')
            .then((attr) => {
                expect(attr).not.be.NaN;
                expect(attr).not.be.undefined;
                expect(attr).not.be.null;
            });

        productDetails.checkIfModalExist()
            .wait(200)
            .should('have.class', 'fade');
    });
});

describe('TC-PD - Contrast data consistence between Home and Product Details (NF)', () => {
    it('[TC-PD-11] should check if the product details page is related to the exact same picked product', () => {
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

                home.getUrlProduct(product[21])
                    .invoke('attr', 'href')
                    .then((href) => {
                        cy.wrap(href).as('productUrl');
                    });

                cy.visit(`/product_details/${productId}`);

                cy.get('@productUrl')
                    .then((value) => {
                        cy.url()
                            .should('contain', value);
                    });

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