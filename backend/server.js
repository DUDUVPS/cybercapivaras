const express = require("express");
const cors = require("cors");
const path = require("path");
const { checkDatabase, hasDatabase, initDatabase, listContacts, saveContact, updateContactStatus } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/config.js", (req, res) => {
  res.type("application/javascript");
  res.set("Cache-Control", "no-store");
  res.send(`window.GOOGLE_CLIENT_ID = ${JSON.stringify(googleClientId)};`);
});

app.use(express.static(frontendPath));

app.get("/api", (req, res) => {
  res.json({
    name: "Cybercapivaras API",
    status: "online",
    database: hasDatabase() ? "configured" : "not configured",
    endpoints: ["/api/health", "/api/contact", "/api/contacts"],
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const database = await checkDatabase();
    res.json({ status: "ok", database });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      database: { configured: true, connected: false },
      error: "Banco de dados indisponivel.",
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha nome, e-mail e mensagem." });
  }

  try {
    const contactId = await saveContact({ name, email, message });

    if (!contactId) {
      console.log("Nova mensagem recebida sem banco configurado:", {
        name,
        email,
        message,
        receivedAt: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      id: contactId,
      message: "Chamado enviado com sucesso! O time entrara em contato em breve.",
    });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);

    return res.status(500).json({
      error: "Nao foi possivel salvar a mensagem agora.",
    });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (error) {
    console.error("Erro ao listar chamados:", error);
    res.status(500).json({ error: "Nao foi possivel carregar os chamados." });
  }
});

app.patch("/api/contacts/:id", async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ["aberto", "em andamento", "resolvido"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Status invalido." });
  }

  try {
    const updated = await updateContactStatus(req.params.id, status);

    if (!updated) {
      return res.status(404).json({ error: "Chamado nao encontrado." });
    }

    res.json({ message: "Chamado atualizado.", status });
  } catch (error) {
    console.error("Erro ao atualizar chamado:", error);
    res.status(500).json({ error: "Nao foi possivel atualizar o chamado." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

async function startServer() {
  try {
    await initDatabase();
  } catch (error) {
    console.error("Banco configurado, mas nao foi possivel inicializar:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Cybercapivaras API rodando na porta ${PORT}`);
  });
}

startServer();
