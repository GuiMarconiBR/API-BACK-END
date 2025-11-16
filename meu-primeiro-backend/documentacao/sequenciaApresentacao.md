USUÁRIOS
1. Login

Método: POST

URL: http://localhost:3000/api/usuarios/login

Headers: Nenhum

Body (JSON):

{
    "usuario": "admin",
    "senha": "admin"
}


Observações: Qualquer usuário pode logar. Retorna token JWT que deve ser usado nas rotas protegidas.

2. Listar todos os usuários

Método: GET

URL: http://localhost:3000/api/usuarios

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Somente usuários logados e com token válido podem acessar.

3. Buscar usuário por ID

Método: GET

URL: http://localhost:3000/api/usuarios/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Apenas usuários autenticados.

4. Criar usuário

Método: POST

URL: http://localhost:3000/api/usuarios

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>
Content-Type: application/json


Body (JSON):

{
    "nome": "Maria",
    "usuario": "maria123",
    "senha": "1234"
}

{
    "nome": "ADMINISTRADOR",
    "usuario": "admin",
    "senha": "admin"
}


Observações: Somente usuários autenticados podem criar novos usuários.

5. Atualizar usuário

Método: PUT

URL: http://localhost:3000/api/usuarios/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>
Content-Type: application/json


Body (JSON):

{
    "nome": "Maria",
    "usuario": "maria",
    "senha": "1234"
}

Observações: Apenas usuários autenticados podem atualizar.

6. Deletar usuário

Método: DELETE

URL: http://localhost:3000/api/usuarios/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Somente usuários autenticados.

RECEITAS
7. Listar todas as receitas

Método: GET

URL: http://localhost:3000/api/receitas

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Usuário precisa estar logado.

8. Buscar receita por ID

Método: GET

URL: http://localhost:3000/api/receitas/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Usuário precisa estar logado.

9. Criar receita

Método: POST

URL: http://localhost:3000/api/receitas

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>
Content-Type: application/json


Body (JSON):

{
    "nome": "Suco Laranja 900ml",
    "custo": 25.00
}


Observações: Apenas usuários autenticados podem criar.

10. Atualizar receita

Método: PUT

URL: http://localhost:3000/api/receitas/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>
Content-Type: application/json


Body (JSON):



Observações: Apenas usuários autenticados.

11. Deletar receita

Método: DELETE

URL: http://localhost:3000/api/receitas/:id (substitua :id pelo ID real)

Headers:

Authorization: Bearer <SEU_TOKEN_AQUI>


Body: vazio

Observações: Apenas usuários autenticados.

{
    "nome": "ADMINISTRADOR",
    "usuario": "admin",
    "senha": "admin"
}
