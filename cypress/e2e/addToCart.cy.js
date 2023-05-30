// <reference types="cypress" />

describe('Site saucedemo', () => {
  //Ouvrir le site avant chaque scénario:
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });
  //Premier scénario: connexion au site
  it('Se connecter', () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.wait(1000);
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  });
  //Deuxième scénario: connexion puis achat d'un produit
  it('Acheter un produit', () => {
    var prodNum = 0;
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.wait(1000);
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    if(cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()) prodNum++;
    cy.get('.shopping_cart_link').click();
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
    cy.get('.inventory_item_name').should('exist');
    //cy.get('.shopping_cart_badge').should('contain', prodNum); //pas idéal, à modifier
    cy.get('[data-test="checkout"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Angelina');
    cy.get('[data-test="lastName"]').type('do Nascimento');
    cy.get('[data-test="postalCode"]').type('33140');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
  });
  //Prendre une capture en fin de suite de test
  after(() => {
    cy.screenshot()
  });
})