# Cyber Capivaras

Site publico e Central Operacional do time de robotica Cyber Capivaras.

O projeto usa:

- HTML, CSS e JavaScript no frontend.
- Node.js + Express no backend.
- MySQL no Railway para salvar os dados.
- Google Login para usuarios.
- Login por e-mail e senha apenas para administrador.

## Pastas principais

```text
frontend/  telas, CSS, JS, imagens e PWA
backend/   API, login admin, banco MySQL e servidor Railway
```

Leia o mapa completo em:

```text
ESTRUTURA_DO_PROJETO.md
```

## Rodar localmente

Na raiz do projeto:

```bash
npm install
npm start
```

Depois abra:

```text
http://localhost:3000
```

## Paginas principais

```text
/index.html     site publico
/equipe.html    equipe publica
/login.html     login
/app.html       Central Operacional
```

## Arquivos mais importantes

```text
frontend/site.js     monta o site publico com os dados do banco
frontend/app.js      controla a Central Operacional
frontend/style.css   visual do site e do app
backend/server.js    rotas da API e login admin
backend/db.js        conexao e funcoes do MySQL
```

## Variaveis no Railway

```text
MYSQL_URL
GOOGLE_CLIENT_ID
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_SESSION_SECRET
```

## Deploy

O Railway usa:

```text
package.json
railway.json
backend/server.js
```

O comando de start e:

```bash
npm start
```

## Regra do projeto

O site deve ser editado pela Central Operacional sempre que possivel. Evite colocar conteudo manual direto no codigo quando esse conteudo deveria ser controlado pelo app.
