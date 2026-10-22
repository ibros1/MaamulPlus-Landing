import tokens from '../../design-system/tokens.json';

/**
 * Raw brand colours for places that cannot read CSS variables:
 * <meta name="theme-color">, the web manifest and OG images. Read from tokens.json, never hand-copied.
 */
type ColorToken = { name: string; value: string | { light: string; dark: string } };
const list = tokens.color.tokens as ColorToken[];

function token(name: string): string | { light: string; dark: string } {
  const t = list.find((x) => x.name === name);
  if (!t) throw new Error(`Unknown colour token ${name}`);
  return t.value;
}
function solid(name: string): string {
  const v = token(name);
  return typeof v === 'string' ? v : v.light;
}
function themed(name: string): { light: string; dark: string } {
  const v = token(name);
  return typeof v === 'string' ? { light: v, dark: v } : v;
}

export const brandColors = {
  navy900: solid('navy-900'),
  green400: solid('green-400'),
  white: solid('white'),
  bg: themed('bg'),
  onInverseMuted: themed('on-inverse-muted').light,
};
