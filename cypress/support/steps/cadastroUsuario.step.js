import {
  Given,
  When,
  Then,
  Before,
  After,
} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';
const paginaCadastro = new CadastroPage();

// hooks do Mocha possuem a letra minuscula
// before(() => {
//   cy.log('Executou o hook do mocha');
// });

// beforeEach(() => {
//   cy.log('Executou o beforeEach do Mocha');
// });

// after(() => {
//   cy.log('Executou o after do Mocha');
// });

Before({ tags: '@cadastroUsuario' }, () => {
  cy.log('... executou o hook before');
});

Before({ tags: '@erroCadastro' }, () => {
  cy.log('.. executou o hook');
});

After({ tags: '@cadastroUsuario' }, () => {
  cy.log('... executou o hook após um cenário com a tag @cadastroUsuario.');
});

Given('que acessei o sistema', function () {
  cy.visit('./app/index.html');
});

When('informar um novo nome', function () {
  paginaCadastro.typeNome(faker.person.fullName());
});

When('informar um novo e-mail', function () {
  var novoEmail = faker.internet.email();
  cy.wrap(novoEmail).as('emailFaker');
  paginaCadastro.typeEmail(novoEmail);
});

When('confirmar a operação', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickButtonCadastrar();
});

When('informar o e-mail {string}', function (email) {
  paginaCadastro.typeEmail(email);
});

When(
  'informar um e-mail com mais de {int} caracteres {string}',
  function (tamanho, email) {
    paginaCadastro.typeEmail(email);
  }
);

When('informar um novo nome e email', function (tabela) {
  const dados = tabela.rowsHash();
  cy.log(dados);
  paginaCadastro.typeEmail(dados.email);
});

When('informar o nome {string}', function (nome) {
  paginaCadastro.typeNome(nome);
});

Then(
  'não será possível concluir a tentativa de cadastro do usuário',
  function () {
    paginaCadastro.getListaUsuarios().should('be.empty');
  }
);

Then('o usuário será registrado na lista', function () {
  cy.get('@emailFaker').then((email) => {
    paginaCadastro.getListaUsuarios().should('contain', email);
  });
});

Then('o usuário não será registrado na lista', function () {
  cy.wait('@postUsuario');
  paginaCadastro.getListaUsuarios().should('be.empty');
});

Then(
  'não deve ser possível extrapolar o limite de {int} caracteres do e-mail no cadastro',
  function (tamanhoMaximo) {
    cy.get(paginaCadastro.inputEmail)
      .invoke('val')
      .then((emailDigitado) => {
        expect(emailDigitado.length).to.equal(tamanhoMaximo);
      });
  }
);

Before({ tags: '@emailJaCadastrado' }, () => {
  const email = faker.internet.email();
  cy.wrap(email).as('emailJaCadastrado');
  cy.request(
    'POST',
    'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
    {
      name: faker.person.fullName(),
      email,
    }
  );
});

When('informar um e-mail já utilizado', function () {
  cy.get('@emailJaCadastrado').then((email) => {
    paginaCadastro.typeEmail(email);
  });
});

Then('devo visualizar uma mensagem de erro', () => {
  //
});
