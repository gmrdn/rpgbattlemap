/// <reference types="cypress" />
context("Room Creation", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "api/room",
    }).as("newRoom");

    cy.visit("/");
  });

  it("should allow a user to create a new room", () => {
    cy.get("#btn-create").click();
    cy.url().should("contain", "createroom");
    cy.get("#txt-room-name")
      .should("be.visible")
      .type("Mansion on the Cypress Hill");
    cy.get("#background-grass").should("be.visible");
    cy.get("#btn-create").should("be.visible").click();
    // cy.wait("@newRoom").should("have.any.keys", "name");
  });
});
