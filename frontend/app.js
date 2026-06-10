const API_URL = window.location.origin;

const defaultContent = {
  heroLabel: "IF Goiano - Campus Campos Belos",
  heroTitle: "Cyber Capivaras",
  heroText: "Um time de robotica movido por tecnologia, competicao, pesquisa e trabalho em equipe.",
  areas: [
    ["Software", "Logica, sensores, automacao e codigo embarcado."],
    ["Hardware", "Circuitos, motores, placas e alimentacao."],
    ["Mecanica", "Chassi, pecas, montagem e impressao 3D."],
    ["Comunicacao", "Fotos, noticias, redes sociais e documentacao."],
  ],
  projects: [
    ["Robo Seguidor de Linha", "Autonomo com sensores infravermelhos e controle de motores.", "imgs/20250618_104600.jpg"],
    ["Robo Explorador", "Protótipo movel para desvio de obstaculos e testes de ambiente.", "assets/hero-robotica.png"],
  ],
};

const defaultMembers = [
  ["Eduardo Souza", "Capitao", "N4", "imgs/fotos/ft-alceu.png", "Organiza estrategia, cronograma e prioridades."],
  ["Allen Sena", "Lider tecnico", "N3", "imgs/fotos/ft-allem.png", "Coordena testes, prototipos e decisao tecnica."],
  ["Ana Julia Maia", "Documentacao", "N2", "imgs/fotos/ft-naju.png", "Registra progresso, relatorios e evidencias."],
  ["Renata Miranda", "Marketing", "N2", "imgs/fotos/ft-renata.png", "Cuida da comunicacao visual e redes sociais."],
  ["Andre Wild", "Programacao", "N2", "imgs/fotos/ft-andre.png", "Cuida do codigo, sensores e automacao."],
  ["Allisson Beltrao", "Mecanica", "N2", "imgs/fotos/ft-beltrao.png", "Cuida da estrutura, montagem e manutencao."],
  ["Isadorah Araujo", "Design 3D", "N2", "imgs/fotos/ft-isadorah.png", "Modela pecas e prototipos para impressao."],
  ["Marcelo Brandao", "Membro", "N1", "imgs/fotos/ft-marcelo.png", "Participa das tarefas e apoio aos projetos."],
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
  permissoes: "Permissoes",
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

function renderMemberCard([name, role, level, image, description], index, removable = false) {
  return `
    <article class="member-card">
      <div class="member-photo"><img src="${image}" alt="${name}" /></div>
      <div class="member-info">
        <span>${level}</span>
        <h3>${name}</h3>
        <strong>${role}</strong>
        <p>${description}</p>
        ${removable ? `<button class="task-remove" type="button" data-member-index="${index}">Remover</button>` : ""}
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
    table.innerHTML = getContent().members.map((member, index) => renderMemberCard(member, index)).join("");
  }

  const memberAdminList = document.querySelector("#memberAdminList");
  if (memberAdminList) {
    memberAdminList.innerHTML = getContent().members
      .map(([name, role], index) => `<article><strong>${name}</strong><span>${role}</span><button class="task-remove" type="button" data-member-index="${index}">Remover</button></article>`)
      .join("");

    memberAdminList.querySelectorAll("[data-member-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const content = getContent();
        content.members.splice(Number(button.dataset.memberIndex), 1);
        saveContent(content);
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
  renderPermissionMatrix();
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
    contentForm.elements.areasText.value = rowsToLines(content.areas);
    contentForm.elements.projectsText.value = rowsToLines(content.projects);

    contentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(contentForm).entries());
      saveContent({
        ...getContent(),
        heroLabel: data.heroLabel,
        heroTitle: data.heroTitle,
        heroText: data.heroText,
        areas: linesToRows(data.areasText, 2),
        projects: linesToRows(data.projectsText, 3),
      });
      document.querySelector("#siteEditorStatus").textContent = "Pagina principal atualizada.";
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
      roleForm.reset();
      renderApp();
    });
  }

  if (memberForm) {
    memberForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(memberForm).entries());
      const content = getContent();
      content.members.push([data.name, data.role, data.level, data.image, data.description]);
      saveContent(content);
      memberForm.reset();
      renderApp();
    });
  }

  setupTaskForm();
  setupSettingsForm();
  setupPermissionForm();
  setupCandidateForm();
  setupTicketForm();
  setupCalendarControls();
  setupDataTools();
  renderSitePreview();
}

function renderSitePreview() {
  const preview = document.querySelector("#sitePreview");
  if (!preview) return;
  const content = getContent();
  preview.innerHTML = `
    <article><strong>${content.heroTitle}</strong><span>${content.heroLabel}</span><p>${content.heroText}</p></article>
    <article><strong>Areas</strong><span>${content.areas.length} blocos publicados</span></article>
    <article><strong>Projetos</strong><span>${content.projects.length} projetos publicados</span></article>
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
            <article class="task-card ${task.status === "concluida" ? "is-done" : ""}">
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
      renderTasks();
    });
  });

  document.querySelectorAll("[data-task-status-index]").forEach((select) => {
    select.addEventListener("change", () => {
      const tasks = getTasks();
      tasks[Number(select.dataset.taskStatusIndex)].status = select.value;
      saveTasks(tasks);
      renderTasks();
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
    renderCandidates();
  });
}

function renderPermissionMatrix() {
  const form = document.querySelector("#permissionForm");
  if (!form) return;

  const rules = getUserPermissions();
  const modules = Object.entries(appModules).filter(([id]) => id !== "ajustes" && id !== "permissoes");
  const people = Object.entries(rules);

  form.innerHTML = `
    <fieldset>
      <legend>Pessoa</legend>
      <label>E-mail <input type="email" name="email" placeholder="aluno@email.com" required /></label>
      <label class="permission-row">
        <input type="checkbox" name="canInterview" value="true" />
        <span>Pode fazer entrevista no processo seletivo</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>Abas liberadas</legend>
      ${modules
        .map(([id, label]) => `
          <label class="permission-row">
            <input type="checkbox" name="tabs" value="${id}" ${id === "painel" ? "checked" : ""} />
            <span>${label}</span>
          </label>
        `)
        .join("")}
    </fieldset>
    <button class="button primary" type="submit">Salvar acesso da pessoa</button>
    <div class="permission-list">
      ${people.map(([email, rule]) => `<article><strong>${email}</strong><span>${(rule.tabs || []).map((id) => appModules[id]).join(", ")}</span><b>${rule.canInterview ? "Entrevistador" : "Acesso comum"}</b></article>`).join("")}
    </div>
  `;
}

function setupPermissionForm() {
  const form = document.querySelector("#permissionForm");
  const status = document.querySelector("#permissionStatus");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = data.get("email");
    const tabs = data.getAll("tabs");
    if (!tabs.includes("painel")) tabs.unshift("painel");
    const rules = getUserPermissions();
    rules[email] = {
      tabs,
      canInterview: data.get("canInterview") === "true",
    };

    saveUserPermissions(rules);
    if (status) status.textContent = "Permissoes atualizadas.";
    renderPermissionMatrix();
    applyAccessRules();
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
  });

  importButton.addEventListener("click", () => {
    try {
      const data = JSON.parse(box.value);
      keys.forEach((key) => {
        if (key in data) localStorage.setItem(key, JSON.stringify(data[key]));
      });
      if (status) status.textContent = "Dados importados.";
      renderApp();
    } catch {
      if (status) status.textContent = "JSON invalido.";
    }
  });

  resetButton.addEventListener("click", () => {
    keys.forEach((key) => localStorage.removeItem(key));
    if (status) status.textContent = "Dados demo restaurados.";
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
    } catch (error) {
      status.textContent = error.message || "Nao foi possivel enviar.";
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
