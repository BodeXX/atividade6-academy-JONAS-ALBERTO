describe('template spec', () => {
  it('Deve visitar o site institucional', () => {
    cy.visit('');
    cy.url().should('equal', 'https://rarolabs.com.br/');
  });

  it('Deve visitar o site institucional com dimensões de tela customizáveis', () => {
    cy.viewport(550, 750);
    cy.visit('');
    cy.url().should('equal', 'https://rarolabs.com.br/');
  });

  it('Deve abrir a página de sobre', function () {
    cy.visit('/sobre');
    cy.url().should('equal', 'https://rarolabs.com.br/sobre');
  });

  it('Deve abrir a página de sobre de um iphone 8', function () {
    cy.viewport('iphone-8');
    cy.visit('/sobre');
    cy.url().should('equal', 'https://rarolabs.com.br/sobre');
  });
});
