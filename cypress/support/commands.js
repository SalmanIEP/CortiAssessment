// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Ajv from "ajv"
/**
* This will validate the API's response against the response schema
* Schema files will be placed here fixtures/schemas/
* API response and expected sechma file name will be passed as parameter
*/
Cypress.Commands.add('validateSchema', (response, schemafile) => {
  const ajv = new Ajv({ allErrors: true })
  //I haven't used require here as it is not be able to dynamic so I ahve used readfile instead
  cy.readFile('cypress/fixtures/schemas/' + schemafile + '.json').then((schema) => {
    const validate = ajv.compile(schema)
    const valid = validate(response)
    console.log(validate.errors)

    return valid;

  })
})

import addContext from 'mochawesome/addContext';
Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});

Cypress.Commands.add('GetRandomString', () => {

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
})


Cypress.Commands.add('apiRequest', (method, endpoint, options) => {
  const requestOptions = {
    method,
    url: endpoint,
    failOnStatusCode: false,
    ...options
  };

  cy.request(requestOptions).then((response) => {
    return response;
  });;
});

