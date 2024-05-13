#language:pt

Funcionalidade: Deve buscar usuarios por Email ou nome

    Contexto: Buscar Usuarios
        #Dado que tenho um usuário cadastrado no sistema
        #Quando acesso a pagina principal

  Cenário: Pesquisar usuário existente pelo nome
    Quando cadastro um novo usuario
    Quando pesquiso por um usuário existente pelo nome
    Então devo ver o usuário fornecido na lista de resultados

Cenário: Pesquisar usuário existente pelo email
    Quando pesquiso por um usuário existente com o email
    Então devo ver o usuário cadastrado na lista de resultados

      Cenário: Pesquisar usuário inexistente
    Quando acesso o campo pesquisa de usuários
    Quando pesquiso por um usuário inexistente com o nome "Maria"
    Então devo ver uma mensagem indicando que não existe nenhum usuário para ser exibido.
    
    Cenário: Ao pesquisar usuário inexistente, deve aparecer a opção de cadastro
    Dado que acessei a página de pesquisa de usuários
    Quando pesquiso por um usuário inexistente com o nome "Maria"
    Então devo ver uma mensagem Cadastre um novo usuário
