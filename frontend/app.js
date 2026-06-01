const API_URL = "http://localhost:3000";

const team = [
  {
    name: "Eduardo",
    role: "Programação",
    description: "Responsável pelo código, lógica dos robôs e integração com sensores.",
    initials: "ED",
  },
  {
    name: "João",
    role: "Mecânica",
    description: "Cuida da estrutura, montagem, ajustes de chassi e testes de resistência.",
    initials: "JO",
  },
  {
    name: "Maria",
    role: "Eletrônica",
    description: "Trabalha com motores, placas, circuitos, alimentação e sensores.",
    initials: "MA",
  },
  {
    name: "Ana",
    role: "Design 3D",
    description: "Modela peças, suportes e soluções para impressão 3D.",
    initials: "AN",
  },
  {
    name: "Lucas",
    role: "Documentação",
    description: "Registra decisões, resultados, diagramas e evolução dos projetos.",
    initials: "LU",
  },
  {
    name: "Beatriz",
    role: "Marketing",
    description: "Organiza posts, fotos, identidade visual e comunicação do time.",
    initials: "BE",
  },
];

const projects = [
  {
    name: "Robô Seguidor de Linha",
    tag: "Autônomo",
    description: "Robô criado para seguir uma linha no chão usando sensores infravermelhos.",
    objective: "Desenvolver navegação autônoma sem controle manual.",
    result: "Protótipo funcional em fase de ajuste fino.",
    tech: ["Arduino", "Sensor IR", "Motor DC", "Ponte H", "C/C++"],
    initials: "SL",
  },
  {
    name: "Braço Robótico",
    tag: "Controle",
    description: "Sistema com servo motores para movimentação de garra e articulações.",
    objective: "Aprender controle de movimento e precisão mecânica.",
    result: "Controle por potenciômetros e testes com programação.",
    tech: ["Servo", "Arduino", "PWM", "Impressão 3D"],
    initials: "BR",
  },
  {
    name: "Robô Explorador",
    tag: "Sensores",
    description: "Protótipo móvel para desviar de obstáculos e mapear trajetos simples.",
    objective: "Criar um robô capaz de tomar decisões com base no ambiente.",
    result: "Testes de desvio e leitura de distância em andamento.",
    tech: ["ESP32", "Ultrassônico", "Python", "Motores"],
    initials: "EX",
  },
];

const gallery = [
  { title: "Montagem do chassi", category: "montagem", initials: "MC" },
  { title: "Teste de sensores", category: "testes", initials: "TS" },
  { title: "Feira de tecnologia", category: "eventos", initials: "FT" },
  { title: "Protótipo inicial", category: "prototipos", initials: "PI" },
  { title: "Bancada de eletrônica", category: "montagem", initials: "BE" },
  { title: "Treino de percurso", category: "testes", initials: "TP" },
  { title: "Apresentação do time", category: "eventos", initials: "AT" },
  { title: "Peça impressa em 3D", category: "prototipos", initials: "3D" },
];

const technologies = [
  "Arduino",
  "ESP32",
  "Sensores",
  "Motores",
  "Impressão 3D",
  "Modelagem 3D",
  "Eletrônica",
  "C/C++",
  "Python",
  "HTML/CSS",
  "JavaScript",
  "Git/GitHub",
];

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const teamGrid = document.querySelector("#teamGrid");
const projectGrid = document.querySelector("#projectGrid");
const galleryGrid = document.querySelector("#galleryGrid");
const techCloud = document.querySelector("#techCloud");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function renderTeam() {
  teamGrid.innerHTML = team
    .map(
      (member) => `
        <article class="team-card">
          <div class="avatar"><span>${member.initials}</span></div>
          <div class="card-body">
            <span class="role">${member.role}</span>
            <h3>${member.name}</h3>
            <p>${member.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <div class="project-visual"><span>${project.initials}</span></div>
          <div class="card-body">
            <span class="tag">${project.tag}</span>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Objetivo:</strong> ${project.objective}</p>
            <p><strong>Resultado:</strong> ${project.result}</p>
            <ul class="tech-list">
              ${project.tech.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");
}

function renderGallery(category = "todos") {
  const items = category === "todos" ? gallery : gallery.filter((item) => item.category === category);

  galleryGrid.innerHTML = items
    .map(
      (item) => `
        <article class="gallery-item" data-category="${item.category}">
          <span>${item.initials}</span>
          <strong>${item.title}</strong>
        </article>
      `
    )
    .join("");
}

function renderTechnologies() {
  techCloud.innerHTML = technologies.map((technology) => `<span>${technology}</span>`).join("");
}

function setupMenu() {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupGalleryFilters() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderGallery(button.dataset.filter);
    });
  });
}

function setupContactForm() {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "Enviando...";

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Não foi possível enviar a mensagem.");
      }

      contactForm.reset();
      formStatus.textContent = data.message;
    } catch (error) {
      formStatus.textContent = "Backend indisponível. Configure a URL do Railway ou rode o servidor local.";
    }
  });
}

renderTeam();
renderProjects();
renderGallery();
renderTechnologies();
setupMenu();
setupGalleryFilters();
setupContactForm();
