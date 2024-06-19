/// <reference types="cypress" />
import { Given, Then, And, When } from 'cypress-cucumber-preprocessor/steps';
const { faker } = require('@faker-js/faker');

let requestEndPoint = "users";

let userName = faker.internet.userName();
let jobTitle = faker.internet.displayName();

Given('the API endpoint is {string}', (endpoint) => {
    requestEndPoint = endpoint;
});

When('I make a GET request without specifying the page', () => {
    cy.apiRequest('GET', requestEndPoint).as('response')
});

When('I make a GET request with the page parameter set to {string}', (pageNumber) => {
    const options = {
        qs: {
            page: pageNumber
        },
    }
    cy.apiRequest('GET', requestEndPoint, options).as('response')
});

Then('response code must be {string}', (stausCode) => {
    cy.get('@response').then((response) => {
        expect(response.status).to.eq(parseInt(stausCode));
    })
});

And('the response should contain following user details', (userDetails) => {
    cy.get('@response').then((response) => {
        userDetails.hashes().forEach((detail) => {
            expect(detail.email).to.be.equal(response.body.data.email)
            expect(parseInt(detail.id)).to.be.equal(response.body.data.id)
            expect(detail.first_name).to.be.equal(response.body.data.first_name)
            expect(detail.last_name).to.be.equal(response.body.data.last_name)
        });
    })
})

And('the response should contain a list of users for the page {string}', (pageNumber) => {
    cy.get('@response').then((response) => {
        expect(response.body.page).to.eq(parseInt(pageNumber));
        expect(response.body.data.length).to.be.greaterThan(0);
    })
});

And('the response content must follow the required schema as {string}', (schemafile) => {
    cy.get('@response').then((response) => {
        cy.validateSchema(response.body, schemafile).then((isValidschema) => {
            expect(isValidschema).to.be.equal(true)
        })
    })
});

When('I make a GET request for user having id as {string}', (userID) => {
    cy.apiRequest('GET', requestEndPoint + "/" + userID).as('response')
});

When('I make a POST request to create a new user with name as {string} and job as {string}', (name, job) => {
    const options = {
        body: {
            "name": name,
            "job": job
        }
    }
    cy.apiRequest('POST', requestEndPoint, options).as('response')
});

And('the new user must be created successfully with following details', (userDetails) => {
    cy.get('@response').then((response) => {
        userDetails.hashes().forEach((detail) => {
            expect(detail.name).to.be.equal(response.body.name)
            expect(detail.job).to.be.equal(response.body.job)
            expect(response.body.id).not.be.empty
        });
    })
})

When('I make a PUT request to update user details having id as {string}', (userID) => {
    const options = {
        body: {
            "name": userName,
            "job": jobTitle,
        }
    }
    cy.apiRequest('PUT', requestEndPoint + "/" + userID, options).as('response')
});

And('the user details must be updated successfully', () => {
    cy.get('@response').then((response) => {
        expect(response.body.name).to.be.equal(userName)
        expect(response.body.job).to.be.equal(jobTitle)
    })
});

When('I make a Delete request to delete user details having id as {string}', (userID) => {
    cy.apiRequest('DELETE', requestEndPoint + "/" + userID).as('response')
});

