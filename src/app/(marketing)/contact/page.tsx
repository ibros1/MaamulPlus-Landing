import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/page-hero';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import { absoluteUrl, breadcrumbLd, buildMetadata, graph, ids, localBusinessLd, type Crumb } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact MaamulPlus in Hargeisa',
  description:
    'Contact the MaamulPlus team in Hargeisa, Somaliland, for sales, pricing or support. Send a message, call us or book a demo, and we reply within one working day.',
  path: '/contact',
});

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export default function ContactPage() {
  const { phone, email, street, openingHours, mapsUrl } = site.contact;
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Talk to the MaamulPlus team."
        lead="Questions about the editions, a quote for your business or help with your account. We are based in Hargeisa and reply within one working day."
      />
      <section className="flush-top" aria-label="Ways to reach us">
        <div className="wrap contact-layout">
          <div>
            <ul className="contact-list">
              <li>
                <span className="mp-feature__icon">
                  <MapPin aria-hidden="true" strokeWidth={1.75} />
                </span>
                <div>
                  <b>Office</b>
                  <span>
                    {street ? `${street}, ` : ''}
                    {site.city}, {site.region}
                  </span>
                  {mapsUrl ? (
                    <>
                      <br />
                      <a href={mapsUrl} rel="noopener noreferrer" target="_blank">
                        Open the office in Google Maps
                      </a>
                    </>
                  ) : null}
                </div>
              </li>
              {phone ? (
                <li>
                  <span className="mp-feature__icon">
                    <Phone aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <b>Phone</b>
                    <a href={'tel:' + phone.replace(/\s/g, '')}>{phone}</a>
                  </div>
                </li>
              ) : null}
              {email ? (
                <li>
                  <span className="mp-feature__icon">
                    <Mail aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <b>Email</b>
                    <a href={'mailto:' + email}>{email}</a>
                  </div>
                </li>
              ) : null}
              {openingHours ? (
                <li>
                  <span className="mp-feature__icon">
                    <Clock aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <b>Opening hours</b>
                    <span>{openingHours.join(', ')}</span>
                  </div>
                </li>
              ) : null}
            </ul>
            <div style={{ marginTop: 32 }}>
              <Button href="/demo" arrow ctaLocation="contact">
                Book a demo instead
              </Button>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <JsonLd
        data={graph(localBusinessLd(), breadcrumbLd(crumbs), {
          '@type': 'ContactPage',
          url: absoluteUrl('/contact'),
          about: { '@id': ids.organization },
        })}
      />
    </>
  );
}
