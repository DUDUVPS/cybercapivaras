# Estrutura do Projeto Cyber Capivaras

Este projeto tem duas partes principais:

- `frontend/`: telas, estilos, JavaScript do site publico e do app central.
- `backend/`: servidor Node.js, API, login admin, banco MySQL e deploy Railway.

Nao mova arquivos de lugar sem ajustar os caminhos no codigo. O Railway serve a pasta `frontend/` diretamente pelo backend.

## Raiz do projeto

```text
robotica-site/
  package.json
  railway.json
  README.md
  ESTRUTURA_DO_PROJETO.md
  frontend/
  backend/
```

### `package.json`

Arquivo principal do deploy. O Railway usa ele para iniciar o backend:

```bash
npm start
```

### `railway.json`

Configuracao do Railway na raiz. Define comando de start e healthcheck em `/api/health`.

### `README.md`

Manual geral do projeto: Railway, MySQL, Google Login e variaveis de ambiente.

### `ESTRUTURA_DO_PROJETO.md`

Este arquivo. Serve como mapa para voce trabalhar no codigo.

## Frontend

```text
frontend/
  index.html
  equipe.html
  login.html
  app.html
  style.css
  site.js
  app.js
  sw.js
  manifest.webmanifest
  config.js
  assets/
  imgs/
```

### Site publico

Arquivos usados pelas pessoas que acessam o site:

- `frontend/index.html`: pagina principal do site.
- `frontend/equipe.html`: pagina publica da equipe.
- `frontend/robos.html`: pagina antiga/extra de robos.
- `frontend/conquistas.html`: pagina antiga/extra de conquistas.
- `frontend/mais.html`: pagina antiga/extra de mais informacoes.
- `frontend/site.js`: JavaScript do site publico. Carrega os dados do banco e monta projetos, eventos, equipe, footer, menu e secoes criadas na Central.
- `frontend/style.css`: estilo visual de todas as paginas.

Quando quiser mexer no visual do site publico, normalmente voce mexe em:

```text
frontend/index.html
frontend/equipe.html
frontend/site.js
frontend/style.css
```

## App Central Operacional

Arquivos usados na area interna:

- `frontend/login.html`: tela de login.
- `frontend/app.html`: tela principal da Central Operacional.
- `frontend/app.js`: logica do app, edicao do site publico, equipe, tarefas, chamados, processo seletivo, permissoes e ajustes.
- `frontend/admin.html`: pagina antiga/atalho admin, se ainda estiver sendo usada.
- `frontend/area-equipe.html`: pagina antiga/extra de area da equipe.

Quando quiser mexer no painel do administrador, normalmente voce mexe em:

```text
frontend/app.html
frontend/app.js
frontend/style.css
```

## PWA e cache

- `frontend/manifest.webmanifest`: instalacao do app no celular.
- `frontend/sw.js`: service worker/cache offline.

Sempre que mudar CSS ou JS e quiser garantir que outro celular receba a atualizacao, atualize a versao nos arquivos HTML e no `sw.js`.

Exemplo:

```html
style.css?v=20260621-review-save-fixes
app.js?v=20260621-review-save-fixes
site.js?v=20260621-review-save-fixes
```

## Imagens

```text
frontend/assets/
frontend/imgs/
frontend/imgs/fotos/
```

### `frontend/assets/`

Imagens grandes/visuais principais do site.

Exemplo:

- `hero-robotica.png`: imagem principal do inicio.

### `frontend/imgs/`

Logos, icones e imagens gerais.

Exemplos:

- `apple-touch-icon.png`: icone do app/site.
- `logo-fabrica-da-ciencia.ico`: icone da Fabrica da Ciencia usado no footer.
- `instagram.png`, `github.png`: icones de redes.
- `bg-site.png`: imagem/fundo do site.

### `frontend/imgs/fotos/`

Fotos dos integrantes da equipe.

Exemplos:

- `ft-alceu.png`
- `ft-allem.png`
- `ft-naju.png`

## Backend

```text
backend/
  server.js
  db.js
  package.json
  railway.json
```

### `backend/server.js`

Servidor Express. Ele faz:

- servir o frontend;
- login do administrador;
- config do Google Login em `/config.js`;
- API do conteudo publico;
- API dos dados da Central;
- API de usuarios;
- API de contato/chamados;
- healthcheck em `/api/health`.

### `backend/db.js`

Conexao com MySQL e funcoes do banco. Ele salva/carrega:

- conteudo publico do site;
- estado da Central;
- usuarios;
- contatos/chamados.

### `backend/package.json`

Dependencias do backend se rodar a pasta `backend/` isolada.

### `backend/railway.json`

Configuracao alternativa do Railway para backend isolado. Hoje o deploy principal usa o `railway.json` da raiz.

## Onde mexer em cada coisa

### Quero mudar o topo/menu do site publico

```text
frontend/index.html
frontend/site.js
frontend/style.css
```

### Quero mudar a tela da equipe publica

```text
frontend/equipe.html
frontend/site.js
frontend/style.css
```

### Quero mudar a Central Operacional

```text
frontend/app.html
frontend/app.js
frontend/style.css
```

### Quero mudar o login

```text
frontend/login.html
frontend/app.js
frontend/style.css
backend/server.js
```

### Quero mudar salvamento no banco

```text
frontend/app.js
frontend/site.js
backend/server.js
backend/db.js
```

### Quero mudar tarefas, chamados ou processo seletivo

```text
frontend/app.html
frontend/app.js
backend/server.js
backend/db.js
```

### Quero mudar PWA/celular/cache

```text
frontend/manifest.webmanifest
frontend/sw.js
frontend/style.css
frontend/index.html
frontend/app.html
frontend/login.html
frontend/equipe.html
```

## Fluxo dos dados

```text
Central Operacional
  -> frontend/app.js
  -> POST /api/site-content ou POST /api/app-state
  -> backend/server.js
  -> backend/db.js
  -> MySQL no Railway

Site publico
  -> frontend/site.js
  -> GET /api/site-content
  -> backend/server.js
  -> backend/db.js
  -> MySQL no Railway
```

## Regra importante

Tudo que o usuario final edita pela Central deve salvar no banco. Evite colocar conteudo fixo direto no HTML quando esse conteudo deveria ser editavel pelo app.

