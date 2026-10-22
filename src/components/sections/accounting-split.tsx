import { ArrowLeftRight, BookOpen, Check, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/ui/section-header';
import { journal, money } from '@/content/demo-data';
import { accounting as copy } from '@/content/home';

const POINT_ICONS = [BookOpen, ArrowLeftRight, FileText];

export function AccountingSplit() {
  const debit = journal.lines.reduce((a, l) => a + l.debit, 0);
  const credit = journal.lines.reduce((a, l) => a + l.credit, 0);
  return (
    <section id="accounting" aria-labelledby="acc-title">
      <div className="wrap split">
        <div className="rv">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} id="acc-title" lead={copy.lead} />
          <ul className="points">
            {copy.points.map((p, i) => {
              const Icon = POINT_ICONS[i] ?? Check;
              return (
                <li key={p.title}>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <b>{p.title}</b>
                    <span>{p.body}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="more-link">
            <Link href="/features/accounting">{copy.link}</Link>
          </p>
        </div>
        <div className="ledger rv" role="img" aria-label={copy.ledgerLabel}>
          <div className="ledger-head">
            <div>
              <small>Journal · {journal.ref}</small>
              <strong>{journal.title}</strong>
            </div>
            <Badge tone="green">Posted</Badge>
          </div>
          <div className="ledger-scroll" aria-hidden="true">
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th className="n">Debit</th>
                  <th className="n">Credit</th>
                </tr>
              </thead>
              <tbody>
                {journal.lines.map((l) => (
                  <tr key={l.code}>
                    <td>
                      <code>{l.code}</code>
                      {l.account}
                    </td>
                    <td className="n">{l.debit ? `$${money(l.debit)}` : ''}</td>
                    <td className="n">{l.credit ? `$${money(l.credit)}` : ''}</td>
                  </tr>
                ))}
                <tr className="tot">
                  <td>Total</td>
                  <td className="n">${money(debit)}</td>
                  <td className="n">${money(credit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ledger-foot" aria-hidden="true">
            <Check strokeWidth={2} />
            {copy.ledgerFoot}
          </div>
        </div>
      </div>
    </section>
  );
}
