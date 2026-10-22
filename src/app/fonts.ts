import { DM_Sans, Inter } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});
