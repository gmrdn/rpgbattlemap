/// <reference types="cypress" />
context("Room Selection", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room",
      response: "fixture:rooms/rooms.json",
    }).as("getRooms");

    cy.route({
      method: "GET",
      url: "api/room/5eb3006a6fb25ec2e272a290",
      response: "fixture:rooms/room-with-one-token.json",
    }).as("getRooms");

    cy.visit("/roomselection");
  });

  it("should display the room's list", () => {
    cy.wait("@getRooms");
    cy.get("#room-list").should("be.visible");
    cy.get("#room-0").should("have.text", "5eb3006a6fb25ec2e272a290");
    cy.get("#room-3").should("have.text", "5eb3031917deb2c39cc84ba9");
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
      .should("have.text", "Temple of elemental evil");

    cy.visit("/roomselection");

    cy.get("#room-3")
      .click()
      .get("#nickname")
      .type("Cypress FakeUser")
      .get("#btn-join")
      .click()
      .get("#header-room-id")
      .should("have.text", "5eb3031917deb2c39cc84ba9");
  });
});
