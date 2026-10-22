import Link from 'next/link';
import type { IconName } from '@/content/features';
import { Icon } from './icon';

interface FeatureCardProps {
  icon: IconName;
  title: string;
  body: string;
  /** Optional link; the whole title becomes a descriptive internal link. */
  href?: string;
  headingLevel?: 'h2' | 'h3';
}

export function FeatureCard({ icon, title, body, href, headingLevel = 'h3' }: FeatureCardProps) {
  const Heading = headingLevel;
  return (
    <div className="mp-feature">
      <div className="mp-feature__icon">
        <Icon name={icon} />
      </div>
      <Heading>
        {href ? (
          <Link href={href} className="mp-feature__link">
            {title}
          </Link>
        ) : (
          title
        )}
      </Heading>
      <p>{body}</p>
    </div>
  );
}
