import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { serverEnv } from './env';

export interface LimitResult {
  success: boolean;
  /** Seconds until the window resets. */
  retryAfter: number;
}

export interface Limiter {
  limit: (key: string) => Promise<LimitResult>;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;

/** In-memory sliding window for development and tests (one process only). */
export function memoryLimiter(max = MAX, windowMs = WINDOW_MS): Limiter {
  const hits = new Map<string, number[]>();
  return {
    async limit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(key, recent);
        const oldest = recent[0] ?? now;
        return { success: false, retryAfter: Math.ceil((oldest + windowMs - now) / 1000) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { success: true, retryAfter: 0 };
    },
  };
}

const limiters = new Map<string, Limiter>();

/** 5 requests per 10 minutes per IP and route. Upstash when configured, memory otherwise. */
export function getLimiter(prefix: string): Limiter {
  const existing = limiters.get(prefix);
  if (existing) return existing;
  const env = serverEnv();
  let limiter: Limiter;
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    const rl = new Ratelimit({
      redis: new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN }),
      limiter: Ratelimit.slidingWindow(MAX, '10 m'),
      prefix: `mp:${prefix}`,
    });
    limiter = {
      async limit(key) {
        const r = await rl.limit(key);
        return { success: r.success, retryAfter: Math.max(1, Math.ceil((r.reset - Date.now()) / 1000)) };
      },
    };
  } else {
    limiter = memoryLimiter();
  }
  limiters.set(prefix, limiter);
  return limiter;
}
