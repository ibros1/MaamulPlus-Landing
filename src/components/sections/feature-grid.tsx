import { FeatureCard } from '@/components/ui/feature-card';
import { SectionHeader } from '@/components/ui/section-header';
import { enterpriseFeatures as copy } from '@/content/home';

export function FeatureGrid() {
  return (
    <section id="enterprise" className="alt" aria-labelledby="ent-title">
      <div className="wrap">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} id="ent-title" lead={copy.lead} />
        <div className="grid3 rv">
          {copy.cards.map((c) => (
            <FeatureCard key={c.title} icon={c.icon} title={c.title} body={c.body} href={c.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
