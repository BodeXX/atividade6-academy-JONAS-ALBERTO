import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { faker } from '@faker-js/faker';

const usuarioCriado = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
};

Given('existe um usuário cadastrado', function () {
  cy.request(
    'POST',
    'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
    usuarioCriado
  );
});

Given('que acessei a funcionalidade de listagem de usuários', function () {
  cy.visit('./app/usuarios.html');
});

When('verificar os usuários listados', function () {});

Then('o usuário cadastro deverá estar na lista', function () {
  cy.contains(usuarioCriado.name).should('be.visible');
  cy.contains(usuarioCriado.email).should('be.visible');
});
