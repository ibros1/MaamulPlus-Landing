import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { footer } from '@/content/navigation';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { phone, email } = site.contact;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="logo" aria-label="MaamulPlus home">
              <Logo variant="full" />
            </Link>
            <p>{footer.description}</p>
            <ul className="foot-contact">
              <li>
                <MapPin aria-hidden="true" strokeWidth={2} />
                {footer.location}
              </li>
              {phone ? (
                <li>
                  <Phone aria-hidden="true" strokeWidth={2} />
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <Mail aria-hidden="true" strokeWidth={2} />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ) : null}
            </ul>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h2 className="foot-h">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-base">
          <span>
            © {year} MaamulPlus. {footer.location}.
          </span>
          <ul className="foot-legal">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
