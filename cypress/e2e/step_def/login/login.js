/// <reference types = "cypress"/>
import { Given, When, Then} from "cypress-cucumber-preprocessor/steps";

Given("open the URL", ()=> {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
})

When("write username and password and click on login button", ()=> {
    cy.get('[name="username"]').type('Admin');
    cy.get('[type="password"]').type('admin123');
    cy.get('[type="submit"]').click();
})

Then("dashboard page open", ()=> {
    cy.wait(5000);
    cy.url().should('contain', '/dashboard/index');
})