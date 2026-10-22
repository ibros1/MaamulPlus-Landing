'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Field, Input, SegmentedRadio, Select, Textarea } from '@/components/ui/field';
import { Turnstile } from '@/components/ui/turnstile';
import { demoForm as copy } from '@/content/forms';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { demoRequestSchema, type Edition } from '@/lib/schemas';
import { useSubmitDemoRequestMutation } from '@/store/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPreselectedEdition } from '@/store/uiSlice';
import { errorMessage, readUtm } from './form-utils';

const formSchema = demoRequestSchema.pick({
  edition: true,
  name: true,
  business: true,
  phone: true,
  email: true,
  branches: true,
  message: true,
  company_website: true,
});
type FormValues = z.infer<typeof formSchema>;

interface DemoFormProps {
  /** On the standalone /demo page a successful request continues to /thank-you. */
  redirectOnSuccess?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function DemoForm({ redirectOnSuccess = false, headingLevel = 'h3' }: DemoFormProps) {
  const Heading = headingLevel;
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const preselected = useAppSelector((s) => s.ui.preselectedEdition);
  const [submit, { isLoading }] = useSubmitDemoRequestMutation();
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState<{ firstName: string; edition: string } | null>(null);
  const startedAt = useRef(Date.now());
  const doneRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { edition: preselected, branches: '1', email: '', message: '', company_website: '' },
    shouldFocusError: true,
  });

  // Plan buttons elsewhere on the page set the edition; /demo restores it from the previous page.
  useEffect(() => {
    setValue('edition', preselected);
  }, [preselected, setValue]);
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem('mp-edition');
      if (saved === 'lite' || saved === 'enterprise') dispatch(setPreselectedEdition(saved));
    } catch {
      // Storage blocked: keep the default edition.
    }
  }, [dispatch]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

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
      const edition: Edition = values.edition;
      track({ name: 'demo_submit_success', props: { edition, branches: values.branches } });
      setDone({
        firstName: values.name.trim().split(/\s+/)[0] ?? values.name,
        edition: edition === 'lite' ? 'MaamulPlus Lite' : 'MaamulPlus Enterprise',
      });
      if (redirectOnSuccess) router.push('/thank-you');
      return;
    }
    const { message, status, fieldErrors } = errorMessage(result.error);
    track({ name: 'demo_submit_error', props: { status: String(status) } });
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
      className={cn('form', done && 'sent')}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isLoading}
      aria-labelledby="demo-form-title"
    >
      <div className="full">
        <Heading id="demo-form-title">{copy.title}</Heading>
        <p className="sub">{copy.sub}</p>
      </div>

      <SegmentedRadio
        name="edition"
        legend={copy.edition}
        options={copy.editions}
        inputProps={register('edition')}
      />

      <Field id="f-name" label={copy.name} error={errors.name?.message}>
        <Input id="f-name" autoComplete="name" placeholder={copy.namePh} invalid={!!errors.name} {...register('name')} />
      </Field>
      <Field id="f-biz" label={copy.business} error={errors.business?.message}>
        <Input
          id="f-biz"
          autoComplete="organization"
          placeholder={copy.businessPh}
          invalid={!!errors.business}
          {...register('business')}
        />
      </Field>
      <Field id="f-phone" label={copy.phone} error={errors.phone?.message}>
        <Input
          id="f-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={copy.phonePh}
          invalid={!!errors.phone}
          {...register('phone')}
        />
      </Field>
      <Field id="f-email" label={<>{copy.email} <span className="opt">{copy.optional}</span></>} error={errors.email?.message}>
        <Input
          id="f-email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPh}
          invalid={!!errors.email}
          {...register('email')}
        />
      </Field>
      <Field id="f-br" label={copy.branches} error={errors.branches?.message} full>
        <Select id="f-br" invalid={!!errors.branches} {...register('branches')}>
          {copy.branchOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        id="f-msg"
        label={<>{copy.message} <span className="opt">{copy.optional}</span></>}
        error={errors.message?.message}
        full
      >
        <Textarea id="f-msg" placeholder={copy.messagePh} invalid={!!errors.message} {...register('message')} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Company website</label>
        <input id="f-website" type="text" tabIndex={-1} autoComplete="off" {...register('company_website')} />
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
        {done ? (
          <>
            <div className="well">
              <Check aria-hidden="true" strokeWidth={2} />
            </div>
            <Heading>{copy.doneTitle}</Heading>
            <p>{copy.doneBody(done.firstName, done.edition)}</p>
          </>
        ) : null}
      </div>
    </form>
  );
}
