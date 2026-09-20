"use strict";
const DEVTO_API_URL = "https://dev.to/api/articles?username=fazedordecodigo&per_page=3";
const ROW_CLASS = "mat-row";
const SELECTORS = {
    card: ".materiais",
    row: `.${ROW_CLASS}`,
    moreLink: ".mat-more",
    year: "year",
};
const TAG_LABEL = "Artigo";
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function isDevToArticle(value) {
    return (isRecord(value) &&
        typeof value.title === "string" &&
        typeof value.url === "string" &&
        (value.description === undefined || typeof value.description === "string"));
}
function parseArticles(payload) {
    return Array.isArray(payload) ? payload.filter(isDevToArticle) : [];
}
async function fetchArticles(fetchFn = fetch) {
    try {
        const response = await fetchFn(DEVTO_API_URL);
        if (!response.ok)
            return null;
        return parseArticles(await response.json());
    }
    catch {
        return null;
    }
}
function createArticleRow(article) {
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
function renderArticles(card, articles) {
    card.querySelectorAll(SELECTORS.row).forEach((row) => row.remove());
    const moreLink = card.querySelector(SELECTORS.moreLink);
    for (const article of articles) {
        card.insertBefore(createArticleRow(article), moreLink);
    }
}
async function loadArticles() {
    const card = document.querySelector(SELECTORS.card);
    if (!card)
        return;
    const articles = await fetchArticles();
    if (!articles || articles.length === 0)
        return;
    renderArticles(card, articles);
}
function setFooterYear() {
    const yearEl = document.getElementById(SELECTORS.year);
    if (yearEl)
        yearEl.textContent = String(new Date().getFullYear());
}
void loadArticles();
setFooterYear();
