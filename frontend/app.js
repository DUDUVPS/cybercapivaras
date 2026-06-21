const API_URL = window.location.origin;
let remoteContentLoaded = false;
let runtimeSiteContent = null;
let draggedBlock = null;
let draggedMemberIndex = null;
let remoteAppStateLoaded = false;

const defaultContent = {
  siteName: "Cyber Capivaras",
  siteHomeLink: "index.html",
  siteLogo: "imgs/ChatGPT Image 2 de jul. de 2025, 18_59_21-Photoroom.png",
  accountLink: "login.html",
  siteTabInicio: "Inicio",
  siteTabEquipe: "Equipe",
  siteTabProjetos: "Projetos",
  siteTabEventos: "Eventos",
  siteTabContato: "Contato",
  siteTabFooter: "Footer",
  sectionOrderHome: "1",
  sectionOrderTeam: "2",
  sectionOrderProjects: "3",
  sectionOrderEvents: "4",
  sectionOrderContact: "99",
  heroLabel: "IF Goiano - Campus Campos Belos",
  heroTitle: "Cyber Capivaras",
  heroText: "Um time de robotica movido por tecnologia, competicao, pesquisa e trabalho em equipe.",
  heroImage: "assets/hero-robotica.png",
  weeklyHighlightLabel: "Destaques da semana",
  heroMetricValue: "87%",
  heroMetricLabel: "sensores calibrados",
  heroStateValue: "ON",
  heroStateLabel: "sistema autonomo",
  heroSignalOne: "2024",
  heroSignalTwo: "Robotica",
  heroSignalThree: "Inovacao",
  heroPrimaryText: "Ver projetos",
  heroPrimaryLink: "#projetos",
  heroSecondaryText: "Acessar app",
  heroSecondaryLink: "login.html",
  teamSectionLabel: "Equipe",
  teamSectionTitle: "Integrantes Cyber Capivaras",
  projectsSectionLabel: "Projetos",
  projectsSectionTitle: "Robos e sistemas em desenvolvimento",
  projectsSectionText: "Principais prototipos, sistemas e frentes tecnicas trabalhadas pelo time.",
  eventsSectionLabel: "Eventos",
  eventsSectionTitle: "Eventos e competicoes participados",
  eventsSectionText: "Registro das apresentacoes, torneios, feiras e momentos de troca tecnica do time.",
  contactLabel: "Contato",
  contactTitle: "Envie uma mensagem pro time",
  contactText: "Fale com a equipe sobre projetos, parcerias, competicoes ou apresentacoes.",
  contactNamePlaceholder: "Nome",
  contactEmailPlaceholder: "E-mail",
  contactMessagePlaceholder: "Mensagem",
  contactButtonText: "Enviar",
  footerLogo: "imgs/ChatGPT Image 2 de jul. de 2025, 18_59_21-Photoroom.png",
  footerLogoSubtitle: "Fabrica da Ciencia",
  footerAffiliationIcon: "imgs/logo-fabrica-da-ciencia.ico",
  footerText: "O Cyber Capivaras faz parte da Fabrica da Ciencia, unindo robotica, competicoes, tecnologia educacional e prototipos criativos.",
  footerAffiliation: "Projeto integrante da Fabrica da Ciencia",
  footerCredit: "LASTTRO.IO",
  footerCreditUrl: "https://lasttro.app.br",
  footerCopyrightText: "© 2026 Cyber Capivaras | Fabrica da Ciencia | desenvolvido por",
  footerNavTitle: "Navegacao",
  footerCentralTitle: "Central",
  footerContactTitle: "Contato",
  footerContactLine1: "Fabrica da Ciencia",
  footerContactLine2: "Cyber Capivaras",
  footerContactAction: "Enviar mensagem",
  footerStatus: "Sistemas operacionais",
  showTeamSection: true,
  showProjectsSection: true,
  showEventsSection: true,
  showContactSection: true,
  areas: [
    ["Software", "Logica, sensores, automacao e codigo embarcado."],
    ["Hardware", "Circuitos, motores, placas e alimentacao."],
    ["Mecanica", "Chassi, pecas, montagem e impressao 3D."],
    ["Comunicacao", "Fotos, noticias, redes sociais e documentacao."],
  ],
  projects: [
    ["Robo Seguidor de Linha", "Robo autonomo com sensores infravermelhos para seguir trajetos com precisao.", "imgs/20250618_104600.jpg", "Arduino, C/C++, sensores IR, ponte H", "assets/hero-robotica.png\nimgs/bg-site.png", "Em testes"],
    ["Robo Explorador", "Prototipo movel para desvio de obstaculos e leitura de ambiente.", "assets/hero-robotica.png", "ESP32, sensores ultrassonicos, motores DC", "imgs/20250618_104600.jpg", "Prototipo"],
    ["Painel de Telemetria", "Interface para acompanhar estado, sensores e registros dos prototipos.", "imgs/bg-site.png", "HTML, CSS, JavaScript, GitHub", "assets/hero-robotica.png", "Em desenvolvimento"],
    ["Pecas 3D", "Modelagem e impressao de suportes, carenagens e estruturas para robos.", "imgs/fotos/ft-isadorah.png", "Modelagem 3D, impressao 3D, prototipagem", "imgs/20250618_104600.jpg", "Ativo"],
  ],
  events: [
    ["Torneio Interno de Robotica", "2026", "Campos Belos", "1o lugar", "imgs/20250618_104600.jpg", "assets/hero-robotica.png\nimgs/bg-site.png", "Competicao de prototipos autonomos e apresentacao tecnica."],
    ["Feira de Tecnologia", "2026", "IF Goiano", "Participacao", "assets/hero-robotica.png", "imgs/20250618_104600.jpg", "Exposicao de projetos, testes de robo e demonstracao para visitantes."],
    ["Mostra de Projetos", "2025", "Campus Campos Belos", "Apresentacao", "imgs/bg-site.png", "assets/hero-robotica.png", "Apresentacao dos primeiros prototipos e organizacao da equipe."],
  ],
  customBlocks: [
    ["Destaque do mes", "Use esta caixa para divulgar uma novidade, chamada ou aviso importante.", "", "Novo", "#contato", "Falar com o time", "Destaque"],
  ],
  customSections: [],
  headerLinks: [
    ["Equipe", "equipe.html", "2"],
    ["Projetos", "#projetos", "3"],
    ["Eventos", "#eventos", "4"],
    ["Contato", "#contato", "90"],
    ["Entrar no app", "login.html", "99"],
  ],
  footerNavLinks: [
    ["Inicio", "index.html"],
    ["Equipe", "equipe.html"],
    ["Projetos", "#projetos"],
    ["Eventos", "#eventos"],
    ["Contato", "#contato"],
  ],
  footerCentralLinks: [
    ["Entrar no app", "login.html"],
    ["Conquistas", "conquistas.html"],
    ["Robos", "robos.html"],
    ["Mais", "mais.html"],
  ],
  footerSocials: [
    ["GitHub", "https://github.com/DUDUVPS/cybercapivaras", "imgs/github.png"],
    ["Instagram", "#", "imgs/instagram.png"],
    ["App", "login.html", ""],
  ],
};

const defaultMembers = [
  ["Eduardo Souza", "Capitao", "N4", "imgs/fotos/ft-alceu.png", "Organiza estrategia, cronograma e prioridades.", "", "1a Geracao Fabrica", "Ativo"],
  ["Allen Sena", "Estudante / Arduino", "N3", "imgs/fotos/ft-allem.png", "Atua nos testes com Arduino, sensores e prototipos.", "", "1a Geracao Fabrica", "Ativo"],
  ["Ana Julia Maia", "Documentacao", "N2", "imgs/fotos/ft-naju.png", "Registra progresso, relatorios e evidencias.", "", "1a Geracao Fabrica", "Ativo"],
  ["Renata Miranda", "Marketing", "N2", "imgs/fotos/ft-renata.png", "Cuida da comunicacao visual e redes sociais.", "", "1a Geracao Fabrica", "Ativo"],
  ["Andre Wild", "Programacao", "N2", "imgs/fotos/ft-andre.png", "Cuida do codigo, sensores e automacao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Allisson Beltrao", "Mecanica", "N2", "imgs/fotos/ft-beltrao.png", "Cuida da estrutura, montagem e manutencao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Isadorah Araujo", "Design 3D", "N2", "imgs/fotos/ft-isadorah.png", "Modela pecas e prototipos para impressao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Marcelo Brandao", "Membro", "N1", "imgs/fotos/ft-marcelo.png", "Participa das tarefas e apoio aos projetos.", "membro@cybercapivaras.com", "1a Geracao Fabrica", "Ativo"],
];

const defaultAppSettings = {
  appName: "Cyber App",
  density: "comfortable",
  accent: "green",
};

const defaultTasks = [
  { title: "Calibrar sensores", area: "Seguidor de linha", status: "afazer", due: "2026-06-12" },
  { title: "Revisar chassi", area: "Mecanica", status: "andamento", due: "2026-06-14" },
  { title: "Publicar fotos", area: "Marketing", status: "concluida", due: "2026-06-18" },
];

const appModules = {
  painel: "Painel",
  site: "Site publico",
  equipe: "Equipe",
  chamados: "Chamados",
  tarefas: "Tarefas",
  seletivo: "Processo seletivo",
  ajustes: "Ajustes",
};

const defaultCandidates = [
  { name: "Livia Martins", area: "Programacao", stage: "Entrevista", interviewer: "membro@cybercapivaras.com", notes: "" },
  { name: "Carlos Henrique", area: "Mecanica", stage: "Teste pratico", interviewer: "", notes: "" },
  { name: "Beatriz Rocha", area: "Eletronica", stage: "Inscricao", interviewer: "", notes: "" },
];

const defaultUserPermissions = {
  "membro@cybercapivaras.com": { tabs: ["painel", "equipe", "tarefas", "seletivo", "chamados"], canInterview: true },
};

let calendarDate = new Date();
let lastDraftToast = 0;

const roleProfiles = {
  Administrador: ["N5", "Controle total do app, site e funcoes."],
  Professor: ["N5", "Acompanha equipe, aprova processos e orienta decisoes."],
  Orientador: ["N5", "Orienta projetos, seguranca e organizacao pedagogica."],
  Capitao: ["N4", "Coordena projetos, tarefas e comunicados."],
  "Lider tecnico": ["N3", "Gerencia robos, testes e documentacao tecnica."],
  Programacao: ["N2", "Atualiza codigos, sensores e automacao."],
  Hardware: ["N2", "Cuida de circuitos, motores e componentes."],
  Mecanica: ["N2", "Cuida de estrutura, chassi e montagem."],
  "Design 3D": ["N2", "Modela pecas e prototipos."],
  Documentacao: ["N2", "Registra relatorios e historico tecnico."],
  Marketing: ["N2", "Atualiza comunicacao, fotos e noticias."],
  Membro: ["N1", "Acompanha agenda e participa das tarefas."],
};

const baseTeam = [
  ["Eduardo Souza", "Capitao"],
  ["Allen Sena", "Lider tecnico"],
  ["Ana Julia Maia", "Documentacao"],
  ["Renata Miranda", "Marketing"],
  ["Andre Wild", "Programacao"],
  ["Allisson Beltrao", "Mecanica"],
  ["Isadorah Araujo", "Design 3D"],
  ["Marcelo Brandao", "Membro"],
];

function getContent() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem("cyber_site_content") || "{}");
  } catch {
    stored = {};
  }
  return { ...defaultContent, members: defaultMembers, ...stored, ...(runtimeSiteContent || {}) };
}

function saveContent(content) {
  runtimeSiteContent = content;
  try {
    localStorage.setItem("cyber_site_content", JSON.stringify(content));
    return true;
  } catch {
    try {
      localStorage.setItem("cyber_site_content", JSON.stringify(compactContentForLocalCache(content)));
    } catch {
      localStorage.removeItem("cyber_site_content");
    }
    return false;
  }
}

function compactContentForLocalCache(value) {
  if (Array.isArray(value)) return value.map(compactContentForLocalCache);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, compactContentForLocalCache(item)]));
  }
  if (typeof value !== "string") return value;
  if (!value.includes("data:image")) return value;
  return value
    .split("\n")
    .filter((item) => !item.trim().startsWith("data:image"))
    .join("\n");
}

function normalizeUrl(value = "") {
  const text = String(value).trim();
  if (!text) return "";
  if (/^(#|mailto:|tel:|data:|https?:\/\/|\/|\.\/|\.\.\/)/i.test(text)) return text;
  if (/^[\w-]+\.html([?#].*)?$/i.test(text)) return `${window.location.origin}/${text}`;
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(text)) return `https://${text}`;
  return text;
}

function normalizeLinkRows(rows = []) {
  return rows.map((row) => {
    const next = [...row];
    if (next[1]) next[1] = normalizeUrl(next[1]);
    return next;
  });
}

function normalizePublicContentLinks(content) {
  return {
    ...content,
    siteHomeLink: normalizeUrl(content.siteHomeLink),
    accountLink: normalizeUrl(content.accountLink),
    heroPrimaryLink: normalizeUrl(content.heroPrimaryLink),
    heroSecondaryLink: normalizeUrl(content.heroSecondaryLink),
    footerCreditUrl: normalizeUrl(content.footerCreditUrl),
    headerLinks: normalizeLinkRows(content.headerLinks || []),
    footerNavLinks: normalizeLinkRows(content.footerNavLinks || []),
    footerCentralLinks: normalizeLinkRows(content.footerCentralLinks || []),
    footerSocials: normalizeLinkRows(content.footerSocials || []),
    customSections: (content.customSections || []).map((row) => {
      const next = [...row];
      if (next[5]) next[5] = normalizeUrl(next[5]);
      return next;
    }),
  };
}

function hasLocalPublicContent() {
  try {
    const raw = localStorage.getItem("cyber_site_content");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}

async function loadContentFromApi() {
  if (remoteContentLoaded) return false;
  remoteContentLoaded = true;

  try {
    const response = await fetch(`${API_URL}/api/site-content`, { cache: "no-store" });
    if (!response.ok) return false;
    const data = await response.json();
    if (data.content && typeof data.content === "object") {
      runtimeSiteContent = data.content;
      saveContent({ ...getContent(), ...data.content });
      return true;
    }
  } catch {
    // Local fallback keeps the app usable if the API is offline.
  }
  return false;
}

async function saveContentToApi(content) {
  requireAdminBackendSession();
  const normalizedContent = normalizePublicContentLinks(content);
  const response = await fetch(`${API_URL}/api/site-content`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ content: normalizedContent }),
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 413) throw new Error("Conteudo muito grande para enviar. Reduza algumas imagens ou use imagens menores.");
  if (response.status === 401) {
    localStorage.removeItem("cyber_session");
    throw new Error("Sessao de administrador expirada. Entre novamente pelo acesso do administrador.");
  }
  if (!response.ok) throw new Error(data.error || "Nao foi possivel salvar no backend.");
  return data;
}

function linesToRows(text, size) {
  return text
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts.length >= size && parts.every(Boolean));
}

function rowsToLines(rows) {
  return rows.map((row) => row.join(" | ")).join("\n");
}

const blockSchemas = {
  headerLinks: [
    ["Texto", "Equipe"],
    ["Link", "equipe.html"],
    ["Sequencia", "1"],
  ],
  areas: [
    ["Titulo", "Ex.: Software"],
    ["Descricao", "O que aparece nessa caixa"],
  ],
  projects: [
    ["Nome", "Robo Seguidor de Linha"],
    ["Descricao", "Resumo do projeto"],
    ["Imagem", "imgs/projeto.png"],
    ["Tecnologias", "Arduino, sensores, motores"],
    ["Galeria", "Uma imagem por linha"],
    ["Status", "Ativo"],
  ],
  events: [
    ["Nome", "Feira de Tecnologia"],
    ["Ano", "2026"],
    ["Local", "IF Goiano"],
    ["Resultado", "Participacao"],
    ["Imagem", "imgs/evento.png"],
    ["Galeria", "Uma imagem por linha"],
    ["Descricao", "Resumo do evento"],
  ],
  customBlocks: [
    ["Titulo", "Destaque do mes"],
    ["Texto", "Conteudo da caixa"],
    ["Imagem", "imgs/imagem.png"],
    ["Etiqueta", "Novo"],
    ["Link", "#contato"],
    ["Texto do botao", "Saiba mais"],
    ["Status", "Destaque"],
  ],
  customSections: [
    ["Nome da aba", "Personalizado"],
    ["Titulo", "Titulo da pagina"],
    ["Texto", "Conteudo da pagina"],
    ["Imagem", "imgs/imagem.png"],
    ["Sequencia", "5"],
    ["Link do botao", "#contato"],
    ["Texto do botao", "Saiba mais"],
    ["Status", "Destaque"],
    ["Modelo", "padrao ou patrocinio"],
    ["Caixas", "nome | texto | imagem/logo"],
  ],
  footerNavLinks: [
    ["Texto", "Inicio"],
    ["Link", "index.html"],
  ],
  footerCentralLinks: [
    ["Texto", "Entrar no app"],
    ["Link", "login.html"],
  ],
  footerSocials: [
    ["Nome", "GitHub"],
    ["Link", "https://github.com/..."],
    ["Icone", "imgs/github.png"],
  ],
};

function showToast(message, type = "success") {
  const stack = document.querySelector("#toastStack");
  if (!stack) return;
  const toast = document.createElement("div");
  toast.className = `app-toast ${type}`;
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.classList.add("is-leaving"), 2600);
  setTimeout(() => toast.remove(), 3200);
}

function showDraftToast(message = "Alteracao detectada. Salve para publicar.") {
  const now = Date.now();
  if (now - lastDraftToast < 5000) return;
  lastDraftToast = now;
  showToast(message, "warning");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function isMediaField(label = "") {
  return /imagem|icone|logo|foto|galeria/i.test(label);
}

function isMediaListField(label = "") {
  return /galeria/i.test(label);
}

function isLongTextField(label = "") {
  return /descricao|descrição|texto|objetivo|caixas/i.test(label);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
    reader.readAsDataURL(file);
  });
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Nao foi possivel processar a imagem."));
    };
    image.src = url;
  });
}

async function fileToDataUrl(file, maxSizeMb = 1.2, options = {}) {
  if (!file) return "";
  if (!file.type.startsWith("image/") || /svg|gif/i.test(file.type)) {
    return readFileAsDataUrl(file);
  }

  const image = await loadImageFromFile(file);
  const maxSide = options.maxSide || 1400;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const preserveTransparency = Boolean(options.preserveTransparency);
  const context = canvas.getContext("2d", { alpha: preserveTransparency });
  if (!context) return readFileAsDataUrl(file);
  if (!preserveTransparency) {
    context.fillStyle = "#0b0f17";
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(image, 0, 0, width, height);

  if (preserveTransparency) {
    let outputCanvas = canvas;
    let result = outputCanvas.toDataURL("image/png");
    const maxBytes = maxSizeMb * 1024 * 1024;

    while (result.length * 0.75 > maxBytes && Math.max(outputCanvas.width, outputCanvas.height) > 180) {
      const nextCanvas = document.createElement("canvas");
      nextCanvas.width = Math.max(1, Math.round(outputCanvas.width * 0.82));
      nextCanvas.height = Math.max(1, Math.round(outputCanvas.height * 0.82));
      const nextContext = nextCanvas.getContext("2d", { alpha: true });
      if (!nextContext) break;
      nextContext.drawImage(outputCanvas, 0, 0, nextCanvas.width, nextCanvas.height);
      outputCanvas = nextCanvas;
      result = outputCanvas.toDataURL("image/png");
    }

    return result;
  }

  const mimeType = canvas.toDataURL("image/webp", 0.78).startsWith("data:image/webp") ? "image/webp" : "image/jpeg";
  let quality = 0.82;
  let result = canvas.toDataURL(mimeType, quality);
  const maxBytes = maxSizeMb * 1024 * 1024;

  while (result.length * 0.75 > maxBytes && quality > 0.48) {
    quality -= 0.08;
    result = canvas.toDataURL(mimeType, quality);
  }

  return result;
}

function splitMediaList(value = "") {
  const text = String(value);
  const separator = text.includes("data:image") ? /[\n|]+/ : /[\n,|]+/;
  return text
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSponsorBoxLines(value = "") {
  return String(value)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", text = "", logo = ""] = line.split("|").map((part) => part.trim());
      return { name, text, logo };
    })
    .filter((box) => box.name || box.text || box.logo);
}

function sponsorBoxesToLines(boxes = []) {
  return boxes
    .map((box) => [box.name, box.text, box.logo].map((value) => String(value || "").trim()).join(" | "))
    .filter((line) => line.replace(/[|\s]/g, ""))
    .join("\n");
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "pagina";
}

function updateMediaPreview(name) {
  const input = document.querySelector(`[name="${name}"]`);
  const preview = document.querySelector(`[data-media-preview="${name}"]`);
  if (!input || !preview) return;
  const value = input.value.trim();
  preview.src = value || "imgs/apple-touch-icon.png";
}

function renderKnownAccountOptions() {
  const select = document.querySelector("#knownAccountSelect");
  if (!select) return;
  const users = getKnownUsers().slice().sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
  select.innerHTML = `
    <option value="">Escolher conta que ja entrou</option>
    ${users.map((user) => `<option value="${escapeHtml(user.email)}">${escapeHtml(user.name || user.email)} - ${escapeHtml(user.email)}</option>`).join("")}
  `;
}

function createBlockRow(type, values = []) {
  const schema = blockSchemas[type] || [];
  return schema.map(([, placeholder], index) => values[index] || (index === 0 ? `Novo ${type}` : ""));
}

const pageTemplates = {
  info: {
    name: "Pagina informativa",
    values: ["Nova informacao", "Titulo da pagina", "Escreva aqui o conteudo principal desta pagina.", "", "", "#contato", "Enviar mensagem", "Publicado"],
  },
  media: {
    name: "Pagina com imagem",
    values: ["Galeria", "Titulo com imagem", "Use esta pagina para mostrar fotos, prototipos ou bastidores.", "imgs/bg-site.png", "", "#projetos", "Ver projetos", "Destaque"],
  },
  cta: {
    name: "Chamada",
    values: ["Chamada", "Participe do Cyber Capivaras", "Texto curto para convite, inscricao, parceria ou aviso importante.", "", "", "#contato", "Falar com o time", "Aberto", "padrao", ""],
  },
  sponsors: {
    name: "Patrocinio",
    values: [
      "Patrocinio",
      "Conheca Nossos Patrocinadores",
      "",
      "",
      "",
      "",
      "",
      "",
      "patrocinio",
      "nome patrocinio | text adicional | imgs/apple-touch-icon.png\nnome patrocinio | text adicional | imgs/apple-touch-icon.png\nnome patrocinio | text adicional | imgs/apple-touch-icon.png\nnome patrocinio | text adicional | imgs/apple-touch-icon.png",
    ],
  },
};

function normalizeBlockRows(type, rows = []) {
  if (type === "headerLinks") {
    return rows.map((row, index) => (row.length >= 3 ? row : [row[0], row[1], String(index + 1)]));
  }
  if (type === "projects") {
    return rows.map((row) => (row.length >= 6 ? row : [row[0], row[1], row[2], row[3], "", row[4] || "Ativo"]));
  }
  if (type === "events") {
    return rows.map((row) => {
      if (row.length >= 7) return row;
      if (row.length === 6) return [row[0], row[1], row[2], row[3], row[4], "", row[5]];
      return [row[0], row[1], row[2], row[3], "", "", row[4]];
    });
  }
  if (type === "customSections") {
    return rows.map((row, index) => {
      if (row.length >= 10) return row;
      if (row.length >= 8) return [...row, "padrao", ""];
      if (row.length >= 7) return [row[3] || row[0] || `Pagina ${index + 1}`, row[0], row[1], row[2], String(5 + index), row[4], row[5], row[6], "padrao", ""];
      return row;
    });
  }
  return rows;
}

function applySiteTabLabels(content = getContent()) {
  document.querySelectorAll("[data-site-tab-label]").forEach((button) => {
    button.textContent = content[button.dataset.siteTabLabel] || button.textContent;
  });
}

function isSponsorBoxesField(type, row, label) {
  return type === "customSections" && label === "Caixas" && String(row[8] || "").trim().toLowerCase() === "patrocinio";
}

function renderSponsorBoxItem(box = {}) {
  const logo = box.logo || "imgs/apple-touch-icon.png";
  return `
    <article class="sponsor-box-item" data-sponsor-box-item>
      <div class="sponsor-box-logo">
        <img alt="Logo do patrocinador" src="${escapeHtml(logo)}" data-sponsor-logo-preview />
        <div>
          <label>Logo ou imagem
            <input type="text" data-sponsor-logo value="${escapeHtml(box.logo || "")}" placeholder="imgs/logo.png ou cole uma URL" />
          </label>
          <input type="file" accept="image/*" data-sponsor-file />
        </div>
      </div>
      <div class="sponsor-box-grid">
        <label>Nome do patrocinador
          <input type="text" data-sponsor-name value="${escapeHtml(box.name || "")}" placeholder="Nome do patrocinador" />
        </label>
        <label>Texto adicional
          <textarea rows="3" data-sponsor-text placeholder="Texto curto que aparece dentro da caixa">${escapeHtml(box.text || "")}</textarea>
        </label>
      </div>
      <button class="ghost-button danger-button" type="button" data-remove-sponsor-box>Remover caixa</button>
    </article>
  `;
}

function renderSponsorBoxEditor(value = "") {
  const boxes = parseSponsorBoxLines(value);
  const safeBoxes = boxes.length ? boxes : [{ name: "", text: "", logo: "" }];
  return `
    <div class="sponsor-box-editor" data-sponsor-editor>
      <strong>Caixas de patrocinio</strong>
      <textarea data-block-field="9" hidden>${escapeHtml(value || "")}</textarea>
      <div class="sponsor-box-editor-head">
        <span>Edite cada patrocinador em uma caixa separada.</span>
        <button class="ghost-button" type="button" data-add-sponsor-box>Adicionar caixa</button>
      </div>
      <div class="sponsor-box-list" data-sponsor-box-list>
        ${safeBoxes.map((box) => renderSponsorBoxItem(box)).join("")}
      </div>
    </div>
  `;
}

function renderBlockField(type, row, label, placeholder, fieldIndex) {
  if (isSponsorBoxesField(type, row, label)) {
    return renderSponsorBoxEditor(row[fieldIndex] || "");
  }

  return `
    <label>${label}
      ${isLongTextField(label) ? `<textarea rows="3" data-block-field="${fieldIndex}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(row[fieldIndex] || "")}</textarea>` : `
        <div class="${isMediaField(label) ? "media-picker compact-media-picker" : ""}">
          ${isMediaField(label) ? `<img alt="Preview" data-block-media-preview="${fieldIndex}" src="${escapeHtml(splitMediaList(row[fieldIndex])[0] || "imgs/apple-touch-icon.png")}" />` : ""}
          <div>
            ${isMediaListField(label)
              ? `<textarea rows="3" data-block-field="${fieldIndex}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(row[fieldIndex] || "")}</textarea>`
              : `<input type="text" data-block-field="${fieldIndex}" value="${escapeHtml(row[fieldIndex] || "")}" placeholder="${escapeHtml(placeholder)}" />`}
            ${isMediaField(label) ? `<input type="file" accept="image/*" data-block-media-file="${fieldIndex}" ${isMediaListField(label) ? "multiple" : ""} />` : ""}
          </div>
        </div>
      `}
    </label>
  `;
}

function syncSponsorBoxEditor(editor) {
  if (!editor) return;
  const boxes = [...editor.querySelectorAll("[data-sponsor-box-item]")].map((item) => ({
    name: item.querySelector("[data-sponsor-name]")?.value || "",
    text: item.querySelector("[data-sponsor-text]")?.value || "",
    logo: item.querySelector("[data-sponsor-logo]")?.value || "",
  }));
  const hiddenField = editor.querySelector('[data-block-field="9"]');
  if (hiddenField) hiddenField.value = sponsorBoxesToLines(boxes);
}

function renderBlockEditors(content) {
  Object.entries(blockSchemas).forEach(([type, schema]) => {
    const list = document.querySelector(`[data-block-list="${type}"]`);
    if (!list) return;
    const rows = normalizeBlockRows(type, content[type] || []);
    list.innerHTML = rows
      .map(
        (row, rowIndex) => `
          <article class="editable-block" data-block-row="${type}" data-row-index="${rowIndex}">
            <div class="editable-block-head">
              <button class="drag-handle" type="button" draggable="true" data-drag-block="${type}" aria-label="Arrastar para ordenar">Mover</button>
              <strong>${escapeHtml(row[0] || "Sem titulo")}</strong>
              <button class="ghost-button" type="button" data-remove-block="${type}" data-row-index="${rowIndex}">Remover</button>
            </div>
            <div class="editable-block-grid">
              ${schema
                .map(([label, placeholder], fieldIndex) => renderBlockField(type, row, label, placeholder, fieldIndex))
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  });
}

function reorderDraggedBlock(targetBlock) {
  if (!draggedBlock || !targetBlock || draggedBlock.type !== targetBlock.dataset.blockRow) return false;
  const source = draggedBlock.element;
  if (!source || source === targetBlock) return false;

  const list = targetBlock.parentElement;
  const blocks = [...list.querySelectorAll(`[data-block-row="${draggedBlock.type}"]`)];
  const sourceIndex = blocks.indexOf(source);
  const targetIndex = blocks.indexOf(targetBlock);
  if (sourceIndex < 0 || targetIndex < 0) return false;

  if (sourceIndex < targetIndex) {
    targetBlock.after(source);
  } else {
    targetBlock.before(source);
  }

  blocks.forEach((block) => block.classList.remove("is-drag-over"));
  showDraftToast("Ordem alterada. Salve para publicar no banco de dados.");
  return true;
}

function collectBlockRows(type) {
  const schema = blockSchemas[type] || [];
  return [...document.querySelectorAll(`[data-block-row="${type}"]`)]
    .map((block) =>
      schema.map((_, index) => block.querySelector(`[data-block-field="${index}"]`)?.value.trim() || "")
    )
    .filter((row) => row[0]);
}

function collectEditorBlocks() {
  return {
    areas: collectBlockRows("areas"),
    projects: collectBlockRows("projects"),
    events: collectBlockRows("events"),
    customSections: collectBlockRows("customSections"),
    headerLinks: collectBlockRows("headerLinks"),
    footerNavLinks: collectBlockRows("footerNavLinks"),
    footerCentralLinks: collectBlockRows("footerCentralLinks"),
    footerSocials: collectBlockRows("footerSocials"),
  };
}

async function persistPublicContent(content, successMessage = "Conteudo publico salvo.") {
  const normalizedContent = normalizePublicContentLinks(content);
  try {
    await saveContentToApi(normalizedContent);
  } catch (error) {
    showToast(error.message, "error");
    return {
      remoteSaved: false,
      localCached: false,
      error,
      needsAdminLogin: isAdminSessionError(error),
    };
  }

  const localCached = saveContent(normalizedContent);

  if (!localCached) {
    showToast(`${successMessage} Salvo no banco de dados; o cache deste aparelho foi ignorado porque ficou grande.`, "warning");
    return { remoteSaved: true, localCached: false };
  }

  showToast(successMessage);
  return { remoteSaved: true, localCached: true };
}

async function createAndSaveCustomPage(templateKey = "info") {
  const nextContent = {
    ...getContent(),
    ...collectEditorBlocks(),
  };
  const nextIndex = (nextContent.customSections || []).length + 1;
  const template = pageTemplates[templateKey] || pageTemplates.info;
  const pageName = `${template.name} ${nextIndex}`;
  const pageSlug = `#pagina-${nextIndex}-${slugify(pageName)}`;
  const sectionValues = [...template.values];
  sectionValues[0] = pageName;
  sectionValues[1] = template.values[1] || pageName;
  sectionValues[4] = String(5 + nextIndex);
  nextContent.customSections = [
    ...(nextContent.customSections || []),
    createBlockRow("customSections", sectionValues),
  ];
  nextContent.headerLinks = [...(nextContent.headerLinks || []), createBlockRow("headerLinks", [pageName, pageSlug, String(20 + nextIndex)])];
  await persistPublicContent(nextContent, "Nova pagina criada e publicada.");
  renderBlockEditors(nextContent);
  applySiteTabLabels(nextContent);
  renderSitePreview();
  document.querySelector('[data-subtab-target="site-paginas"]')?.click();
  document.querySelector('[data-block-editor="customSections"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function normalizeMember(member) {
  return {
    name: member[0] || "",
    role: member[1] || "Membro",
    level: member[2] || "N1",
    image: member[3] || "imgs/apple-touch-icon.png",
    description: member[4] || "",
    email: member[5] || "",
    generation: member[6] || "1a Geracao Fabrica",
    status: member[7] || "Ativo",
    instagram: member[8] || "",
    github: member[9] || "",
    mainArea: member[10] || "",
  };
}

function memberToRow(member) {
  return [
    member.name,
    member.role,
    member.level || getRoleLevel(member.role),
    member.image,
    member.description,
    member.email || "",
    member.generation || "1a Geracao Fabrica",
    member.status || "Ativo",
    member.instagram || "",
    member.github || "",
    member.mainArea || "",
  ];
}

function getRoleLevel(role) {
  return (roleProfiles[role] || roleProfiles.Membro)[0];
}

function isInactiveStatus(status = "") {
  return !/^ativo$/i.test(String(status).trim());
}

function renderMemberCard(memberRow, index, editable = false) {
  const member = normalizeMember(memberRow);
  return `
    <article class="member-card team-person-card ${isInactiveStatus(member.status) ? "is-inactive" : ""}">
      <div class="member-photo team-person-photo"><img src="${member.image}" alt="${member.name}" /></div>
      <div class="member-info team-person-info">
        <h3>${member.name}</h3>
        <strong>${member.role}</strong>
        ${member.mainArea ? `<span class="person-area">${member.mainArea}</span>` : ""}
        <span class="person-generation">${member.generation}</span>
        <p class="person-status">Status: <b>${member.status}</b></p>
        <div class="person-actions">
          <div class="person-socials" aria-label="Redes sociais">
            <a class="${member.instagram ? "" : "is-disabled"}" href="${member.instagram || "#"}" aria-label="Instagram de ${member.name}"><img src="imgs/instagram.png" alt="" /></a>
            <a class="${member.github ? "" : "is-disabled"}" href="${member.github || "#"}" aria-label="GitHub de ${member.name}"><img src="imgs/github.png" alt="" /></a>
          </div>
          <span class="person-details">Detalhes</span>
        </div>
        ${member.email ? `<small>${member.email}</small>` : ""}
        ${editable ? `<button class="team-edit-button" type="button" data-edit-member="${index}">Editar</button>` : ""}
      </div>
    </article>
  `;
}

function fileToAttachment(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      reject(new Error("Arquivo muito grande. Envie ate 4 MB."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, data: reader.result });
    reader.onerror = () => reject(new Error("Nao foi possivel ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

function getRoles() {
  return JSON.parse(localStorage.getItem("cyber_roles") || '{"admin@cybercapivaras.com":{"name":"Administrador","email":"admin@cybercapivaras.com","role":"Administrador"}}');
}

const appStateLocalKeys = {
  roles: "cyber_roles",
  settings: "cyber_app_settings",
  tasks: "cyber_tasks",
  permissions: "cyber_user_permissions",
  candidates: "cyber_candidates",
};

async function loadAppStateFromApi() {
  if (remoteAppStateLoaded || !hasAdminBackendSession()) return;
  remoteAppStateLoaded = true;

  try {
    const response = await fetch(`${API_URL}/api/app-state`, { headers: getAuthHeaders(), cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const state = data.state || {};
    Object.entries(appStateLocalKeys).forEach(([key, localKey]) => {
      if (key in state && state[key] !== null) {
        localStorage.setItem(localKey, JSON.stringify(state[key]));
      }
    });
  } catch {
    showToast("Nao foi possivel carregar os dados da central do banco.", "warning");
  }
}

function saveAppStateToApi(key, value) {
  if (!hasAdminBackendSession()) return;
  fetch(`${API_URL}/api/app-state`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ key, value }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Falha ao salvar no banco.");
    })
    .catch(() => showToast("Nao salvou os dados da central no banco.", "error"));
}

function saveRoles(roles) {
  localStorage.setItem("cyber_roles", JSON.stringify(roles));
  saveAppStateToApi("roles", roles);
}

function getKnownUsers() {
  return JSON.parse(localStorage.getItem("cyber_known_users") || "[]");
}

function saveKnownUsers(users) {
  localStorage.setItem("cyber_known_users", JSON.stringify(users));
}

function mergeKnownUsers(users = []) {
  const merged = getKnownUsers();
  users.forEach((user) => {
    if (!user?.email) return;
    const nextUser = {
      name: user.name || user.email,
      email: user.email,
      picture: user.picture || "",
      role: user.role || "Membro",
    };
    const index = merged.findIndex((item) => item.email === nextUser.email);
    if (index >= 0) {
      merged[index] = { ...merged[index], ...nextUser };
    } else {
      merged.push(nextUser);
    }
  });
  saveKnownUsers(merged);
  renderKnownAccountOptions();
  return merged;
}

function rememberKnownUser(user = {}) {
  if (!user.email) return;
  mergeKnownUsers([{
    name: user.name || user.email,
    email: user.email,
    picture: user.picture || "",
    role: user.role || "Membro",
  }]);
  fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).catch(() => {});
}

async function loadKnownUsersFromApi() {
  if (!hasAdminBackendSession()) return;
  try {
    const response = await fetch(`${API_URL}/api/users`, { headers: getAuthHeaders(), cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    mergeKnownUsers(data.users || []);
  } catch {
    // Local accounts remain available when the API is unavailable.
  }
}

function getAppSettings() {
  return { ...defaultAppSettings, ...JSON.parse(localStorage.getItem("cyber_app_settings") || "{}") };
}

function saveAppSettings(settings) {
  localStorage.setItem("cyber_app_settings", JSON.stringify(settings));
  saveAppStateToApi("settings", settings);
}

function normalizeTask(task) {
  if (Array.isArray(task)) {
    return { title: task[0], area: task[1], status: "afazer", due: new Date().toISOString().slice(0, 10) };
  }
  return { status: "afazer", due: new Date().toISOString().slice(0, 10), ...task };
}

function getTasks() {
  return JSON.parse(localStorage.getItem("cyber_tasks") || JSON.stringify(defaultTasks)).map(normalizeTask);
}

function saveTasks(tasks) {
  localStorage.setItem("cyber_tasks", JSON.stringify(tasks));
  saveAppStateToApi("tasks", tasks);
}

function getUserPermissions() {
  return { ...defaultUserPermissions, ...JSON.parse(localStorage.getItem("cyber_user_permissions") || "{}") };
}

function saveUserPermissions(rules) {
  localStorage.setItem("cyber_user_permissions", JSON.stringify(rules));
  saveAppStateToApi("permissions", rules);
}

function getCandidates() {
  return JSON.parse(localStorage.getItem("cyber_candidates") || JSON.stringify(defaultCandidates)).map((candidate) => (
    Array.isArray(candidate)
      ? { name: candidate[0], area: candidate[1], stage: candidate[2], interviewer: "", notes: "" }
      : { interviewer: "", notes: "", ...candidate }
  ));
}

function saveCandidates(candidates) {
  localStorage.setItem("cyber_candidates", JSON.stringify(candidates));
  saveAppStateToApi("candidates", candidates);
}

function startSession(user) {
  if (user.token && user.role) {
    rememberKnownUser(user);
    localStorage.setItem("cyber_session", JSON.stringify(user));
    window.location.href = "app.html";
    return;
  }

  const roles = getRoles();
  const saved = roles[user.email] || { name: user.name, email: user.email, role: "Membro" };
  const [level, permission] = roleProfiles[saved.role] || roleProfiles.Membro;

  const sessionUser = {
    name: saved.name || user.name,
    email: user.email,
    picture: user.picture || saved.picture || "",
    role: saved.role,
    level,
    permission,
  };
  rememberKnownUser(sessionUser);
  localStorage.setItem("cyber_session", JSON.stringify(sessionUser));

  window.location.href = "app.html";
}

function getSession() {
  return JSON.parse(localStorage.getItem("cyber_session") || "null");
}

function hasAdminBackendSession(session = getSession()) {
  return Boolean(session?.role === "Administrador" && session?.token);
}

function requireAdminBackendSession() {
  if (!hasAdminBackendSession()) {
    throw new Error("Entre pelo acesso do administrador com e-mail e senha para publicar no site.");
  }
}

function isAdminSessionError(error) {
  return /acesso do administrador|sessao de administrador|e-mail e senha/i.test(error?.message || "");
}

function getAuthHeaders() {
  const session = getSession();
  return session?.token ? { Authorization: `Bearer ${session.token}` } : {};
}

function getAccessGroup(session = getSession()) {
  if (!session) return "Aluno";
  if (session.role === "Administrador") return hasAdminBackendSession(session) ? "Administrador" : "Admin sem sessao";
  if (["Professor", "Orientador", "Capitao", "Lider tecnico"].includes(session.role)) return "Professor";
  return "Aluno";
}

function getAllowedTabs(session = getSession()) {
  if (!session) return ["painel"];
  if (session.role === "Administrador") return hasAdminBackendSession(session) ? Object.keys(appModules) : ["painel"];
  const person = getUserPermissions()[session.email];
  return person?.tabs?.length ? person.tabs : ["painel", "equipe", "tarefas", "chamados"];
}

function canInterview(session = getSession()) {
  if (!session) return false;
  if (session.role === "Administrador") return true;
  return Boolean(getUserPermissions()[session.email]?.canInterview);
}

function renderPublicPage() {
  const content = getContent();

  document.querySelectorAll("[data-content]").forEach((node) => {
    node.textContent = content[node.dataset.content] || "";
  });

  const areas = document.querySelector("#publicAreas");
  if (areas) {
    areas.innerHTML = content.areas
      .map(([title, text], index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`)
      .join("");
  }

  const projects = document.querySelector("#publicProjects");
  if (projects) {
    projects.innerHTML = content.projects
      .map(([title, text, image]) => `<article><img src="${image}" alt="${title}" /><div><h3>${title}</h3><p>${text}</p></div></article>`)
      .join("");
  }
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal, .feature-grid article, .project-showcase article");
  if (!items.length) return;

  items.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
    observer.observe(item);
  });
}

function setupLogin() {
  const adminForm = document.querySelector("#adminLoginForm");
  const adminReveal = document.querySelector("#adminRevealButton");
  const googleButton = document.querySelector("#googleDemoButton");
  const status = document.querySelector("#loginStatus");
  const googleStatus = document.querySelector("#googleStatus");

  if (!adminForm || !googleButton) return;

  if (adminReveal) {
    adminReveal.addEventListener("click", () => {
      const open = adminReveal.getAttribute("aria-expanded") === "true";
      adminReveal.setAttribute("aria-expanded", String(!open));
      adminForm.hidden = open;
      if (!open) adminForm.querySelector("input")?.focus();
    });
  }

  window.handleGoogleCredential = (response) => {
    const payload = parseJwt(response.credential);
    startSession({
      name: payload.name || payload.email,
      email: payload.email,
      picture: payload.picture || "",
    });
  };

  const initGoogle = () => {
    if (!window.google || !window.GOOGLE_CLIENT_ID) return false;

    window.google.accounts.id.initialize({
      client_id: window.GOOGLE_CLIENT_ID,
      callback: window.handleGoogleCredential,
    });

    window.google.accounts.id.renderButton(document.querySelector("#googleSignIn"), {
      theme: "filled_black",
      size: "large",
      width: 320,
    });

    googleButton.hidden = true;
    if (googleStatus) googleStatus.textContent = "Login Google oficial ativo.";
    return true;
  };

  if (!initGoogle()) {
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (initGoogle() || attempts > 20) window.clearInterval(timer);
    }, 250);
  }

  googleButton.addEventListener("click", () => {
    startSession({ name: "Membro Google", email: "membro@cybercapivaras.com" });
  });

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Verificando administrador...";
    const data = Object.fromEntries(new FormData(adminForm).entries());

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      startSession({ ...result.user, token: result.token });
    } catch (error) {
      status.textContent = error.message || "Acesso de administrador invalido.";
    }
  });
}

function parseJwt(token) {
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(json);
}

function protectApp() {
  if (!document.body.dataset.protected) return;
  if (!getSession()) window.location.href = "login.html";
}

function showAppTab(tabId) {
  const allowed = getAllowedTabs();
  const target = allowed.includes(tabId) ? tabId : allowed[0] || "painel";

  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
  });

  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === target);
  });
}

function setupAppTabs() {
  if (!document.body.classList.contains("app-shell")) return;

  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => {
      showAppTab(button.dataset.tabTarget);
    });
  });

  document.querySelectorAll("[data-subtab-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.subtabTarget;
      const group = button.closest("[data-subtab-group]")?.dataset.subtabGroup || "";
      document.querySelectorAll(`[data-subtab-group="${group}"] [data-subtab-target]`).forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll(`[data-subtab-panel][data-subtab-group="${group}"]`).forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.subtabPanel === target);
      });
    });
  });
}

function applyAccessRules() {
  if (!document.body.classList.contains("app-shell")) return;
  const session = getSession();
  const allowed = getAllowedTabs(session);
  const group = getAccessGroup(session);

  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.hidden = !allowed.includes(button.dataset.tabTarget);
  });

  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.hidden = !allowed.includes(panel.dataset.tabPanel);
  });

  document.querySelectorAll(".interviewer-only").forEach((node) => {
    node.hidden = !canInterview(session);
  });

  const chip = document.querySelector("#accessGroupChip");
  const summary = document.querySelector("#accessSummary");
  if (chip) chip.textContent = group;
  if (summary) summary.textContent = group === "Administrador"
    ? "Voce controla todos os modulos, permissoes, conteudo publico e funcoes da equipe."
    : group === "Admin sem sessao"
      ? "Para editar e publicar o site, saia e entre pelo acesso do administrador com e-mail e senha."
      : `Seu perfil pode acessar: ${allowed.map((id) => appModules[id]).filter(Boolean).join(", ")}.`;

  showAppTab(document.querySelector("[data-tab-target].active")?.dataset.tabTarget || "painel");
}

function renderApp() {
  if (!document.body.classList.contains("app-shell")) return;
  const session = getSession();
  if (!session) return;

  const admin = hasAdminBackendSession(session);
  const settings = getAppSettings();
  document.querySelector("#sessionLabel").textContent = `${session.name} - ${session.role} - ${session.permission}`;
  document.querySelector("#accessBadge").textContent = session.level;
  document.querySelector("#workspaceTitle").textContent = settings.appName;
  document.querySelector("#appBrandName").textContent = settings.appName;
  document.querySelector("#sidebarUser").textContent = session.name;
  document.querySelector("#sidebarRole").textContent = `${session.role} - ${session.level}`;
  const avatar = document.querySelector("#accountAvatar");
  if (avatar) avatar.textContent = (session.name || "CC").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  document.body.dataset.density = settings.density;
  document.body.dataset.accent = settings.accent;
  document.querySelectorAll(".admin-only").forEach((node) => {
    node.hidden = !admin;
  });
  applyAccessRules();
  if (session.role === "Administrador" && !admin) {
    showToast("Sessao admin invalida. Entre pelo acesso do administrador para editar o site.", "error");
  }

  const table = document.querySelector("#teamTable");
  if (table) {
    table.innerHTML = getContent().members.map((member, index) => renderMemberCard(member, index, admin)).join("");

    table.querySelectorAll("[data-edit-member]").forEach((button) => {
      button.addEventListener("click", () => fillMemberForm(Number(button.dataset.editMember)));
    });

    const selectedIndex = document.querySelector("#memberForm")?.elements.index.value;
    table.querySelectorAll(".team-person-card").forEach((card, index) => {
      card.classList.toggle("is-selected", selectedIndex !== "" && Number(selectedIndex) === index);
    });
  }

  const memberAdminList = document.querySelector("#memberAdminList");
  if (memberAdminList) {
    memberAdminList.innerHTML = getContent().members
      .map((row, index) => {
        const member = normalizeMember(row);
        return `
          <article class="member-admin-row">
            <button class="drag-handle" type="button" draggable="true" data-drag-member="${index}" aria-label="Arrastar integrante">Mover</button>
            <img src="${member.image}" alt="${member.name}" />
            <div>
              <strong>${member.name}</strong>
              <span>${member.role} - ${member.generation}</span>
              <span>Status: ${member.status}</span>
              <small>${member.email || "sem e-mail vinculado"}</small>
            </div>
            <button class="ghost-button" type="button" data-edit-member="${index}">Editar</button>
            <button class="task-remove" type="button" data-member-index="${index}">Remover</button>
          </article>
        `;
      })
      .join("");

    memberAdminList.querySelectorAll("[data-edit-member]").forEach((button) => {
      button.addEventListener("click", () => fillMemberForm(Number(button.dataset.editMember)));
    });

    memberAdminList.querySelectorAll("[data-member-index]").forEach((button) => {
      button.addEventListener("click", async () => {
        const content = getContent();
        const [removed] = content.members.splice(Number(button.dataset.memberIndex), 1);
        const removedEmail = normalizeMember(removed).email;
        if (removedEmail) {
          const permissions = getUserPermissions();
          delete permissions[removedEmail];
          saveUserPermissions(permissions);
        }
        await persistPublicContent(content, "Integrante removido da equipe.");
        showToast("Integrante removido da equipe.", "warning");
        renderApp();
      });
    });

    memberAdminList.querySelectorAll("[data-drag-member]").forEach((handle) => {
      handle.addEventListener("dragstart", (event) => {
        draggedMemberIndex = Number(handle.dataset.dragMember);
        handle.closest(".member-admin-row")?.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(draggedMemberIndex));
      });
    });

    memberAdminList.querySelectorAll(".member-admin-row").forEach((row, targetIndex) => {
      row.addEventListener("dragover", (event) => {
        if (draggedMemberIndex === null || draggedMemberIndex === targetIndex) return;
        event.preventDefault();
        row.classList.add("is-drag-over");
      });
      row.addEventListener("dragleave", () => row.classList.remove("is-drag-over"));
      row.addEventListener("drop", async (event) => {
        event.preventDefault();
        row.classList.remove("is-drag-over");
        if (draggedMemberIndex === null || draggedMemberIndex === targetIndex) return;
        const content = getContent();
        const [member] = content.members.splice(draggedMemberIndex, 1);
        content.members.splice(targetIndex, 0, member);
        draggedMemberIndex = null;
        await persistPublicContent(content, "Ordem da equipe salva no banco de dados.");
        renderApp();
      });
    });

    memberAdminList.ondragend = () => {
      draggedMemberIndex = null;
      memberAdminList.querySelectorAll(".member-admin-row").forEach((row) => row.classList.remove("is-dragging", "is-drag-over"));
    };
  }

  const projectsCount = document.querySelector("#projectsCount");
  const teamCount = document.querySelector("#teamCount");
  if (projectsCount) projectsCount.textContent = getContent().projects.length;
  if (teamCount) teamCount.textContent = getContent().members.length + Object.values(getRoles()).filter((item) => item.email !== "admin@cybercapivaras.com").length;

  renderTasks();
  renderCandidates();
  loadTickets();
}

function setupAppForms() {
  const contentForm = document.querySelector("#siteEditorForm");
  const roleForm = document.querySelector("#roleForm");
  const memberForm = document.querySelector("#memberForm");

  document.querySelectorAll("[data-add-page]").forEach((button) => {
    button.addEventListener("click", () => createAndSaveCustomPage("info"));
  });

  document.querySelectorAll("[data-page-template]").forEach((button) => {
    button.addEventListener("click", () => createAndSaveCustomPage(button.dataset.pageTemplate));
  });

  if (contentForm) {
    const content = getContent();
    contentForm.elements.siteName.value = content.siteName || "";
    contentForm.elements.siteHomeLink.value = content.siteHomeLink || "";
    contentForm.elements.siteLogo.value = content.siteLogo || "";
    contentForm.elements.accountLink.value = content.accountLink || "";
    contentForm.elements.siteTabInicio.value = content.siteTabInicio || "";
    contentForm.elements.siteTabEquipe.value = content.siteTabEquipe || "";
    contentForm.elements.siteTabProjetos.value = content.siteTabProjetos || "";
    contentForm.elements.siteTabEventos.value = content.siteTabEventos || "";
    contentForm.elements.siteTabContato.value = content.siteTabContato || "";
    contentForm.elements.siteTabFooter.value = content.siteTabFooter || "";
    contentForm.elements.sectionOrderHome.value = content.sectionOrderHome || "1";
    contentForm.elements.heroLabel.value = content.heroLabel;
    contentForm.elements.heroTitle.value = content.heroTitle;
    contentForm.elements.weeklyHighlightLabel.value = content.weeklyHighlightLabel || "";
    contentForm.elements.heroText.value = content.heroText;
    contentForm.elements.heroImage.value = content.heroImage || "";
    contentForm.elements.heroMetricValue.value = content.heroMetricValue || "";
    contentForm.elements.heroMetricLabel.value = content.heroMetricLabel || "";
    contentForm.elements.heroStateValue.value = content.heroStateValue || "";
    contentForm.elements.heroStateLabel.value = content.heroStateLabel || "";
    contentForm.elements.heroSignalOne.value = content.heroSignalOne || "";
    contentForm.elements.heroSignalTwo.value = content.heroSignalTwo || "";
    contentForm.elements.heroSignalThree.value = content.heroSignalThree || "";
    contentForm.elements.heroPrimaryText.value = content.heroPrimaryText || "";
    contentForm.elements.heroPrimaryLink.value = content.heroPrimaryLink || "";
    contentForm.elements.heroSecondaryText.value = content.heroSecondaryText || "";
    contentForm.elements.heroSecondaryLink.value = content.heroSecondaryLink || "";
    contentForm.elements.showTeamSection.checked = content.showTeamSection !== false;
    contentForm.elements.teamSectionLabel.value = content.teamSectionLabel || "";
    contentForm.elements.teamSectionTitle.value = content.teamSectionTitle || "";
    contentForm.elements.sectionOrderTeam.value = content.sectionOrderTeam || "2";
    contentForm.elements.showProjectsSection.checked = content.showProjectsSection !== false;
    contentForm.elements.projectsSectionLabel.value = content.projectsSectionLabel || "";
    contentForm.elements.projectsSectionTitle.value = content.projectsSectionTitle || "";
    contentForm.elements.sectionOrderProjects.value = content.sectionOrderProjects || "3";
    contentForm.elements.projectsSectionText.value = content.projectsSectionText || "";
    contentForm.elements.showEventsSection.checked = content.showEventsSection !== false;
    contentForm.elements.eventsSectionLabel.value = content.eventsSectionLabel || "";
    contentForm.elements.eventsSectionTitle.value = content.eventsSectionTitle || "";
    contentForm.elements.sectionOrderEvents.value = content.sectionOrderEvents || "4";
    contentForm.elements.eventsSectionText.value = content.eventsSectionText || "";
    contentForm.elements.showContactSection.checked = content.showContactSection !== false;
    contentForm.elements.contactLabel.value = content.contactLabel || "";
    contentForm.elements.contactTitle.value = content.contactTitle || "";
    contentForm.elements.sectionOrderContact.value = content.sectionOrderContact || "99";
    contentForm.elements.contactText.value = content.contactText || "";
    contentForm.elements.contactNamePlaceholder.value = content.contactNamePlaceholder || "";
    contentForm.elements.contactEmailPlaceholder.value = content.contactEmailPlaceholder || "";
    contentForm.elements.contactMessagePlaceholder.value = content.contactMessagePlaceholder || "";
    contentForm.elements.contactButtonText.value = content.contactButtonText || "";
    contentForm.elements.footerLogo.value = content.footerLogo || "";
    contentForm.elements.footerLogoSubtitle.value = content.footerLogoSubtitle || "";
    contentForm.elements.footerAffiliationIcon.value = content.footerAffiliationIcon || "";
    contentForm.elements.footerText.value = content.footerText || "";
    contentForm.elements.footerAffiliation.value = content.footerAffiliation || "";
    contentForm.elements.footerCredit.value = content.footerCredit || "";
    contentForm.elements.footerCreditUrl.value = content.footerCreditUrl || "";
    contentForm.elements.footerNavTitle.value = content.footerNavTitle || "";
    contentForm.elements.footerCentralTitle.value = content.footerCentralTitle || "";
    contentForm.elements.footerContactTitle.value = content.footerContactTitle || "";
    contentForm.elements.footerContactLine1.value = content.footerContactLine1 || "";
    contentForm.elements.footerContactLine2.value = content.footerContactLine2 || "";
    contentForm.elements.footerContactAction.value = content.footerContactAction || "";
    contentForm.elements.footerStatus.value = content.footerStatus || "";
    contentForm.elements.footerCopyrightText.value = content.footerCopyrightText || "";
    renderBlockEditors(content);
    applySiteTabLabels(content);
    ["siteLogo", "heroImage", "footerLogo", "footerAffiliationIcon"].forEach(updateMediaPreview);
    contentForm.addEventListener("input", (event) => {
      showDraftToast();
      if (event.target.name && event.target.closest("[data-media-picker]")) {
        updateMediaPreview(event.target.name);
      }
      const blockField = event.target.closest("[data-block-field]");
      if (blockField) {
        const block = blockField.closest("[data-block-row]");
        const preview = block?.querySelector(`[data-block-media-preview="${blockField.dataset.blockField}"]`);
        if (preview) preview.src = splitMediaList(blockField.value)[0] || "imgs/apple-touch-icon.png";
      }
      const sponsorEditor = event.target.closest("[data-sponsor-editor]");
      if (sponsorEditor && event.target.matches("[data-sponsor-name], [data-sponsor-text], [data-sponsor-logo]")) {
        const sponsorItem = event.target.closest("[data-sponsor-box-item]");
        const preview = sponsorItem?.querySelector("[data-sponsor-logo-preview]");
        const logoInput = sponsorItem?.querySelector("[data-sponsor-logo]");
        if (preview && logoInput) preview.src = logoInput.value || "imgs/apple-touch-icon.png";
        syncSponsorBoxEditor(sponsorEditor);
      }
    });
    contentForm.addEventListener("change", () => showDraftToast());

    contentForm.querySelectorAll("[data-media-file]").forEach((fileInput) => {
      fileInput.addEventListener("change", async () => {
        const fieldName = fileInput.dataset.mediaFile;
        const target = contentForm.elements[fieldName];
        try {
          target.value = await fileToDataUrl(fileInput.files?.[0]);
          updateMediaPreview(fieldName);
          showToast("Imagem otimizada. Salve para publicar no banco de dados.");
        } catch (error) {
          showToast(error.message, "error");
        }
      });
    });

    contentForm.addEventListener("click", (event) => {
      const addSponsorBoxButton = event.target.closest("[data-add-sponsor-box]");
      const removeSponsorBoxButton = event.target.closest("[data-remove-sponsor-box]");
      const addButton = event.target.closest("[data-add-block]");
      const removeButton = event.target.closest("[data-remove-block]");

      if (addSponsorBoxButton) {
        const editor = addSponsorBoxButton.closest("[data-sponsor-editor]");
        editor?.querySelector("[data-sponsor-box-list]")?.insertAdjacentHTML("beforeend", renderSponsorBoxItem());
        syncSponsorBoxEditor(editor);
        showToast("Caixa de patrocinador adicionada. Salve para publicar.");
        return;
      }

      if (removeSponsorBoxButton) {
        const editor = removeSponsorBoxButton.closest("[data-sponsor-editor]");
        removeSponsorBoxButton.closest("[data-sponsor-box-item]")?.remove();
        if (editor && !editor.querySelector("[data-sponsor-box-item]")) {
          editor.querySelector("[data-sponsor-box-list]")?.insertAdjacentHTML("beforeend", renderSponsorBoxItem());
        }
        syncSponsorBoxEditor(editor);
        showToast("Caixa de patrocinador removida. Salve para publicar.", "warning");
        return;
      }

      if (addButton) {
        const type = addButton.dataset.addBlock;
        if (type === "customSections") {
          createAndSaveCustomPage();
          return;
        }
        const nextContent = {
          ...getContent(),
          ...collectEditorBlocks(),
        };
        nextContent[type] = [...(nextContent[type] || []), createBlockRow(type)];
        renderBlockEditors(nextContent);
        showToast("Nova caixa adicionada. Salve para publicar.");
      }

      if (removeButton) {
        const type = removeButton.dataset.removeBlock;
        removeButton.closest("[data-block-row]")?.remove();
        showToast("Caixa removida. Salve para publicar.", "warning");
      }
    });

    contentForm.addEventListener("dragstart", (event) => {
      const handle = event.target.closest("[data-drag-block]");
      if (!handle) return;
      const block = handle.closest("[data-block-row]");
      draggedBlock = { type: handle.dataset.dragBlock, element: block };
      block?.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", handle.dataset.dragBlock);
    });

    contentForm.addEventListener("dragover", (event) => {
      const targetBlock = event.target.closest("[data-block-row]");
      if (!draggedBlock || !targetBlock || draggedBlock.type !== targetBlock.dataset.blockRow) return;
      event.preventDefault();
      targetBlock.classList.add("is-drag-over");
    });

    contentForm.addEventListener("dragleave", (event) => {
      event.target.closest("[data-block-row]")?.classList.remove("is-drag-over");
    });

    contentForm.addEventListener("drop", (event) => {
      const targetBlock = event.target.closest("[data-block-row]");
      if (!targetBlock || !draggedBlock) return;
      event.preventDefault();
      reorderDraggedBlock(targetBlock);
      draggedBlock?.element?.classList.remove("is-dragging");
      draggedBlock = null;
    });

    contentForm.addEventListener("dragend", () => {
      document.querySelectorAll(".editable-block").forEach((block) => block.classList.remove("is-dragging", "is-drag-over"));
      draggedBlock = null;
    });

    contentForm.addEventListener("change", async (event) => {
      const sponsorFile = event.target.closest("[data-sponsor-file]");
      if (sponsorFile) {
        const item = sponsorFile.closest("[data-sponsor-box-item]");
        const editor = sponsorFile.closest("[data-sponsor-editor]");
        const logoInput = item?.querySelector("[data-sponsor-logo]");
        const preview = item?.querySelector("[data-sponsor-logo-preview]");
        try {
          const value = await fileToDataUrl(sponsorFile.files?.[0], 0.7, { preserveTransparency: true, maxSide: 900 });
          if (logoInput) logoInput.value = value;
          if (preview) preview.src = value || "imgs/apple-touch-icon.png";
          syncSponsorBoxEditor(editor);
          showToast("Logo do patrocinador otimizada. Salve para publicar no banco de dados.");
        } catch (error) {
          showToast(error.message, "error");
        }
        return;
      }

      const blockFile = event.target.closest("[data-block-media-file]");
      if (!blockFile) return;
      const block = blockFile.closest("[data-block-row]");
      const fieldIndex = blockFile.dataset.blockMediaFile;
      const textInput = block?.querySelector(`[data-block-field="${fieldIndex}"]`);
      const preview = block?.querySelector(`[data-block-media-preview="${fieldIndex}"]`);
      try {
        const files = [...(blockFile.files || [])];
        const values = await Promise.all(files.map((file) => fileToDataUrl(file)));
        const current = splitMediaList(textInput?.value || "");
        const nextValues = blockFile.multiple ? [...current, ...values] : values;
        const value = nextValues.filter(Boolean).join("\n");
        if (textInput) textInput.value = value;
        if (preview) preview.src = nextValues[0] || "imgs/apple-touch-icon.png";
        showToast(blockFile.multiple ? "Galeria otimizada. Salve para publicar no banco de dados." : "Imagem otimizada. Salve para publicar no banco de dados.");
      } catch (error) {
        showToast(error.message, "error");
      }
    });

    contentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = document.querySelector("#siteEditorStatus");
      try {
        const data = Object.fromEntries(new FormData(contentForm).entries());
        const nextContent = {
          ...getContent(),
          siteName: data.siteName,
          siteHomeLink: data.siteHomeLink,
          siteLogo: data.siteLogo,
          accountLink: data.accountLink,
          siteTabInicio: data.siteTabInicio,
          siteTabEquipe: data.siteTabEquipe,
          siteTabProjetos: data.siteTabProjetos,
          siteTabEventos: data.siteTabEventos,
          siteTabContato: data.siteTabContato,
          siteTabFooter: data.siteTabFooter,
          sectionOrderHome: data.sectionOrderHome,
          sectionOrderTeam: data.sectionOrderTeam,
          sectionOrderProjects: data.sectionOrderProjects,
          sectionOrderEvents: data.sectionOrderEvents,
          sectionOrderContact: data.sectionOrderContact,
          heroLabel: data.heroLabel,
          heroTitle: data.heroTitle,
          weeklyHighlightLabel: data.weeklyHighlightLabel,
          heroText: data.heroText,
          heroImage: data.heroImage,
          heroMetricValue: data.heroMetricValue,
          heroMetricLabel: data.heroMetricLabel,
          heroStateValue: data.heroStateValue,
          heroStateLabel: data.heroStateLabel,
          heroSignalOne: data.heroSignalOne,
          heroSignalTwo: data.heroSignalTwo,
          heroSignalThree: data.heroSignalThree,
          heroPrimaryText: data.heroPrimaryText,
          heroPrimaryLink: data.heroPrimaryLink,
          heroSecondaryText: data.heroSecondaryText,
          heroSecondaryLink: data.heroSecondaryLink,
          showTeamSection: data.showTeamSection === "on",
          teamSectionLabel: data.teamSectionLabel,
          teamSectionTitle: data.teamSectionTitle,
          showProjectsSection: data.showProjectsSection === "on",
          projectsSectionLabel: data.projectsSectionLabel,
          projectsSectionTitle: data.projectsSectionTitle,
          projectsSectionText: data.projectsSectionText,
          showEventsSection: data.showEventsSection === "on",
          eventsSectionLabel: data.eventsSectionLabel,
          eventsSectionTitle: data.eventsSectionTitle,
          eventsSectionText: data.eventsSectionText,
          showContactSection: data.showContactSection === "on",
          contactLabel: data.contactLabel,
          contactTitle: data.contactTitle,
          contactText: data.contactText,
          contactNamePlaceholder: data.contactNamePlaceholder,
          contactEmailPlaceholder: data.contactEmailPlaceholder,
          contactMessagePlaceholder: data.contactMessagePlaceholder,
          contactButtonText: data.contactButtonText,
          footerLogo: data.footerLogo,
          footerLogoSubtitle: data.footerLogoSubtitle,
          footerAffiliationIcon: data.footerAffiliationIcon,
          footerText: data.footerText,
          footerAffiliation: data.footerAffiliation,
          footerCredit: data.footerCredit,
          footerCreditUrl: data.footerCreditUrl,
          footerNavTitle: data.footerNavTitle,
          footerCentralTitle: data.footerCentralTitle,
          footerContactTitle: data.footerContactTitle,
          footerContactLine1: data.footerContactLine1,
          footerContactLine2: data.footerContactLine2,
          footerContactAction: data.footerContactAction,
          footerStatus: data.footerStatus,
          footerCopyrightText: data.footerCopyrightText,
          ...collectEditorBlocks(),
        };
        status.textContent = "Salvando no backend...";
        const result = await persistPublicContent(nextContent, "Pagina publica atualizada no backend.");
        status.textContent = result.remoteSaved
          ? "Pagina principal salva no banco de dados."
          : result.needsAdminLogin
            ? "Entre novamente pelo acesso do administrador para publicar."
            : "Nao salvou no banco de dados. Verifique o aviso acima.";
        if (result.needsAdminLogin) {
          localStorage.removeItem("cyber_session");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1800);
          return;
        }
        applySiteTabLabels(nextContent);
        renderSitePreview();
      } catch (error) {
        status.textContent = "Erro ao salvar. Veja o aviso acima.";
        showToast(`Erro ao salvar: ${error.message}`, "error");
      }
    });
  }

  if (roleForm) {
    roleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(roleForm).entries());
      const roles = getRoles();
      roles[data.email] = data;
      saveRoles(roles);
      rememberKnownUser({ name: data.name, email: data.email, role: data.role });
      renderKnownAccountOptions();
      document.querySelector("#roleStatus").textContent = "Funcao salva.";
      showToast("Funcao e acesso salvos.");
      roleForm.reset();
      renderApp();
    });
  }

  if (memberForm) {
    renderKnownAccountOptions();
    document.querySelector("#knownAccountSelect")?.addEventListener("change", (event) => {
      const user = getKnownUsers().find((item) => item.email === event.target.value);
      if (!user) return;
      memberForm.elements.name.value = user.name || "";
      memberForm.elements.email.value = user.email || "";
      if (user.picture) memberForm.elements.image.value = user.picture;
      updateMemberEditPreview();
      showToast("Conta selecionada para este integrante.");
    });

    const clearButton = document.querySelector("#clearMemberForm");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        memberForm.reset();
        memberForm.elements.index.value = "";
        memberForm.elements.knownAccount.value = "";
        memberForm.elements.generation.value = "1a Geracao Fabrica";
        memberForm.elements.status.value = "Ativo";
        memberForm.querySelectorAll('[name="tabs"]').forEach((input) => {
          input.checked = ["painel", "equipe", "tarefas"].includes(input.value);
        });
        memberForm.elements.canInterview.checked = false;
        updateMemberEditPreview();
      });
    }

    memberForm.addEventListener("input", updateMemberEditPreview);
    memberForm.addEventListener("input", () => showDraftToast("Alteracao na equipe detectada. Salve o integrante."));
    memberForm.addEventListener("change", updateMemberEditPreview);
    memberForm.addEventListener("change", () => showDraftToast("Alteracao na equipe detectada. Salve o integrante."));

    document.querySelector("#memberPhotoFile")?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        memberForm.elements.image.value = await fileToDataUrl(file, 1);
        updateMemberEditPreview();
        document.querySelector("#memberStatus").textContent = "Foto otimizada. Clique em salvar integrante.";
        showToast("Foto otimizada na caixa de edicao.");
      } catch (error) {
        document.querySelector("#memberStatus").textContent = "Nao foi possivel carregar a foto.";
        showToast(error.message, "error");
      }
    });

    memberForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(memberForm);
      const data = Object.fromEntries(formData.entries());
      const content = getContent();
      const member = {
        name: data.name,
        email: data.email,
        role: data.role,
        level: getRoleLevel(data.role),
        image: data.image,
        description: data.description,
        generation: data.generation,
        status: data.status,
        instagram: data.instagram,
        github: data.github,
        mainArea: data.mainArea,
      };
      const row = memberToRow(member);
      const editIndex = data.index === "" ? -1 : Number(data.index);

      if (editIndex >= 0) {
        content.members[editIndex] = row;
      } else {
        content.members.push(row);
      }

      if (member.email) {
        const permissions = getUserPermissions();
        const tabs = formData.getAll("tabs");
        if (!tabs.includes("painel")) tabs.unshift("painel");
        permissions[member.email] = {
          tabs,
          canInterview: formData.get("canInterview") === "true",
        };
        saveUserPermissions(permissions);

        const roles = getRoles();
        roles[member.email] = { name: member.name, email: member.email, role: member.role };
        saveRoles(roles);
        rememberKnownUser({ name: member.name, email: member.email, role: member.role, picture: member.image });
        renderKnownAccountOptions();
      }

      document.querySelector("#memberStatus").textContent = "Salvando equipe no backend...";
      const result = await persistPublicContent(content, "Equipe publicada no backend.");
      if (!result.remoteSaved) {
        document.querySelector("#memberStatus").textContent = result.needsAdminLogin
          ? "Entre novamente como administrador para salvar a equipe."
          : "Nao salvou no banco. Revise o aviso e tente novamente.";
        if (result.needsAdminLogin) {
          localStorage.removeItem("cyber_session");
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1800);
        }
        return;
      }
      document.querySelector("#memberStatus").textContent = "Integrante salvo.";
      showToast(editIndex >= 0 ? "Integrante atualizado." : "Novo integrante criado.");
      memberForm.reset();
      memberForm.elements.index.value = "";
      updateMemberEditPreview();
      renderApp();
    });
  }

  setupTaskForm();
  setupSettingsForm();
  setupCandidateForm();
  setupTicketForm();
  setupCalendarControls();
  setupDataTools();
  renderSitePreview();
}

function fillMemberForm(index) {
  const form = document.querySelector("#memberForm");
  if (!form) return;
  const member = normalizeMember(getContent().members[index]);
  const rule = member.email ? getUserPermissions()[member.email] : null;

  form.elements.index.value = index;
  form.elements.name.value = member.name;
  form.elements.knownAccount.value = member.email;
  form.elements.email.value = member.email;
  form.elements.role.value = member.role;
  form.elements.generation.value = member.generation;
  if (form.elements.mainArea) form.elements.mainArea.value = member.mainArea || "";
  form.elements.status.value = member.status;
  form.elements.image.value = member.image;
  form.elements.description.value = member.description;
  form.elements.instagram.value = member.instagram;
  form.elements.github.value = member.github;
  form.querySelectorAll('[name="tabs"]').forEach((input) => {
    input.checked = rule?.tabs?.includes(input.value) || (!rule && ["painel", "equipe", "tarefas"].includes(input.value));
  });
  form.elements.canInterview.checked = Boolean(rule?.canInterview);
  updateMemberEditPreview();
  document.querySelectorAll("#teamTable .team-person-card").forEach((card, cardIndex) => {
    card.classList.toggle("is-selected", cardIndex === index);
  });
  document.querySelector("#memberEditBox")?.scrollIntoView({ behavior: "smooth", block: "start" });
  form.elements.name.focus();
  document.querySelector("#memberStatus").textContent = "Editando integrante selecionado.";
  showToast(`Editando ${member.name}.`);
}

function updateMemberEditPreview() {
  const form = document.querySelector("#memberForm");
  if (!form) return;

  const name = form.elements.name.value || "Nome";
  const role = form.elements.role.value || "Funcao";
  const generation = form.elements.generation.value || "Geracao";
  const image = form.elements.image.value || "imgs/apple-touch-icon.png";
  const editIndex = form.elements.index.value;

  const previewImage = document.querySelector("#memberImagePreview");
  const previewName = document.querySelector("#memberNamePreview");
  const previewRole = document.querySelector("#memberRolePreview");
  const previewGeneration = document.querySelector("#memberGenerationPreview");
  const title = document.querySelector("#memberEditTitle");
  const mode = document.querySelector("#memberEditMode");

  if (previewImage) previewImage.src = image;
  if (previewName) previewName.textContent = name;
  if (previewRole) previewRole.textContent = role;
  if (previewGeneration) previewGeneration.textContent = generation;
  if (title) title.textContent = editIndex === "" ? "Novo integrante" : `Editando ${name}`;
  if (mode) mode.textContent = editIndex === "" ? "Novo" : "Editando";
}

function renderSitePreview() {
  const preview = document.querySelector("#sitePreview");
  if (!preview) return;
  const content = getContent();
  preview.innerHTML = `
    <article><strong>${content.heroTitle}</strong><span>${content.heroLabel}</span><p>${content.heroText}</p></article>
    <article><strong>Areas</strong><span>${content.areas.length} blocos publicados</span></article>
    <article><strong>Projetos</strong><span>${content.projects.length} projetos publicados</span></article>
    <article><strong>Eventos</strong><span>${(content.events || []).length} eventos publicados</span></article>
    <article><strong>Equipe</strong><span>${content.members.length} integrantes na vitrine</span></article>
  `;
}

function renderTasks() {
  const board = document.querySelector("#taskBoard");
  if (!board) return;

  const columns = [
    ["afazer", "A fazer"],
    ["andamento", "Em andamento"],
    ["concluida", "Concluida"],
  ];
  const tasks = getTasks();

  board.innerHTML = columns
    .map(([status, label]) => `
      <section class="kanban-column" data-task-status="${status}">
        <h3>${label}</h3>
        ${tasks
          .map((task, index) => ({ ...task, index }))
          .filter((task) => task.status === status)
          .map((task) => `
            <article class="task-card ${task.status === "concluida" ? "is-done" : ""}" draggable="true" data-drag-task="${task.index}">
              <strong>${task.title}</strong>
              <span>${task.area}</span>
              <small>${new Date(`${task.due}T00:00:00`).toLocaleDateString("pt-BR")}</small>
              <select data-task-status-index="${task.index}">
                <option value="afazer" ${task.status === "afazer" ? "selected" : ""}>A fazer</option>
                <option value="andamento" ${task.status === "andamento" ? "selected" : ""}>Em andamento</option>
                <option value="concluida" ${task.status === "concluida" ? "selected" : ""}>Concluida</option>
              </select>
              <button class="task-remove admin-only" type="button" data-task-index="${task.index}">Remover</button>
            </article>
          `)
          .join("") || `<article class="empty-state">Sem tarefas.</article>`}
      </section>
    `)
    .join("");

  document.querySelectorAll("[data-task-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const tasks = getTasks();
      tasks.splice(Number(button.dataset.taskIndex), 1);
      saveTasks(tasks);
      showToast("Tarefa removida.", "warning");
      renderTasks();
    });
  });

  document.querySelectorAll("[data-task-status-index]").forEach((select) => {
    select.addEventListener("change", () => {
      const tasks = getTasks();
      tasks[Number(select.dataset.taskStatusIndex)].status = select.value;
      saveTasks(tasks);
      showToast("Status da tarefa atualizado.");
      renderTasks();
    });
  });

  document.querySelectorAll("[data-drag-task]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.dragTask);
    });
  });

  document.querySelectorAll("[data-task-status]").forEach((column) => {
    column.addEventListener("dragover", (event) => event.preventDefault());
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      const index = Number(event.dataTransfer.getData("text/plain"));
      const tasks = getTasks();
      if (!Number.isNaN(index) && tasks[index]) {
        tasks[index].status = column.dataset.taskStatus;
        saveTasks(tasks);
        showToast("Tarefa movida no quadro.");
        renderTasks();
      }
    });
  });

  document.querySelectorAll(".task-card .admin-only").forEach((node) => {
    node.hidden = getSession()?.role !== "Administrador";
  });

  renderCalendar();
}

function setupTaskForm() {
  const form = document.querySelector("#taskForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const tasks = getTasks();
    tasks.push({ title: data.title, area: data.area, due: data.due, status: "afazer" });
    saveTasks(tasks);
    form.reset();
    showToast("Nova tarefa criada.");
    renderTasks();
  });
}

function setupCalendarControls() {
  const prev = document.querySelector("#prevMonth");
  const next = document.querySelector("#nextMonth");
  if (!prev || !next) return;

  prev.addEventListener("click", () => {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
    renderCalendar();
  });

  next.addEventListener("click", () => {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
    renderCalendar();
  });
}

function renderCalendar() {
  const calendar = document.querySelector("#taskCalendar");
  const label = document.querySelector("#calendarLabel");
  if (!calendar) return;

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const tasks = getTasks();
  const cells = [];

  if (label) label.textContent = firstDay.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    cells.push(`<div class="calendar-cell is-muted"></div>`);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayTasks = tasks.filter((task) => task.due === date);
    cells.push(`
      <div class="calendar-cell">
        <strong>${day}</strong>
        ${dayTasks.map((task) => `<span class="${task.status === "concluida" ? "is-done" : ""}">${task.title}</span>`).join("")}
      </div>
    `);
  }

  calendar.innerHTML = cells.join("");
}

function renderCandidates() {
  const list = document.querySelector("#candidateList");
  if (!list) return;

  const candidates = getCandidates();
  if (!candidates.length) {
    list.innerHTML = `<article class="empty-state">Nenhum candidato cadastrado.</article>`;
    return;
  }

  list.innerHTML = candidates
    .map(
      (candidate, index) => `
        <article class="candidate-card">
          <div>
            <strong>${candidate.name}</strong>
            <span>${candidate.area}</span>
            <small>Entrevistador: ${candidate.interviewer || "nao definido"}</small>
          </div>
          <select class="interviewer-only" data-candidate-stage="${index}">
            <option ${candidate.stage === "Inscricao" ? "selected" : ""}>Inscricao</option>
            <option ${candidate.stage === "Entrevista" ? "selected" : ""}>Entrevista</option>
            <option ${candidate.stage === "Teste pratico" ? "selected" : ""}>Teste pratico</option>
            <option ${candidate.stage === "Aprovado" ? "selected" : ""}>Aprovado</option>
          </select>
          <button class="task-remove admin-only" type="button" data-candidate-index="${index}">Remover</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-candidate-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = getCandidates();
      next.splice(Number(button.dataset.candidateIndex), 1);
      saveCandidates(next);
      showToast("Candidato removido.", "warning");
      renderCandidates();
    });
  });

  document.querySelectorAll(".candidate-card .admin-only").forEach((node) => {
    node.hidden = getSession()?.role !== "Administrador";
  });

  document.querySelectorAll("[data-candidate-stage]").forEach((select) => {
    select.hidden = !canInterview();
    select.addEventListener("change", () => {
      const next = getCandidates();
      next[Number(select.dataset.candidateStage)].stage = select.value;
      saveCandidates(next);
      showToast("Etapa do candidato atualizada.");
      renderCandidates();
    });
  });
}

function setupCandidateForm() {
  const form = document.querySelector("#candidateForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const candidates = getCandidates();
    candidates.push({ name: data.name, area: data.area, stage: data.stage, interviewer: data.interviewer, notes: "" });
    saveCandidates(candidates);
    form.reset();
    showToast("Candidato cadastrado.");
    renderCandidates();
  });
}

function setupSettingsForm() {
  const form = document.querySelector("#settingsForm");
  const status = document.querySelector("#settingsStatus");
  if (!form || !status) return;

  const settings = getAppSettings();
  form.elements.appName.value = settings.appName;
  form.elements.density.value = settings.density;
  form.elements.accent.value = settings.accent;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const next = Object.fromEntries(new FormData(form).entries());
    saveAppSettings(next);
    status.textContent = "Ajustes aplicados.";
    showToast("Ajustes aplicados.");
    renderApp();
  });
}

function setupDataTools() {
  const exportButton = document.querySelector("#exportDataButton");
  const importButton = document.querySelector("#importDataButton");
  const resetButton = document.querySelector("#resetDemoButton");
  const box = document.querySelector("#importDataBox");
  const status = document.querySelector("#dataToolsStatus");
  if (!exportButton || !importButton || !resetButton || !box) return;

  const keys = ["cyber_site_content", "cyber_roles", "cyber_app_settings", "cyber_tasks", "cyber_candidates", "cyber_user_permissions"];

  exportButton.addEventListener("click", () => {
    const data = {};
    keys.forEach((key) => {
      data[key] = JSON.parse(localStorage.getItem(key) || "null");
    });
    box.value = JSON.stringify(data, null, 2);
    if (status) status.textContent = "Backup gerado.";
    showToast("Backup gerado.");
  });

  importButton.addEventListener("click", () => {
    try {
      const data = JSON.parse(box.value);
      keys.forEach((key) => {
        if (key in data) localStorage.setItem(key, JSON.stringify(data[key]));
      });
      saveContentToApi(getContent()).catch((error) => showToast(error.message, "error"));
      if (data.cyber_roles) saveAppStateToApi("roles", data.cyber_roles);
      if (data.cyber_app_settings) saveAppStateToApi("settings", data.cyber_app_settings);
      if (data.cyber_tasks) saveAppStateToApi("tasks", data.cyber_tasks);
      if (data.cyber_candidates) saveAppStateToApi("candidates", data.cyber_candidates);
      if (data.cyber_user_permissions) saveAppStateToApi("permissions", data.cyber_user_permissions);
      if (status) status.textContent = "Dados importados.";
      showToast("Dados importados.");
      renderApp();
    } catch {
      if (status) status.textContent = "JSON invalido.";
      showToast("JSON invalido.", "error");
    }
  });

  resetButton.addEventListener("click", () => {
    keys.forEach((key) => localStorage.removeItem(key));
    saveContentToApi(defaultContent).catch((error) => showToast(error.message, "error"));
    saveAppStateToApi("roles", getRoles());
    saveAppStateToApi("settings", defaultAppSettings);
    saveAppStateToApi("tasks", defaultTasks);
    saveAppStateToApi("candidates", defaultCandidates);
    saveAppStateToApi("permissions", defaultUserPermissions);
    if (status) status.textContent = "Dados demo restaurados.";
    showToast("Dados demo restaurados.", "warning");
    renderApp();
  });
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Enviando...";
    const payload = Object.fromEntries(new FormData(form).entries());
    const file = form.elements.attachment?.files?.[0];

    try {
      payload.source = "contato";
      payload.attachment = await fileToAttachment(file);
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      form.reset();
      status.textContent = data.message || "Chamado enviado.";
    } catch (error) {
      status.textContent = "Nao foi possivel enviar agora.";
    }
  });
}

function setupTicketForm() {
  const form = document.querySelector("#ticketForm");
  const status = document.querySelector("#ticketStatus");
  if (!form || !status) return;

  const session = getSession();
  if (session) {
    form.elements.name.value = session.name || "";
    form.elements.email.value = session.email || "";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Enviando chamado...";
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      payload.source = "chamado";
      payload.attachment = await fileToAttachment(form.elements.attachment?.files?.[0]);
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      status.textContent = data.message || "Chamado enviado.";
      form.reset();
      if (session) {
        form.elements.name.value = session.name || "";
        form.elements.email.value = session.email || "";
      }
      loadTickets();
      showToast("Chamado enviado.");
    } catch (error) {
      status.textContent = error.message || "Nao foi possivel enviar.";
      showToast("Nao foi possivel enviar o chamado.", "error");
    }
  });
}

async function loadTickets() {
  const list = document.querySelector("#ticketList");
  if (!list) return;

  try {
    const response = await fetch(`${API_URL}/api/contacts`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    const tickets = data.contacts || [];

    if (!tickets.length) {
      list.innerHTML = `<article class="empty-state">Nenhum chamado recebido ainda.</article>`;
      return;
    }

    list.innerHTML = tickets
      .map(
        (ticket) => `
          <article class="ticket-card">
            <div>
              <strong>${ticket.name}</strong>
              <span>${ticket.email} - ${ticket.category || "Geral"}</span>
            </div>
            <p>${ticket.message}</p>
            ${ticket.attachment_data ? `<a class="attachment-link" href="${ticket.attachment_data}" download="${ticket.attachment_name || "anexo"}">${ticket.attachment_name || "Baixar anexo"}</a>` : ""}
            <div class="ticket-actions">
              <small>${new Date(ticket.created_at).toLocaleString("pt-BR")}</small>
              <select data-ticket-id="${ticket.id}">
                <option value="aberto" ${ticket.status === "aberto" ? "selected" : ""}>aberto</option>
                <option value="em andamento" ${ticket.status === "em andamento" ? "selected" : ""}>em andamento</option>
                <option value="resolvido" ${ticket.status === "resolvido" ? "selected" : ""}>resolvido</option>
              </select>
            </div>
          </article>
        `
      )
      .join("");

    list.querySelectorAll("[data-ticket-id]").forEach((select) => {
      select.addEventListener("change", async () => {
        await fetch(`${API_URL}/api/contacts/${select.dataset.ticketId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ status: select.value }),
        });
      });
    });
  } catch (error) {
    list.innerHTML = `<article class="empty-state">Nao foi possivel carregar os chamados.</article>`;
  }
}

async function checkApi() {
  const state = document.querySelector("#apiState");
  const text = document.querySelector("#apiStateText");
  if (!state || !text) return;

  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    state.textContent = data.database?.connected ? "OK" : "OFF";
    text.textContent = data.database?.connected ? "Backend e MySQL conectados." : "Banco indisponivel.";
  } catch {
    state.textContent = "OFF";
    text.textContent = "API indisponivel.";
  }
}

function setupLogout() {
  const button = document.querySelector("#logoutButton");
  if (!button) return;
  button.addEventListener("click", () => {
    localStorage.removeItem("cyber_session");
    window.location.href = "login.html";
  });
}

async function initApp() {
  protectApp();
  await loadAppStateFromApi();
  await loadKnownUsersFromApi();
  const hasRemoteContent = await loadContentFromApi();
  if (!hasRemoteContent && hasLocalPublicContent() && getSession()?.token) {
    try {
      await saveContentToApi(getContent());
      showToast("Conteudo deste aparelho sincronizado com o backend.");
    } catch (error) {
      showToast(`Nao sincronizou com o backend: ${error.message}`, "warning");
    }
  }
  renderPublicPage();
  setupRevealAnimations();
  setupLogin();
  setupAppTabs();
  renderApp();
  setupAppForms();
  setupContactForm();
  setupLogout();
  checkApi();
}

initApp();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
