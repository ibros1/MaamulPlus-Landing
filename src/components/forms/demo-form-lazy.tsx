'use client';

import dynamic from 'next/dynamic';
import { demoForm } from '@/content/forms';
import { FormPlaceholder } from './form-placeholder';

/**
 * The demo form's code (react-hook-form, zod, RTK Query, Turnstile) loads right after the page
 * is interactive instead of in the first load. The placeholder keeps the same size.
 */
export const DemoFormLazy = dynamic(() => import('./demo-form').then((m) => m.DemoForm), {
  ssr: false,
  loading: () => <FormPlaceholder title={demoForm.title} sub={demoForm.sub} kind="demo" />,
});
