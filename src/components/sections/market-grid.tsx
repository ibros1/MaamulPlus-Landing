import { SectionHeader } from '@/components/ui/section-header';
import { market as copy } from '@/content/home';

export function MarketGrid() {
  return (
    <section aria-labelledby="mk-title">
      <div className="wrap">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} id="mk-title" lead={copy.lead} />
        <div className="market rv">
          {copy.cells.map((c) => (
            <div key={c.title}>
              <div className="k">{c.mono ? <code>{c.key}</code> : c.key}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
