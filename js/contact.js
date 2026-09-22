"use strict";
const ACCESS_KEY_PLACEHOLDER = "YOUR_WEB3FORMS_ACCESS_KEY";
const FORM_SELECTORS = {
    form: "#contact-form",
    captcha: ".h-captcha",
    captchaResponse: 'textarea[name="h-captcha-response"]',
    accessKey: 'input[name="access_key"]',
    submitButton: 'button[type="submit"]',
    status: ".form-status",
};
const STATUS_TEXT = {
    captchaMissing: "Confirme o captcha antes de enviar.",
    notConfigured: "Formulário ainda não configurado.",
    success: "Mensagem enviada! Respondemos em breve.",
    failure: "Não foi possível enviar. Tente de novo ou fale com a gente no WhatsApp da comunidade.",
    sending: "Enviando…",
};
function isJsonRecord(value) {
    return typeof value === "object" && value !== null;
}
function setStatus(form, message, kind) {
    const status = form.querySelector(FORM_SELECTORS.status);
    if (!status)
        return;
    status.classList.remove("is-success", "is-error");
    status.classList.add(`is-${kind}`);
    status.textContent = message;
}
function syncCaptchaTheme(form) {
    const captcha = form.querySelector(FORM_SELECTORS.captcha);
    if (!captcha)
        return;
    captcha.dataset.theme =
        document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";
    captcha.dataset.lang = "pt";
}
function resetCaptcha() {
    window.hcaptcha?.reset();
}
async function submitForm(form) {
    const button = form.querySelector(FORM_SELECTORS.submitButton);
    const buttonLabel = button?.textContent ?? "";
    if (button) {
        button.disabled = true;
        button.textContent = STATUS_TEXT.sending;
    }
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
        });
        const payload = await response.json();
        if (response.ok && isJsonRecord(payload) && payload.success === true) {
            form.reset();
            setStatus(form, STATUS_TEXT.success, "success");
            resetCaptcha();
        }
        else {
            setStatus(form, STATUS_TEXT.failure, "error");
        }
    }
    catch {
        setStatus(form, STATUS_TEXT.failure, "error");
    }
    finally {
        if (button) {
            button.disabled = false;
            button.textContent = buttonLabel;
        }
    }
}
function onSubmit(event, form) {
    event.preventDefault();
    if (!form.reportValidity())
        return;
    const captchaResponse = form.querySelector(FORM_SELECTORS.captchaResponse)?.value;
    if (!captchaResponse) {
        setStatus(form, STATUS_TEXT.captchaMissing, "error");
        return;
    }
    const accessKey = form.querySelector(FORM_SELECTORS.accessKey)
        ?.value;
    if (!accessKey || accessKey === ACCESS_KEY_PLACEHOLDER) {
        setStatus(form, STATUS_TEXT.notConfigured, "error");
        return;
    }
    void submitForm(form);
}
function initContactForm() {
    const form = document.querySelector(FORM_SELECTORS.form);
    if (!form)
        return;
    syncCaptchaTheme(form);
    form.addEventListener("submit", (event) => onSubmit(event, form));
}
initContactForm();
