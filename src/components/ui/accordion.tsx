import type { QA } from '@/content/faq';

interface AccordionProps {
  items: readonly QA[];
  /** Open the first item by default. */
  firstOpen?: boolean;
}

/** FAQ list on native <details>: works without JavaScript. */
export function Accordion({ items, firstOpen = true }: AccordionProps) {
  return (
    <div className="mp-faq">
      {items.map((item, i) => (
        <details key={item.q} open={firstOpen && i === 0}>
          <summary>
            {item.q}
            <i aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
