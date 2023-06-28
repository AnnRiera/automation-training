/* eslint-disable no-undef */
const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: "cypress/e2e/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "**/1-getting-started/*.ts",
      "**/2-advance-examples/*.ts",
    ],
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      ...process.env,
    },
    experimentalMemoryManagement: true,
    video: false,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Inline Reporter",
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: "cypress/reports",
  },
});
