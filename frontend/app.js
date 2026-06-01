const API_URL = window.location.origin;

const members = [
  {
    name: "Eduardo Souza",
    role: "Estudante / Desenvolvedor",
    generation: "1a Geracao Fabrica",
    photo: "imgs/post-1-fab.jpg",
    instagram: "https://www.instagram.com/duduptid/",
  },
  {
    name: "Allen Sena",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-allem.png",
  },
  {
    name: "Luiz Carlos",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-l-carlos.png",
  },
  {
    name: "Alceu Neto",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-alceu.png",
  },
  {
    name: "Allisson Beltrao",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-beltrao.png",
  },
  {
    name: "Ana Julia Maia",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-naju.png",
  },
  {
    name: "Renata Miranda",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-renata.png",
  },
  {
    name: "Isadorah Araujo",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-isadorah.png",
  },
  {
    name: "Andre Wild",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-andre.png",
  },
  {
    name: "Marcelo Brandao",
    role: "Estudante / Hardware",
    generation: "3a Geracao Fabrica",
    photo: "imgs/fotos/ft-marcelo.png",
  },
];

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
  const form = document.querySelector("#loginForm");
  const status = document.querySelector("#loginStatus");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.email || !data.password) {
      status.textContent = "Preencha e-mail e senha.";
      return;
    }

    localStorage.setItem("cybercapivaras_logged", "true");
    localStorage.setItem("cybercapivaras_user", data.email);
    window.location.href = "area-equipe.html";
  });
}

function protectInternalArea() {
  const isProtected = document.body.dataset.protected === "true";

  if (!isProtected) {
    return;
  }

  if (localStorage.getItem("cybercapivaras_logged") !== "true") {
    window.location.href = "login.html";
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
    window.location.href = "login.html";
  });
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
checkApiState();
