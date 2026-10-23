import { features } from './features';
import { solutions } from './solutions';

export interface NavLink {
  label: string;
  href: string;
}

/** Header links. On the home page they scroll to sections; elsewhere they go to the home section. */
export const mainNav: NavLink[] = [
  { label: 'Product', href: '/#product' },
  { label: 'Editions', href: '/#editions' },
  { label: 'Accounting', href: '/features/accounting' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

export const navCopy = {
  skip: 'Skip to content',
  signIn: 'Sign in',
  signInMenu: 'Choose your edition',
  signInEditions: {
    enterprise: { label: 'MaamulPlus Enterprise', hint: 'Accounting, branches, agents and payroll', mobile: 'Sign in to Enterprise' },
    lite: { label: 'MaamulPlus Lite', hint: 'Sales, stock, credit and payments', mobile: 'Sign in to Lite' },
  },
  cta: 'Book a demo',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  theme: 'Switch colour theme',
  home: 'MaamulPlus home',
  mainLabel: 'Main',
};

export const footer = {
  description: 'Business management software for traders in Somaliland. Making business simpler.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'MaamulPlus Enterprise', href: '/enterprise' },
        { label: 'MaamulPlus Lite', href: '/lite' },
        { label: 'Product tour', href: '/#product' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Features',
      links: features.map((f) => ({ label: f.name, href: `/features/${f.slug}` })),
    },
    {
      title: 'Solutions',
      links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Book a demo', href: '/demo' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
  legal: [
    { label: 'Privacy policy', href: '/legal/privacy' },
    { label: 'Terms of service', href: '/legal/terms' },
  ],
  location: 'Hargeisa, Somaliland',
  domain: 'maamulplus.com',
};
