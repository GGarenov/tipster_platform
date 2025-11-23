document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.getElementById("navbar-container");

  // Зареждаме navbar HTML-а
  const html = await fetch("/components/navbar/navbar.html").then((res) =>
    res.text()
  );
  navbarContainer.innerHTML = html;

  // Зареждаме CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/navbar/navbar.css";
  document.head.appendChild(link);

  // ----- AUTH LOGIC -----
  const logoutBtn = document.getElementById("logoutBtn");
  const authWrapper = document.getElementById("nav-auth");

  const token = localStorage.getItem("token");

  if (token) {
    // скриваме Register / Login
    authWrapper.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }

  logoutBtn?.addEventListener("click", async () => {
    localStorage.removeItem("token");

    // по желание и fetch към backend `/logout`

    window.location.href = "/index.html";
  });
});
