# CLAUDE.md

Site estático HTML/CSS/JS para **AlphaBull**. Sem build tools, sem framework, sem package manager — JS vanilla servido por paths relativos.

**Dev server:** VSCode Live Server. Abrir qualquer `index.html` da raiz.

> **Escopo:** dois funis rodando em paralelo — **DigiStore (`dg/`)** e **CartPanda (`cpda/`)** —, **sem AWS e sem cloaking**. Não há cloaking HMAC (`p/`) nem infra AWS (`infra/`, GitHub Actions de deploy).
>
> **`cpda/` é réplica de `dg/`** com **zero referências a Digistore24** (sem trusted badge, sem `digistore.js`/promopixel, sem links `checkout-ds24.com`, `class="cartpanda"` no body). Os pontos de integração viraram placeholders `PLACEHOLDER_CP_*` (ver abaixo). Os dois funis compartilham `assets/` e `lgl/`.

## Estrutura

```
dg/            # Funil DigiStore — vsl/ + dtc/ + thankyou, sem presell
  vsl/         # Video Sales Letter (player Vturb) + assets locais (img/, css/)
  dtc/         # Direct-to-checkout
    upsell1/   # Upsell pós-compra
    downsell1/ # Downsell
  thankyou/    # Thank-you page
cpda/          # Funil CartPanda — réplica de dg/ sem Digistore24 (mesma estrutura)
lgl/           # 7 páginas legais (privacy/terms/refund/shipping/disclaimer/references/contact) — compartilhadas
assets/
  fav.png
  shared/css/  # cb-main.css, internal-pages.css
  shared/js/   # vturb.js, purchase-notifications.js, countdown.js, kits02.js, cpda-parameters.js, funnel-tracking.js
  shared/products/  # bottles-{2,3,6,12}.webp + small versions (2/3/6) + label.webp + cards
  shared/img/  # guarantee-badge.webp
  vendor/      # Bootstrap 5 vendorado (não-CDN)
index.html     # Redirect → /dg/dtc/
```

> Sem `infra/`, sem `p/`, sem cloaking HMAC. As VSLs são acessadas direto em `/dg/vsl/` e `/cpda/vsl/`.

### CartPanda — placeholders a preencher (em `cpda/`)

`cpda/` não tem nenhum ID/script CartPanda real — preencher antes de publicar:

| Placeholder | Onde | O que é |
|-------------|------|---------|
| `PLACEHOLDER_CP_CHECKOUT_KIT1/2/3` | `cpda/dtc` + `cpda/vsl` (`href` dos botões) | URL de checkout CartPanda por kit (2/3/6 potes) |
| `PLACEHOLDER_CP_UPSELL_ACCEPT` / `PLACEHOLDER_CP_UPSELL_DECLINE` | `cpda/dtc/upsell1` | Links aceitar/recusar do upsell |
| `PLACEHOLDER_CP_DOWNSELL_ACCEPT` / `PLACEHOLDER_CP_DOWNSELL_DECLINE` | `cpda/dtc/downsell1` | Links aceitar/recusar do downsell |
| `PLACEHOLDER_CP_TRACKING_SCRIPT` | `cpda/dtc` + `cpda/vsl` (comentário no `<head>`) | Onde entra o pixel/script de tracking do CartPanda |
| `PLACEHOLDER_CP_UPSELL_SCRIPT` | `cpda/dtc/upsell1` + `downsell1` (comentário) | Onde entra o script de one-click upsell do CartPanda |
| `PLACEHOLDER_CP_DESCRIPTOR` | `cpda/thankyou` (JS de cobrança) | Descritor da fatura (substitui o token `DIGISTORE24`) |

> ⚠️ **Fluxo de upsell/downsell**: o one-click do CartPanda funciona diferente do `digistoreUpsell()`/`/answer/yes` do Digistore — as páginas foram replicadas estruturalmente, mas a lógica one-click precisa ser configurada no painel do CartPanda. O parsing de pedido da `thankyou` também é específico do Digistore e precisa adaptação para CartPanda.

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

## Pendências de branding (não eram VSL/DigiStore)

- **Domínio**: as URLs já usam `alphabull.shop` (`canonical`, `og:url`, `og:image`/`twitter:image` e paths absolutos).
- **E-mail de suporte**: `contact@alphabull.shop` (em `mailto:` e texto das páginas de suporte/legais).
- **Imagens de produto**: bottles de 2/3/6/12 potes e o `label.webp` já são arte AlphaBull. Upsell/downsell usam os mockups de 6 e 12 potes.
- **Paleta CSS** (em `:root` de [assets/shared/css/cb-main.css](assets/shared/css/cb-main.css)): primária `#072245` (navy), secundária/acento `#BC9631` (dourado), apoio `#203E66` (azul médio); neutros `#CECDD0` / `#C8C7CB` / `#B6B8BD`. CTAs de compra usam o gradiente dourado.

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
