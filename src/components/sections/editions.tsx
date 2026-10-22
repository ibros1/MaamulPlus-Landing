import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditionCta } from '@/components/ui/edition-cta';
import { SectionHeader } from '@/components/ui/section-header';
import { editions } from '@/content/editions';
import { editionsSection as copy } from '@/content/home';
import { Arch } from './arch';

export function Editions() {
  const ent = editions.enterprise;
  const lite = editions.lite;
  return (
    <section id="editions" aria-labelledby="ed-title">
      <div className="wrap">
        <SectionHeader align="center" eyebrow={copy.eyebrow} title={copy.title} id="ed-title" lead={copy.lead} />
        <div className="editions rv">
          <article className="edition ent" aria-labelledby="ed-ent">
            <Arch className="arch" />
            <Badge tone="inverse">{ent.badge}</Badge>
            <h3 id="ed-ent">
              MaamulPlus <span>{ent.short}</span>
            </h3>
            <p>{ent.summary}</p>
            <ul className="mods">
              {ent.modules.map((m) => (
                <li key={m}>
                  <Check aria-hidden="true" strokeWidth={2} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="go">
              <EditionCta edition="enterprise" href="#demo" variant="green" arrow ctaLocation="editions-enterprise">
                {ent.plan.cta}
              </EditionCta>
              <Button href={ent.path} variant="on-inverse">
                {copy.enterpriseSecondary}
              </Button>
            </div>
          </article>
          <article className="edition" aria-labelledby="ed-lite">
            <Badge>{lite.badge}</Badge>
            <h3 id="ed-lite">
              MaamulPlus <span>{lite.short}</span>
            </h3>
            <p>{lite.summary}</p>
            <ul className="mods">
              {lite.modules.map((m) => (
                <li key={m}>
                  <Check aria-hidden="true" strokeWidth={2} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="go">
              <EditionCta edition="lite" href="#demo" variant="primary" ctaLocation="editions-lite">
                {lite.plan.cta}
              </EditionCta>
              <Button href="#pricing" variant="outline">
                {copy.liteSecondary}
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
