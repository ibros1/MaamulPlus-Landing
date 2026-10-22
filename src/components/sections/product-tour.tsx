import { ProductScreen } from '@/components/app-ui/product-screen';
import { SectionHeader } from '@/components/ui/section-header';
import { tour } from '@/content/home';
import { TourTabs } from './tour-tabs';

export function ProductTour() {
  const panels = tour.tabs.map((t) => (
    <figure key={t.id}>
      <ProductScreen screen={t.screen} label={t.label} />
      <figcaption>
        {t.caption.map((c) => (
          <span key={c.strong}>
            <b>{c.strong}</b>
            {c.rest}
          </span>
        ))}
      </figcaption>
    </figure>
  ));
  return (
    <section id="product" className="alt" aria-labelledby="tour-title">
      <div className="wrap">
        <SectionHeader eyebrow={tour.eyebrow} title={tour.title} id="tour-title" lead={tour.lead} />
        <TourTabs tabs={tour.tabs} panels={panels} label="Product areas" />
      </div>
    </section>
  );
}
