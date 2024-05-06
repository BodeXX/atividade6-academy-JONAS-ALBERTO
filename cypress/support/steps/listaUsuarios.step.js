import {
  Given,
  When,
  Then,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

const usuarioCriado = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
};

Before({ tags: '@listaUsuario' }, () => {
  cy.log('Executou o hook da @listaUsuario...');
});

Given('que acessei o sistema', function () {
  cy.visit('./app/usuarios.html');
});

Given('existe um usuário cadastrado', function () {
  cy.request(
    'POST',
    'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
    usuarioCriado
  );
});

// Given('que acessei a funcionalidade de listagem de usuários', function () {
//   cy.visit('./app/usuarios.html');
// });

When('verificar os usuários listados', function () {});

Then('o usuário cadastro deverá estar na lista', function () {
  cy.contains(usuarioCriado.name).should('be.visible');
  cy.contains(usuarioCriado.email).should('be.visible');
});
