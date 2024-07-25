Feature: Add user flow

    Scenario: Add a user with valid data
    Given goto user management page
    When click on add button and fill all the details
    Then new user is added to the list


    Scenario: Edit the user
    Given goto user management page
    Then  click on edit button for edit the user info

    Scenario: Sorting the user
    Given goto user management page
    Then  click on sort button and verify the user name





