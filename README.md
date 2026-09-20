# Fazedor de Código — Landing Page

Landing page da comunidade **Fazedor de Código**, uma comunidade de aprendizado mão na massa: encontros semanais, projetos em grupo e mentoria aberta. O lema é simples — _aprenda fazendo_.

## O que tem aqui

| Arquivo      | Descrição                                         |
| ------------ | ------------------------------------------------- |
| `index.html` | A landing page (somente marcação)                 |
| `css/`       | Estilos separados por responsabilidade            |
| `assets/`    | Imagens e logo (`logo.svg`, `hero-capivara.webp`) |

Sem build, sem dependências de npm — HTML + CSS estáticos:

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
- **Encontros** (`#encontros`) — agenda semanal: Deploy sem medo, Mutirão de portfólios, Clube do rubber duck, Bot da comunidade
- **Como funciona** (`#como-funciona`) — o ciclo em 3 passos: traga uma ideia, construa em dupla, publique junto
- **Materiais** (`#materiais`) — guias e projetos da comunidade
- **CTA** (`#cta`) — chamada para participar
- **Footer** — redes sociais (X, LinkedIn, Instagram, Substack, DEV)

## Customizando

Os estilos vivem nos tokens CSS em `css/tokens.css` (`:root`). Mudou `--accent`, `--bege` ou os `--fs-*`, a página inteira acompanha. Cada seção tem um `data-od-id` que facilita localizar o bloco correspondente no CSS e no HTML.
