import 'server-only';
import { serverEnv } from './env';

const DEV_TOKEN = 'dev-turnstile-disabled';

/** Verifies a Turnstile token server-side. Without a secret, only the dev token is accepted, and never in production. */
export async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const env = serverEnv();
  if (env.E2E_MOCK_LEADS) return true;
  if (!env.TURNSTILE_SECRET_KEY) return env.NODE_ENV !== 'production' && token === DEV_TOKEN;
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
