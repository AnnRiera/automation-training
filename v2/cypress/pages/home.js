
/// <reference types="cypress" />

class Home {
    getLogout() {
        return cy.getElementByName('Logout');
    }

    getContactUs() {
        return cy.getElementByName('Contact us');
    }

    scroll() {
        cy.scrollTo('center');
    }

    lookForAProduct() {
        this.scroll();
        return cy.get('.features_items .col-sm-4');
    }

    lookForAProductInformation(product) {
        return cy.wrap(product)
            .get('[data-product-id="28"]')
            .siblings();
    }

    lookForAProductButton(product) {
        return cy.wrap(product)
                .contains('View Product');
    }

    selectAProduct() {
        this.scroll();
        return cy.get('.features_items .col-sm-4')
                .then((product) => {
                    this.lookForAProductButton(product[21])
                        .click();
                });
    }

    getCart() {
        return cy.getElementByName('Cart');
    }

    getProductName(siblings) {
        const value = siblings[2].innerText;
        cy.wrap(value).as('productName');
    }

    getUrlProduct(product) {
        return cy.wrap(product)
            .contains('View Product');
    }

    getProductPrice() {
        cy.get('.features_items .col-sm-4').then((product) => {
            cy.wrap(product)
                .get('[data-product-id="28"]')
                .siblings()
                .then((siblings) => {
                cy.wrap(siblings[3]).invoke('text').as('productPrice');
            });
        });
    }

    getProductImage() {
        cy.get('.features_items .col-sm-4').then((product) => {
            cy.wrap(product)
                .get('[data-product-id="28"]')
                .siblings()
                .then((siblings) => {
                    cy.wrap(siblings[0])
                        .invoke('attr', 'src')
                        .then((src) => {
                            cy.wrap(src).as('productImage');
                        });
                });
        });
    }
}

module.exports = Home;