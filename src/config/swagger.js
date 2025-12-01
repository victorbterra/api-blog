import swaggerUi from 'swagger-ui-express';

// Definindo a documentação manualmente (sem ler arquivos externos por enquanto)
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Blog - Teste de Rotas',
    version: '1.0.0',
    description: 'Teste de rotas da API de Blog ',
  },
  servers: [
    {
      url: 'https://api-blog-terratech.onrender.com',
      description: 'Servidor de Produção',
    },
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
    },
  ],
  paths: {
    // Buscar todos os Posts
    '/posts': {
      get: {
        summary: 'Listar Posts',
        tags: ['Posts'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
      },
    },
    // Buscar Post por ID
    '/posts/{id}': {
      get: {
        summary: 'Obter Post por ID',
        tags: ['Posts'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          404: {
            description: 'Post não encontrado',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post a ser retornado',
            required: true,
            schema: { type: 'string' },
          },
        ],
      },
    },
    // Buscar Post por Slug
    '/posts/slug/{slug}': {
      get: {
        summary: 'Obter Post por Slug',
        tags: ['Posts'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          404: {
            description: 'Post não encontrado',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        parameters: [
          {
            name: 'slug',
            in: 'path',
            description: 'Slug do post a ser retornado ex.: meu-primeiro-post',
            required: true,
            schema: { type: 'string' },
          },
        ],
      },
    },
    // Criar Post
    '/posts/create': {
      post: {
        summary: 'Criar Novo Post',
        tags: ['Posts'],
        responses: {
          201: {
            description: 'Post Criado com Sucesso',
          },
          400: {
            description: 'Erro de Validação',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: 'Título do Post' },
                  content: { type: 'string', example: 'Conteúdo do Post' },
                  slug: { type: 'string', example: 'slug-do-post' },
                  author: { type: 'string', example: 'Autor do Post' },
                  tags: { type: 'array', items: { type: 'string'  }, example: ['tag1', 'tag2']  },
                },
              },
            },
          },
        },
      },
    },
    // Atualizar Post por ID
    '/posts/{id}': {
      put: {
        summary: 'Atualizar Post por ID',
        tags: ['Posts'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          404: {
            description: 'Post não encontrado',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post a ser atualizado',
            required: true,
            schema: { type: 'string' },
          },
        ],
      },
    },
    // Deletar Post por ID
    '/posts/{id}': {
      delete: {
        summary: 'Deletar Post por ID',
        tags: ['Posts'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          404: {
            description: 'Post não encontrado',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post a ser deletado',
            required: true,
            schema: { type: 'string' },
          },
        ],
      },
    },
    // Autenticação
    '/auth/login': {
      post: {
        summary: 'Login de Usuário',
        tags: ['Autenticação'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          401: {
            description: 'Credenciais Inválidas',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'usuario@example.com' },
                  password: { type: 'string', example: 'senha123' },
                },
              },
            },
          },
        },
      },
    },
    // Registro de Usuário
    '/auth/register': {
      post: {
        summary: 'Registro de Usuário',
        tags: ['Autenticação'],
        responses: {
          200: {
            description: 'Sucesso',
          },
          400: {
            description: 'Erro de Validação',
          },
          500: {
            description: 'Erro Interno do Servidor',
          },
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Nome do Usuário' },
                  email: { type: 'string', example: 'usuario@example.com' },
                  password: { type: 'string', example: 'senha123' },
                },
              },
            },
          },
        },
      },
    },
    },
};

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerDocument);