import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import hooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/**', '.idea/**', '.husky/_/**', 'playwright-report/**', 'test-results/**']),
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [hooks.configs.flat.recommended],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  prettier,
]);
