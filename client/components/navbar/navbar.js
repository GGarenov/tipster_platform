document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) return;

  // 1. Load navbar HTML
  try {
    const html = await fetch("/components/navbar/navbar.html").then((res) =>
      res.text()
    );
    navbarContainer.innerHTML = html;
  } catch (err) {
    console.error("Failed to load navbar", err);
    return;
  }

  // 2. Add CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/navbar/navbar.css";
  document.head.appendChild(link);

  // 3. Now get elements (they exist only after innerHTML)
  const loginLink = document.getElementById("nav-login");
  const registerLink = document.getElementById("nav-register");
  const profileLink = document.getElementById("nav-profile");
  const logoutLink = document.getElementById("nav-logout");

  // Initially hide everything (safe default)
  if (loginLink) loginLink.style.display = "none";
  if (registerLink) registerLink.style.display = "none";
  if (profileLink) profileLink.style.display = "none";
  if (logoutLink) logoutLink.style.display = "none";

  // 4. Now check authentication
  let isLoggedIn = false;
  let user = null;

  try {
    const res = await fetch("http://localhost:3000/api/auth/check-auth", {
      credentials: "include",
    });

    const data = await res.json();

    if (data.success && data.user) {
      isLoggedIn = true;
      user = data.user;
    }
  } catch (error) {
    console.log("Auth check failed:", error);
  }

  // 5. Now update visibility based on auth state
  if (isLoggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (profileLink) {
      profileLink.style.display = "block";
      profileLink.textContent = `My profile (${user?.userName || "User"})`;
    }
    if (logoutLink) logoutLink.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (registerLink) registerLink.style.display = "block";
    if (profileLink) profileLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";
  }

  // 6. Logout handler
  if (logoutLink) {
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    });
  }
});
