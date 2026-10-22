import { CompareTable } from '@/components/ui/compare-table';
import { PlanCard } from '@/components/ui/plan-card';
import { SectionHeader } from '@/components/ui/section-header';
import { comparison, editions } from '@/content/editions';
import { pricingSection as copy } from '@/content/home';

interface PricingProps {
  /** Where plan buttons go: `#demo` when the form is on the page, `/demo` otherwise. */
  ctaHref?: string;
  /** On /pricing the section title is the page H1. */
  asPage?: boolean;
  alt?: boolean;
}

export function Pricing({ ctaHref = '#demo', asPage = false, alt = true }: PricingProps) {
  return (
    <section id="pricing" className={alt ? 'alt' : undefined} aria-labelledby="pr-title">
      <div className="wrap">
        <SectionHeader
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="pr-title"
          lead={copy.lead}
          as={asPage ? 'h1' : 'h2'}
        />
        <div className="plans rv">
          <PlanCard edition={editions.lite} ctaHref={ctaHref} headingLevel={asPage ? 'h2' : 'h3'} />
          <PlanCard edition={editions.enterprise} featured ctaHref={ctaHref} headingLevel={asPage ? 'h2' : 'h3'} />
        </div>
        <CompareTable groups={comparison} caption={copy.compareCaption} />
      </div>
    </section>
  );
}
