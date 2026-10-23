import type { LegalDoc } from '@/content/pages';
import { PageHero } from './page-hero';

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const updated = new Date(doc.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <PageHero
        crumbs={[
          { name: 'Home', path: '/' },
          { name: doc.title, path },
        ]}
        eyebrow="Legal"
        title={doc.title}
        lead={doc.intro}
      />
      <section className="flush-top">
        <div className="wrap">
          <div className="prose">
            <p>
              <em>Last updated {updated}.</em>
            </p>
            {doc.sections.map((s) => (
              <div key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
