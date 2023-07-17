/* eslint-disable no-undef */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: '**/store/*/*.{js,jsx,ts,tsx}',
    baseUrl: 'https://automationexercise.com/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    trashAssetsBeforeRuns: true,
  },
  env: {
    PRODUCT_ID: '28',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: 'cypress/reports',
  },
});
