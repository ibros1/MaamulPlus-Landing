import 'server-only';
import { Resend } from 'resend';
import { escapeHtml } from './escape';
import type { Lead, LeadSink } from './types';

const SUBJECT: Record<Lead['kind'], string> = {
  demo: 'New demo request',
  contact: 'New contact message',
  newsletter: 'New newsletter subscriber',
};

export function renderLeadEmail(lead: Lead): { subject: string; html: string; text: string } {
  const rows = Object.entries(lead.fields).filter((e): e is [string, string] => typeof e[1] === 'string' && e[1] !== '');
  const utm = lead.utm ? Object.entries(lead.utm).filter((e): e is [string, string] => typeof e[1] === 'string') : [];
  const all = [...rows, ['page', lead.page] as [string, string], ...utm.map(([k, v]) => [`utm_${k}`, v] as [string, string])];
  const who = lead.fields.business ?? lead.fields.name ?? lead.fields.email ?? '';
  const subject = `${SUBJECT[lead.kind]}${who ? `: ${who}` : ''}`.slice(0, 150);
  const html = `<h2 style="font-family:sans-serif">${escapeHtml(SUBJECT[lead.kind])}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${all
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#4b5563;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>
<p style="font-family:sans-serif;font-size:12px;color:#4b5563">Reference ${escapeHtml(lead.id)} · ${escapeHtml(lead.receivedAt)}</p>`;
  const text = all.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nReference ${lead.id}`;
  return { subject, html, text };
}

export function resendSink(apiKey: string, to: string, from: string): LeadSink {
  const client = new Resend(apiKey);
  return {
    name: 'resend',
    async send(lead) {
      const { subject, html, text } = renderLeadEmail(lead);
      const replyTo = lead.fields.email;
      const { error } = await client.emails.send({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { replyTo } : {}),
      });
      if (error) throw new Error(`resend: ${error.name}`);
    },
  };
}
