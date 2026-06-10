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

const defaultAppSettings = {
  appName: "Cyber App",
  density: "comfortable",
  accent: "green",
};

const defaultTasks = [
  ["Calibrar sensores", "Seguidor de linha"],
  ["Revisar chassi", "Mecanica"],
  ["Publicar fotos", "Marketing"],
];

const roleProfiles = {
  Administrador: ["N5", "Controle total do app, site e funcoes."],
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
  return { ...defaultContent, ...JSON.parse(localStorage.getItem("cyber_site_content") || "{}") };
}

function saveContent(content) {
  localStorage.setItem("cyber_site_content", JSON.stringify(content));
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

function getTasks() {
  return JSON.parse(localStorage.getItem("cyber_tasks") || JSON.stringify(defaultTasks));
}

function saveTasks(tasks) {
  localStorage.setItem("cyber_tasks", JSON.stringify(tasks));
}

function startSession(user) {
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
  const googleButton = document.querySelector("#googleDemoButton");
  const status = document.querySelector("#loginStatus");
  const googleStatus = document.querySelector("#googleStatus");

  if (!adminForm || !googleButton) return;

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

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(adminForm).entries());

    if (data.email !== "admin@cybercapivaras.com" || data.password !== "admin123") {
      status.textContent = "Credenciais de administrador invalidas.";
      return;
    }

    startSession({ name: "Administrador", email: data.email });
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

function renderApp() {
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
  document.body.dataset.density = settings.density;
  document.body.dataset.accent = settings.accent;
  document.querySelectorAll(".admin-only").forEach((node) => {
    node.hidden = !admin;
  });

  const table = document.querySelector("#teamTable");
  if (table) {
    const roleMap = getRoles();
    const assigned = Object.values(roleMap).filter((item) => item.email !== "admin@cybercapivaras.com");
    const rows = [...baseTeam.map(([name, role]) => ({ name, email: "-", role })), ...assigned];

    table.innerHTML = rows
      .map((member) => {
        const [level, permission] = roleProfiles[member.role] || roleProfiles.Membro;
        return `<article><strong>${member.name}</strong><span>${member.email}</span><b>${member.role}</b><small>${level} - ${permission}</small></article>`;
      })
      .join("");
  }

  const projectsCount = document.querySelector("#projectsCount");
  const teamCount = document.querySelector("#teamCount");
  if (projectsCount) projectsCount.textContent = getContent().projects.length;
  if (teamCount) teamCount.textContent = baseTeam.length + Object.values(getRoles()).filter((item) => item.email !== "admin@cybercapivaras.com").length;

  renderTasks();
  loadTickets();
}

function setupAppForms() {
  const contentForm = document.querySelector("#siteEditorForm");
  const roleForm = document.querySelector("#roleForm");

  if (contentForm) {
    const content = getContent();
    contentForm.elements.heroLabel.value = content.heroLabel;
    contentForm.elements.heroTitle.value = content.heroTitle;
    contentForm.elements.heroText.value = content.heroText;

    contentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(contentForm).entries());
      saveContent({ ...getContent(), ...data });
      document.querySelector("#siteEditorStatus").textContent = "Pagina principal atualizada.";
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

  setupTaskForm();
  setupSettingsForm();
}

function renderTasks() {
  const board = document.querySelector("#taskBoard");
  if (!board) return;

  board.innerHTML = getTasks()
    .map(
      ([title, area], index) => `
        <article>
          <strong>${title}</strong>
          <span>${area}</span>
          <button class="task-remove admin-only" type="button" data-task-index="${index}">Remover</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-task-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const tasks = getTasks();
      tasks.splice(Number(button.dataset.taskIndex), 1);
      saveTasks(tasks);
      renderTasks();
    });
  });
}

function setupTaskForm() {
  const form = document.querySelector("#taskForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const tasks = getTasks();
    tasks.push([data.title, data.area]);
    saveTasks(tasks);
    form.reset();
    renderTasks();
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

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Enviando...";
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
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

async function loadTickets() {
  const list = document.querySelector("#ticketList");
  if (!list) return;

  try {
    const response = await fetch(`${API_URL}/api/contacts`);
    const data = await response.json();
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
              <span>${ticket.email}</span>
            </div>
            <p>${ticket.message}</p>
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
          headers: { "Content-Type": "application/json" },
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
