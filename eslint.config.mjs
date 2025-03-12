import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname, // Disponible en Node.js 20.11.0+
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      '@next/next/no-page-custom-font': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // 🔹 Permite `any` en TypeScript
      'react-hooks/exhaustive-deps': 'warn', // 🔹 Solo advertencia, no error
    },
  }),
];

export default eslintConfig;