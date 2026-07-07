# CLAUDE.md

Site estático HTML/CSS/JS para **AlphaBull**. Sem build tools, sem framework, sem package manager — JS vanilla servido por paths relativos.

**Dev server:** VSCode Live Server. Abrir qualquer `index.html` da raiz.

> **Escopo:** dois funis rodando em paralelo — **DigiStore (`dg/`)** e **CartPanda (`cpda/`)** —, **sem AWS e sem cloaking**. Não há cloaking HMAC (`p/`) nem infra AWS (`infra/`, GitHub Actions de deploy).
>
> **`cpda/` é réplica de `dg/`** com **zero referências a Digistore24** (sem trusted badge, sem `digistore.js`/promopixel, sem links `checkout-ds24.com`, `class="cartpanda"` no body). Os pontos de integração viraram placeholders `PLACEHOLDER_CP_*` (ver abaixo). Os dois funis compartilham `assets/` e `lgl/`.

## Estrutura

```
dg/            # Funil DigiStore — vsl/ + dtc/ + thankyou, sem presell
  vsl/         # Video Sales Letter (sem player) + assets locais (img/, css/)
    upsell01/  # Upsell pós-compra do funil VSL (12 potes — $348)
    downsell01/# Downsell 1 do funil VSL (6 potes — $174)
    downsell02/# Downsell 2 do funil VSL (6 potes — $144)
  dtc/         # Direct-to-checkout
    upsell1/   # Upsell pós-compra (12 potes — $348)
    upsell01/  # Idem upsell1 — URL própria p/ config no DigiStore
    downsell1/ # Downsell (6 potes — $205.80)
    downsell01/# Downsell 1 (6 potes — $174)
    downsell02/# Downsell 2 (6 potes — $144)
  thankyou/    # Thank-you page
cpda/          # Funil CartPanda — réplica de dg/ sem Digistore24 (mesma estrutura)
lgl/           # 7 páginas legais (privacy/terms/refund/shipping/disclaimer/references/contact) — compartilhadas
assets/
  fav.png
  shared/css/  # cb-main.css, internal-pages.css
  shared/js/   # purchase-notifications.js, countdown.js, kits02.js, cpda-parameters.js, funnel-tracking.js
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
| `PLACEHOLDER_CP_DESCRIPTOR` | `cpda/thankyou` (JS de cobrança) | Descritor da fatura (substitui o token `DIGISTORE24`) |

> Script do CartPanda já incluído no `<head>` das 5 páginas: `cpsales.js` (`https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/cpsales.js`).

> ⚠️ **Fluxo de upsell/downsell**: o one-click do CartPanda funciona diferente do `digistoreUpsell()`/`/answer/yes` do Digistore — as páginas foram replicadas estruturalmente, mas a lógica one-click precisa ser configurada no painel do CartPanda. O parsing de pedido da `thankyou` também é específico do Digistore e precisa adaptação para CartPanda.

## DigiStore — IDs e links (preenchidos, funil `dg/` live-ready)

Não há mais placeholders em `dg/` — os IDs reais fornecidos pela Digistore24 (2026-07) já estão aplicados:

| ID/link | Oferta | Onde |
|---------|--------|------|
| `checkout-ds24.com/product/709132` | Main — 2 bottles | kit1 (`dg/vsl` + `dg/dtc`) |
| `checkout-ds24.com/product/709135` | Main — 3 bottles | kit2 (também é o `product_id` do `digistorePromocode`) |
| `checkout-ds24.com/product/709137` | Main — 6 bottles | kit3 |
| `checkout-ds24.com/answer/yes?template=light` | Botão YES (sem product id — 1 produto por página, o produto vem da config do funil no painel Digistore) | todas as páginas de upsell/downsell de `dg/` |
| `digistore24.com/answer/no` | Link NO THANKS | todas as páginas de upsell/downsell de `dg/` |

- `digistorePromocode({ product_id: 709135, adjust_all_urls: true, adjust_domain: true })` no `<head>` das duas páginas de venda (`dg/vsl`, `dg/dtc`) — código obrigatório da Digistore.
- `digistore.js` + `digistoreUpsell()` no `<head>` de todas as páginas de upsell/downsell.
- Afiliados usam os GET params `aff` (ID Digistore24) e `cam` (campanha) na página de vendas.
- A thank-you tem nota explícita de que a cobrança aparece como **DIGISTORE24** na fatura (exigência da Digistore).

> As VSLs não têm player de vídeo (Vturb/ConverteAI removido); a oferta é exibida direto, sem gating. Não há trusted badges da Digistore nas páginas.

## Pendências de branding (não eram VSL/DigiStore)

- **Domínio**: as URLs já usam `alphabull.shop` (`canonical`, `og:url`, `og:image`/`twitter:image` e paths absolutos).
- **E-mail de suporte**: `support@cartpanda.com` em todas as páginas (`mailto:` e texto das páginas de suporte/legais) — exigência de compliance da CartPanda. Não há logos de instituições/mídia nas páginas (NIH/Johns Hopkins/UCSF removidos pela mesma exigência).
- **Imagens de produto**: bottles de 2/3/6/12 potes e o `label.webp` já são arte AlphaBull. Upsell/downsell usam os mockups de 6 e 12 potes.
- **Paleta CSS** (em `:root` de [assets/shared/css/cb-main.css](assets/shared/css/cb-main.css)): primária `#072245` (navy), secundária/acento `#BC9631` (dourado), apoio `#203E66` (azul médio); neutros `#CECDD0` / `#C8C7CB` / `#B6B8BD`. CTAs de compra usam o gradiente dourado.

## Scripts compartilhados (`assets/shared/js/`)

| Script | Função |
|--------|--------|
| `purchase-notifications.js` | Pop-ups de "compra recente" (nomes/locations randoms). Usa paths absolutos (`/assets/...`) |
| `kits02.js` | Seleção de kit, persiste em localStorage |
| `cpda-parameters.js` | Propaga query params da URL pros links de checkout |
| `funnel-tracking.js` | Injeta funnel ID nas URLs de checkout |
| `countdown.js` | Timer de countdown |

## Padrões importantes

- **Profundidade de path** importa: `dg/vsl/index.html` usa paths absolutos (`/assets/...`). Scripts compartilhados que injetam HTML usam path absoluto.
- **Bootstrap 5** vendorado em `assets/vendor/bootstrap/` (não usar CDN).

## Deploy

Site estático — servir os arquivos por qualquer host estático (Netlify, Vercel, Cloudflare Pages, S3 simples, etc.). Não há pipeline de deploy configurado.
