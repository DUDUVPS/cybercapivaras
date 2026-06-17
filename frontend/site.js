const API_URL = window.location.origin;

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
    ["Robo Seguidor de Linha", "Robo autonomo com sensores infravermelhos para seguir trajetos com precisao.", "imgs/20250618_104600.jpg", "Arduino, C/C++, sensores IR, ponte H", "Em testes"],
    ["Robo Explorador", "Prototipo movel para desvio de obstaculos e leitura de ambiente.", "assets/hero-robotica.png", "ESP32, sensores ultrassonicos, motores DC", "Prototipo"],
    ["Painel de Telemetria", "Interface para acompanhar estado, sensores e registros dos prototipos.", "imgs/bg-site.png", "HTML, CSS, JavaScript, GitHub", "Em desenvolvimento"],
    ["Pecas 3D", "Modelagem e impressao de suportes, carenagens e estruturas para robos.", "imgs/fotos/ft-isadorah.png", "Modelagem 3D, impressao 3D, prototipagem", "Ativo"],
  ],
  events: [
    ["Torneio Interno de Robotica", "2026", "Campos Belos", "1o lugar", "imgs/20250618_104600.jpg", "Competicao de prototipos autonomos e apresentacao tecnica."],
    ["Feira de Tecnologia", "2026", "IF Goiano", "Participacao", "assets/hero-robotica.png", "Exposicao de projetos, testes de robo e demonstracao para visitantes."],
    ["Mostra de Projetos", "2025", "Campus Campos Belos", "Apresentacao", "imgs/bg-site.png", "Apresentacao dos primeiros prototipos e organizacao da equipe."],
  ],
  customBlocks: [
    ["Destaque do mes", "Use esta caixa para divulgar uma novidade, chamada ou aviso importante.", "", "Novo", "#contato", "Falar com o time", "Destaque"],
  ],
  headerLinks: [
    ["Equipe", "equipe.html"],
    ["Projetos", "#projetos"],
    ["Eventos", "#eventos"],
    ["Contato", "#contato"],
    ["Entrar no app", "login.html"],
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

function getPublicContent() {
  return { ...publicContent, members: publicTeam, ...JSON.parse(localStorage.getItem("cyber_site_content") || "{}") };
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

function renderPublicContent() {
  const content = getPublicContent();

  document.querySelectorAll("[data-content]").forEach((node) => {
    node.textContent = content[node.dataset.content] || "";
  });

  document.querySelectorAll("[data-image-content]").forEach((node) => {
    const value = content[node.dataset.imageContent];
    if (value) node.src = value;
  });

  document.querySelectorAll("[data-placeholder-content]").forEach((node) => {
    const value = content[node.dataset.placeholderContent];
    if (value) node.placeholder = value;
  });

  document.querySelectorAll("[data-link-content]").forEach((node) => {
    const value = content[node.dataset.linkContent];
    if (value) node.href = value;
  });

  document.querySelectorAll("[data-public-section]").forEach((section) => {
    const key = `show${section.dataset.publicSection}Section`;
    section.hidden = content[key] === false;
  });

  document.querySelectorAll("[data-link-list]").forEach((node) => {
    const links = content[node.dataset.linkList] || [];
    node.innerHTML = links.map(([label, url]) => `<a href="${url || "#"}">${label}</a>`).join("");
  });

  document.querySelectorAll("[data-social-list]").forEach((node) => {
    const links = content[node.dataset.socialList] || [];
    node.innerHTML = links
      .map(([label, url, icon]) => `
        <a href="${url || "#"}" aria-label="${label}">
          ${icon ? `<img src="${icon}" alt="" />` : `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" /></svg>`}
        </a>
      `)
      .join("");
  });

  const areas = document.querySelector("#publicAreas");
  if (areas) {
    areas.innerHTML = content.areas
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
    projects.innerHTML = content.projects
      .map(
        (row) => {
          const [title, text, image, tech = "Robotica educacional"] = row;
          const status = row.length >= 6 ? row[5] : row[4] || "Ativo";
          return `
          <article>
            <img src="${image}" alt="${title}" />
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
    events.innerHTML = (content.events || [])
      .map(
        (row) => {
          const [name, date, place, result] = row;
          const hasImage = row[4] && (/^(data:image|https?:\/\/|imgs\/|assets\/)/.test(row[4]) || /\.(png|jpe?g|webp|gif|ico|svg)$/i.test(row[4]));
          const image = hasImage ? row[4] : "";
          const text = hasImage ? row[5] : row[4];
          return `
          <article class="event-card">
            ${image ? `<img src="${image}" alt="${name}" />` : ""}
            <div>
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

  const customBlocks = document.querySelector("#publicCustomBlocks");
  if (customBlocks) {
    customBlocks.innerHTML = (content.customBlocks || [])
      .map(
        ([title, text, image, label, link, linkText, status]) => `
          <article class="custom-block-card">
            ${image ? `<img src="${image}" alt="${title}" />` : ""}
            <div>
              ${label ? `<span>${label}</span>` : ""}
              <h3>${title}</h3>
              <p>${text}</p>
              ${status ? `<small>${status}</small>` : ""}
              ${link && linkText ? `<a class="button secondary" href="${link}">${linkText}</a>` : ""}
            </div>
          </article>
        `
      )
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
        <article class="member-card team-person-card">
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
              <a class="person-details" href="mais.html">Detalhes</a>
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

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal, .feature-grid article, .project-showcase article, .member-card");
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

document.body.classList.add("js-ready");
renderPublicContent();
setupMobileMenu();
setupAccountPhoto();
setupActiveNav();
setupRevealAnimations();
setupHeroMotion();
setupContactForm();
registerServiceWorker();
