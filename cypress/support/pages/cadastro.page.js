export default class CadastroPage {
  nomeInput = '#name';
  emailInput = '#email';
  buttonSalvar = "[type='submit']";
  

  typeNome(nome) {
    cy.get(this.nomeInput).type(nome);
  }

  typeEmail(email) {
    cy.get(this.emailInput).type(email);
  }

  clickSalvar() {
    cy.contains("Salvar").click();
  }

  typeCadastro(nome, email) {
    cy.get(this.nomeInput).type(nome);
    cy.get(this.emailInput).type(email);
    cy.contains("Salvar").click();
  }
};
