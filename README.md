# RoboTech - Site do Time de Robótica

Projeto em HTML, CSS e JavaScript, com backend Node.js/Express pronto para deploy no Railway via GitHub.

## Estrutura

```text
robotica-site/
  frontend/
    index.html
    style.css
    app.js
    assets/
      hero-robotica.png
  backend/
    package.json
    server.js
    .env.example
```

## Como rodar o frontend

Abra o arquivo `frontend/index.html` no navegador.

## Como rodar o backend localmente

```bash
cd backend
npm install
npm start
```

A API ficará em:

```text
http://localhost:3000
```

## Como conectar o frontend ao Railway

Depois de publicar o backend no Railway, copie a URL gerada e altere esta linha em `frontend/app.js`:

```js
const API_URL = "https://sua-url-do-railway.up.railway.app";
```

## Deploy do backend no Railway com GitHub

1. Crie um repositório no GitHub e envie a pasta do projeto.
2. No Railway, clique em `New Project`.
3. Escolha `Deploy from GitHub repo`.
4. Selecione o repositório.
5. Configure o diretório do serviço como `backend`, se necessário.
6. Use o comando de start:

```bash
npm start
```

7. Adicione a variável `ALLOWED_ORIGIN` com o endereço do frontend em produção.

## MySQL no Railway

1. No projeto do Railway, clique em `+ New`.
2. Escolha `Database` e depois `MySQL`.
3. No serviço do backend, adicione a variável:

```text
MYSQL_URL=${{MySQL.MYSQL_URL}}
```

O backend cria automaticamente a tabela `contacts` quando iniciar.

## Endpoints

```text
GET /api/health
POST /api/contact
```

Exemplo do corpo para contato:

```json
{
  "name": "Eduardo",
  "email": "eduardo@email.com",
  "message": "Quero saber mais sobre o time."
}
```
