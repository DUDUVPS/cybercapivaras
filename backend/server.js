const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "RoboTech API",
    status: "online",
    endpoints: ["/api/health", "/api/contact"],
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha nome, e-mail e mensagem." });
  }

  console.log("Nova mensagem recebida:", {
    name,
    email,
    message,
    receivedAt: new Date().toISOString(),
  });

  return res.status(201).json({
    message: "Mensagem enviada com sucesso! O time entrará em contato em breve.",
  });
});

app.listen(PORT, () => {
  console.log(`RoboTech API rodando na porta ${PORT}`);
});
