/// <reference types="cypress" />
context("Navigation Bar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to all pages", () => {
    cy.get("#nav-room-selection").click();
    cy.contains("Room Selection Component");
    cy.get("#nav-current-room").click();
    cy.contains("Room component");
  });
});
