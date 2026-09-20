const DEVTO_API_URL =
  "https://dev.to/api/articles?username=fazedordecodigo&per_page=3";

const ROW_CLASS = "mat-row";

const SELECTORS = {
  card: ".materiais",
  row: `.${ROW_CLASS}`,
  moreLink: ".mat-more",
  year: "year",
} as const;

const TAG_LABEL = "Artigo";

interface DevToArticle {
  readonly title: string;
  readonly url: string;
  readonly description?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDevToArticle(value: unknown): value is DevToArticle {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.url === "string" &&
    (value.description === undefined || typeof value.description === "string")
  );
}

function parseArticles(payload: unknown): DevToArticle[] {
  return Array.isArray(payload) ? payload.filter(isDevToArticle) : [];
}

async function fetchArticles(
  fetchFn: typeof fetch = fetch,
): Promise<DevToArticle[] | null> {
  try {
    const response = await fetchFn(DEVTO_API_URL);
    if (!response.ok) return null;
    return parseArticles(await response.json());
  } catch {
    return null;
  }
}

function createArticleRow(article: DevToArticle): HTMLElement {
  const row = document.createElement("div");
  row.className = ROW_CLASS;

  const body = document.createElement("div");
  const heading = document.createElement("h3");
  const link = document.createElement("a");
  link.href = article.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = article.title;
  heading.append(link);

  const description = document.createElement("p");
  description.textContent = article.description ?? "";
  body.append(heading, description);

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = TAG_LABEL;

  row.append(body, tag);
  return row;
}

function renderArticles(card: Element, articles: DevToArticle[]): void {
  card.querySelectorAll(SELECTORS.row).forEach((row) => row.remove());
  const moreLink = card.querySelector(SELECTORS.moreLink);
  for (const article of articles) {
    card.insertBefore(createArticleRow(article), moreLink);
  }
}

async function loadArticles(): Promise<void> {
  const card = document.querySelector(SELECTORS.card);
  if (!card) return;

  const articles = await fetchArticles();
  if (!articles || articles.length === 0) return;

  renderArticles(card, articles);
}

function setFooterYear(): void {
  const yearEl = document.getElementById(SELECTORS.year);
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

void loadArticles();
setFooterYear();
