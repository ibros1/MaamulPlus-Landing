import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'maamulplus-website-kit/**',
      'next-env.d.ts',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
      'src/components/ui/logo-sprite.tsx',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  ...tseslint.configs.strict,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'import/no-default-export': 'off',
    },
  },
  {
    // No raw hex colours in components: use the design tokens.
    files: ['src/**/*.tsx'],
    ignores: ['src/components/app-ui/mac-frame.tsx', 'src/app/**/opengraph-image.tsx', 'src/app/**/twitter-image.tsx', 'src/lib/og.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([^0-9a-zA-Z_-]|$)/]',
          message: 'Use a design token (CSS variable / Tailwind class) instead of a raw hex colour.',
        },
        {
          selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([^0-9a-zA-Z_-]|$)/]',
          message: 'Use a design token (CSS variable / Tailwind class) instead of a raw hex colour.',
        },
      ],
    },
  },
  {
    files: ['scripts/**', 'tests/**', 'e2e/**', '*.config.*'],
    rules: { 'no-console': 'off' },
  },
);
