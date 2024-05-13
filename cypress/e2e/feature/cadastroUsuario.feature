# language: pt

@cadastroUsuario
Funcionalidade: Cadastro de usuário

Contexto: Usuário deve ter acessado o sistema
      Dado que acessei o sistema

Cenário: Cadastro de usuário com sucesso
  Quando informar um novo nome
  Quando informar um e-mail
  Quando clicar em salvar
  Então o usuário será registrado com sucesso na lista

@erroCadastro
Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
  Quando informar um novo e-mail
  Quando tentar confirmar o cadastro
  Então recebe um alerta "O campo nome é obrigatório"

Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
  Quando informo um novo nome
  Quando informar um e-mail com mais de 60 caracteres
  Quando clicar em salvar 
  Então não deve ser possível extrapolar o limite de 60 caracteres do e-mail no cadastro

Cenário: Não deve ser possível cadastrar um usuário com nome vazio e e-mail inválido
  Quando informar um nome vazio e email invalido
  Quando confirmar o cadastro
  Então o usuário não será registrado na lista

Cenário: Não deve ser possível cadastrar um usuário com e-mail em formato inválido
  Quando coloco um novo nome
  Quando informar o e-mail invalido "tester@teste"
  Quando confirmo o cadastro
  Então o usuário não será registrado

Cenário: Não deve ser feita uma tentativa de cadastro se os dados de cadastro forem inválidos
  Quando informar um nome
  E informar o e-mail
  E click em salvar
  Então não será possível concluir a tentativa de cadastro do usuário
  

Cenário: Não deve ser possível cadastrar um usuário com e-mail já cadastrado
  Quando crio um novo usuário
  Quando informo um nome
  Quando informo um e-mail já cadastrado
  Então devo visualizar uma mensagem de erro
