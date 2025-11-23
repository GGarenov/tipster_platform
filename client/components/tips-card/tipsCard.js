document.addEventListener("DOMContentLoaded", async () => {
  const tipsCard = document.getElementById("tips-card");

  const html = await fetch("/components/tips-card/tipsCard.html").then((res) =>
    res.text()
  );
  tipsCard.innerHTML = html;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/tips-card/tipsCard.css";
  document.head.appendChild(link);
});
