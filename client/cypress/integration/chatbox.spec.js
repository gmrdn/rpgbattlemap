/// <reference types="cypress" />
context("Chatbox", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room/*/chatmessages",
      response: "fixture:rooms/chatmessages.json"
    }).as("getChatMessages");

    cy.visit("/room/5e8652d99e6f56c6b0ff1d99");
  });

  it("should render previous history", () => {
    cy.wait("@getChatMessages");
    cy.get("#messages-log").should("contain", "Hi everyone");
  });

  it("should scroll to the last messages", () => {
    cy.wait("@getChatMessages");
    cy.get("#messages-log").scrollIntoView();
    cy.contains("Last message").should("be.visible");
  });
});
