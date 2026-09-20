const DEVTO_USER = "fazedordecodigo";
const DEVTO_COUNT = 3;

async function loadArticles() {
  const card = document.querySelector(".materiais");
  if (!card) return;

  let articles;
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${DEVTO_USER}&per_page=${DEVTO_COUNT}`
    );
    if (!res.ok) return;
    articles = await res.json();
  } catch {
    return;
  }
  if (!Array.isArray(articles) || articles.length === 0) return;

  const rows = articles.map((article) => {
    const row = document.createElement("div");
    row.className = "mat-row";

    const body = document.createElement("div");
    const h3 = document.createElement("h3");
    const link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = article.title;
    h3.append(link);
    const desc = document.createElement("p");
    desc.textContent = article.description ?? "";
    body.append(h3, desc);

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "Artigo";

    row.append(body, tag);
    return row;
  });

  card.querySelectorAll(".mat-row").forEach((row) => row.remove());
  const more = card.querySelector(".mat-more");
  for (const row of rows) card.insertBefore(row, more);
}

loadArticles();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
