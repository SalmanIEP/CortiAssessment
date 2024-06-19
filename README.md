# Initial Asessment Task
Task is to verify the endpoints provided https://petstore.swagger.io by writing as many relevant
test cases

## Installation
Clone this repo and install packages
Before Running the test use below commands to install all dependencies in the root of the projects
```
npm install
```


# A list of technologies used within the project:
***

* [Cypress](https://www.cypress.io/): Version 13.6.0
* [mochawesome](https://www.npmjs.com/package/mochawesome): Version 7.1.0
* [ajv](https://www.npmjs.com/package/ajv): Version 8.12.0
* [cypress-cucumber-preprocessor](https://www.npmjs.com/package/cypress-cucumber-preprocessor): Version 4.3.1
* [Faker](https://www.npmjs.com/package/@faker-js/faker): Version 6.6.6


* Cypress
Cypress is used for API's Automation testing
* mochawesome
For html test report mochawesome is used
* ajv
For Schema validation of the API's responses ajv is used
* cypress-cucumber-preprocessor
Test are written is feature file using Gharkin syntax for this cypress-cucumber-preprocessor is used


# Folder Structure
* Fixtures
Fixtures folder contains all Testdata and Expected Schemas for Schema validation of API's response
* e2e
e2e folder contains Features and Step definitions files, every api endpoint has its own feature file and step definition
* reports
reports folder contains the html reports that will be generated at end of test execution

# APis Covered in automation tests
* pets


# Schema Validation
* Schema validations for the Api response is also covered in test for "users" api


# Running All Tests
You can execute all tests together by executing below command

```
$ npm run cy:run
```


# Running individual feature files
You can execute individual feature by executing below commands,

```
$ npm run cy:run:pet,feature
```
# Generate Report
To generate the test report, execute the following command to generate

```
$ npm run generate_final_report
```

