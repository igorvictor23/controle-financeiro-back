# API de Controle Financeiro (Backend)

Este é o repositório do **Backend** da aplicação "Controle Financeiro". É uma API RESTful completa, construída com Node.js, Express e MongoDB, que serve como o cérebro e o banco de dados para o [projeto Frontend](https://github.com/igorvictor23/controle-financeiro-front).

Esta API é responsável por toda a lógica de negócio, validação de dados e persistência no banco de dados. Ela gerencia o CRUD completo de transações financeiras e fornece endpoints para cálculos de resumo (saldo, receitas, despesas).

## 🚀 Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express.js:** Framework para construção da API e gerenciamento de rotas.
* **MongoDB Atlas:** Banco de dados NoSQL na nuvem.
* **Mongoose:** ODM (Object Data Modeling) para modelar e interagir com o MongoDB.
* **Dotenv:** Para gerenciamento de variáveis de ambiente.
* **CORS:** Para permitir a comunicação segura com o frontend.

## 🌟 Funcionalidades Principais

* API RESTful com endpoints para todas as operações CRUD (Criar, Ler, Atualizar, Deletar) de transações.
* Validação de dados na entrada usando o Mongoose Schemas.
* Endpoint de listagem (`GET /transacoes`) com filtragem dinâmica por `tipo`, `descricao` ou `valor`.
* Endpoint de resumo (`GET /transacoes/resumo`) que calcula e retorna o total de receitas, despesas e o saldo final.
* Configurado com CORS para se comunicar com o frontend hospedado.

---

## 🚦 Instruções de Configuração e Execução

Para rodar este servidor backend localmente, siga os passos abaixo.

**Pré-requisitos:**
* Node.js e npm instalados.
* Uma conta no MongoDB Atlas e uma "string de conexão" (connection string).

### Passo a Passo

**1. Clone o Repositório:**
```bash
git clone [https://github.com/igorvictor23/controle-financeiro-back.git](https://github.com/igorvictor23/controle-financeiro-back.git)
cd controle-financeiro-back