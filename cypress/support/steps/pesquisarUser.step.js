import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import pesquisarUser from '../pages/pesquisarUser.page';
import { faker } from '@faker-js/faker';
import { list } from '@badeball/cypress-cucumber-preprocessor/pretty-reporter';


const pesquisarUsuarioPage = new pesquisarUser();
const email = faker.internet.email();
const nome = faker.name.firstName();

//Pesquisar usuário existente pelo nome

When('cadastro um novo usuario', () => {
    pesquisarUsuarioPage.visit();
    pesquisarUsuarioPage.typeCadastro(nome, email);
    cy.intercept('POST', 'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users').as('postUser');
    cy.wait('@postUser');
    cy.wrap(email).as('emailNovoUsuario');
    cy.wrap(nome).as('nomeNovoUsuario');
    cy.visit('https://rarocrud-frontend-88984f6e4454.herokuapp.com/users');
});

When('pesquiso por um usuário existente pelo nome', () => {
    cy.get('@nomeNovoUsuario').then((nome) => {
        pesquisarUsuarioPage.pesquisarPorNome(nome);
        cy.wait(1000);
    });
});

Then('devo ver o usuário cadastrado na lista de resultados', () => {
    cy.get('.userDataEmail').should('contain', nome);
  });



//Cenário: Pesquisar usuário existente pelo email



When('pesquiso por um usuário existente com o email', () => {
        pesquisarUsuarioPage.pesquisarPorEmail(email);
        cy.wait(1000);
});

Then('devo ver o usuário cadastrado na lista de resultados', () => {
    cy.get('#listaUsuarios').should('contain', email);
});

