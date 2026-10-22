import dynamic from 'next/dynamic';

/** The demo form sits below the fold, so its code loads in a separate chunk. It is still server-rendered. */
export const DemoFormLazy = dynamic(() => import('./demo-form').then((m) => m.DemoForm));
