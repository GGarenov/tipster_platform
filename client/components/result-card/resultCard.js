document.addEventListener("DOMContentLoaded", async () => {
  const tipsCard = document.getElementById("result-card");

  const html = await fetch("/components/result-card/resultCard.html").then(
    (res) => res.text()
  );
  tipsCard.innerHTML = html;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/components/result-card/resultCard.css";
  document.head.appendChild(link);
});
