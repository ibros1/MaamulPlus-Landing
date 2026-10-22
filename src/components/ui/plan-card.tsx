import { Check } from 'lucide-react';
import type { EditionInfo } from '@/content/editions';
import { cn } from '@/lib/cn';
import { Badge } from './badge';
import { EditionCta } from './edition-cta';

interface PlanCardProps {
  edition: EditionInfo;
  featured?: boolean;
  /** Where the CTA sends people: `#demo` on pages with the demo form, `/demo` elsewhere. */
  ctaHref: string;
  headingLevel?: 'h2' | 'h3';
}

/** One edition. Never a figure: always a request. */
export function PlanCard({ edition, featured = false, ctaHref, headingLevel = 'h3' }: PlanCardProps) {
  const Heading = headingLevel;
  const { plan } = edition;
  return (
    <div className={cn('mp-plan', featured && 'mp-plan--featured')}>
      <div className="mp-plan__top">
        <Heading className="mp-plan__name">
          MaamulPlus <span>{edition.short}</span>
        </Heading>
        <Badge tone={featured ? 'inverse' : 'outline'}>{plan.badge}</Badge>
      </div>
      <p className="mp-plan__for">{plan.for}</p>
      <div className="mp-plan__price">
        <strong>{plan.price}</strong>
        <span>{plan.priceNote}</span>
      </div>
      <ul className="mp-plan__list">
        {plan.groupLabel ? <li className="mp-plan__group">{plan.groupLabel}</li> : null}
        {plan.list.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>
      <div className="mp-plan__cta">
        <EditionCta
          edition={edition.id}
          href={ctaHref}
          variant={featured ? 'green' : 'primary'}
          block
          arrow={featured}
          ctaLocation={`plan-${edition.id}`}
        >
          {plan.cta}
        </EditionCta>
      </div>
    </div>
  );
}
