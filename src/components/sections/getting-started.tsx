import { SectionHeader } from '@/components/ui/section-header';
import { Steps } from '@/components/ui/steps';
import { steps as copy } from '@/content/home';

export function GettingStarted() {
  return (
    <section aria-labelledby="on-title">
      <div className="wrap">
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} id="on-title" lead={copy.lead} />
        <div className="rv">
          <Steps items={copy.items} />
        </div>
      </div>
    </section>
  );
}
