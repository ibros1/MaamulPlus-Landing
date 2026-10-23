'use client';

import dynamic from 'next/dynamic';
import { contactForm } from '@/content/forms';
import { FormPlaceholder } from './form-placeholder';

/** Contact form, loaded after the page is interactive. The placeholder keeps the same size. */
export const ContactFormLazy = dynamic(() => import('./contact-form').then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <FormPlaceholder title={contactForm.title} sub={contactForm.sub} kind="contact" />,
});
