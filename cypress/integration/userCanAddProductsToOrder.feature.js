
describe("User can add a product to his/her order", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:product_data.json"
    });

    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/orders",
      response: "fixture:post_response.json"
    });

    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/orders/1",
      response: "fixture:put_response.json"
    });

    cy.visit("http://localhost:3001");

    cy.route({
      method: 'POST',
      url: "http://localhost:3000/api/auth/sign_in",
      response: 'fixture:login.json',
      headers: {
          uid: 'user@mail.com'
      }
  });
cy.get('#render-login').click();
cy.get('#login').within(() => {
    cy.get('#email').type('user@mail.com');
    cy.get('#password').type('password');
    cy.get('button').contains('Submit').click()
});
  });

  it("user can add multiple product to order and view its content", () => {
    cy.get("button")
      .contains("View order")
      .should("not.exist");
    cy.get("#product-2").within(() => {
      cy.get("button")
        .contains("Add to order")
        .click();
      cy.get(".message").should(
        "contain",
        "This item has been added to your order."
      );
    });

    cy.get("button")
      .contains("View order")
      .should("exist");

    cy.get("#product-3").within(() => {
      cy.get("button")
        .contains("Add to order")
        .click();
      cy.get(".message").should(
        "contain",
        "This item has been added to your order."
      );
    });

    cy.get("button")
      .contains("View order")
      .click();

    cy.get("#order-details").within(() => {
      cy.get("li")
        .should("have.length", 2)
        .first()
        .should("have.text", "1 x Salad")
        .next()
        .should("have.text", "1 x Ice Cream");
    });

    cy.get("button")
      .contains("View order")
      .click();

    cy.get("#order-details").should("not.exist");
  });
});
