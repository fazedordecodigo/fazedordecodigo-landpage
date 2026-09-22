# Fazedor de Código — Landing Page

Landing page da comunidade **Fazedor de Código**, uma comunidade de aprendizado mão na massa: encontros mensais, projetos em grupo e mentoria aberta. O lema é simples — _aprenda fazendo_.

## O que tem aqui

| Arquivo      | Descrição                                         |
| ------------ | ------------------------------------------------- |
| `index.html` | A landing page (somente marcação)                 |
| `css/`       | Estilos separados por responsabilidade            |
| `assets/`    | Imagens e logo (`logo.svg`, `hero-capivara.webp`) |

Sem dependências de npm — HTML + CSS estáticos, com o JS de `src/` compilado via `npx -p typescript tsc`:

- `css/tokens.css` — tokens de design em `:root` (cores, tipografia, espaçamentos, sombras)
- `css/base.css` — reset, estilos base e tipografia
- `css/layout.css` — primitivas de layout (`.container`, `.section`, `.stack`, `.row`, grids)
- `css/components.css` — componentes reutilizáveis (nav, footer, botões, cards, chips, tags)
- `css/sections.css` — estilos por seção da página (hero, encontros, steps, materiais, cta)
- Fontes via Google Fonts (Space Grotesk, Inter, JetBrains Mono)

## Como abrir

Servindo localmente (necessário — os CSS são arquivos externos):

```sh
python3 -m http.server 8000
# → http://localhost:8000/
```

## Estrutura da página

- **Hero** — proposta de valor + CTAs
- **Encontros** (`#encontros`) — agenda mensal: Deploy sem medo, Mutirão de portfólios, Clube do rubber duck, Bot da comunidade
- **Como funciona** (`#como-funciona`) — o ciclo em 3 passos: traga uma ideia, construa em dupla, publique junto
- **Materiais** (`#materiais`) — guias e projetos da comunidade
- **FAQ** (`#faq`) — perguntas frequentes sobre a comunidade
- **Contato** (`#contato`) — formulário de contato (Web3Forms + hCaptcha)
- **CTA** (`#cta`) — chamada para participar
- **Footer** — redes sociais (X, LinkedIn, Instagram, Substack, DEV)

## Formulário de contato

O formulário da seção `#contato` usa o serviço [Web3Forms](https://web3forms.com) para enviar as mensagens por e-mail, sem backend próprio. Para ativar:

1. Crie uma access key em https://web3forms.com com o e-mail da comunidade.
2. No GitHub, em Settings → Secrets and variables → Actions, crie o secret `WEB3FORMS_ACCESS_KEY` com a chave. O workflow de deploy substitui o placeholder `YOUR_WEB3FORMS_ACCESS_KEY` do `index.html` automaticamente no build — o HTML no repositório continua com o placeholder.
3. No painel do Web3Forms, ative o hCaptcha em "Block Spam" — obrigatório para o captcha do formulário ser validado.

Enquanto a access key não estiver configurada, o envio é bloqueado no cliente com a mensagem "Formulário ainda não configurado.". Para testar localmente, substitua o placeholder temporariamente no `index.html` sem commitar.

A access key do Web3Forms é pública por design — ela só permite enviar e-mails para o endereço cadastrado. O secret existe para manter a chave fora do repositório e facilitar rotação, não como proteção de credencial.

## Customizando

Os estilos vivem nos tokens CSS em `css/tokens.css` (`:root`). Mudou `--accent`, `--bege` ou os `--fs-*`, a página inteira acompanha. Cada seção tem um `data-od-id` que facilita localizar o bloco correspondente no CSS e no HTML.
