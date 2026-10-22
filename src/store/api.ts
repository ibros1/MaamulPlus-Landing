import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiOk, ContactInput, DemoRequestInput, NewsletterInput } from '@/lib/schemas';

/** Every browser → API call goes through here. */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (b) => ({
    submitDemoRequest: b.mutation<ApiOk, DemoRequestInput>({
      query: (body) => ({ url: 'demo-request', method: 'POST', body }),
    }),
    submitContact: b.mutation<ApiOk, ContactInput>({
      query: (body) => ({ url: 'contact', method: 'POST', body }),
    }),
    subscribeNewsletter: b.mutation<ApiOk, NewsletterInput>({
      query: (body) => ({ url: 'newsletter', method: 'POST', body }),
    }),
  }),
});

export const { useSubmitDemoRequestMutation, useSubmitContactMutation, useSubscribeNewsletterMutation } = api;
