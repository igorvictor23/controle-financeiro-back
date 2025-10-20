# API de Controle Financeiro (Backend)

Este é o repositório do **Backend** da aplicação "Controle Financeiro". É uma API RESTful completa e **segura**, construída com Node.js, Express e MongoDB, que serve como o cérebro e o banco de dados para o [projeto Frontend](https://github.com/igorvictor23/controleFinanceiro-front).

Esta API é responsável por toda a lógica de negócio, validação de dados, **autenticação de usuários** e persistência no banco de dados. Ela gerencia o CRUD completo de transações financeiras (isoladas por usuário) e fornece endpoints protegidos para cálculos de resumo.

## 🚀 Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express.js:** Framework para construção da API e gerenciamento de rotas.
* **MongoDB Atlas:** Banco de dados NoSQL na nuvem.
* **Mongoose:** ODM (Object Data Modeling) para modelar e interagir com o MongoDB.
* **JSON Web Tokens (JWT):** Para geração e validação de tokens de autenticação.
* **bcryptjs:** Para hashing seguro de senhas.
* **Dotenv:** Para gerenciamento de variáveis de ambiente.
* **CORS:** Para permitir a comunicação segura com o frontend.

## 🌟 Funcionalidades Principais

* **Autenticação:** Cadastro (`/auth/register`) e Login (`/auth/login`) de usuários com senhas hasheadas e geração de tokens JWT.
* **Rotas Protegidas:** Todas as rotas de transações (`/transacoes`) exigem um token JWT válido no cabeçalho `Authorization`.
* **Isolamento de Dados:** Cada usuário só pode criar, visualizar, atualizar ou deletar **suas próprias** transações.
* **CRUD Completo:** API RESTful com endpoints para todas as operações CRUD de transações.
* **Validação:** Validação de dados na entrada usando Mongoose Schemas (tanto para usuários quanto para transações).
* **Filtragem:** Endpoint de listagem (`GET /transacoes`) com filtragem dinâmica por `tipo`, `descricao` ou `valor` (restrita ao usuário logado).
* **Resumo Financeiro:** Endpoint (`GET /transacoes/resumo`) que calcula e retorna o resumo financeiro (receitas, despesas, saldo) **apenas** para o usuário logado.

---

## 🚦 Instruções de Configuração e Execução

Para rodar este servidor backend localmente, siga os passos abaixo.

**Pré-requisitos:**
* Node.js e npm instalados.
* Uma conta no MongoDB Atlas e uma "string de conexão" (connection string).

### Passo a Passo

**1. Clone o Repositório:**

git clone [https://github.com/igorvictor23/controle-financeiro-back.git](https://github.com/igorvictor23/controle-financeiro-back.git)
cd controle-financeiro-back


**2. Instale as Dependências:**
Execute o `npm` para baixar todas as bibliotecas (Express, Mongoose, bcryptjs, jsonwebtoken, etc.).


npm install


**3. Configure as Variáveis de Ambiente (Passo Crucial):**
Este servidor precisa de **duas** "chaves secretas": uma para o banco de dados e outra para os tokens JWT.

  * Na pasta raiz do projeto, crie um novo arquivo chamado exatamente **`.env`**
  * Dentro deste arquivo `.env`, adicione as seguintes linhas, substituindo pelos seus valores:




# String de conexão do seu cluster MongoDB Atlas
DATABASE_URL=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/seu_banco_de_dados?retryWrites=true&w=majority

# Chave secreta para assinar os tokens JWT (use uma string longa e aleatória)
JWT_SECRET=SuaChaveSecretaSuperLongaEAleatoriaParaJWT!123@abc


*(Lembre-se de trocar `seu_banco_de_dados` pelo nome do seu banco, como `controle-financeiro`)*

**4. Inicie o Servidor:**
Com o `.env` no lugar, você pode iniciar o servidor.


node index.js


Se tudo estiver correto, você verá no seu terminal as mensagens:
`Conexão com o banco de dados realizada com sucesso!`
`Servidor rodando na porta 3000`

A API agora está pronta para receber requisições em `http://localhost:3000`.

-----

## 📚 Documentação da API (Endpoints)

### Autenticação (`/auth`)

#### `POST /auth/register`

  * **Descrição:** Registra um novo usuário.
  * **Corpo da Requisição (JSON):**
    
    {
      "nome": "Nome Completo",
      "email": "usuario@exemplo.com",
      "senha": "senhaMinimo6Caracteres"
    }
    
  * **Resposta de Sucesso (201 Created):** Objeto com `_id`, `nome`, `email` do usuário criado.
  * **Resposta de Erro (400 Bad Request):** Se dados estiverem faltando, email já existir ou senha for curta.

#### `POST /auth/login`

  * **Descrição:** Autentica um usuário existente e retorna um token JWT.
  * **Corpo da Requisição (JSON):**
    
    {
      "email": "usuario@exemplo.com",
      "senha": "suaSenha"
    }
    
  * **Resposta de Sucesso (200 OK):** Objeto com dados do usuário (`_id`, `nome`, `email`) e o `token` JWT.
    
    {
        "_id": "...",
        "nome": "...",
        "email": "...",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
    }
    
  * **Resposta de Erro (401 Unauthorized):** Se email ou senha estiverem incorretos.

-----

### Transações (`/transacoes`)

**⚠️ IMPORTANTE:** Todas as rotas abaixo requerem um **Token JWT válido** enviado no cabeçalho `Authorization` como `Bearer <seu_token>`.

#### `POST /transacoes`

  * **Descrição:** Cria uma nova transação **para o usuário logado**.
  * **Corpo da Requisição (JSON):**
    
    {
      "descricao": "Salário",
      "valor": 5000,
      "tipo": "receita"
    }
    
  * **Resposta de Sucesso (201 Created):** O objeto da transação recém-criada (incluindo o `userId`).

#### `GET /transacoes`

  * **Descrição:** Lista **apenas as transações do usuário logado**, com suporte a filtros.
  * **Query Parameters (Opcionais):** `tipo`, `descricao`, `valor`.
  * **Resposta de Sucesso (200 OK):** Um array de objetos de transação do usuário.

#### `GET /transacoes/resumo`

  * **Descrição:** Calcula e retorna o resumo financeiro **apenas para o usuário logado**.
  * **Resposta de Sucesso (200 OK):** Objeto com `receitas`, `despesas` e `saldo` do usuário.

#### `GET /transacoes/:id`

  * **Descrição:** Busca uma única transação pelo seu `_id`, **se ela pertencer ao usuário logado**.
  * **Resposta de Sucesso (200 OK):** O objeto da transação encontrada.
  * **Resposta de Erro (404 Not Found):** Se a transação não for encontrada ou não pertencer ao usuário.

#### `PUT /transacoes/:id`

  * **Descrição:** Atualiza uma transação existente, **se ela pertencer ao usuário logado**.
  * **Corpo da Requisição (JSON):** Objeto com os campos a serem atualizados.
  * **Resposta de Sucesso (200 OK):** O objeto da transação *após* a atualização.
  * **Resposta de Erro (404 Not Found):** Se a transação não for encontrada ou não pertencer ao usuário.

#### `DELETE /transacoes/:id`

  * **Descrição:** Deleta uma transação pelo seu `_id`, **se ela pertencer ao usuário logado**.
  * **Resposta de Sucesso (200 OK):** Mensagem de confirmação.
  * **Resposta de Erro (404 Not Found):** Se a transação não for encontrada ou não pertencer ao usuário.



