const { defineConfig } = require("cypress")

module.exports = defineConfig({
  //env: {...process.env},
  e2e: {
    baseUrl : 'http://automationexercise.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     defaultCommandTimeout: 30000,
  },
});
