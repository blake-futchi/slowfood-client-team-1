describe("user can view menu by category", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com"
      }
    });
    cy.get("#render-login").click();
    cy.get("#login").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
  });

  describe("where there are categories", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: "fixture:product_data.json"
      });
    });

    it("successfully for starter", () => {
      cy.get("#starter-index").should("contain", "Salad");
      cy.get("#starter-index").should("not.contain", "Spaghetti and Meatballs");
      cy.get("#starter-index").should("not.contain", "Ice Cream");

      cy.get("#entree-index").should("contain", "Spaghetti and Meatballs");
      cy.get("#dessert-index").should("contain", "Ice Cream");
    });
  });
});
