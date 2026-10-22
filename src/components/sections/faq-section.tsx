import Link from 'next/link';
import { Accordion } from '@/components/ui/accordion';
import type { QA } from '@/content/faq';
import { faqSection as copy } from '@/content/home';

interface FaqSectionProps {
  items: readonly QA[];
  title?: string;
  eyebrow?: string;
  /** Where "Send us a message" points. */
  messageHref?: string;
  alt?: boolean;
}

export function FaqSection({ items, title = copy.title, eyebrow = copy.eyebrow, messageHref = '#demo', alt = true }: FaqSectionProps) {
  return (
    <section id="faq" className={alt ? 'alt' : undefined} aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <div className="mp-section-head">
          <p className="mp-eyebrow">{eyebrow}</p>
          <h2 id="faq-title">{title}</h2>
          <p>
            {copy.leadStart}{' '}
            <Link href={messageHref} className="inline-link">
              {copy.leadLink}
            </Link>
          </p>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
