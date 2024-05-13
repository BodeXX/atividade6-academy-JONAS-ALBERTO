export default class ListaUsuarioPage {
 
  nomeInput = '#name';
  emailInput = '#email';
  listName = '.sc-gsFSXq mUpIH';
  listEmail = '.sc-gsFSXq mUpIH';
  
  verificarUsuariosListados(usuarios) {
    cy.get('.userDataName').each(($el, index) => {
      expect($el.text()).to.equal(usuarios[index].name); 
      expect($el.find('.userDataEmail').text()).to.equal(usuarios[index].email); 
    });
  }

  typeProximaPag(){
    cy.contains('Próxima').click();
  }

  typeNome(nome) {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');

    cy.get(this.listName).type(nome);
  }

  clickListUser() {
    cy.contains("E-mail ou nome").click();
  }

  typeEmail(email) {
    cy.get(this.listEmail).type(email);
  }

  typeCadastro(nome, email) {
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
    cy.get(this.nomeInput).type(nome);
    cy.get(this.emailInput).type(email);
    cy.contains("Salvar").click();
  }

}
