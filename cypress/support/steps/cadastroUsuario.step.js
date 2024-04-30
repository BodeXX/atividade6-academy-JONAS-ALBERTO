import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
const paginaCadastro = new CadastroPage();

var novoEmail;

Given('que acessei a funcionalidade de cadastro', function () {
  cy.visit('./app/index.html');
});

When('informar um novo nome', function () {
  paginaCadastro.typeNome(faker.person.fullName());
});

When('informar um novo e-mail', function () {
  novoEmail = faker.internet.email();
  paginaCadastro.typeEmail(novoEmail);
});

When('confirmar a operação', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickButtonCadastrar();
});

Then('o usuário será registrado na lista', function () {
  paginaCadastro.getListaUsuarios().should('contain', novoEmail);
});

Then('o usuário não será registrado na lista', function () {
  cy.wait('@postUsuario');
  paginaCadastro.getListaUsuarios().should('be.empty');
});
