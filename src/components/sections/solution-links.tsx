import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { features } from '@/content/features';
import { solutions } from '@/content/solutions';

/** Internal links from the home page to every feature and solution page. */
export function SolutionLinks() {
  return (
    <section className="links-band" aria-labelledby="explore-title">
      <div className="wrap">
        <h2 id="explore-title" className="links-band__title">
          Explore MaamulPlus
        </h2>
        <div className="links-band__grid">
          <div>
            <h3>Features</h3>
            <ul>
              {features.map((f) => (
                <li key={f.slug}>
                  <Link href={`/features/${f.slug}`}>
                    {f.name}
                    <ArrowRight aria-hidden="true" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Solutions</h3>
            <ul>
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`}>
                    Software for {s.name.toLowerCase()}
                    <ArrowRight aria-hidden="true" strokeWidth={2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
