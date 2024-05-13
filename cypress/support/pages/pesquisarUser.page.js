import { list } from "@badeball/cypress-cucumber-preprocessor/pretty-reporter";

export default class PesquisarUsuarioPage {

    nomeInput = '#name';
    emailInput = '#email';

    visit() {
      cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
    }
  
    clicarNaAbaPesquisa() {
      cy.get('.sc-gsFSXq.mUpIH').click();
    }
  
    pesquisarPorNome(nome) {
      cy.get('.sc-gsFSXq.mUpIH').type(nome);
    }
  
    pesquisarPorEmail(email) {
      cy.get('.sc-gsFSXq.mUpIH').type(email);
    }
  
    verificarUsuarioNaLista(email) {
      cy.contains('Ver detalhes').click()
      //cy.get('#userEmail').should('contain', email);
    }
  
    verificarMensagemNenhumUsuarioEncontrado() {
      cy.get('h3.sc-koXPp.csBRDe').should('contain', 'Ops! Não existe nenhum usuário para ser exibido.');
    }
  
    verificarOpcaoCadastro() {
      cy.get('.sc-bmzYkS.dmSxaj').should('exist');
    }

    typeCadastro(nome, email) {
      cy.contains("Novo").click();
        cy.get(this.nomeInput).type(nome);
        cy.get(this.emailInput).type(email);
        cy.contains("Salvar").click();
      }
  }
  