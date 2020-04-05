/// <reference types="cypress" />
context("Room Creation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should open the room creation form", () => {
    cy.get("#btn-create").click();
    cy.url().should("contain", "createroom");
    cy.get("#txt-grid-name").should("be.visible");
    cy.get("#btn-validate").should("be.visible");
  });
});
