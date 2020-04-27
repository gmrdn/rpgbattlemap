/// <reference types="cypress" />
context("Tokens", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room/BdAdj192k",
      response: "fixture:rooms/room-with-tokens.json",
    }).as("getTokens1");

    cy.route({
      method: "GET",
      url: "api/room/dIAHyZ55S",
      response: "fixture:rooms/room-with-chatmessages.json",
    }).as("getTokens2");

    cy.visit("/room/BdAdj192k");
    cy.get("#nickname").type("Cypress FakeUser").get("#btn-join").click();
  });

  it("should display previous tokens", () => {
    cy.wait("@getTokens1");
    cy.get("#avatar-1-1").should("be.visible");
    cy.get("#avatar-5-5").should("be.visible");
  });

  it("should reset tokens when changing room", () => {
    cy.wait("@getTokens1");
    cy.get("#avatar-1-1").should("be.visible");
    cy.get("#avatar-5-5").should("be.visible");
    cy.get("#nav-home").click();
    cy.get("#txt-room-id").type("dIAHyZ55S");
    cy.get("#btn-join").click();
    cy.get("#nickname").type("No Token Expected");
    cy.get("#btn-join").click();
    cy.get("#avatar-1-1").should("not.exist");
    cy.get("#avatar-5-5").should("not.exist");
  });

  it("should delete token", () => {
    cy.wait("@getTokens1");
    cy.get("#avatar-2-3").should("be.visible");
    cy.get("#tokenchip-2-3 svg.MuiChip-deleteIcon").click();
    cy.get("#confirmation-popin").should("be.visible");
    cy.get("#btn-cancel").click();
    cy.get("#avatar-2-3").should("be.visible");
    cy.get("#tokenchip-2-3 svg.MuiChip-deleteIcon").click();
    cy.get("#confirmation-popin").should("be.visible");
    cy.get("#btn-confirm-delete").click();
    cy.get("#tokenchip-2-3 svg.MuiChip-deleteIcon").should("not.exist");
  });
});
