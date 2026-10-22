'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Input, errorId } from '@/components/ui/field';
import { Turnstile } from '@/components/ui/turnstile';
import { newsletterForm as copy } from '@/content/forms';
import { newsletterSchema } from '@/lib/schemas';
import { useSubscribeNewsletterMutation } from '@/store/api';
import { errorMessage } from './form-utils';

const formSchema = newsletterSchema.pick({ email: true, company_website: true });
type FormValues = z.infer<typeof formSchema>;

export function NewsletterForm() {
  const pathname = usePathname();
  const [subscribe, { isLoading, isSuccess }] = useSubscribeNewsletterMutation();
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { company_website: '' } });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    const result = await subscribe({
      ...values,
      startedAt: startedAt.current,
      turnstileToken: token || 'missing',
      page: pathname,
    });
    if ('error' in result) {
      setServerError(errorMessage(result.error).message);
      setResetKey((k) => k + 1);
    }
  };

  const err = errors.email?.message ?? serverError;
  return (
    <div className="newsletter">
      <h2 id="nl-title">{copy.title}</h2>
      <p>{copy.sub}</p>
      {isSuccess ? (
        <p className="newsletter__done" role="status">
          {copy.done}
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="nl-title" aria-busy={isLoading}>
          <label htmlFor="nl-email" className="vh">
            {copy.email}
          </label>
          <div className="newsletter__row">
            <Input
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder={copy.emailPh}
              invalid={!!err}
              {...register('email')}
            />
            <button className="mp-btn mp-btn--primary" type="submit" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="spin" aria-hidden="true" strokeWidth={2} /> : null}
              {isLoading ? copy.sending : copy.submit}
            </button>
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="nl-website">Company website</label>
            <input id="nl-website" type="text" tabIndex={-1} autoComplete="off" {...register('company_website')} />
          </div>
          <Turnstile onToken={setToken} resetKey={resetKey} />
          {err ? (
            <p className="err-inline" id={errorId('nl-email')} role="alert">
              {err}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
