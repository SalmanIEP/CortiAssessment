const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://petstore.swagger.io/v2/",
    chromeWebSecurity: false,
    reporter: "mochawesome",
    reporterOptions: {
      "reportDir": "cypress/reports",
      "reportFilename": "report",
      "overwrite": true,
      "html": true,
      "json": true,
      "charts": true
    },
    failOnStatusCode: false,
    env: {
      email: "",
      password: "pass_this_from_commandline_for_login_feature"
    },
  },
});

