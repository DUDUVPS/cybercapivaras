# Backend

Esta pasta tem o servidor Node.js/Express e a conexao com o MySQL do Railway.

## Arquivos

```text
server.js       servidor, rotas da API, login admin e arquivos estaticos
db.js           conexao MySQL e funcoes de salvar/carregar dados
package.json    dependencias do backend isolado
railway.json    configuracao alternativa para deploy isolado do backend
```

## Principais rotas

```text
GET  /api/health          verifica se API e banco estao online
GET  /config.js           envia GOOGLE_CLIENT_ID para o frontend
POST /api/admin/login     login do administrador
GET  /api/site-content    carrega conteudo publico do site
POST /api/site-content    salva conteudo publico do site
GET  /api/app-state       carrega dados internos da Central
POST /api/app-state       salva dados internos da Central
GET  /api/users           lista usuarios que entraram no app
POST /api/users           registra usuario do Google
POST /api/contact         recebe contato/chamado
GET  /api/contacts        lista chamados
```

## Banco

O banco usa a variavel:

```text
MYSQL_URL
```

As tabelas sao criadas/ajustadas automaticamente pelo `db.js` quando o servidor inicia.

