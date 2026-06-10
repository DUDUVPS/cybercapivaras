const API_URL = window.location.origin;

const publicContent = {
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
    ["Robo Explorador", "Prototipo movel para desvio de obstaculos e testes de ambiente.", "assets/hero-robotica.png"],
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
  ["Eduardo Souza", "Capitao", "imgs/fotos/ft-alceu.png"],
  ["Allen Sena", "Lider tecnico", "imgs/fotos/ft-allem.png"],
  ["Ana Julia Maia", "Documentacao", "imgs/fotos/ft-naju.png"],
  ["Renata Miranda", "Marketing", "imgs/fotos/ft-renata.png"],
  ["Andre Wild", "Programacao", "imgs/fotos/ft-andre.png"],
  ["Allisson Beltrao", "Mecanica", "imgs/fotos/ft-beltrao.png"],
  ["Isadorah Araujo", "Design 3D", "imgs/fotos/ft-isadorah.png"],
  ["Marcelo Brandao", "Membro", "imgs/fotos/ft-marcelo.png"],
];

function getPublicContent() {
  return { ...publicContent, ...JSON.parse(localStorage.getItem("cyber_site_content") || "{}") };
}

function renderPublicContent() {
  const content = getPublicContent();

  document.querySelectorAll("[data-content]").forEach((node) => {
    node.textContent = content[node.dataset.content] || "";
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
        ([title, text, image]) => `
          <article>
            <img src="${image}" alt="${title}" />
            <div>
              <h3>${title}</h3>
              <p>${text}</p>
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

  const cards = publicTeam
    .map(([name, role, image]) => {
      const [level, description] = publicRoleProfiles[role] || publicRoleProfiles.Membro;
      return `
        <article class="member-card">
          <div class="member-photo">
            <img src="${image}" alt="${name}" />
          </div>
          <div class="member-info">
            <span>${level}</span>
            <h3>${name}</h3>
            <strong>${role}</strong>
            <p>${description}</p>
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
  const button = document.querySelector(".nav-toggle");
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
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".public-nav nav a[href^='#']")];
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
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      form.reset();
      status.textContent = data.message || "Chamado enviado para o app.";
    } catch (error) {
      status.textContent = "Nao foi possivel enviar agora.";
    }
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
setupActiveNav();
setupRevealAnimations();
setupHeroMotion();
setupContactForm();
registerServiceWorker();
