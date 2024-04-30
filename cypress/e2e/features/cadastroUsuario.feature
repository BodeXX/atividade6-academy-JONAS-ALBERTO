# language: pt
Funcionalidade: Cadastro de usuário

Cenário: Cadastro de usuário com sucesso
  Dado que acessei a funcionalidade de cadastro
  Quando informar um novo nome
  E informar um novo e-mail
  E confirmar a operação
  Então o usuário será registrado na lista

Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
  Dado que acessei a funcionalidade de cadastro
  Quando informar um novo e-mail
  E confirmar a operação
  Então o usuário não será registrado na lista

## todo cenário de e-mail já cadastrado