/// <reference types="cypress" />
context("Room Selection", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room",
      response: "fixture:rooms/rooms.json"
    }).as("getRooms");

    cy.visit("/roomselection");
  });

  it("should display the room's list", () => {
    cy.wait("@getRooms");
    cy.get("#room-list").should("be.visible");
    cy.get("#room-0").should("have.text", "5e8652b29e6f56c6b0ff1d79");
    cy.get("#room-3").should("have.text", "5e8652d99e6f56c6b0ff1d99");
  });

  it("should navigate to the selected room", () => {
    cy.wait("@getRooms");
    cy.get("#room-0")
      .click()
      .get("h1")
      .should("have.text", "Room 5e8652b29e6f56c6b0ff1d79");

    cy.visit("/roomselection");

    cy.get("#room-3")
      .click()
      .get("h1")
      .should("have.text", "Room 5e8652d99e6f56c6b0ff1d99");
  });
});
