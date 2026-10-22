import 'server-only';
import type { LeadSink } from './types';

/** Posts the lead as JSON to a CRM, Google Apps Script, Zapier or Slack-compatible endpoint. */
export function webhookSink(url: string): LeadSink {
  return {
    name: 'webhook',
    async send(lead) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`webhook: ${res.status}`);
    },
  };
}
