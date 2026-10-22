import { Check } from 'lucide-react';
import { DemoFormLazy } from '@/components/forms/demo-form-lazy';
import { Button } from '@/components/ui/button';
import { ctaBand as copy } from '@/content/home';
import { Arch } from './arch';

interface CtaBandProps {
  /** With the demo form (home page) or with a button to /demo (inner pages). */
  withForm?: boolean;
  title?: string;
  lead?: string;
}

/** The single navy band that closes a page. */
export function CtaBand({ withForm = true, title = copy.title, lead = copy.lead }: CtaBandProps) {
  return (
    <section id="demo" className="cta" aria-labelledby="cta-title">
      <div className="wrap">
        <div className={withForm ? 'cta-band on-inverse' : 'cta-band cta-band--simple on-inverse'}>
          <Arch className="cta-art" />
          <div style={{ position: 'relative' }}>
            <p className="mp-eyebrow">{copy.eyebrow}</p>
            <h2 id="cta-title">{title}</h2>
            <p className="lead">{lead}</p>
            <ul className="contact">
              {copy.points.map((p) => (
                <li key={p}>
                  <Check aria-hidden="true" strokeWidth={2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {withForm ? (
            <DemoFormLazy />
          ) : (
            <div className="cta-actions">
              <Button href="/demo" variant="green" size="lg" arrow ctaLocation="cta-band">
                Book a demo
              </Button>
              <Button href="/pricing" variant="on-inverse" size="lg" ctaLocation="cta-band-pricing">
                Request pricing
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
