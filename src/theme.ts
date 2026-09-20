const THEME_KEY = "fz:theme";

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle");

function isDark(): boolean {
  return root.getAttribute("data-theme") === "dark";
}

function syncToggle(button: HTMLButtonElement): void {
  const dark = isDark();
  button.setAttribute("aria-pressed", String(dark));
  button.setAttribute(
    "aria-label",
    dark ? "Mudar para tema claro" : "Mudar para tema escuro",
  );
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    syncToggle(toggle);
  });
  syncToggle(toggle);
}
