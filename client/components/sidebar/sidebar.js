document.addEventListener("DOMContentLoaded", async () => {
  const sidebarContainer = document.getElementById("sidebar-container");

  const html = await fetch("/components/sidebar/sidebar.html").then((res) =>
    res.text()
  );
  sidebarContainer.innerHTML = html;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/sidebar/sidebar.css";
  document.head.appendChild(link);
});
