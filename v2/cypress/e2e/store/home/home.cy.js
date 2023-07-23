/// <reference types="cypress" />

const Home = require('../../../pages/home');
const home = new Home();

describe('TC - User workflow for Home page', () => {
    beforeEach('load home page', () => {
        cy.visit('/');
    });

    it('[TC-H-01] should be able to scroll down to the middle of the page', () => {
        home.scroll();
    });

    it('[TC-H-02] should check if View Product anchor exist', () => {
        home.lookForAProduct();
    });

    it('[TC-H-03] should check if View Product anchor has a href property', () => {
        home.lookForAProduct()
            .then((product) => {
                home.lookForAProductInformation(product[21])
                    .invoke('attr', 'href')
                    .then((property) => {
                        expect(property).to.exist;
                    });
            });
    });

    it('[TC-H-04] should check if Cart option exist in header', () => {
        home.getCart()
            .should('exist');
    });

    it('[TC-H-05] should check if Cart option in header has a href property', () => {
        home.getCart()
            .invoke('attr', 'href')
            .then((href) => {
                expect(href).to.exist;
                expect(href).to.eq('/view_cart');
            });
    });

    it('[TC-H-06] should check if Contact us option exist in header', () => {
        home.getContactUs()
            .should('exist');
    });

    it('[TC-H-07] should check if Contact us option in header has a href property', () => {
        home.getContactUs()
            .invoke('attr', 'href')
            .then((href) => {
                expect(href).to.exist;
                expect(href).to.eq('/contact_us');
            });
    });

    it('[TC-H-08] should be able to click in Contact us option in header', () => {
        home.getContactUs()
            .click();
    });
    
    // it('[TC-n] should check if Logout option exist in header', () => {
    //     home.getLogout()
    //         .should('exist');
    // });

    // it('[TC-n+1] should check if Logout option in header has a href property', () => {
    //     home.getLogout()
    //         .invoke('attr', 'href')
    //         .then((href) => {
    //             expect(href).to.exist;
    //             expect(href).to.eq('/logout');
    //         });
    // });
});