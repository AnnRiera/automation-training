/* eslint-disable no-undef */
/// <reference types="cypress" />

const {
  quantity,
  userInfo,
  comment,
  subject,
  productId,
} = require('../../constants');
const baseUrl = Cypress.env('BASE_URL');
const productUrl = `${Cypress.env('PRODUCT_URL')}/${productId}`;
const loginUrl = Cypress.env('LOGIN_URL');
const signupUrl = Cypress.env('SIGNUP_URL');
const cartUrl = Cypress.env('CART_URL');
const contactUs = Cypress.env('CONTACT_US');
const paymentUrl = Cypress.env('PAYMENT_URL');

describe('Tests for Example web page', () => {
  describe('Home tests', () => {
    beforeEach('load the website', () => {
      cy.visit(baseUrl);
    });

    it('should test URL connection', () => {
      cy.url().then((url) => {
        expect(url).exist;
        expect(url).not.empty;
        expect(url).contain(baseUrl);
      });
    });

    it('should check if item has View Product anchor', () => {
      cy.get('.features_items .col-sm-4').then((product) => {
        cy.wrap(product[21])
          .contains('View Product')
          .should('exist')
          .should('be.visible');
      });
    });

    it('should check if View Product redirects to expected url', () => {
      cy.get('.features_items .col-sm-4').then((product) => {
        cy.wrap(product[21]).contains('View Product').click();
        cy.url().should('eq', productUrl);
      });
    });

    it('should check if Cart option in navbar exist', () => {
      cy.get('#header')
        .contains('Cart')
        .invoke('attr', 'href')
        .then((href) => {
          expect(cartUrl).contain(href);
        });
    });

    it('should check if Login option in navbar exist', () => {
      cy.get('#header')
        .contains('Signup / Login')
        .invoke('attr', 'href')
        .then((href) => {
          expect(loginUrl).contain(href);
        });
    });

    it('should check if Contact us option in navbar exist', () => {
      cy.get('#header')
        .contains('Contact us')
        .invoke('attr', 'href')
        .then((href) => {
          expect(contactUs).contain(href);
        });
    });
  });

  describe('Product page tests', () => {
    beforeEach('load the website', () => {
      cy.visit(productUrl);
    });

    it('should test if quantity input is available', () => {
      cy.get('#quantity').then((qty) => {
        expect(qty).exist;
        expect(qty).enabled;
      });
    });

    it('should test if quantity input is numeric', () => {
      cy.get('#quantity').type(subject).should('be.empty');
    });

    it('should check if Add to cart button is available', () => {
      cy.get('[type="button"].cart').should('be.visible').and('be.enabled');
    });
  });

  describe('Login/Signup page tests', () => {
    beforeEach('load the website', () => {
      cy.visit(loginUrl);
    });

    it('should test if name input is available in Signup form', () => {
      cy.get('[data-qa="signup-name"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should test if e-mail input is available in Signup form', () => {
      cy.get('[data-qa="signup-email"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should check if Signup button is available', () => {
      cy.get('[data-qa="signup-button"]')
        .should('be.visible')
        .should('be.enabled');
    });

    it('should test if e-mail input is available in Login form', () => {
      cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should test if password input is available in Login form', () => {
      cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should check if Login button is available', () => {
      cy.get('[data-qa="login-button"]')
        .should('be.visible')
        .should('be.enabled');
    });
  });

  describe('Payment page tests', () => {
    beforeEach('load the website', () => {
      cy.visit(paymentUrl);
    });

    it('should test if name on card input is available in Payment form', () => {
      cy.get('[data-qa="name-on-card"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should test if card number input is available in Payment form', () => {
      cy.get('[data-qa="card-number"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should check if cvc input is available in Payment form', () => {
      cy.get('[data-qa="cvc"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should test if expiry month input is available in Payment form', () => {
      cy.get('[data-qa="expiry-month"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should test if expiry year input is available in Payment form', () => {
      cy.get('[data-qa="expiry-year"]')
        .should('be.visible')
        .should('be.enabled')
        .and('be.empty');
    });

    it('should check if Pay and Confirm Order button is available in Payment form', () => {
      cy.get('[data-qa="pay-button"]').should('be.visible').and('be.enabled');
    });
  });

  describe('Signup page tests', () => {
    beforeEach('load the website', () => {
      cy.visit(signupUrl);

      cy.get('[data-qa="signup-name"]').type(userInfo.name);

      cy.get('[data-qa="signup-email"]').type(userInfo.email);

      cy.get('[data-qa="signup-button"]').click();
    });

    it('should test if gender checkboxs are available in Signup form', () => {
      cy.get('#id_gender1')
        .should('be.visible')
        .should('be.enabled')
        .and('not.be.checked');

      cy.get('#id_gender2')
        .should('be.visible')
        .should('be.enabled')
        .and('not.be.checked');
    });

    it('should test if password input is available in Signup form', () => {
      cy.get('[data-qa="password"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should test if days dropdown is available in Signup form', () => {
      cy.get('[data-qa="days"]')
        .should('be.visible')
        .should('not.be.selected')
        .invoke('val')
        .should('eq', '');
    });

    it('should test if months dropdown is available in Signup form', () => {
      cy.get('[data-qa="months"]')
        .should('be.visible')
        .should('not.be.selected')
        .and('have.value', '');
    });

    it('should test if years dropdown is available in Signup form', () => {
      cy.get('[data-qa="years"]')
        .should('be.visible')
        .should('not.be.selected')
        .invoke('val')
        .should('eq', '');
    });

    it('should test if newsletter checkbox is available in Signup form', () => {
      cy.get('#newsletter')
        .should('be.visible')
        .should('be.enabled')
        .and('not.be.checked');
    });

    it('should test if offers checkbox is available in Signup form', () => {
      cy.get('#optin')
        .should('be.visible')
        .should('be.enabled')
        .and('not.be.checked');
    });

    it('should test if first name input is available in Signup form', () => {
      cy.get('[data-qa="first_name"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if last name input is available in Signup form', () => {
      cy.get('[data-qa="last_name"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if adress input is available in Signup form', () => {
      cy.get('[data-qa="address"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if company input is available in Signup form', () => {
      cy.get('[data-qa="company"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should test if country dropdown is available in Signup form', () => {
      cy.get('[data-qa="country"]')
        .should('be.visible')
        .should('not.be.selected')
        .and('have.value', 'India');
    });

    it('should check if state input is available in Signup form', () => {
      cy.get('[data-qa="state"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if city input is available in Signup form', () => {
      cy.get('[data-qa="city"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if zipcode input is available in Signup form', () => {
      cy.get('[data-qa="zipcode"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if phone number input is available in Signup form', () => {
      cy.get('[data-qa="mobile_number"]')
        .should('be.visible')
        .invoke('val')
        .and('be.empty');
    });

    it('should check if Create Account button is available in Signup form', () => {
      cy.get('[data-qa="create-account"]')
        .should('be.visible')
        .and('be.enabled');
    });
  });

  describe('User flow', () => {
    it('should view products, add to cart, signup, do the checkout, leave a comment and logout', () => {
      // should scroll to the middle of the page
      cy.visit(baseUrl);
      cy.scrollTo('center');

      // should pick Pure Cotton V-Neck T-Shirt
      cy.get('.features_items .col-sm-4').then((product) => {
        cy.wrap(product)
          .get('[data-product-id="28"]')
          .siblings()
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
        cy.wrap(product[21])
          .contains('View Product')
          .invoke('attr', 'href')
          .then((href) => {
            cy.wrap(href).as('productUrl');
          });
        cy.wrap(product[21]).contains('View Product').click();
        // check if is the same url
        cy.get('@productUrl').then((url) => {
          cy.url().should('contain', url);
        });
        // check if it's the same product
        cy.get('[class="product-information"] h2')
          .invoke('val')
          .then((item) => {
            cy.get('@productName').should('exist').and('contain', item);
          });
        // check if it's the same price
        cy.get('[class="product-information"] span span')
          .invoke('text')
          .then((price) => {
            cy.get('@productPrice').should('exist').and('eq', price);
          });
        // check if it's the same product
        cy.get('[class="view-product"] img')
          .should('exist')
          .should('be.visible')
          .invoke('attr', 'src')
          .then((img) => {
            cy.get('@productImage').should('contain', img);
          });
      });

      cy.get('#quantity').clear().type(quantity);

      cy.getAndClick('button[class="btn btn-default cart"]');
      cy.get('#cartModal [class="modal-body"]')
        .find('a')
        .should('be.visible')
        .click();

      cy.get('tbody tr')
        .children()
        .then((child) => {
          cy.wrap(child[0])
            .find('img')
            .should('be.visible')
            .invoke('attr', 'src')
            .then((img) => {
              cy.get('@productImage').should('contain', img);
            });

          cy.wrap(child[1])
            .get('h4 a')
            .invoke('text')
            .then((element) => {
              cy.get('@productName').should('eq', element);
            });

          cy.get('@productPrice').should('eq', child[2].innerText);

          expect(child[3].innerText).contain(quantity);
        });

      // should press the checkout button
      cy.clickOption('Proceed To Checkout');

      // should click the register url
      cy.getAndClick('#checkoutModal a');

      // should filled up the signup form
      cy.loginOrSignup(
        '#form .signup-form [data-qa="signup-name"]',
        userInfo.name
      );
      cy.loginOrSignup(
        '#form .signup-form [data-qa="signup-email"]',
        userInfo.email
      );
      cy.getAndClick('#form .signup-form [data-qa="signup-button"]');

      // should filled up the extended signup form
      cy.get('#id_gender2').check().should('be.checked');

      cy.get('#name')
        .invoke('val')
        .should('not.be.empty')
        .and('eq', userInfo.name);

      cy.get('#email')
        .invoke('val')
        .should('not.be.empty')
        .and('eq', userInfo.email);

      cy.filledForm('#password', userInfo.password);
      cy.handleDate('#days', userInfo.dayOfBirth);
      cy.handleDate('#months', userInfo.monthOfBirth);
      cy.handleDate('#years', userInfo.yearOfBirth);
      cy.filledForm('#first_name', userInfo.name.split(' ')[0]);
      cy.filledForm('#last_name', userInfo.name.split(' ')[1]);
      cy.filledForm('#company', userInfo.company);
      cy.filledForm('#address1', userInfo.address);
      cy.handleDropdowns('#country', userInfo.country)
        .invoke('val')
        .should('eq', userInfo.country);

      cy.filledForm('#state', userInfo.state);
      cy.filledForm('#city', userInfo.city);
      cy.filledForm('#zipcode', userInfo.zipCode);
      cy.filledForm('#mobile_number', userInfo.phoneNumber);

      // should click "Create account" button
      cy.getAndClick('[data-qa="create-account"]');

      // should click "Continue" anchor
      cy.get('#form .pull-right').find('a').click();

      // should click Cart option in header
      cy.get('#header').contains('Cart').click();

      // should press the checkout button
      cy.clickOption('Proceed To Checkout');
      // should filled up comment textarea
      cy.get('#ordermsg textarea')
        .type(comment)
        .invoke('val')
        .should('not.be.empty')
        .and('eq', comment);

      // should click "Place order" button
      cy.clickOption('Place Order');

      // should filled up Payment form
      cy.filledForm('[data-qa="name-on-card"]', userInfo.payment.cardName);
      cy.filledForm('[data-qa="card-number"]', userInfo.payment.cardNumber);
      cy.filledForm('[data-qa="cvc"]', userInfo.payment.cvv);
      cy.filledForm(
        '[data-qa="expiry-month"]',
        userInfo.payment.expirationMonth
      );
      cy.filledForm('[data-qa="expiry-year"]', userInfo.payment.expirationYear);

      // should click "Submit" button
      cy.getAndClick('#submit');

      // should click "Continue button"
      cy.getAndClick('[data-qa="continue-button"]');

      // should clicked up "Logout" option
      cy.clickOption('Logout');

      // should filled up login form
      cy.get('[data-qa="login-email"]')
        .type(userInfo.email)
        .invoke('val')
        .should('not.be.empty')
        .and('eq', userInfo.email);

      cy.get('[data-qa="login-password"]')
        .type(userInfo.password)
        .invoke('val')
        .should('not.be.empty')
        .and('eq', userInfo.password);

      // should clicked up "Login" button
      cy.getAndClick('[data-qa="login-button"]');

      // should clicked up in "Contact us" option in header
      cy.clickOption('Contact us');

      // should filled up contact form
      cy.filledForm('[data-qa="name"]', userInfo.name);
      cy.filledForm('[data-qa="email"]', userInfo.email);
      cy.filledForm('[data-qa="subject"]', subject);
      cy.get('[data-qa="message"]')
        .type(comment)
        .invoke('val')
        .should('not.be.empty')
        .and('eq', comment);

      // should loaded up an image
      cy.get('[type="file"]').selectFile('cypress/fixtures/cypress-image.png');

      // should clicked up "Submit button"
      cy.getAndClick('[data-qa="submit-button"]');

      // should clicked up "Logout" opton in header
      cy.clickOption('Logout');
    });
  });
});
