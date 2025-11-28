# 🚀 API RESTful Blog (Node.js + MongoDB)

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Badge Node.js](http://img.shields.io/static/v1?label=Node.js&message=v18&color=green&style=for-the-badge)
![Badge License](http://img.shields.io/static/v1?label=License&message=MIT&color=blue&style=for-the-badge)

## 💻 Sobre o Projeto

Este projeto consiste em uma API RESTful completa para gerenciamento de um Blog, desenvolvida durante um desafio técnico intensivo de 9 dias.

O objetivo foi construir uma aplicação robusta seguindo boas práticas de mercado, arquitetura **MVC**, autenticação segura e documentação profissional. A API permite o cadastro de usuários, autenticação via Token, e operações de CRUD em Posts e Categorias.

### 🌐 Deploy (Produção)
A API está rodando em produção no Render. Você pode testar a documentação ao vivo aqui:
**[Link da API no Swagger](https://api-blog-terratech.onrender.com/api-docs/)]**

---

## ⚙️ Funcionalidades

- **Autenticação e Segurança**:
  - [x] Cadastro de Usuários com senha criptografada (Bcrypt).
  - [x] Login e Autenticação via JWT (JSON Web Token).
  - [x] Middlewares para proteção de rotas administrativas.
  - [x] Configuração de CORS e Headers de Segurança (Helmet).

- **Gestão de Conteúdo (Blog)**:
  - [x] CRUD completo de Posts (Criar, Ler, Atualizar, Deletar).
  - [x] Sistema de Paginação para listagem de posts.
  - [x] Filtros de busca por título (Regex) e Slug.
  - [x] Relacionamento entre Posts e Categorias (Mongoose Populate).

- **Documentação**:
  - [x] Documentação interativa com Swagger UI (OpenAPI 3.0).

---

## 🛠 Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto:

- **[Node.js](https://nodejs.org/en/)** (Runtime)
- **[Express](https://expressjs.com/)** (Framework Web)
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** (Database NoSQL na Nuvem)
- **[Mongoose](https://mongoosejs.com/)** (ODM)
- **[JWT](https://jwt.io/)** (Autenticação Stateless)
- **[Swagger UI](https://swagger.io/)** (Documentação)
- **[Render](https://render.com/)** (Deploy)

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- Um editor de código (ex: [VSCode](https://code.visualstudio.com/))

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)
   cd NOME_DO_REPO
   ```
2. Instale as dependências

```Bash
npm install
```
3. Configure as Variáveis de Ambiente Crie um arquivo .env na raiz do projeto e preencha conforme o exemplo:

```Bash
    PORT=3000
    DB_CONNECTION_STRING=sua_string_de_conexao_mongodb
    JWT_SECRET=sua_chave_secreta_jwt
```

4.Execute o projeto

````Bash

# Modo de desenvolvimento (com Nodemon)
npm run dev

# Modo de produção
npm start

````

5. Acesse a Documentação Abra no seu navegador: http://localhost:3000/api-docs

## Rotas da API

Aqui estão as principais rotas da aplicação. Para detalhes dos parâmetros, consulte o Swagger.


| Método | Rota | Descrição | Auth |
| ----------- | ----------------- | ---------------------------------------  | --------
| POST        | /auth/register    | Cria um novo usuário                     | Pública
| POST        | /auth/login       | Realiza login e retorna Token            | Pública
| GET         | /posts            | Lista posts (com paginação e busca)      | Pública
| GET         | /posts/:id        | Busca post por ID                        | Pública
| POST        | /posts            | Cria um novo post                        | Pública
| PUT         | /posts/:id        | Atualiza um post                         | Pública
| DELETE      | /posts/:id        | Remove um post                           | Pública

## Estrutura de Pastas (MVC)

````Bash
src/
├── config/         # Configurações (DB, Swagger)
├── controllers/    # Lógica das requisições
├── middlewares/    # Interceptadores (Auth, Validação)
├── models/         # Schemas do Banco de Dados
├── routes/         # Definição das Rotas
├── app.js          # Configuração do App Express
└── server.js       # Entrada do Servidor
````

## 👨‍💻 Autor
Feito com dedicação por **[Victor Terra](https://github.com/victorbterra)**.
