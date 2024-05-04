# language: pt
Funcionalidade: Cadastro de usuário

Contexto: Usuário deve ter acessado a funcionalidade de cadastro
  Dado que acessei a funcionalidade de cadastro

@cadastroUsuario
Cenário: Cadastro de usuário com sucesso
  Quando informar um novo nome
  E informar um novo e-mail
  E confirmar a operação
  Então o usuário será registrado na lista

@erroCadastro
Cenário: Não deve ser possível cadastrar um usuário apenas com o e-mail
  Quando informar um novo e-mail
  E confirmar a operação
  Então o usuário não será registrado na lista

@ignore
Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
  Quando informar um novo nome
  E informar um e-mail com mais de 60 caracteres "iuryqwertyuiopqwiuryqwertyuiopqwiuryqwertyuiopqasdasddfg@t.co"
  Então não deve ser possível extrapolar o limite de 60 caracteres do e-mail no cadastro

@ignore
Cenário: Não deve ser possível cadastrar um usuário com nome vazio e e-mail inválido
  Quando informar um novo nome e email
  | email | teste@teste.com |
  | nome  | iury oliveira   |
  E confirmar a operação
  Então o usuário não será registrado na lista

@cadastro @smoke @ignore
Cenário: Não deve ser possível cadastrar um usuário com e-mail em formato inválido
  Quando informar um novo nome
  E informar o e-mail "iury@teste"
  E confirmar a operação
  Então o usuário não será registrado na lista

@ignore
Esquema do Cenário: Não deve ser feita uma tentativa de cadastro se os dados de cadastro forem inválidos
  Quando informar o nome "<nome>"
  E informar o e-mail "<email>"
  E confirmar a operação
  Então não será possível concluir a tentativa de cadastro do usuário
  Exemplos:
    | email | nome    |
    | @     | iury    |
    | .com  | tatiane |
    | @.com | carol   |
    | .     | Luan    |
    | .@    | Gustavo |

# todo cenário de e-mail já cadastrado