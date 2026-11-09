# DESIGN.md — Ca.Metal & Cameco

> Un sito solido come un piazzale di stoccaggio: verde bosco, giallo segnaletica, titoli condensati che si leggono da lontano.

## 1. Visual Theme & Atmosphere

**Style**: Industriale deciso (evoluzione di "Warm Professional" con i colori del marchio)
**Keywords**: industriale, affidabile, verde, segnaletica, concreto, ordinato, territoriale
**Tone**: serio, diretto, concreto — NOT giocoso, NOT high-tech, NOT lusso, NOT "eco-zen"
**Feel**: la cartellonistica di un impianto di recupero ben gestito: colori pieni, scritte grandi, niente fronzoli.

**Interaction Tier**: L1 sobrio (hover curati + dissolvenze in entrata)
**Dependencies**: solo CSS + JS nativo (nessuna libreria)

Fonti dei contenuti: esclusivamente i due volantini aziendali. I testi aggiuntivi (descrizioni estese dei servizi) restano fedeli ai volantini e vanno validati dal cliente.

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #ffffff;                 /* pagina */
  --surface: #ffffff;            /* card, moduli */
  --surface-alt: #f2f5ef;        /* sezioni alternate (verde-grigio caldo, mai grigio neutro) */
  --surface-hover: #e9efe5;      /* hover su superfici chiare */
  --dark: #0d361f;               /* bande scure, header card, hero */
  --dark-2: #134a2b;             /* hover su bande scure */
  --dark-3: #08251a;             /* footer */
  --map-land: #123f25;           /* mappa: terra */
  --map-sea: #0b2e1b;            /* mappa: mare */

  /* Borders */
  --border: #dbe3d7;
  --border-hover: #79bd44;
  --border-on-dark: rgba(255, 255, 255, .14);

  /* Text */
  --text: #142219;               /* titoli e testo forte */
  --text-secondary: #55655a;     /* paragrafi */
  --text-tertiary: #7a887e;      /* etichette, note */
  --on-dark: #ffffff;            /* titoli su scuro */
  --on-dark-2: #d6e6da;          /* paragrafi su scuro */
  --on-dark-3: #a9c2b0;          /* testo secondario su scuro */

  /* Accent */
  --accent: #2b8a3e;             /* verde marchio: CTA, link, icone */
  --accent-hover: #237533;
  --leaf: #79bd44;               /* verde chiaro: dettagli, bordi hover */
  --signal: #f3c316;             /* giallo segnaletica: evidenze su scuro, CTA primaria su hero */
  --signal-hover: #ffd83d;

  /* RGB variants for rgba() */
  --dark-rgb: 13, 54, 31;
  --accent-rgb: 43, 138, 62;
  --signal-rgb: 243, 195, 22;
  --ink-rgb: 8, 36, 20;
  --white-rgb: 255, 255, 255;
  --black-rgb: 0, 0, 0;

  /* Semantic */
  --success: #2b8a3e;
  --success-bg: #e6f3e3;
  --error: #8a1f1f;
  --error-bg: #fbeaea;
  --warning: #9a6b00;
}
```

**Color Rules:**
- Nessun colore hex fuori da `:root`: componenti, HTML inline e SVG della mappa usano solo `var(--…)`. Eccezioni: i file logo (colori originali del marchio: verde Ca.Metal `#3f652c`, frecce sfumate da `#4c8f39` a bianco, nero `#222323`; blu Cameco `#2c2445`, "ambiente" `#272521`), la favicon e il meta `theme-color`.
- Il giallo `--signal` si usa su fondi scuri o come CTA primaria nell'hero; mai come testo su bianco (contrasto insufficiente).
- Una sola tinta d'accento per sezione: verde su chiaro, giallo su scuro.
- Le sezioni alternano bianco → `--surface-alt` → `--dark`; mai due bande scure consecutive.

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600&display=swap');
--display: "Barlow Condensed", "Arial Narrow", "Roboto Condensed", Arial, sans-serif;
--body: "Barlow", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Barlow Condensed, MAIUSCOLO | clamp(44px, 6.4vw, 86px) | 800 | 0.95 | 0.005em |
| Page H1 (interne) | Barlow Condensed, MAIUSCOLO | clamp(46px, 6vw, 80px) | 800 | 0.95 | 0.005em |
| Section H2 | Barlow Condensed, MAIUSCOLO | clamp(36px, 4.4vw, 58px) | 800 | 1.05 | 0.005em |
| H3 | Barlow Condensed, MAIUSCOLO | 26–36px | 700 | 1.05 | — |
| Body | Barlow | 17px (16px mobile) | 400 | 1.6 | — |
| Label / eyebrow | Barlow Condensed, MAIUSCOLO | 15–16px | 600 | 1.2 | 0.2em |
| Numeri (KPI) | Barlow Condensed, tabular-nums | 34–46px | 800 | 1 | — |

**Typography Rules:**
- Titoli sempre ≥ 700, in maiuscolo, con `text-wrap: balance`.
- Testo corrente max ~65 caratteri per riga.
- Cifre allineate con `font-variant-numeric: tabular-nums`.
- Il sito resta leggibile anche con i soli font di sistema (stack di riserva condensato → Arial).
- **Nomi aziendali**: "Ca.Metal" e "Cameco" come marchio compaiono solo tramite i file logo, con i caratteri originali del volantino. Nel testo corrente (paragrafi, indirizzi) restano in Barlow.
- **NEVER use**: Inter, Space Grotesk, Roboto come titolo, font serif o corsivi per il testo del sito (gli unici serif/corsivi ammessi sono quelli già contenuti nel logo Cameco).

**Text Decoration** (da text-decoration-rules, stile commerciale sobrio):
- Hero h1: nessun gradiente, nessuna ombra; l'ultima riga in `--signal`.
- Section h2: nessun gradiente, nessuna ombra; seconda parte del titolo in `--accent` (o `--signal` su scuro).
- Eyebrow: trattino orizzontale di 34×3px prima del testo, stesso colore.
- "1969" nell'hero: solo contorno (`-webkit-text-stroke`), nessun riempimento.
- Paragrafi: nessuna decorazione.

## 4. Component Stylings

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; gap: 10px; min-height: 48px;
  padding: 14px 26px; border-radius: var(--radius); border: 2px solid transparent;
  font: 700 19px/1 var(--display); text-transform: uppercase; letter-spacing: .06em;
  text-decoration: none; cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.btn:focus-visible { outline: 3px solid var(--signal); outline-offset: 3px; }
.btn:disabled, .btn[aria-disabled="true"] { opacity: .45; cursor: not-allowed; transform: none; }
.btn-signal { background: var(--signal); color: var(--dark); }
.btn-signal:hover { background: var(--signal-hover); }
.btn-primary { background: var(--accent); color: var(--on-dark); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-ghost { border-color: rgba(255, 255, 255, .6); color: var(--on-dark); }
.btn-ghost:hover { border-color: var(--on-dark); background: rgba(255, 255, 255, .08); }
.btn-outline { border-color: var(--accent); color: var(--accent); }
.btn-outline:hover { background: var(--accent); color: var(--on-dark); }
```

### Cards
```css
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
.card:hover { transform: translateY(-3px); border-color: var(--border-hover); box-shadow: var(--shadow-md); }
.card:focus-within { border-color: var(--accent); }
/* Value card: bordo superiore verde 4px, nessuna ombra a riposo */
.value { border-top: 4px solid var(--accent); }
```

### Navigation
```css
.header { position: sticky; top: 0; background: var(--bg); border-bottom: 1px solid var(--border); }
.header.scrolled { box-shadow: var(--shadow-sm); }           /* unico cambio allo scroll */
.nav a { font: 600 18px var(--display); text-transform: uppercase; letter-spacing: .06em; min-height: 44px; }
.nav a::after { height: 3px; background: var(--signal); transform: scaleX(0); transition: transform .25s ease; }
.nav a:hover::after, .nav a[aria-current="page"]::after { transform: scaleX(1); }
.nav a[aria-current="page"] { color: var(--accent); }
/* Mobile: pannello laterale da destra, hamburger 46×46 */
```

### Links
```css
.link { color: var(--accent); font-weight: 600; text-decoration: underline;
  text-decoration-thickness: 1px; text-underline-offset: 3px; transition: color .2s, text-underline-offset .2s; }
.link:hover { color: var(--accent-hover); text-underline-offset: 5px; }
.link:focus-visible { outline: 3px solid var(--signal); outline-offset: 2px; }
.more svg { transition: transform .2s ease; } .more:hover svg { transform: translateX(4px); }
```

### Tags / Badges
```css
.tag { background: var(--signal); color: var(--dark); font: 700 15px var(--display);
  text-transform: uppercase; letter-spacing: .08em; padding: 6px 12px; border-radius: 3px; }
.chip-dark { border: 1px solid var(--border-on-dark); color: var(--on-dark-2); padding: 5px 10px; border-radius: 3px; }
```

### Form fields
```css
.field input, .field select, .field textarea { min-height: 48px; background: var(--surface-alt);
  border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); }
.field input:hover { border-color: var(--leaf); }
.field input:focus { border-color: var(--accent); background: var(--surface);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), .18); outline: none; }
.field input:disabled { opacity: .5; cursor: not-allowed; }
.field input[aria-invalid="true"] { border-color: var(--error); }
```

### Altri componenti
- **Stat strip**: barra bianca sovrapposta all'hero (-58px), 4 colonne con divisori.
- **Bento materiali**: griglia non uniforme (vedi §5), tessere foto + tessere icona.
- **Galleria + lightbox**: lightbox su fondo `rgba(var(--ink-rgb), .94)`, chiusura con Esc, clic fuori o pulsante 48px.
- **Mappa schematica SVG**: tutti i colori da token tramite classi CSS.
- **Loghi aziendali (originali, 1:1 col volantino)**: file in `img/logo/`.
  - `cametal-h.svg` / `cameco-h.svg`: versione orizzontale (simbolo a sinistra), per header, card e contatti.
  - `cametal-v.svg` / `cameco-v.svg`: versione verticale (simbolo sopra), per le sezioni Chi siamo.
  - `cametal-word.svg` / `cameco-word.svg`: solo scritta, per richiami brevi.
  - Ricavati dal volantino: scritte e frecce Ca.Metal vettorializzate con i colori misurati; goccia Cameco come immagine (è fotografica anche nell'originale). Da sostituire con i file originali dello studio grafico appena disponibili, mantenendo gli stessi nomi.
```css
.brand img { height: 56px; width: auto; }              /* header: entrambi i loghi, separati da un filetto */
.logo-title img { height: 74px; width: auto; }         /* card e contatti */
.logo-title.lg img { height: 172px; }                   /* Chi siamo, versione verticale */
.logo-plate { background: var(--surface); padding: 18px 22px; border-radius: var(--radius); } /* loghi su fondo scuro */
```

## 5. Layout Principles

**Container:**
- Max width: 1200px
- Padding laterale: `max(20px, env(safe-area-inset-left/right))`
- Variante testo: 65ch

**Spacing Scale:** (base 8)
- Section padding: 104px desktop / 76px mobile (`.tight`: 72px)
- Component gap: 24–30px; griglie fitte 12–16px
- Card internal padding: 28–36px

**Grid:**
```css
.sec-head { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 40px; align-items: end; }
.split { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 64px; align-items: center; }
.values { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 24px; }
/* Bento materiali in home: griglia non uniforme */
.bento { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); grid-auto-rows: 210px; gap: 12px; }
.bento .b-wide { grid-column: span 2; } .bento .b-tall { grid-row: span 2; }
```

## 6. Depth & Elevation

```css
--radius: 6px;
--shadow-sm: 0 4px 14px -6px rgba(var(--dark-rgb), .25);
--shadow-md: 0 14px 30px -18px rgba(var(--dark-rgb), .45);
--shadow-lg: 0 18px 40px -22px rgba(var(--dark-rgb), .45);
```

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | nessuna ombra, bordo `--border` | materiali, campi, certificazioni, value card |
| Subtle | `--shadow-sm` | header dopo lo scroll |
| Elevated | `--shadow-md` | card in hover |
| Floating | `--shadow-lg` | stat strip, card aziende, modulo, mappa, badge foto |

## 7. Animation & Interaction

**Motion Philosophy**: sobria e funzionale; si animano solo `opacity` e `transform`, mai il layout.
**Tier**: L1

### Dependencies
Nessuna (CSS + JS nativo).

### Entrance Animation
```css
@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.hero-line { animation: rise .8s cubic-bezier(.16,1,.3,1) both; }
.hero-line:nth-child(2) { animation-delay: .08s; } .hero-line:nth-child(3) { animation-delay: .16s; }
@keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }  /* 1969 a contorno */
```

### Scroll Behavior
```js
// comparsa leggera una sola volta; tutto visibile dopo 2,5 s anche senza scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// header: aggiunge .scrolled oltre 10px (solo ombra)
```
```css
.js .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
.js .reveal.in { opacity: 1; transform: none; }
```

### Hover & Focus States
- Pulsanti: sollevamento 2px + cambio colore.
- Card/materiali: sollevamento 3px + bordo `--border-hover`.
- Foto: zoom 1.04–1.06 dentro il riquadro (`overflow: hidden`).
- Nav: barra gialla che si allarga da sinistra.
- Focus: contorno giallo 3px su tutti gli elementi interattivi.

### Special Effects
- **Hero**: titolo in tre righe che salgono in sequenza + "1969" che si disegna a contorno (effetto principale, solo all'apertura).
- **Aggancio alla prima sezione**: indicatore "Scorri" in fondo all'hero che porta alla barra dei numeri.
- **Dettagli nascosti**: nessuno. Il pannello Ctrl+K è stato escluso dal cliente; i loghi non si animano.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-delay: 0s !important;
    animation-iteration-count: 1 !important; transition-duration: .01ms !important;
    transition-delay: 0s !important; scroll-behavior: auto !important; }
  .js .reveal { opacity: 1; transform: none; }
}
```

## 8. Do's and Don'ts

### Do
- Usare i loghi originali in ogni punto in cui compare il marchio (header, card, Chi siamo, contatti, footer).
- Usare i dati reali dei volantini (60.000 mq, 26.000 mq, 600 kW, 1969, ISO 9001/14001) come contenuto, non come decorazione.
- Mettere telefono e contatti a un clic da ogni pagina (barra superiore, CTA finale, footer).
- Alternare bande chiare e scure per dare ritmo alle pagine lunghe.
- Usare le foto reali degli impianti e dei materiali, sempre ritagliate con `object-fit: cover`.
- Rendere ogni pagina completa e leggibile anche con JavaScript disattivato.
- Dare a ogni elemento interattivo hover, `:focus-visible` e area di tocco ≥ 44×44px.

### Don't
- ❌ Riscrivere i nomi "Ca.Metal" o "Cameco" come marchio con un font del sito, ricolorare, deformare, ruotare o animare i loghi.
- ❌ Mettere i loghi direttamente su fondo scuro o su foto: sempre su bianco o su piastra chiara.
- ❌ Colori hex o rgb scritti fuori da `:root` (anche negli attributi `style` e negli SVG).
- ❌ Gradienti sui testi, ombre sui titoli, effetti neon o glow.
- ❌ Animazioni oltre L1: niente parallasse, sezioni fissate, cursore personalizzato, WebGL.
- ❌ Contenuti nascosti in attesa dello scroll senza un timeout di sicurezza.
- ❌ Emoji come icone: solo SVG inline a tratto.
- ❌ Riquadri di colore piatto al posto delle immagini.
- ❌ Giallo come colore del testo su fondo bianco.
- ❌ Font serif, corsivi o diversi da Barlow / Barlow Condensed.
- ❌ Dati inventati (anni, numero di dipendenti, clienti, P.IVA): solo informazioni fornite dal cliente.
- ❌ `filter: blur()` su elementi in movimento; `backdrop-filter` oltre 14px.

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1180px | griglie a 4–5 colonne, split a due colonne, menu orizzontale |
| Laptop | 1081–1180px | come desktop, menu a pannello (i due loghi occupano spazio) |
| Tablet | 921–1080px | griglie a 2–3 colonne |
| Mobile L | 561–920px | tutto in una colonna tranne stat e gallerie (2) |
| Mobile | ≤ 560px | una colonna; gallerie a 2 colonne; testo 16px |

**Touch Targets:** minimo 44×44px (pulsanti 48px).
**Collapsing Strategy:** le griglie usano sempre `minmax(0, 1fr)` per non allargare la pagina; la barra superiore nasconde l'email sotto 560px; il bento diventa a 2 colonne con righe da 160px.

```css
@media (max-width: 920px) {
  .sec-head, .split, .map-wrap, .form-wrap { grid-template-columns: minmax(0, 1fr); }
  .bento { grid-template-columns: repeat(2, minmax(0,1fr)); grid-auto-rows: minmax(170px, auto); }
}
@media (max-width: 560px) {
  .values, .materials, .services { grid-template-columns: minmax(0, 1fr); }
  .bento .b-wide { grid-column: span 2; } .bento .b-tall { grid-row: span 1; }
}
```
