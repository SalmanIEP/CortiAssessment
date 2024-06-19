/// <reference types="cypress" />
import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
var requestEndPoint;


Given('the API endpoint is {string}', (endpoint) => {
    requestEndPoint = endpoint;
});

When('I make a POST request with image against the pet id', () => {
    var petid;

    cy.fixture('petdata.json').then((data) => {
        petid = data["petDetails"].id;
        cy.log(data.id)
      });

        cy.fixture('jpeg444.jpg', 'binary').then((imageBinary) => {

            const blob = Cypress.Blob.binaryStringToBlob(imageBinary, 'image/jpeg');
            const formData = new FormData();
            formData.append('file', blob, 'jpeg444.jpg');

            const options = {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            }
            cy.apiRequest('POST', requestEndPoint+"/"+petid+"/uploadImage", options).as("response")
        })
        
});

When('I make a POST request to add a new pet', () => {
    cy.fixture('newpet.json').then((data) => {
        let newPet = data;
        const options = {
            body: newPet
        }
            cy.apiRequest('POST', requestEndPoint, options).as("response")
        })
        
});

Then('the response status code should be {string}', (statusCode) => {
    cy.get('@response').then((response) => {
        expect(response.status).to.eq(parseInt(statusCode));
    })
});

And('pet must be added successfully', () => {
    cy.get('@response').then((response) => {
        expect(response.body).to.have.property('id').and.be.a('number');
    })
});

And('the response content must follow the required schema as {string}', (schemafile) => {
    cy.get('@response').then((response) => {
        cy.validateSchema(response.body, schemafile).then((isValidschema) => {
            expect(isValidschema).to.be.equal(true)
        })
    })
});