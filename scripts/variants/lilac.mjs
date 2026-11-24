// Variant: Lilac Citrus (lilac, violet, plum, lime).
//
// A light, editorial identity: white and grey surfaces land on sand steps, the dark surfaces on
// espresso and deep olive. Brand accent fills become lilac (teal) and olive (mint); the
// orange call-to-action fills become saffron with espresso text. Surface-aware custom
// properties (--li-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  ivory: '#ffffff', sand: '#f7f4fb', sand2: '#efe9f7', sand3: '#e4dbf1', clay: '#d2c4e6',
  lilac: '#7b4bd6', terraDeep: '#5f33b8',
  olive: '#4a2f7a', oliveDeep: '#3a2463', oliveDark: '#1e1430', oliveCream: '#ede6f8',
  saffron: '#c6e83a', saffronPale: '#ecf7b8', burnt: '#5d7a00',
  espresso: '#241a33', espresso2: '#33264a', cocoa: '#65587a',
};
const P = PALETTE;

const vars = o => Object.entries(o).map(([k, v]) => `--li-${k}:${v}`).join(';');
const LIGHT = {
  fg: P.espresso, fg2: P.espresso2, white: P.espresso, muted: P.cocoa, accent: P.terraDeep, accent2: P.oliveDeep,
  deep: P.oliveDeep, hot: P.burnt, line: 'rgba(36,26,51,.14)', line2: 'rgba(36,26,51,.3)', glow: P.lilac,
};
const DARK = {
  fg: P.sand, fg2: '#ece6f4', white: P.sand, muted: '#c9bedb', accent: P.saffron, accent2: P.saffronPale,
  deep: '#e0d6f2', hot: P.saffron, line: 'rgba(247,244,251,.16)', line2: 'rgba(247,244,251,.32)', glow: P.saffron,
};

// text-like entry: the surface variable when opaque, the same variable at the token's opacity
// (color-mix) when translucent
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });
const accentVar = { solid: `var(--li-accent,${P.terraDeep})`, alpha: P.lilac };

// the original site is mostly dark: every surface, dark or light, lands on a sand step, and the
// sections drawn over video or dark photography get the DARK set from lilac.js (.tc-darkzone)
export const DARK_CTX = DARK;

export default {
  name: 'lilac',
  dist: 'dist',
  port: 4321,
  prefix: '--li-',
  styles: ['/styles/lilac.css'],
  scripts: ['/scripts/lilac.js'],

  ctx: {
    dark: vars(LIGHT),
    light: vars(LIGHT),
    // lilac / olive fills: sand ink on top
    accent: vars({ fg: P.sand, fg2: '#fbf9fd', white: P.sand, muted: 'rgba(247,244,251,.82)', accent: '#ffffff', accent2: P.saffronPale,
      deep: P.sand, hot: P.saffronPale, line: 'rgba(247,244,251,.3)', line2: 'rgba(247,244,251,.5)', glow: P.lilac }),
    // saffron fills (were orange call-to-actions): espresso ink on top
    orange: vars({ fg: P.espresso, fg2: P.espresso, white: P.espresso, muted: 'rgba(36,26,51,.75)', accent: P.espresso, accent2: P.espresso,
      deep: P.espresso, hot: P.espresso, line: 'rgba(36,26,51,.25)', line2: 'rgba(36,26,51,.45)', glow: P.saffron }),
  },
  // rules that set white text without painting a surface sit on dark artwork
  whiteTextCtx: '',
  lineVar: 'var(--li-line,rgba(36,26,51,.14))',
  varRoles: true,
  // off-palette pale tints (lavender bands, creams) join the sand family
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.lilac, blue: P.lilac, mint: P.olive, mintPale: P.oliveCream, deep: P.sand3, orange: P.saffron },
    grad: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.lilac, blue: P.lilac, mint: P.olive, mintPale: P.sand2, deep: P.sand3, orange: P.saffron },
    // gradients clipped to text (background-clip: text): warm, readable on sand
    gradText: { white: P.espresso, paper: P.espresso2, silver: P.cocoa, grey: P.cocoa, ink: P.espresso, ink2: P.espresso2,
      teal: P.lilac, blue: P.lilac, mint: P.olive, mintPale: P.olive, deep: P.oliveDeep, orange: P.saffron },
    text: {
      white: t('--li-white', P.espresso), paper: t('--li-white', P.espresso),
      silver: t('--li-muted', P.cocoa), grey: t('--li-muted', P.cocoa),
      ink: t('--li-fg', P.espresso), ink2: t('--li-fg2', P.espresso2),
      teal: t('--li-accent', P.terraDeep, P.lilac), blue: t('--li-accent', P.terraDeep, P.lilac),
      mint: t('--li-accent2', P.oliveDeep, P.olive), mintPale: t('--li-accent2', P.oliveDeep, P.olive),
      deep: t('--li-deep', P.oliveDeep), orange: t('--li-hot', P.burnt, P.saffron),
    },
    border: {
      white: { solid: 'var(--li-line2,rgba(36,26,51,.3))', alpha: P.espresso },
      paper: { solid: 'var(--li-line,rgba(36,26,51,.14))', alpha: null },
      silver: { solid: 'var(--li-line,rgba(36,26,51,.14))', alpha: null },
      mintPale: { solid: 'var(--li-line,rgba(36,26,51,.14))', alpha: null },
      grey: { solid: 'rgba(36,26,51,.22)', alpha: P.espresso },
      ink: { solid: 'var(--li-line2,rgba(36,26,51,.3))', alpha: P.espresso },
      ink2: { solid: 'var(--li-line2,rgba(36,26,51,.3))', alpha: P.espresso },
      teal: accentVar, mint: { solid: `var(--li-accent2,${P.oliveDeep})`, alpha: P.olive }, blue: accentVar,
      deep: P.oliveDeep, orange: P.saffron,
    },
    svg: { white: P.espresso, paper: P.sand3, silver: P.clay, grey: P.cocoa, ink: P.sand2, ink2: P.sand3,
      teal: P.lilac, blue: P.lilac, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDark, orange: P.saffron },
    // custom properties read both as text and as a surface (or never read)
    var: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: accentVar, blue: accentVar, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDeep, orange: P.saffron },
    canvas: { white: P.espresso, ink: P.sand, ink2: P.sand2, teal: P.lilac, mint: P.olive, mintPale: P.oliveCream,
      deep: P.sand3, blue: P.lilac, orange: P.saffron },
  },
};
