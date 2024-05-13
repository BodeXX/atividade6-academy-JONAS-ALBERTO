import {
  Given,
  When,
  Then
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import ListaUsuarioPage from '../pages/listaUsuario.page';
import listarUserFixture from '../fixtures/listarUserFixture';


const name = faker.person.fullName();
const email = faker.internet.email();
const listPage = new ListaUsuarioPage();

Given('que acessei o sistema', function () {
  cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

When('verifico os usuários listados', function () {
 
  cy.fixture(listarUserFixture).then((usuarios) => {
   
    cy.intercept('GET', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users', usuarios).as('getUsers');

    cy.wait('@getUsers');
    listPage.verificarUsuariosListados(usuarios);
  });
});

Then('devo ver todos os usuários cadastrados no sistema', () => {
  cy.get('.userDataName').should('have.length.greaterThan', 0);
});

When('existe um usuário cadastrado', function (){
    listPage.typeCadastro(name, email);
    cy.wrap(name).as('nomeCadastrado');
});

When('verifico os usuários listados com nome do usuário cadastrado', function (){
  
  listPage.clickListUser();
});