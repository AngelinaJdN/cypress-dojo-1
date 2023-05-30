describe('Site saucedemo', () => {
    
    //Ouvrir le site avant chaque scénario:
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.fixture('data.json').as('users')
    });
    //Premier scénario
    it('Connexion 1', function() {
      const user = this.users[0];
      cy.connexion(user.username, user.password);
      cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    });
    //Deuxième scénario
    it('Connexion 2', function() {
      const user = this.users[1];
      cy.connexion(user.username, user.password);
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    //Troisième scénario
    it('Connexion 3', function() {
      const user = this.users[2];
      cy.connexion(user.username, user.password);
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
    //Quatrième scénario
    it('Connexion 4', function() {
      const user = this.users[3];
      cy.connexion(user.username, user.password);
      cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
    });
})