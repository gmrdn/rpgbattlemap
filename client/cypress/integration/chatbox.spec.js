/// <reference types="cypress" />
context("Chatbox", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "api/room/*/chatmessages",
      response: "fixture:rooms/chatmessages.json",
    }).as("getChatMessages");

    cy.visit("/room/dIAHyZ55S");
    cy.get("#nickname").type("Cypress FakeUser").get("#btn-join").click();
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

  it("should display an information when a user joins the room", () => {
    cy.get("#messages-log").should(
      "contain.text",
      "Cypress FakeUser has joined the room."
    );
  });

  it("should type and display new messages", () => {
    cy.get("#message-input").type("New message{enter}");
    cy.get("#message-input").should("be.empty");
    cy.get("#messages-log").should("contain", "Cypress FakeUser : New message");
  });
});
