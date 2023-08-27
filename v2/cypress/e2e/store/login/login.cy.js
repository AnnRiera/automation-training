/// <reference types="cypress" />

const Login = require('../../../pages/login');
const { userInfo } = require('../../../../constants');

const login = new Login();

describe('TC - User workflow for Login/Signup page (F)', () => {
    beforeEach('load cart page', () => {
        cy.visit('/login');
    });

    it('[TC-LS-01] should check if Name field exist in Signup form', () => {
        login.getNameField()
            .should('exist');
    });

    it('[TC-LS-02] should check if Name field is enabled in Signup form', () => {
        login.getNameField()
            .should('be.enabled');
    });

    it('[TC-LS-03] should check if Name field is required in Signup form', () => {
        login.getNameField()
            .invoke('attr', 'required')
            .then((attr) => {
                expect(attr).to.exist;
            });
    });

    it('[TC-LS-04] should check if Email field exist in Signup form', () => {
        login.getEmailField()
            .should('exist');
    });

    it('[TC-LS-05] should check if Email field is enabled in Signup form', () => {
        login.getEmailField()
            .should('be.enabled');
    });

    it('[TC-LS-06] should check if Email field is required in Signup form', () => {
        login.getEmailField()
            .invoke('attr', 'required')
            .then((attr) => {
                expect(attr).to.exist;
            });
    });

    // it('[TC-LS-07] should check if Name field validates non-special characters in Signup form', () => {
    //     login.getNameField()
    //         .type(userInfo.invalidName);

    //     login.getEmailField()
    //         .type(userInfo.email);

    //     cy.intercept('POST', '/signup')
    //         .its('response.statusCode').should('eq', 400);

    //     login.getSignUpForm()
    //         .submit();
    // });
});