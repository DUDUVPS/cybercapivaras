const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const path = require("path");
const { checkDatabase, getSiteContent, hasDatabase, initDatabase, listContacts, saveContact, saveSiteContent, updateContactStatus } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const adminEmail = process.env.ADMIN_EMAIL || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const adminSessionSecret = process.env.ADMIN_SESSION_SECRET || "dev-admin-session-secret";
const frontendPath = path.join(__dirname, "..", "frontend");

function signAdminToken(email) {
  const payload = Buffer.from(JSON.stringify({
    email,
    role: "Administrador",
    exp: Date.now() + 1000 * 60 * 60 * 8,
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", adminSessionSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifyAdminToken(token) {
  try {
    if (!token || !token.includes(".")) return null;

    const [payload, signature] = token.split(".");
    const expected = crypto.createHmac("sha256", adminSessionSecret).update(payload).digest("base64url");
    if (signature.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (Date.now() > data.exp || data.role !== "Administrador") return null;
    return data;
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const session = verifyAdminToken(token);

  if (!session) {
    return res.status(401).json({ error: "Acesso de administrador necessario." });
  }

  req.admin = session;
  next();
}

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "8mb" }));

app.get("/config.js", (req, res) => {
  res.type("application/javascript");
  res.set("Cache-Control", "no-store");
  res.send(`window.GOOGLE_CLIENT_ID = ${JSON.stringify(googleClientId)};`);
});

app.use(express.static(frontendPath, {
  setHeaders: (res, filePath) => {
    if (/\.(html|js|css)$/.test(filePath) || filePath.endsWith("sw.js")) {
      res.set("Cache-Control", "no-store");
    }
  },
}));

app.get("/api", (req, res) => {
  res.json({
    name: "Cybercapivaras API",
    status: "online",
    database: hasDatabase() ? "configured" : "not configured",
    endpoints: ["/api/health", "/api/admin/login", "/api/site-content", "/api/contact", "/api/contacts"],
  });
});

app.get("/api/site-content", async (req, res) => {
  try {
    const content = await getSiteContent();
    res.set("Cache-Control", "no-store");
    res.json({ content: content || null });
  } catch (error) {
    console.error("Erro ao carregar conteudo do site:", error);
    res.status(500).json({ error: "Nao foi possivel carregar o conteudo do site." });
  }
});

app.post("/api/site-content", requireAdmin, async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return res.status(400).json({ error: "Conteudo invalido." });
  }

  try {
    const saved = await saveSiteContent(content);

    if (!saved) {
      return res.status(503).json({ error: "Banco de dados ainda nao configurado." });
    }

    res.json({ message: "Conteudo publico salvo." });
  } catch (error) {
    console.error("Erro ao salvar conteudo do site:", error);
    res.status(500).json({ error: "Nao foi possivel salvar o conteudo do site." });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!adminEmail || !adminPassword) {
    return res.status(503).json({ error: "Administrador ainda nao configurado no Railway." });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: "Acesso de administrador invalido." });
  }

  res.json({
    token: signAdminToken(email),
    user: {
      name: "Administrador",
      email,
      role: "Administrador",
      level: "N5",
      permission: "Controle total do app, site e funcoes.",
    },
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
  const { name, email, category, source, message, attachment } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha nome, e-mail e mensagem." });
  }

  if (attachment?.data && attachment.data.length > 6_500_000) {
    return res.status(413).json({ error: "Arquivo muito grande. Envie ate 4 MB." });
  }

  try {
    const contactId = await saveContact({ name, email, category, source: source || "contato", message, attachment });

    if (!contactId) {
      console.log("Nova mensagem recebida sem banco configurado:", {
        name,
        email,
        category,
        message,
        attachmentName: attachment?.name,
        receivedAt: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      id: contactId,
      message: source === "chamado" ? "Chamado enviado com sucesso!" : "Mensagem enviada com sucesso!",
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
    const contacts = await listContacts("chamado");
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
