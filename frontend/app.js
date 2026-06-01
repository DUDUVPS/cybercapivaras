const API_URL = window.location.origin;

const members = [
  {
    name: "Eduardo Souza",
    role: "Capitao / Desenvolvedor",
    level: "N4",
    permission: "Coordena equipe, projetos e publicacoes",
    generation: "1a Geracao Fabrica",
    photo: "imgs/post-1-fab.jpg",
    instagram: "https://www.instagram.com/duduptid/",
  },
  {
    name: "Allen Sena",
    role: "Lider de Hardware",
    level: "N3",
    permission: "Gerencia componentes, montagem e testes",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-allem.png",
  },
  {
    name: "Luiz Carlos",
    role: "Estudante / Hardware",
    level: "N2",
    permission: "Atualiza tarefas e registra testes",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-l-carlos.png",
  },
  {
    name: "Alceu Neto",
    role: "Estudante / Hardware",
    level: "N2",
    permission: "Atualiza tarefas e registra testes",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-alceu.png",
  },
  {
    name: "Allisson Beltrao",
    role: "Mecanica",
    level: "N2",
    permission: "Acompanha montagem e manutencao",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-beltrao.png",
  },
  {
    name: "Ana Julia Maia",
    role: "Documentacao",
    level: "N2",
    permission: "Registra relatorios e fotos tecnicas",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-naju.png",
  },
  {
    name: "Renata Miranda",
    role: "Comunicacao",
    level: "N2",
    permission: "Atualiza noticias, posts e galeria",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-renata.png",
  },
  {
    name: "Isadorah Araujo",
    role: "Design 3D",
    level: "N2",
    permission: "Cuida de pecas, modelos e prototipos",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-isadorah.png",
  },
  {
    name: "Andre Wild",
    role: "Programacao",
    level: "N2",
    permission: "Atualiza codigos e acompanha sensores",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-andre.png",
  },
  {
    name: "Marcelo Brandao",
    role: "Membro",
    level: "N1",
    permission: "Visualiza agenda e participa das tarefas",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-marcelo.png",
  },
];

const accessProfiles = {
  admin: {
    role: "Administrador",
    level: "N5",
    permission: "Controle total do site, equipe, hierarquia e conteudos.",
  },
  member: {
    role: "Membro da equipe",
    level: "N2",
    permission: "Acesso a tarefas, agenda, mural e projetos conforme sua funcao.",
  },
};

const roleProfiles = {
  Administrador: accessProfiles.admin,
  Capitao: {
    role: "Capitao",
    level: "N4",
    permission: "Coordena projetos, agenda, tarefas e comunicados da equipe.",
  },
  "Lider tecnico": {
    role: "Lider tecnico",
    level: "N3",
    permission: "Gerencia robos, testes, tecnologias e documentacao tecnica.",
  },
  Programacao: {
    role: "Programacao",
    level: "N2",
    permission: "Atualiza codigos, sensores, automacao e registros tecnicos.",
  },
  Hardware: {
    role: "Hardware",
    level: "N2",
    permission: "Cuida de componentes, circuitos, motores e manutencao.",
  },
  Mecanica: {
    role: "Mecanica",
    level: "N2",
    permission: "Cuida de estrutura, chassi, montagem e impressao 3D.",
  },
  "Design 3D": {
    role: "Design 3D",
    level: "N2",
    permission: "Modela pecas, suportes e prototipos.",
  },
  Documentacao: {
    role: "Documentacao",
    level: "N2",
    permission: "Organiza relatorios, fotos, registros e historico dos projetos.",
  },
  Marketing: {
    role: "Marketing",
    level: "N2",
    permission: "Atualiza noticias, redes sociais, imagens e comunicacao.",
  },
  Membro: accessProfiles.member,
};

const defaultUserRoles = {
  "admin@cybercapivaras.com": {
    name: "Administrador",
    email: "admin@cybercapivaras.com",
    role: "Administrador",
  },
};

function getUserRoles() {
  const saved = localStorage.getItem("cybercapivaras_user_roles");

  if (!saved) {
    return defaultUserRoles;
  }

  return { ...defaultUserRoles, ...JSON.parse(saved) };
}

function saveUserRoles(roles) {
  localStorage.setItem("cybercapivaras_user_roles", JSON.stringify(roles));
}

function applySession({ name, email, picture }) {
  const roles = getUserRoles();
  const savedUser = roles[email] || { name, email, role: "Membro" };
  const profile = roleProfiles[savedUser.role] || accessProfiles.member;

  localStorage.setItem("cybercapivaras_logged", "true");
  localStorage.setItem("cybercapivaras_user", email);
  localStorage.setItem("cybercapivaras_name", savedUser.name || name || email);
  localStorage.setItem("cybercapivaras_picture", picture || "");
  localStorage.setItem("cybercapivaras_role", profile.role);
  localStorage.setItem("cybercapivaras_level", profile.level);
  localStorage.setItem("cybercapivaras_permission", profile.permission);

  window.location.href = profile.role === "Administrador" ? "admin.html" : "area-equipe.html";
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderMembers() {
  const grid = document.querySelector("#memberGrid");

  if (!grid) {
    return;
  }

  grid.innerHTML = members
    .map(
      (member) => `
        <article class="member-card">
          <img src="${member.photo}" alt="${member.name}" />
          <div>
            <h3>${member.name}</h3>
            <p><strong>${member.role}</strong></p>
            <p>${member.generation}</p>
            <p>Status: <strong>ativo</strong></p>
            <div class="socials">
              <a href="${member.instagram || "#"}" aria-label="Instagram de ${member.name}">
                <img src="imgs/instagram.png" alt="" />
              </a>
              <a href="#" aria-label="GitHub de ${member.name}">
                <img src="imgs/github.png" alt="" />
              </a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");

  if (!form || !status) {
    return;
  }

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

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      form.reset();
      status.textContent = data.message;
    } catch (error) {
      status.textContent = "Nao foi possivel enviar agora.";
    }
  });
}

function setupLogin() {
  const demoButton = document.querySelector("#googleDemoButton");
  const status = document.querySelector("#loginStatus");

  if (!demoButton) {
    return;
  }

  window.handleGoogleCredential = (response) => {
    const payload = parseJwt(response.credential);
    applySession({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    });
  };

  if (window.google && window.GOOGLE_CLIENT_ID) {
    window.google.accounts.id.initialize({
      client_id: window.GOOGLE_CLIENT_ID,
      callback: window.handleGoogleCredential,
    });
    window.google.accounts.id.renderButton(document.querySelector("#googleSignIn"), {
      theme: "filled_black",
      size: "large",
      width: 320,
    });
  }

  demoButton.addEventListener("click", () => {
    status.textContent = "Entrando com Google...";
    applySession({
      name: "Administrador",
      email: "admin@cybercapivaras.com",
      picture: "",
    });
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

function protectInternalArea() {
  const isProtected = document.body.dataset.protected === "true";

  if (!isProtected) {
    return;
  }

  if (localStorage.getItem("cybercapivaras_logged") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const requiredRole = document.body.dataset.requiredRole;
  const currentRole = localStorage.getItem("cybercapivaras_role") || "";

  if (requiredRole === "admin" && currentRole !== "Administrador") {
    window.location.href = "area-equipe.html";
  }
}

function setupLogout() {
  const button = document.querySelector("#logoutButton");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    localStorage.removeItem("cybercapivaras_logged");
    localStorage.removeItem("cybercapivaras_user");
    localStorage.removeItem("cybercapivaras_name");
    localStorage.removeItem("cybercapivaras_picture");
    localStorage.removeItem("cybercapivaras_role");
    localStorage.removeItem("cybercapivaras_level");
    localStorage.removeItem("cybercapivaras_permission");
    window.location.href = "login.html";
  });
}

function renderAccessInfo() {
  const accessText = document.querySelector("#memberAccessText");
  const level = document.querySelector("#memberLevel");
  const roleText = document.querySelector("#memberRoleText");

  if (!accessText || !level || !roleText) {
    return;
  }

  const user = localStorage.getItem("cybercapivaras_user") || "membro";
  const name = localStorage.getItem("cybercapivaras_name") || user;
  const role = localStorage.getItem("cybercapivaras_role") || "Membro da equipe";
  const userLevel = localStorage.getItem("cybercapivaras_level") || "N2";
  const permission = localStorage.getItem("cybercapivaras_permission") || accessProfiles.member.permission;

  accessText.textContent = `${name} entrou como ${role}.`;
  level.textContent = userLevel;
  roleText.textContent = permission;
}

function renderHierarchyTable() {
  const table = document.querySelector("#hierarchyTable");

  if (!table) {
    return;
  }

  table.innerHTML = members
    .map(
      (member) => `
        <tr>
          <td>${member.name}</td>
          <td>${member.role}</td>
          <td><span class="role-pill">${member.level}</span></td>
          <td>${member.permission}</td>
          <td>Ativo</td>
        </tr>
      `
    )
    .join("");
}

function setupUserRoleAdmin() {
  const form = document.querySelector("#userRoleForm");
  const list = document.querySelector("#userRoleList");
  const status = document.querySelector("#userRoleStatus");

  if (!form || !list || !status) {
    return;
  }

  function renderList() {
    const roles = getUserRoles();
    list.innerHTML = Object.values(roles)
      .map(
        (user) => `
          <article>
            <strong>${user.name}</strong>
            <span>${user.email}</span>
            <span class="role-pill">${user.role}</span>
          </article>
        `
      )
      .join("");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const roles = getUserRoles();

    roles[data.email] = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    saveUserRoles(roles);
    status.textContent = "Funcao salva para este usuario Google.";
    form.reset();
    renderList();
  });

  renderList();
}

async function checkApiState() {
  const state = document.querySelector("#apiState");
  const text = document.querySelector("#apiStateText");

  if (!state || !text) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    const connected = data.database?.connected === true;

    state.textContent = connected ? "OK" : "OFF";
    text.textContent = connected ? "Railway e MySQL conectados." : "Banco indisponivel no momento.";
  } catch (error) {
    state.textContent = "OFF";
    text.textContent = "Nao foi possivel verificar a API.";
  }
}

protectInternalArea();
setupMenu();
renderMembers();
setupContactForm();
setupLogin();
setupLogout();
renderAccessInfo();
renderHierarchyTable();
setupUserRoleAdmin();
checkApiState();
