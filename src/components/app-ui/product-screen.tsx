import type { ScreenKey } from '@/content/features';
import { MacFrame } from './mac-frame';
import { screens } from './screens';

/** A coded product screen inside its macOS window frame. */
export function ProductScreen({ screen, label, className }: { screen: ScreenKey; label: string; className?: string }) {
  const { Component, path } = screens[screen];
  return (
    <MacFrame path={path} label={label} {...(className ? { className } : {})}>
      <Component />
    </MacFrame>
  );
}
