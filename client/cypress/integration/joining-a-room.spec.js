/// <reference types="cypress" />
context("Joining a room", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room",
      response: "fixture:rooms/rooms.json",
    }).as("getRooms");

    cy.visit("/");
  });

  it("should ask for nickname after room id", () => {
    cy.get("#txt-room-id").type("dIAHyZ55S");

    cy.get("#btn-join").click();

    cy.url().should("contain", "/joinroom/dIAHyZ55S");
    cy.get("#nickname").type("Cypress FakeUser");

    cy.get("#btn-join").click();

    cy.url().should("contain", "/room/dIAHyZ55S");
    cy.get("#header-room-id").should("have.text", "dIAHyZ55S");
    cy.get("#header-nickname").should("have.text", "Cypress FakeUser");
  });
});
