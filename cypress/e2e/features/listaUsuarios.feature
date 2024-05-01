# language: pt
Funcionalidade: Lista de usuários

@listaUsuario @smoke
Cenário: Encontrar um usuário já cadastrado
  Dado existe um usuário cadastrado
  E que acessei a funcionalidade de listagem de usuários
  Quando verificar os usuários listados
  Então o usuário cadastro deverá estar na lista