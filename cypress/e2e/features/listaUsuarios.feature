# language: pt
@listaUsuario
Funcionalidade: Lista de usuários

Contexto: Usuário deve ter acessado o sistema
  Dado que acessei o sistema

@listaUsuario @smoke
Cenário: Encontrar um usuário já cadastrado
  Dado existe um usuário cadastrado
  # E que acessei a funcionalidade de listagem de usuários
  Quando verificar os usuários listados
  Então o usuário cadastro deverá estar na lista