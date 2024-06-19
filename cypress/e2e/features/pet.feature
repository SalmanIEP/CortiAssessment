Feature: Pet Api Endpoint Verifcation

  Scenario: Successfully upload the image to the existing pet record
    Given the API endpoint is "pet"
    When I make a POST request with image against the pet id
    Then the response status code should be "200"

Scenario: Verify user must able to add a new pet to the store
    Given the API endpoint is "pet"
    When I make a POST request to add a new pet
    Then the response status code should be "200"
    And pet must be added successfully
    And the response content must follow the required schema as "newPet_Schema"
