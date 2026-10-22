'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Field, Input, Select, Textarea } from '@/components/ui/field';
import { Turnstile } from '@/components/ui/turnstile';
import { contactForm as copy } from '@/content/forms';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { contactSchema } from '@/lib/schemas';
import { useSubmitContactMutation } from '@/store/api';
import { errorMessage, readUtm } from './form-utils';

const formSchema = contactSchema.pick({
  name: true,
  email: true,
  phone: true,
  topic: true,
  message: true,
  company_website: true,
});
type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const pathname = usePathname();
  const [submit, { isLoading }] = useSubmitContactMutation();
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [doneName, setDoneName] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const doneRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: 'sales', phone: '', company_website: '' },
  });

  useEffect(() => {
    if (doneName) doneRef.current?.focus();
  }, [doneName]);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const result = await submit({
      ...values,
      startedAt: startedAt.current,
      turnstileToken: token || 'missing',
      page: pathname,
      utm: readUtm(),
    });
    if ('data' in result && result.data) {
      track({ name: 'contact_submit_success', props: { topic: values.topic } });
      setDoneName(values.name.trim().split(/\s+/)[0] ?? values.name);
      return;
    }
    const { message, fieldErrors } = errorMessage(result.error);
    if (fieldErrors) {
      for (const [k, v] of Object.entries(fieldErrors)) {
        if (k in formSchema.shape && v?.[0]) setError(k as keyof FormValues, { message: v[0] });
      }
    }
    setServerError(message);
    setResetKey((k) => k + 1);
  };

  return (
    <form
      className={cn('form form--plain', doneName && 'sent')}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isLoading}
      aria-labelledby="contact-form-title"
    >
      <div className="full">
        <h2 id="contact-form-title">{copy.title}</h2>
        <p className="sub">{copy.sub}</p>
      </div>
      <Field id="c-name" label={copy.name} error={errors.name?.message}>
        <Input id="c-name" autoComplete="name" placeholder={copy.namePh} invalid={!!errors.name} {...register('name')} />
      </Field>
      <Field id="c-email" label={copy.email} error={errors.email?.message}>
        <Input
          id="c-email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPh}
          invalid={!!errors.email}
          {...register('email')}
        />
      </Field>
      <Field
        id="c-phone"
        label={
          <>
            {copy.phone} <span className="opt">{copy.optional}</span>
          </>
        }
        error={errors.phone?.message}
      >
        <Input
          id="c-phone"
          type="tel"
          autoComplete="tel"
          placeholder={copy.phonePh}
          invalid={!!errors.phone}
          {...register('phone')}
        />
      </Field>
      <Field id="c-topic" label={copy.topic} error={errors.topic?.message}>
        <Select id="c-topic" invalid={!!errors.topic} {...register('topic')}>
          {copy.topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="c-msg" label={copy.message} error={errors.message?.message} full>
        <Textarea id="c-msg" placeholder={copy.messagePh} invalid={!!errors.message} {...register('message')} />
      </Field>
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Company website</label>
        <input id="c-website" type="text" tabIndex={-1} autoComplete="off" {...register('company_website')} />
      </div>
      <Turnstile onToken={setToken} resetKey={resetKey} />
      {serverError ? (
        <p className="form-error full" role="alert">
          {serverError}
        </p>
      ) : null}
      <div className="full">
        <button className="mp-btn mp-btn--primary mp-btn--lg mp-btn--block" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="spin" aria-hidden="true" strokeWidth={2} />
              {copy.sending}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight className="mp-arrow" aria-hidden="true" strokeWidth={2} />
            </>
          )}
        </button>
      </div>
      <div className="done" role="status" aria-live="polite" tabIndex={-1} ref={doneRef}>
        {doneName ? (
          <>
            <div className="well">
              <Check aria-hidden="true" strokeWidth={2} />
            </div>
            <h2>{copy.doneTitle}</h2>
            <p>{copy.doneBody(doneName)}</p>
          </>
        ) : null}
      </div>
    </form>
  );
}
