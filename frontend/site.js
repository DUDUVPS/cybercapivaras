const API_URL = window.location.origin;
let remotePublicContent = {};

const publicContent = {
  siteName: "Cyber Capivaras",
  siteHomeLink: "index.html",
  siteLogo: "imgs/ChatGPT Image 2 de jul. de 2025, 18_59_21-Photoroom.png",
  accountLink: "login.html",
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
  sectionOrderHome: "1",
  sectionOrderTeam: "2",
  sectionOrderProjects: "3",
  sectionOrderEvents: "4",
  sectionOrderContact: "99",
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

const publicRoleProfiles = {
  Administrador: ["N5", "Controle geral do app e do site."],
  Capitao: ["N4", "Organiza estrategia, cronograma e prioridades."],
  "Lider tecnico": ["N3", "Coordena testes, prototipos e decisao tecnica."],
  Programacao: ["N2", "Cuida do codigo, sensores e automacao."],
  Hardware: ["N2", "Cuida de circuitos, motores e componentes."],
  Mecanica: ["N2", "Cuida da estrutura, montagem e manutencao."],
  "Design 3D": ["N2", "Modela pecas e prototipos para impressao."],
  Documentacao: ["N2", "Registra progresso, relatorios e evidencias."],
  Marketing: ["N2", "Cuida da comunicacao visual e redes sociais."],
  Membro: ["N1", "Participa das tarefas e apoio aos projetos."],
};

const publicTeam = [
  ["Eduardo Souza", "Capitao", "N4", "imgs/fotos/ft-alceu.png", "Organiza estrategia, cronograma e prioridades.", "", "1a Geracao Fabrica", "Ativo"],
  ["Allen Sena", "Estudante / Arduino", "N3", "imgs/fotos/ft-allem.png", "Atua nos testes com Arduino, sensores e prototipos.", "", "1a Geracao Fabrica", "Ativo"],
  ["Ana Julia Maia", "Documentacao", "N2", "imgs/fotos/ft-naju.png", "Registra progresso, relatorios e evidencias.", "", "1a Geracao Fabrica", "Ativo"],
  ["Renata Miranda", "Marketing", "N2", "imgs/fotos/ft-renata.png", "Cuida da comunicacao visual e redes sociais.", "", "1a Geracao Fabrica", "Ativo"],
  ["Andre Wild", "Programacao", "N2", "imgs/fotos/ft-andre.png", "Cuida do codigo, sensores e automacao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Allisson Beltrao", "Mecanica", "N2", "imgs/fotos/ft-beltrao.png", "Cuida da estrutura, montagem e manutencao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Isadorah Araujo", "Design 3D", "N2", "imgs/fotos/ft-isadorah.png", "Modela pecas e prototipos para impressao.", "", "1a Geracao Fabrica", "Ativo"],
  ["Marcelo Brandao", "Membro", "N1", "imgs/fotos/ft-marcelo.png", "Participa das tarefas e apoio aos projetos.", "membro@cybercapivaras.com", "1a Geracao Fabrica", "Ativo"],
];

function splitMediaList(value = "") {
  const text = String(value);
  const separator = text.includes("data:image") ? /[\n|]+/ : /[\n,|]+/;
  return text
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function readStoredPublicContent() {
  try {
    return JSON.parse(localStorage.getItem("cyber_site_content") || "{}") || {};
  } catch {
    return {};
  }
}

function withDefault(value, fallback) {
  if (Array.isArray(fallback)) return Array.isArray(value) && value.length ? value : fallback;
  if (typeof fallback === "string") return typeof value === "string" && value.trim() ? value : fallback;
  return value ?? fallback;
}

function validRows(value, fallback) {
  return Array.isArray(value) && value.some(Array.isArray) ? value.filter(Array.isArray) : fallback;
}

function migrateCustomBlocks(rows = []) {
  return validRows(rows, []).map(([title, text, image, label, link, linkText, status], index) => [
    label || title || `Pagina ${index + 1}`,
    title || label || `Pagina ${index + 1}`,
    text || "",
    image || "",
    String(5 + index),
    link || "",
    linkText || "",
    status || "",
  ]);
}

function parseCardRows(value = "") {
  return String(value)
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter((parts) => parts[0] || parts[1] || parts[2]);
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "pagina";
}

function sectionOrder(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeUrl(value = "") {
  const text = String(value).trim();
  if (!text) return "";
  if (/^(#|mailto:|tel:|data:|https?:\/\/|\/|\.\/|\.\.\/)/i.test(text)) return text;
  if (/^[\w-]+\.html([?#].*)?$/i.test(text)) return `${window.location.origin}/${text}`;
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(text)) return `https://${text}`;
  return text;
}

function normalizeLinks(rows = []) {
  return validRows(rows, []).map(([label, url, order], index) => [label, url, order || String(index + 1)]);
}

function getPublicContent() {
  const stored = readStoredPublicContent();
  const content = { ...publicContent, ...stored, ...remotePublicContent };
  Object.entries(publicContent).forEach(([key, fallback]) => {
    content[key] = withDefault(content[key], fallback);
  });
  content.members = Array.isArray(stored.members) && stored.members.length ? stored.members : publicTeam;
  return content;
}

async function loadPublicContentFromApi() {
  try {
    const response = await fetch(`${API_URL}/api/site-content`, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    if (data.content && typeof data.content === "object") {
      remotePublicContent = data.content;
      localStorage.setItem("cyber_site_content", JSON.stringify(data.content));
    }
  } catch {
    // Offline/local fallback keeps the last cached content visible.
  }
}

function renderMediaCarousel(images, title) {
  const safeImages = images.filter(Boolean);
  if (!safeImages.length) return "";
  return `
    <div class="card-media-carousel" data-media-carousel aria-label="Fotos de ${title}">
      <div class="card-media-track">
        ${safeImages.map((image, index) => `<img class="${index === 0 ? "is-active" : ""}" src="${image}" alt="${title}" data-media-slide="${index}" />`).join("")}
      </div>
      ${safeImages.length > 1 ? `
        <button class="media-arrow media-prev" type="button" data-media-direction="-1" aria-label="Foto anterior">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button class="media-arrow media-next" type="button" data-media-direction="1" aria-label="Proxima foto">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      ` : ""}
    </div>
  `;
}

function normalizePublicMember(member) {
  const roleProfile = publicRoleProfiles[member[1]] || publicRoleProfiles.Membro;
  return {
    name: member[0] || "",
    role: member[1] || "Membro",
    level: member[2] || roleProfile[0],
    image: member[3] || "imgs/apple-touch-icon.png",
    details: member[4] || roleProfile[1],
    email: member[5] || "",
    generation: member[6] || "1a Geracao Fabrica",
    status: member[7] || "Ativo",
    instagram: member[8] || "",
    github: member[9] || "",
    mainArea: member[10] || "",
  };
}

function isInactiveStatus(status = "") {
  return !/^ativo$/i.test(String(status).trim());
}

function renderPublicContent() {
  const content = getPublicContent();

  document.querySelectorAll("[data-content]").forEach((node) => {
    const key = node.dataset.content;
    node.textContent = content[key] || publicContent[key] || "";
  });

  document.querySelectorAll("[data-image-content]").forEach((node) => {
    const key = node.dataset.imageContent;
    const value = content[key] || publicContent[key];
    if (value) node.src = value;
  });

  document.querySelectorAll("[data-placeholder-content]").forEach((node) => {
    const key = node.dataset.placeholderContent;
    const value = content[key] || publicContent[key];
    if (value) node.placeholder = value;
  });

  document.querySelectorAll("[data-link-content]").forEach((node) => {
    const key = node.dataset.linkContent;
    const value = content[key] || publicContent[key];
    if (value) node.href = normalizeUrl(value);
  });

  document.querySelectorAll("[data-public-section]").forEach((section) => {
    const key = `show${section.dataset.publicSection}Section`;
    section.hidden = content[key] === false;
  });

  const sectionOrderMap = {
    Home: sectionOrder(content.sectionOrderHome, 1),
    Team: sectionOrder(content.sectionOrderTeam, 2),
    Projects: sectionOrder(content.sectionOrderProjects, 3),
    Events: sectionOrder(content.sectionOrderEvents, 4),
    Contact: sectionOrder(content.sectionOrderContact, 99),
  };
  document.querySelectorAll("[data-public-section]").forEach((section) => {
    section.style.order = sectionOrderMap[section.dataset.publicSection] || 50;
  });

  document.querySelectorAll("[data-link-list]").forEach((node) => {
    const key = node.dataset.linkList;
    let links = normalizeLinks(content[key]).length ? normalizeLinks(content[key]) : normalizeLinks(publicContent[key] || []);
    if (key === "headerLinks") {
      const customSections = validRows(content.customSections, publicContent.customSections);
      const customLinks = customSections.map(([label, , , , order], index) => [label, `#pagina-${index + 1}-${slugify(label)}`, order || String(20 + index)]);
      customLinks.forEach((customLink) => {
        if (!links.some(([label]) => label === customLink[0])) links.splice(Math.max(links.length - 2, 0), 0, customLink);
      });
      links = links.map(([label, url, order], linkIndex) => {
        const safeOrder = order || String(linkIndex + 1);
        if (url && url !== "#personalizado" && !/^#pagina-/i.test(url)) return [label, url, safeOrder];
        const sectionIndex = customSections.findIndex(([sectionLabel]) => sectionLabel === label);
        return [label, sectionIndex >= 0 ? `#pagina-${sectionIndex + 1}-${slugify(label)}` : url, safeOrder || String(linkIndex + 1)];
      });
    }
    links = links.slice().sort((a, b) => sectionOrder(a[2], 50) - sectionOrder(b[2], 50));
    node.innerHTML = links.map(([label, url]) => `<a href="${normalizeUrl(url) || "#"}">${label}</a>`).join("");
  });

  document.querySelectorAll("[data-social-list]").forEach((node) => {
    const key = node.dataset.socialList;
    const links = validRows(content[key], publicContent[key] || []);
    node.innerHTML = links
      .map(([label, url, icon]) => `
        <a href="${normalizeUrl(url) || "#"}" aria-label="${label}">
          ${icon ? `<img src="${icon}" alt="" />` : `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" /></svg>`}
        </a>
      `)
      .join("");
  });

  const areas = document.querySelector("#publicAreas");
  if (areas) {
    const rows = validRows(content.areas, publicContent.areas);
    areas.innerHTML = rows
      .map(
        ([title, text], index) => `
          <article>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `
      )
      .join("");
  }

  const projects = document.querySelector("#publicProjects");
  if (projects) {
    const rows = validRows(content.projects, publicContent.projects);
    projects.innerHTML = rows
      .map(
        (row) => {
          const [title, text, image, tech = "Robotica educacional"] = row;
          const gallery = row.length >= 6 ? row[4] : "";
          const status = row.length >= 6 ? row[5] : row[4] || "Ativo";
          const images = [image, ...splitMediaList(gallery)];
          return `
          <article>
            ${renderMediaCarousel(images, title)}
            <div class="project-body">
              <span class="project-status">${status}</span>
              <h3>${title}</h3>
              <p>${text}</p>
              <dl>
                <div><dt>Tecnologias</dt><dd>${tech}</dd></div>
              </dl>
            </div>
          </article>
        `;
        }
      )
      .join("");
  }

  const events = document.querySelector("#publicEvents");
  if (events) {
    const rows = validRows(content.events, publicContent.events);
    events.innerHTML = rows
      .map(
        (row) => {
          const [name, date, place, result] = row;
          const hasImage = row[4] && (/^(data:image|https?:\/\/|imgs\/|assets\/)/.test(row[4]) || /\.(png|jpe?g|webp|gif|ico|svg)$/i.test(row[4]));
          const image = hasImage ? row[4] : "";
          const gallery = row.length >= 7 ? row[5] : "";
          const text = row.length >= 7 ? row[6] : (hasImage ? row[5] : row[4]);
          const images = [image, ...splitMediaList(gallery)].filter(Boolean);
          return `
          <article class="event-card">
            ${renderMediaCarousel(images, name)}
            <div class="event-meta">
              <span>${date}</span>
              <strong>${result}</strong>
            </div>
            <h3>${name}</h3>
            <small>${place}</small>
            <p>${text}</p>
          </article>
        `;
        }
      )
      .join("");
  }

  const dynamicSections = document.querySelector("#dynamicSections");
  if (dynamicSections) {
    const storedContent = readStoredPublicContent();
    const hasCustomSections = Array.isArray(content.customSections) && content.customSections.some(Array.isArray);
    const hasStoredCustomBlocks = Array.isArray(storedContent.customBlocks) && storedContent.customBlocks.some(Array.isArray);
    const rows = hasCustomSections ? validRows(content.customSections, []) : (hasStoredCustomBlocks ? migrateCustomBlocks(storedContent.customBlocks) : []);
    dynamicSections.innerHTML = rows
      .map(([label, title, text, image, order, link, linkText, status, model, boxes], index) => {
        const id = `pagina-${index + 1}-${slugify(label || title)}`;
        if (model === "patrocinio") {
          const cards = parseCardRows(boxes).length ? parseCardRows(boxes) : [
            ["nome patrocinio", "text adicional", image],
            ["nome patrocinio", "text adicional", image],
            ["nome patrocinio", "text adicional", image],
            ["nome patrocinio", "text adicional", image],
          ];
          return `
            <section class="section reveal sponsor-public-section" id="${id}" data-dynamic-public-section style="order:${sectionOrder(order, 5 + index)}">
              <div class="section-head">
                ${label ? `<p class="eyebrow">${label}</p>` : ""}
                <h2>${title || label || "Patrocinio"}</h2>
                ${text ? `<p>${text}</p>` : ""}
              </div>
              <div class="sponsor-card-grid">
                ${cards.map(([name, description, logo]) => `
                  <article class="sponsor-card">
                    <div class="sponsor-logo">
                      ${logo ? `<img src="${logo}" alt="${name}" />` : `<span>logo</span>`}
                    </div>
                    <div>
                      <h3>${name || "nome patrocinio"}</h3>
                      <p>${description || "text adicional"}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            </section>
          `;
        }
        return `
          <section class="section reveal custom-public-section" id="${id}" data-dynamic-public-section style="order:${sectionOrder(order, 5 + index)}">
            <div class="section-head">
              ${label ? `<p class="eyebrow">${label}</p>` : ""}
              <h2>${title || label || "Pagina"}</h2>
              ${text ? `<p>${text}</p>` : ""}
            </div>
            <article class="custom-block-card">
              ${image ? `<img src="${image}" alt="${title || label}" />` : ""}
              <div>
                ${status ? `<span>${status}</span>` : ""}
                ${link && linkText ? `<a class="button secondary" href="${normalizeUrl(link)}">${linkText}</a>` : ""}
              </div>
            </article>
          </section>
        `;
      })
      .join("");
  }

  renderPublicTeam();
}

function renderPublicTeam() {
  const grids = document.querySelectorAll("#publicMembers, #memberGrid");
  if (!grids.length) return;

  const cards = getPublicContent().members
    .map((row) => {
      const member = normalizePublicMember(row);
      return `
        <article class="member-card team-person-card ${isInactiveStatus(member.status) ? "is-inactive" : ""}">
          <div class="member-photo team-person-photo">
            <img src="${member.image}" alt="${member.name}" />
          </div>
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
              <a class="person-details" href="${normalizeUrl("mais.html")}">Detalhes</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  grids.forEach((grid) => {
    grid.innerHTML = cards;
  });
}

function setupMobileMenu() {
  const button = document.querySelector(".header-menu-button, .nav-toggle");
  const menu = document.querySelector("#publicMenu");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    if (button.contains(event.target) || menu.contains(event.target)) return;
    button.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  });
}

function setupAccountPhoto() {
  const entry = document.querySelector(".account-entry");
  const image = document.querySelector("#accountPhoto");
  if (!entry || !image) return;

  const session = JSON.parse(localStorage.getItem("cyber_session") || "null");
  if (!session?.picture) return;

  image.src = session.picture;
  image.hidden = false;
  entry.classList.add("has-photo");
  entry.setAttribute("aria-label", `Conta de ${session.name || session.email || "usuario"}`);
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".site-nav a[href^='#'], .public-nav nav a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupCarouselControls() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.scrollTarget}`);
      if (!target) return;
      const direction = Number(button.dataset.scrollDirection || 1);
      const isMobile = window.matchMedia("(max-width: 560px)").matches;
      target.scrollBy({
        left: direction * (isMobile ? target.clientWidth : Math.max(target.clientWidth * 0.82, 240)),
        behavior: "smooth",
      });
    });
  });
}

function setupMediaCarousels() {
  document.querySelectorAll("[data-media-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-media-slide]")];
    if (slides.length <= 1) return;
    let index = 0;

    const showSlide = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
    };

    carousel.querySelectorAll("[data-media-direction]").forEach((button) => {
      button.addEventListener("click", () => {
        showSlide(index + Number(button.dataset.mediaDirection || 1));
      });
    });

    setInterval(() => {
      if (document.hidden || carousel.matches(":hover")) return;
      showSlide(index + 1);
    }, 4200);
  });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal, .feature-grid article, .project-showcase article, .event-card, .member-card");
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

function setupHeroMotion() {
  const hero = document.querySelector(".landing-hero");
  const visual = document.querySelector(".hero-visual");
  if (!hero || !visual || window.matchMedia("(pointer: coarse)").matches) return;

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visual.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });

  hero.addEventListener("pointerleave", () => {
    visual.style.transform = "";
  });
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Enviando chamado...";
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      payload.source = "contato";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      form.reset();
      status.textContent = data.message || "Mensagem enviada.";
    } catch (error) {
      status.textContent = "Nao foi possivel enviar agora.";
    }
  });
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

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

function runSetup(name, setup) {
  try {
    setup();
  } catch (error) {
    console.error(`Falha ao iniciar ${name}:`, error);
  }
}

async function initPublicSite() {
  document.body.classList.add("js-ready");
  runSetup("conteudo publico", renderPublicContent);
  await loadPublicContentFromApi();
  runSetup("conteudo publico remoto", renderPublicContent);
  runSetup("menu mobile", setupMobileMenu);
  runSetup("foto da conta", setupAccountPhoto);
  runSetup("menu ativo", setupActiveNav);
  runSetup("carrosseis", setupCarouselControls);
  runSetup("galerias", setupMediaCarousels);
  runSetup("animacoes", setupRevealAnimations);
  runSetup("hero", setupHeroMotion);
  runSetup("contato", setupContactForm);
  runSetup("pwa", registerServiceWorker);
}

initPublicSite();
