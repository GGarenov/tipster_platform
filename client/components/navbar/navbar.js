document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.getElementById("navbar-container");

  // 1. Зареждаме HTML template
  const html = await fetch("/components/navbar/navbar.html").then((res) =>
    res.text()
  );
  navbarContainer.innerHTML = html;

  // 2. Добавяме CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/navbar/navbar.css";
  document.head.appendChild(link);

  // 3. Проверка дали user е логнат
  let isLoggedIn = false;
  let user = null;

  try {
    const res = await fetch("http://localhost:3000/api/auth/check-auth", {
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      isLoggedIn = true;
      user = data.user;
    }
  } catch (error) {
    console.log("Auth check failed:", error);
  }

  const loginLink = document.getElementById("nav-login");
  const registerLink = document.getElementById("nav-register");
  const profileLink = document.getElementById("nav-profile");
  const logoutLink = document.getElementById("nav-logout");

  if (isLoggedIn) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";

    profileLink.style.display = "block";
    logoutLink.style.display = "block";

    profileLink.textContent = `My profile (${user?.userName || ""})`;
  } else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";

    profileLink.style.display = "none";
    logoutLink.style.display = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", async () => {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/";
    });
  }
});
