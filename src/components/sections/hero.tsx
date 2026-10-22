import { Check } from 'lucide-react';
import { ProductScreen } from '@/components/app-ui/product-screen';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import { hero } from '@/content/home';

export function Hero() {
  const meta = hero.meta.filter((m) => site.promises.localSupportInHargeisa || !m.includes('Hargeisa'));
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-copy">
          <Badge tone="green" dot>
            {hero.badge}
          </Badge>
          <h1 id="hero-title">
            {hero.titleStart} <em>{hero.titleEmphasis}</em>
          </h1>
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-cta">
            <Button href="#demo" size="lg" arrow ctaLocation="hero">
              {hero.primaryCta}
            </Button>
            <Button href="#editions" variant="outline" size="lg" ctaLocation="hero-secondary">
              {hero.secondaryCta}
            </Button>
          </div>
          <div className="hero-meta">
            {meta.map((m) => (
              <span key={m}>
                <Check aria-hidden="true" strokeWidth={2} />
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="stage">
          <ProductScreen screen="dashboard" label={hero.screenLabel} />
        </div>
      </div>
    </section>
  );
}
