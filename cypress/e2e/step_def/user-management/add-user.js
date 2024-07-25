/// <reference types = "cypress"/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from "@faker-js/faker";

const userName = faker.internet.userName();

Given("goto user management page", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('[name="username"]').type("Admin");
  cy.get('[type="password"]').type("admin123");
  cy.get('[type="submit"]').click();
  cy.wait(5000);
  cy.url().should("contain", "/dashboard/index");
  cy.get('[class="oxd-main-menu"] li:nth-child(1)').click();
  cy.wait(2000);
});

When("click on add button and fill all the details", () => {
  cy.get(
    '[class="oxd-button oxd-button--medium oxd-button--secondary"]'
  ).click();
  cy.get('[class="oxd-select-text oxd-select-text--active"]')
    .first()
    .click()
    .type("{downarrow}")
    .type("{enter}");
  cy.get(
    '[class="oxd-autocomplete-text-input oxd-autocomplete-text-input--active"]'
  )
    .type("sree hema latha")
    .wait(3000)
    .type("{downarrow}")
    .type("{enter}");
  cy.get('[class="oxd-select-text oxd-select-text--active"]')
    .last()
    .click()
    .type("{downarrow}")
    .type("{enter}");
  cy.get('[class="oxd-input oxd-input--active"]').eq(1).type(userName);
  cy.get('[class="oxd-input oxd-input--active"]').eq(2).type("Itobuz#1234");
  cy.get('[class="oxd-input oxd-input--active"]').last().type("Itobuz#1234");
  cy.get('[type="submit"]').click();
});

Then("new user is added to the list", () => {
  cy.wait(10000);
  cy.get('[class="oxd-table-body"] [class="oxd-table-card"]').then(($table) => {
    const tableLength = $table.length;
    let userFound = false;

    for (let i = 1; i <= tableLength && !userFound; i++) {
      const selector = `[class="oxd-table-body"] [class="oxd-table-card"]:nth-child(${i}) div:nth-child(2) div`;
      cy.get(selector).then(($el) => {
        if ($el.text() === userName) {
          console.log("User is added to the list");
          userFound = true;
        }
      });
    }
  });
});

Then("click on edit button for edit the user info", () => {
  cy.get('[class="oxd-table-body"] [class="oxd-table-card"]').then(($table) => {
    const tableLength = $table.length;
    let userFound = false;

    for (let i = 1; i <= tableLength && !userFound; i++) {
      const selector = `[class="oxd-table-body"] [class="oxd-table-card"]:nth-child(${i}) div:nth-child(2) div`;
      cy.get(selector).then(($el) => {
        if ($el.text() === userName) {
          const editSelector = `[class="oxd-table-body"] [class="oxd-table-card"]:nth-child(${i}) div:nth-child(6) div button:nth-child(2)`;
          cy.get(editSelector).click();
          cy.get('[type="submit"]').click();
          userFound = true;
        }
      });
    }
  });
});

Then("click on sort button and verify the user name", () => {

  cy.get('[class="oxd-table-header-sort"]').first().click();
  cy.get('[class="oxd-table-header-sort-dropdown-item"]').first().click();
  const accTextValues = [];
  cy.get('[class="oxd-table-body"] [class="oxd-table-card"]').then(($table) => {
    const tableLength = $table.length;

    for (let i = 1; i <= tableLength; i++) {
      cy.get(
        `.oxd-table-body .oxd-table-card:nth-child(${i}) div:nth-child(2) div`
      )
        .invoke("text")
        .then((text) => {
          accTextValues.push(text.trim());
        });
    }
  });
  const accData = accTextValues.sort();
  if (accTextValues === accData) {
    console.log('Acceding sort happened!')
    
  }
  
});
