
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
                    .contains('View Product');
    }

    selectAProduct() {
        this.scroll();
        return cy.get('.features_items .col-sm-4')
                    .then((product) => {
                        this.lookForAProductInformation(product[21])
                            .click();
                    });
    }

    getCart() {
        return cy.getElementByName('Cart');
    }

    getProductName() {
        this.lookForAProduct()
            .then((siblings) => {
                const value = siblings[2].innerText;
                cy.wrap(value).as('productName');
            });
    }

    // getProductName() {
    //     cy.get('.features_items .col-sm-4').then((product) => {
    //         cy.wrap(product)
    //           .get('[data-product-id="28"]')
    //           .siblings()
    //           .then((siblings) => {
    //             const value = siblings[2].innerText;
    //             cy.wrap(value).as('productName');
    
    //             cy.wrap(siblings[3]).invoke('text').as('productPrice');
    
    //             cy.wrap(siblings[0])
    //               .invoke('attr', 'src')
    //               .then((src) => {
    //                 cy.wrap(src).as('productImage');
    //               });
    //           });
    //         cy.wrap(product[21])
    //           .contains('View Product')
    //           .invoke('attr', 'href')
    //           .then((href) => {
    //             cy.wrap(href).as('productUrl');
    //           });
    //         cy.wrap(product[21]).contains('View Product').click();
    //         // check if is the same url
    //         cy.get('@productUrl').then((url) => {
    //           cy.url().should('contain', url);
    //         });
    //         // check if it's the same product
    //         cy.get('[class="product-information"] h2')
    //           .invoke('val')
    //           .then((item) => {
    //             cy.get('@productName').should('exist').and('contain', item);
    //           });
    //         // check if it's the same price
    //         cy.get('[class="product-information"] span span')
    //           .invoke('text')
    //           .then((price) => {
    //             cy.get('@productPrice').should('exist').and('eq', price);
    //           });
    //         // check if it's the same product
    //         cy.get('[class="view-product"] img')
    //           .should('exist')
    //           .should('be.visible')
    //           .invoke('attr', 'src')
    //           .then((img) => {
    //             cy.get('@productImage').should('contain', img);
    //           });
    //       });
    // }

    getProductPrice() {

    }

    getProductImage() {

    }
}

module.exports = Home;