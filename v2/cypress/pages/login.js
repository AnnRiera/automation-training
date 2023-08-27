/// <reference types="cypress" />

class Login {
    constructor() {}

    getNameField() {
        return cy.getElementByAttrib('[data-qa="signup-name"]');
    }

    getEmailField() {
        return cy.getElementByAttrib('[data-qa="signup-email"]');
    }

    getSignupButton() {
        return cy.getElementByAttrib('[data-qa="signup-button"]');
    }

    getSignUpForm() {
        return cy.getElementByAttrib('[class="signup-form"] form');
    }
}

module.exports = Login;