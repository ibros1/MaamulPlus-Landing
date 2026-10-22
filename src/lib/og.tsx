import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { brandColors } from '@/config/brand-colors';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

// OG images cannot read CSS variables; the values come from tokens.json.
const NAVY = brandColors.navy900;
const GREEN_400 = brandColors.green400;
const ON_INVERSE_MUTED = brandColors.onInverseMuted;

let assets: Promise<{ font: Buffer; logo: string }> | undefined;

function loadAssets() {
  assets ??= Promise.all([
    readFile(join(process.cwd(), 'public/fonts/DMSans-Medium.ttf')),
    readFile(join(process.cwd(), 'public/brand/MaamulPlus-Logo-v2-white.svg')),
  ]).then(([font, logo]) => ({ font, logo: `data:image/svg+xml;base64,${logo.toString('base64')}` }));
  return assets;
}

interface OgInput {
  title: string;
  eyebrow?: string;
}

/** Navy card with the white logo, the page title in DM Sans 500 and the green plus motif. */
export async function renderOg({ title, eyebrow }: OgInput): Promise<ImageResponse> {
  const { font, logo } = await loadAssets();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: NAVY,
          color: brandColors.white,
          fontFamily: 'DM Sans',
          position: 'relative',
        }}
      >
        {/* Faint grid, as on the site hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Green plus motif */}
        <svg width="220" height="220" viewBox="0 0 64 64" style={{ position: 'absolute', right: 70, bottom: 60 }}>
          <path d="M32 6 V58 M6 32 H58" stroke={GREEN_400} strokeWidth="11" strokeLinecap="round" fill="none" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img src={logo} width={342} height={80} alt="" style={{ position: 'relative' }} />
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', maxWidth: 860 }}>
          {eyebrow ? (
            <div style={{ fontSize: 26, letterSpacing: '0.12em', textTransform: 'uppercase', color: GREEN_400 }}>
              {eyebrow}
            </div>
          ) : null}
          <div style={{ marginTop: 18, fontSize: 68, lineHeight: 1.08, letterSpacing: '-0.035em' }}>{title}</div>
          <div style={{ marginTop: 26, fontSize: 26, color: ON_INVERSE_MUTED }}>maamulplus.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: 'DM Sans', data: font, weight: 500, style: 'normal' }] },
  );
}
