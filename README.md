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

No Railway, o backend também serve o frontend automaticamente. A URL pública do serviço abre o site, e as rotas `/api/*` continuam funcionando como API.

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

## Login com Google

O frontend usa Google Identity Services. Para ativar o botao real do Google:

1. Crie um OAuth Client ID do tipo `Web application` no Google Cloud.
2. Adicione a origem autorizada:

```text
https://cybercapivaras.up.railway.app
```

3. Copie o Client ID e coloque em `frontend/config.js`:

```js
window.GOOGLE_CLIENT_ID = "SEU_CLIENT_ID.apps.googleusercontent.com";
```

Enquanto o Client ID estiver vazio, o site mostra um botao Google em modo demo.
O login por e-mail e senha e exclusivo do administrador.

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
