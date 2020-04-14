/// <reference types="cypress" />
context("Room Selection", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room",
      response: "fixture:rooms/rooms.json",
    }).as("getRooms");

    cy.visit("/roomselection");
  });

  it("should display the room's list", () => {
    cy.wait("@getRooms");
    cy.get("#room-list").should("be.visible");
    cy.get("#room-0").should("have.text", "dIAHyZ55S");
    cy.get("#room-3").should("have.text", "dIAHccx5S");
  });

  it("should navigate to the selected room", () => {
    cy.wait("@getRooms");
    cy.get("#room-0")
      .click()
      .get("#nickname")
      .type("Cypress FakeUser")
      .get("#btn-join")
      .click()
      .get("#room-name")
      .should("have.text", "Newly created grid");

    cy.visit("/roomselection");

    cy.get("#room-3")
      .click()
      .get("#nickname")
      .type("Cypress FakeUser")
      .get("#btn-join")
      .click()
      .get("#header-room-id")
      .should("have.text", "dIAHccx5S");
  });
});
