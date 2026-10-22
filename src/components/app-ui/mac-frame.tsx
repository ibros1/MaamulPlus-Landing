import { ChevronLeft, ChevronRight, Copy, Lock, Plus, Share } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ScaleFit } from './scale-fit';

interface MacFrameProps {
  /** Path after the host, e.g. "dashboard" → app.maamulplus.com/dashboard */
  path: string;
  /** Describes the screen for screen readers and search engines (rich alt text). */
  label: string;
  tall?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * A macOS-style browser window holding a coded product screen.
 * The 1280×760 app canvas is scaled to the frame width by <ScaleFit>.
 * Traffic-light colours live in app-screens.css (the one place raw hex is allowed).
 */
export function MacFrame({ path, label, tall = false, className, children }: MacFrameProps) {
  return (
    <div className={cn('mac', className)} role="img" aria-label={label}>
      <div className="mac-bar" aria-hidden="true">
        <div className="mac-lights">
          <i />
          <i />
          <i />
        </div>
        <div className="mac-nav">
          <ChevronLeft strokeWidth={2} />
          <ChevronRight strokeWidth={2} />
        </div>
        <div className="mac-url">
          <Lock strokeWidth={2} />
          <span>
            <b>app.maamulplus.com</b>/{path}
          </span>
        </div>
        <div className="mac-tools">
          <Share strokeWidth={1.75} />
          <Plus strokeWidth={1.75} />
          <Copy strokeWidth={1.75} />
        </div>
      </div>
      <ScaleFit tall={tall}>{children}</ScaleFit>
    </div>
  );
}
