import type { Metadata } from 'next';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Thank you',
  description: 'Thank you for your request. The MaamulPlus team will call you to arrange your demo and prepare a quote for your users and branches.',
  path: '/thank-you',
  noindex: true,
});

export default function ThankYouPage() {
  const when = site.promises.replyWithinOneWorkingDay ? 'within one working day' : 'soon';
  return (
    <section className="page-hero page-hero--center" aria-labelledby="page-title">
      <div className="wrap">
        <div className="page-hero__copy">
          <div className="done-well">
            <CircleCheck aria-hidden="true" strokeWidth={1.75} />
          </div>
          <h1 id="page-title">Thank you, we have your request.</h1>
          <p className="lead">Our team will call you {when} to arrange your demo and prepare a quote for your users and branches.</p>
          <div className="hero-cta">
            <Button href="/#product" variant="primary">
              Take the product tour
            </Button>
            <Button href="/blog" variant="outline">
              Read our guides
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
