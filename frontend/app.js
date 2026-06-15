const API_URL = window.location.origin;

const defaultContent = {
  heroLabel: "IF Goiano - Campus Campos Belos",
  heroTitle: "Cyber Capivaras",
  heroText: "Um time de robotica movido por tecnologia, competicao, pesquisa e trabalho em equipe.",
  heroImage: "assets/hero-robotica.png",
  contactTitle: "Envie uma mensagem pro time",
  contactText: "Fale com a equipe sobre projetos, parcerias, competicoes ou apresentacoes.",
  footerText: "O Cyber Capivaras faz parte da Fabrica da Ciencia, unindo robotica, competicoes, tecnologia educacional e prototipos criativos.",
  footerAffiliation: "Projeto integrante da Fabrica da Ciencia",
  footerCredit: "LASTTRO.IO",
  footerCreditUrl: "https://lasttro.app.br",
  footerContactTitle: "Contato",
  footerContactLine1: "Fabrica da Ciencia",
  footerContactLine2: "Cyber Capivaras",
  footerContactAction: "Enviar mensagem",
  footerStatus: "Sistemas operacionais",
  customSectionLabel: "Personalizado",
  customSectionTitle: "Area livre do time",
  customSectionText: "Espaco para avisos, destaques, campanhas, laboratorios, patrocinadores ou qualquer conteudo criado pela central.",
  areas: [
    ["Software", "Logica, sensores, automacao e codigo embarcado."],
    ["Hardware", "Circuitos, motores, placas e alimentacao."],
    ["Mecanica", "Chassi, pecas, montagem e impressao 3D."],
    ["Comunicacao", "Fotos, noticias, redes sociais e documentacao."],
  ],
  projects: [
    ["Robo Seguidor de Linha", "Robo autonomo com sensores infravermelhos para seguir trajetos com precisao.", "imgs/20250618_104600.jpg", "Arduino, C/C++, sensores IR, ponte H", "Autonomia e controle de percurso", "Em testes"],
    ["Robo Explorador", "Prototipo movel para desvio de obstaculos e leitura de ambiente.", "assets/hero-robotica.png", "ESP32, sensores ultrassonicos, motores DC", "Navegacao em ambiente fechado", "Prototipo"],
    ["Painel de Telemetria", "Interface para acompanhar estado, sensores e registros dos prototipos.", "imgs/bg-site.png", "HTML, CSS, JavaScript, GitHub", "Visualizar dados do time e projetos", "Em desenvolvimento"],
    ["Pecas 3D", "Modelagem e impressao de suportes, carenagens e estruturas para robos.", "imgs/fotos/ft-isadorah.png", "Modelagem 3D, impressao 3D, prototipagem", "Acelerar montagem e manutencao", "Ativo"],
  ],
  events: [
    ["Torneio Interno de Robotica", "2026", "Campos Belos", "1o lugar", "Competicao de prototipos autonomos e apresentacao tecnica."],
    ["Feira de Tecnologia", "2026", "IF Goiano", "Participacao", "Exposicao de projetos, testes de robo e demonstracao para visitantes."],
    ["Mostra de Projetos", "2025", "Campus Campos Belos", "Apresentacao", "Apresentacao dos primeiros prototipos e organizacao da equipe."],
  ],
  customBlocks: [
    ["Destaque do mes", "Use esta caixa para divulgar uma novidade, chamada ou aviso importante.", "", "Novo", "#contato", "Falar com o time", "Destaque"],
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
  return { ...defaultContent, members: defaultMembers, ...JSON.parse(localStorage.getItem("cyber_site_content") || "{}") };
}

function saveContent(content) {
  localStorage.setItem("cyber_site_content", JSON.stringify(content));
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
  areas: [
    ["Titulo", "Ex.: Software"],
    ["Descricao", "O que aparece nessa caixa"],
  ],
  projects: [
    ["Nome", "Robo Seguidor de Linha"],
    ["Descricao", "Resumo do projeto"],
    ["Imagem", "imgs/projeto.png"],
    ["Tecnologias", "Arduino, sensores, motores"],
    ["Objetivo", "Objetivo do projeto"],
    ["Status", "Ativo"],
  ],
  events: [
    ["Nome", "Feira de Tecnologia"],
    ["Ano", "2026"],
    ["Local", "IF Goiano"],
    ["Resultado", "Participacao"],
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

function createBlockRow(type, values = []) {
  const schema = blockSchemas[type] || [];
  return schema.map(([, placeholder], index) => values[index] || (index === 0 ? `Novo ${type}` : ""));
}

function renderBlockEditors(content) {
  Object.entries(blockSchemas).forEach(([type, schema]) => {
    const list = document.querySelector(`[data-block-list="${type}"]`);
    if (!list) return;
    const rows = content[type] || [];
    list.innerHTML = rows
      .map(
        (row, rowIndex) => `
          <article class="editable-block" data-block-row="${type}" data-row-index="${rowIndex}">
            <div class="editable-block-head">
              <strong>${escapeHtml(row[0] || "Sem titulo")}</strong>
              <button class="ghost-button" type="button" data-remove-block="${type}" data-row-index="${rowIndex}">Remover</button>
            </div>
            <div class="editable-block-grid">
              ${schema
                .map(
                  ([label, placeholder], fieldIndex) => `
                    <label>${label}
                      ${fieldIndex === 1 || fieldIndex === 4 ? `<textarea rows="3" data-block-field="${fieldIndex}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(row[fieldIndex] || "")}</textarea>` : `<input type="text" data-block-field="${fieldIndex}" value="${escapeHtml(row[fieldIndex] || "")}" placeholder="${escapeHtml(placeholder)}" />`}
                    </label>
                  `
                )
                .join("")}
            </div>
          </article>
        `
      )
      .join("");
  });
}

function collectBlockRows(type) {
  const schema = blockSchemas[type] || [];
  return [...document.querySelectorAll(`[data-block-row="${type}"]`)]
    .map((block) =>
      schema.map((_, index) => block.querySelector(`[data-block-field="${index}"]`)?.value.trim() || "")
    )
    .filter((row) => row[0]);
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

function renderMemberCard(memberRow, index, editable = false) {
  const member = normalizeMember(memberRow);
  return `
    <article class="member-card team-person-card">
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

function saveRoles(roles) {
  localStorage.setItem("cyber_roles", JSON.stringify(roles));
}

function getAppSettings() {
  return { ...defaultAppSettings, ...JSON.parse(localStorage.getItem("cyber_app_settings") || "{}") };
}

function saveAppSettings(settings) {
  localStorage.setItem("cyber_app_settings", JSON.stringify(settings));
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
}

function getUserPermissions() {
  return { ...defaultUserPermissions, ...JSON.parse(localStorage.getItem("cyber_user_permissions") || "{}") };
}

function saveUserPermissions(rules) {
  localStorage.setItem("cyber_user_permissions", JSON.stringify(rules));
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
}

function startSession(user) {
  if (user.token && user.role) {
    localStorage.setItem("cyber_session", JSON.stringify(user));
    window.location.href = "app.html";
    return;
  }

  const roles = getRoles();
  const saved = roles[user.email] || { name: user.name, email: user.email, role: "Membro" };
  const [level, permission] = roleProfiles[saved.role] || roleProfiles.Membro;

  localStorage.setItem("cyber_session", JSON.stringify({
    name: saved.name || user.name,
    email: user.email,
    picture: user.picture || saved.picture || "",
    role: saved.role,
    level,
    permission,
  }));

  window.location.href = "app.html";
}

function getSession() {
  return JSON.parse(localStorage.getItem("cyber_session") || "null");
}

function getAuthHeaders() {
  const session = getSession();
  return session?.token ? { Authorization: `Bearer ${session.token}` } : {};
}

function getAccessGroup(session = getSession()) {
  if (!session) return "Aluno";
  if (session.role === "Administrador") return "Administrador";
  if (["Professor", "Orientador", "Capitao", "Lider tecnico"].includes(session.role)) return "Professor";
  return "Aluno";
}

function getAllowedTabs(session = getSession()) {
  if (!session) return ["painel"];
  if (session.role === "Administrador") return Object.keys(appModules);
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
    : `Seu perfil pode acessar: ${allowed.map((id) => appModules[id]).filter(Boolean).join(", ")}.`;

  showAppTab(document.querySelector("[data-tab-target].active")?.dataset.tabTarget || "painel");
}

function renderApp() {
  if (!document.body.classList.contains("app-shell")) return;
  const session = getSession();
  if (!session) return;

  const admin = session.role === "Administrador";
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
      button.addEventListener("click", () => {
        const content = getContent();
        const [removed] = content.members.splice(Number(button.dataset.memberIndex), 1);
        const removedEmail = normalizeMember(removed).email;
        if (removedEmail) {
          const permissions = getUserPermissions();
          delete permissions[removedEmail];
          saveUserPermissions(permissions);
        }
        saveContent(content);
        showToast("Integrante removido da equipe.", "warning");
        renderApp();
      });
    });
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

  if (contentForm) {
    const content = getContent();
    contentForm.elements.heroLabel.value = content.heroLabel;
    contentForm.elements.heroTitle.value = content.heroTitle;
    contentForm.elements.heroText.value = content.heroText;
    contentForm.elements.heroImage.value = content.heroImage || "";
    contentForm.elements.contactTitle.value = content.contactTitle || "";
    contentForm.elements.contactText.value = content.contactText || "";
    contentForm.elements.footerText.value = content.footerText || "";
    contentForm.elements.footerAffiliation.value = content.footerAffiliation || "";
    contentForm.elements.footerCredit.value = content.footerCredit || "";
    contentForm.elements.footerCreditUrl.value = content.footerCreditUrl || "";
    contentForm.elements.footerContactTitle.value = content.footerContactTitle || "";
    contentForm.elements.footerContactLine1.value = content.footerContactLine1 || "";
    contentForm.elements.footerContactLine2.value = content.footerContactLine2 || "";
    contentForm.elements.footerContactAction.value = content.footerContactAction || "";
    contentForm.elements.footerStatus.value = content.footerStatus || "";
    contentForm.elements.customSectionLabel.value = content.customSectionLabel || "";
    contentForm.elements.customSectionTitle.value = content.customSectionTitle || "";
    contentForm.elements.customSectionText.value = content.customSectionText || "";
    renderBlockEditors(content);
    contentForm.addEventListener("input", () => showDraftToast());
    contentForm.addEventListener("change", () => showDraftToast());

    contentForm.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-add-block]");
      const removeButton = event.target.closest("[data-remove-block]");

      if (addButton) {
        const type = addButton.dataset.addBlock;
        const nextContent = {
          ...getContent(),
          areas: collectBlockRows("areas"),
          projects: collectBlockRows("projects"),
          events: collectBlockRows("events"),
          customBlocks: collectBlockRows("customBlocks"),
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

    contentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(contentForm).entries());
      saveContent({
        ...getContent(),
        heroLabel: data.heroLabel,
        heroTitle: data.heroTitle,
        heroText: data.heroText,
        heroImage: data.heroImage,
        contactTitle: data.contactTitle,
        contactText: data.contactText,
        footerText: data.footerText,
        footerAffiliation: data.footerAffiliation,
        footerCredit: data.footerCredit,
        footerCreditUrl: data.footerCreditUrl,
        footerContactTitle: data.footerContactTitle,
        footerContactLine1: data.footerContactLine1,
        footerContactLine2: data.footerContactLine2,
        footerContactAction: data.footerContactAction,
        footerStatus: data.footerStatus,
        customSectionLabel: data.customSectionLabel,
        customSectionTitle: data.customSectionTitle,
        customSectionText: data.customSectionText,
        areas: collectBlockRows("areas"),
        projects: collectBlockRows("projects"),
        events: collectBlockRows("events"),
        customBlocks: collectBlockRows("customBlocks"),
      });
      document.querySelector("#siteEditorStatus").textContent = "Pagina principal atualizada.";
      showToast("Pagina publica atualizada.");
      renderSitePreview();
    });
  }

  if (roleForm) {
    roleForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(roleForm).entries());
      const roles = getRoles();
      roles[data.email] = data;
      saveRoles(roles);
      document.querySelector("#roleStatus").textContent = "Funcao salva.";
      showToast("Funcao e acesso salvos.");
      roleForm.reset();
      renderApp();
    });
  }

  if (memberForm) {
    const clearButton = document.querySelector("#clearMemberForm");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        memberForm.reset();
        memberForm.elements.index.value = "";
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

    document.querySelector("#memberPhotoFile")?.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > 2.5 * 1024 * 1024) {
        document.querySelector("#memberStatus").textContent = "Escolha uma imagem menor que 2,5 MB.";
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        memberForm.elements.image.value = reader.result;
        updateMemberEditPreview();
        document.querySelector("#memberStatus").textContent = "Foto carregada. Clique em salvar integrante.";
        showToast("Foto carregada na caixa de edicao.");
      };
      reader.onerror = () => {
        document.querySelector("#memberStatus").textContent = "Nao foi possivel carregar a foto.";
        showToast("Nao foi possivel carregar a foto.", "error");
      };
      reader.readAsDataURL(file);
    });

    memberForm.addEventListener("submit", (event) => {
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
      }

      saveContent(content);
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

protectApp();
renderPublicPage();
setupRevealAnimations();
setupLogin();
setupAppTabs();
renderApp();
setupAppForms();
setupContactForm();
setupLogout();
checkApi();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
