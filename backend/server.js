const express = require("express");
const cors = require("cors");
const { checkDatabase, hasDatabase, initDatabase, saveContact } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Cybercapivaras API",
    status: "online",
    database: hasDatabase() ? "configured" : "not configured",
    endpoints: ["/api/health", "/api/contact"],
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
      message: "Mensagem enviada com sucesso! O time entrara em contato em breve.",
    });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);

    return res.status(500).json({
      error: "Nao foi possivel salvar a mensagem agora.",
    });
  }
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
