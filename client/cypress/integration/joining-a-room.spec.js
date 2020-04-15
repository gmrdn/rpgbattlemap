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

  it("should join a room after asking for room id and nickname", () => {
    cy.get("#txt-room-id").type("dIAHyZ55S");

    cy.get("#btn-join").click();

    cy.url().should("contain", "/joinroom/dIAHyZ55S");
    cy.get("#nickname").type("Cypress FakeUser");

    cy.get("#btn-join").click();

    cy.url().should("contain", "/room/dIAHyZ55S");
    // header displays information
    cy.get("#header-room-id").should("have.text", "dIAHyZ55S");
    cy.get("#header-nickname").should("have.text", "Cypress FakeUser");
  });

  it("should redirect to nickname input if no nickname is provided", () => {
    cy.visit("/room/dIAHyZ55S");
    cy.get("#nickname").should("be.visible");
    cy.get("#nickname").type("Cypress FakeUser");

    cy.get("#btn-join").click();

    cy.url().should("contain", "/room/dIAHyZ55S");
    cy.get("#header-room-id").should("have.text", "dIAHyZ55S");
    cy.get("#header-nickname").should("have.text", "Cypress FakeUser");
  });

  it("should redirect to home if no room id is provided", () => {
    cy.visit("/room");
    cy.get("#txt-room-id").should("be.visible");
  });
});
