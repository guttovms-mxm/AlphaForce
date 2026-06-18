# CLAUDE.md

Site estático HTML/CSS/JS para **AlphaBull**. Sem build tools, sem framework, sem package manager — JS vanilla servido por paths relativos.

**Dev server:** VSCode Live Server. Abrir qualquer `index.html` da raiz.

> **Origem:** clone do [SolidusMax](https://github.com/guttovms-mxm/SolidusMax), reduzido a **apenas o funil DigiStore (`dg/`)** e **sem AWS/cloaking**. Os funis CartPanda (`cpda/`), o cloaking HMAC (`p/`) e toda a infra AWS (`infra/`, GitHub Actions de deploy) foram removidos.

## Estrutura

```
dg/            # Funil DigiStore (único funil) — vsl/ + dtc/ + thankyou, sem presell
  vsl/         # Video Sales Letter (player Vturb)
  dtc/         # Direct-to-checkout
    upsell1/   # Upsell pós-compra
    downsell1/ # Downsell
    downsell2/ # Downsell (só answer/yes?template=light)
  thankyou/    # Thank-you page
lgl/           # 7 páginas legais (privacy/terms/refund/shipping/disclaimer/references/contact)
assets/
  fav.png
  shared/css/  # cb-main.css, internal-pages.css
  shared/js/   # vturb.js, purchase-notifications.js, countdown.js, kits02.js, cpda-parameters.js, funnel-tracking.js
  shared/products/  # bottles-{2,3,6,9,12}.png + small versions + label.png + cards
  shared/img/  # logo.png
  vendor/      # Bootstrap 5 vendorado (não-CDN)
index.html     # Redirect → /dg/dtc/
```

> Sem `infra/`, sem `p/`, sem `cpda/`, sem cloaking HMAC. A VSL é acessada direto em `/dg/vsl/`.

## ⚠️ Placeholders a preencher

Todos os IDs reais de VSL e DigiStore foram substituídos por placeholders. Buscar por `PLACEHOLDER_` e preencher antes de publicar.

### VSL (Vturb) — em `dg/vsl/index.html`

| Placeholder | O que é |
|-------------|---------|
| `PLACEHOLDER_VSL_PLAYER_ID` | ID do player Vturb (usado em `VSL_WHITE_ID` e `VSL_BLACK_ID`) |
| `PLACEHOLDER_VSL_ACCOUNT_ID` | `VSL_ACCOUNT_ID` (conta Vturb/ConverteAI) |

### DigiStore — product IDs (URLs `checkout-ds24.com` + `digistorePromocode`)

| Placeholder | Oferta | Kit |
|-------------|--------|-----|
| `PLACEHOLDER_DG_PRODUCT_1` | Main — 2 bottles | kit1 (também usado no `product_id` do promopixel) |
| `PLACEHOLDER_DG_PRODUCT_2` | Main — 3 bottles | kit2 |
| `PLACEHOLDER_DG_PRODUCT_3` | Main — 6 bottles | kit3 |
| `PLACEHOLDER_DG_UPSELL_1` | Upsell1 — 6 bottles | kit1 |
| `PLACEHOLDER_DG_UPSELL_2` | Upsell1 — 9 bottles | kit2 |
| `PLACEHOLDER_DG_UPSELL_3` | Upsell1 — 12 bottles | kit3 |
| `PLACEHOLDER_DG_DOWNSELL_1` | Downsell1 — 6 bottles | kit1 |
| `PLACEHOLDER_DG_DOWNSELL_2` | Downsell1 — 9 bottles | kit2 |
| `PLACEHOLDER_DG_DOWNSELL_3` | Downsell1 — 12 bottles | kit3 |

> Downsell2 usa só `answer/yes?template=light` (sem product id).

### DigiStore — trusted badges

| Placeholder | Onde |
|-------------|------|
| `PLACEHOLDER_DG_BADGE_SALES_ID` / `PLACEHOLDER_DG_BADGE_SALES_HASH` | Badge `salespage` (vsl, dtc, upsell1, downsell1, downsell2) |
| `PLACEHOLDER_DG_BADGE_THANKYOU_ID` / `PLACEHOLDER_DG_BADGE_THANKYOU_HASH` | Badge `thankyoupage` (thankyou) |

## Pendências de branding (não eram VSL/DigiStore — herdadas do SolidusMax)

- **Nome da marca**: `SolidusMax`/`SOLIDUSMAX`/keyword `solidusmax` já foram todos trocados por `AlphaBull` no copy, meta tags, textos legais e na chave de localStorage (`alphabull_cta_displayed`). Sem resíduos de SolidusMax no código.
- **Domínio**: AlphaBull ainda não tem domínio. `canonical`, `og:url`, `og:image`/`twitter:image` e paths absolutos usam o placeholder **`PLACEHOLDER_DOMAIN`** (ex: `https://PLACEHOLDER_DOMAIN/dg/dtc/`) — preencher quando o domínio existir.
- **E-mail de suporte**: `contact@alphabull.shop` (em `mailto:` e texto das páginas de suporte/legais).
- `logo.png` (header) e os mockups de **9/12 potes** (upsell/downsell) ainda são imagens do SolidusMax — trocar por arte do AlphaBull. O label do footer e os potes de 2/3/6 já são AlphaBull.
- **Paleta CSS** (em `:root` de [assets/shared/css/cb-main.css](assets/shared/css/cb-main.css)): primária `#072245` (navy), secundária/acento `#BC9631` (dourado), apoio `#203E66` (azul médio); neutros `#CECDD0` / `#C8C7CB` / `#B6B8BD`. CTAs de compra usam o gradiente dourado.
- As fontes do Bootstrap Icons (`assets/vendor/bootstrap/fonts/bootstrap-icons.woff2`/`.woff`) e os assets `guarantee-badge.png`, `badges/certifications.png` e `dynamic-upsell.js` foram restaurados do BurnForce (vinham faltando no SolidusMax de origem).

## Scripts compartilhados (`assets/shared/js/`)

| Script | Função |
|--------|--------|
| `vturb.js` | Detecta CTA do player Vturb (poll `.smartplayer-anchor-button` a cada 500ms), revela `.esconder` quando visível |
| `purchase-notifications.js` | Pop-ups de "compra recente" (nomes/locations randoms). Usa paths absolutos (`/assets/...`) |
| `kits02.js` | Seleção de kit, persiste em localStorage |
| `cpda-parameters.js` | Propaga query params da URL pros links de checkout |
| `funnel-tracking.js` | Injeta funnel ID nas URLs de checkout |
| `countdown.js` | Timer de countdown |

## Padrões importantes

- **Profundidade de path** importa: `dg/vsl/index.html` usa paths absolutos (`/assets/...`). Scripts compartilhados que injetam HTML usam path absoluto.
- **Bootstrap 5** vendorado em `assets/vendor/bootstrap/` (não usar CDN).
- **Erros de Vturb em localhost** são esperados (CORS, license) — só funciona em produção com o domínio real.

## Deploy

Site estático — servir os arquivos por qualquer host estático (Netlify, Vercel, Cloudflare Pages, S3 simples, etc.). Não há pipeline de deploy configurado.
