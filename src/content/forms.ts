import { site } from '@/config/site';

const reply = site.promises.replyWithinOneWorkingDay ? 'within one working day' : 'soon';

export const demoForm = {
  title: 'Request a demo',
  sub: `We reply ${reply}.`,
  edition: 'Edition',
  editions: [
    { value: 'enterprise', label: 'Enterprise', note: 'Full accounting, branches' },
    { value: 'lite', label: 'Lite', note: 'Small & medium business' },
  ],
  name: 'Your name',
  namePh: 'e.g. Abdi Ahmed',
  business: 'Business name',
  businessPh: 'e.g. Hargeisa Spare Parts',
  phone: 'Phone',
  phonePh: '+252 63 …',
  email: 'Email',
  emailPh: 'e.g. abdi@example.com',
  optional: '(optional)',
  branches: 'Branches',
  branchOptions: [
    { value: '1', label: '1' },
    { value: '2-3', label: '2–3' },
    { value: '4-10', label: '4–10' },
    { value: '10+', label: 'More than 10' },
  ],
  message: 'What do you sell?',
  messagePh: 'e.g. Spare parts, wholesale and retail, two shops in Hargeisa',
  submit: 'Request a demo',
  sending: 'Sending…',
  doneTitle: 'Thank you, we have your request.',
  doneBody: (firstName: string, edition: string) => `Our team will call ${firstName} about ${edition} ${reply}.`,
};

export const contactForm = {
  title: 'Send us a message',
  sub: `We reply ${reply}.`,
  name: 'Your name',
  namePh: 'e.g. Hodan Ali',
  email: 'Email',
  emailPh: 'e.g. hodan@example.com',
  phone: 'Phone',
  phonePh: '+252 63 …',
  optional: '(optional)',
  topic: 'Topic',
  topics: [
    { value: 'sales', label: 'Sales and pricing' },
    { value: 'support', label: 'Support for an existing account' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Something else' },
  ],
  message: 'Message',
  messagePh: 'How can we help?',
  submit: 'Send message',
  sending: 'Sending…',
  doneTitle: 'Thank you, your message is with us.',
  doneBody: (firstName: string) => `We will get back to ${firstName} ${reply}.`,
};

export const newsletterForm = {
  title: 'Practical notes for traders',
  sub: 'One email a month with guides on credit, stock and bookkeeping. No spam.',
  email: 'Email address',
  emailPh: 'you@example.com',
  submit: 'Subscribe',
  sending: 'Subscribing…',
  done: 'Thank you. Please check your inbox.',
};
