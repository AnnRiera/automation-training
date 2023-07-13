# Cypress automation training

This project is a brief exercise, the idea is automate the user's flow on a test [page](BASE_URL=https://automationexercise.com/) provided by the mentor.

## Configuration

This configuration runs okay on Windows and Ubuntu without any further configuration. To start this project is necessary to run the following command:

```
npm install
```

You also need to have a `.env` file with the URL of the website.

```
BASE_URL=https://example.com/
PRODUCT_URL=https://example.com/product_details/{id}
CART_URL=https://example.com/view_cart
LOGIN_URL=https://example.com/login
CONTACT_US=https://example.com/contact_us
SIGNUP_URL=https://example.com/signup
PAYMENT_URL=https://example.com/payment
```

## Commands

### Headless

To run the porject with headless mode please run:

```
npm run headless
```

### Headed

To run the porject with headed mode please run:

```
npm run headed
```

### Reports

This command provides you a HTML auto-generated report:

```
npm run reports
```

### Format

This project uses prettier and eslint to code format, so if you want to formatting your files:

```
npm run format
```
