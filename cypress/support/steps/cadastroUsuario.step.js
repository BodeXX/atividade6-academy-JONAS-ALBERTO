import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/cadastro.page';

const paginaCadastro = new CadastroPage();

const email60 = "bodqqwertyuiopqwiuryqwertyuiopqwiuryqwertyuiopqasdasddfg@t.com"
const novoEmail = faker.internet.email();
const nome = faker.name.firstName();
const novoEmailCad = faker.internet.email();

Given('que acessei o sistema', function () {
  cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/novo');
});

//Cenário: Cadastro de usuário com sucesso
When('informar um novo nome', function () {
  paginaCadastro.typeNome(nome);
});

When('informar um e-mail', function () {
  paginaCadastro.typeEmail(novoEmail);
});

When('clicar em salvar', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickSalvar();
});

Then('o usuário será registrado com sucesso na lista', function () {
  cy.contains('Usuário salvo com sucesso').should('be.visible');
});


//Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
When('informar um novo e-mail', function () {
  paginaCadastro.typeEmail(novoEmail);
});

When('tentar confirmar o cadastro', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickSalvar();
});

Then('recebe um alerta "O campo nome é obrigatório"', function () {
  cy.contains('O campo nome é obrigatório.').should('be.visible');
});


//Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres

When('informo um novo nome', function () {
  paginaCadastro.typeNome(nome);
});

When('informar um e-mail com mais de 60 caracteres', function () {
  paginaCadastro.typeEmail(email60);
});

When('clicar em salvar ', function (){
  paginaCadastro.clickSalvar();
})

Then('não deve ser possível extrapolar o limite de 60 caracteres do e-mail no cadastro', function () {
  cy.contains('Informe no máximo 60 caracteres para o e-mail').should('be.visible');
});



//Cenário: Não deve ser possível cadastrar um usuário com nome vazio e e-mail inválido
When('informar um nome vazio e email invalido', function () {
  paginaCadastro.typeEmail('emailinvalid@');
});

When('confirmar o cadastro', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickSalvar();
});

Then('o usuário não será registrado na lista', function () {
  cy.contains('O campo nome é obrigatório.').should('be.visible');
  cy.contains('Formato de e-mail inválido').should('be.visible');
});


//Cenário: Não deve ser possível cadastrar um usuário com e-mail em formato inválido
When('coloco um novo nome', function () {
  paginaCadastro.typeNome(nome);
});

When('informar o e-mail invalido "tester@teste"', function () {
  paginaCadastro.typeEmail('emailinvalid@');
});

When('confirmo o cadastro', function (){
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickSalvar();
});

Then('o usuário não será registrado', function (){
  cy.contains('Formato de e-mail inválido').should('be.visible');
});



//Cenário: Não deve ser feita uma tentativa de cadastro se os dados de cadastro forem inválidos

When('informar um nome', function () {
  paginaCadastro.typeNome('@');
});

When('informar o e-mail', function () {
  paginaCadastro.typeEmail('teste@com');
});

When('click em salvar', function () {
  cy.intercept('POST', 'api/v1/users').as('postUsuario');
  paginaCadastro.clickSalvar();
});

Then('não será possível concluir a tentativa de cadastro do usuário', function () {
  cy.contains('Informe pelo menos 4 letras para o nome.').should('be.visible');
  cy.contains('Formato de e-mail inválido').should('be.visible');
});



//Cenário: Não deve ser possível cadastrar um usuário com e-mail já cadastrado

When('crio um novo usuário', function (){
    paginaCadastro.typeCadastro(nome, novoEmailCad)
    cy.wrap(novoEmailCad).as('emailNovoUsuario')
    paginaCadastro.clickSalvar();
});

When('informo um nome', function (){
  paginaCadastro.typeNome(nome);
})


When('informo um e-mail já cadastrado', function (){
  cy.get('@emailNovoUsuario')
    .then((email) => {
      paginaCadastro.typeEmail(email);
      paginaCadastro.clickSalvar();
    });
  })
Then('devo visualizar uma mensagem de erro', function (){
  cy.contains('Este e-mail já é utilizado por outro usuário.').should('be.visible');
});
