# language: pt

Funcionalidade: Lista de usuários

Contexto: Usuário deve ter acessado o sistema
  Dado que acessei o sistema

Cenário: Listar todos os usuários cadastrados
  Quando verifico os usuários listados
  Então devo ver todos os usuários cadastrados no sistema


Cenário: Encontrar um usuário específico pelo nome
  Quando existe um usuário cadastrado
  Quando verifico os usuários com nome de usuário cadastrado
  Então o usuário cadastro deverá estar na lista

Cenário: Encontrar um usuário específico por e-mail
  Quando que acessei a funcionalidade de listagem de usuários
  Quando buscar por um usuário específico pelo e-mail
  Então devo ver o usuário na lista de resultados

Cenário: Não encontrar um usuário inexistente
  Quando que acessei a funcionalidade de listagem de usuários
  Quando buscar por um usuário inexistente
  Então devo ver uma mensagem informando que o usuário não foi encontrado

Cenário: Deve existir a opção de cadastrar usuário quando não há usuários cadastrados
  Dado que acessei a funcionalidade de listagem de usuários
  Quando não houver nenhum usuário cadastrado
  Então devo ver a opção de cadastrar um novo usuário