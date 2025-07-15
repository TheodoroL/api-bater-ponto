# API Bater Ponto

API RESTful para registro de ponto (entrada e saída) de usuários, com autenticação JWT, validação de dados e integração com banco de dados via Prisma ORM.

---

## Funcionalidades

- Cadastro e login de usuários
- Registro de ponto (entrada e saída)
- Consulta, atualização e exclusão de pontos
- Autenticação JWT
- CORS configurável via variável de ambiente

---

## Tecnologias Utilizadas

- Node.js + Express
- Prisma ORM
- Zod (validação)
- JWT (autenticação)
- SQLite (desenvolvimento) / PostgreSQL, MySQL, etc. (produção)
- Dotenv