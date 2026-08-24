import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import obsidianmd from 'eslint-plugin-obsidianmd';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      obsidianmd: obsidianmd.default || obsidianmd,
    },
    rules: {
      'obsidianmd/no-static-styles-assignment': 'error',
      'obsidianmd/hardcoded-config-path': 'error',
      'obsidianmd/prefer-create-el': 'error',
      'obsidianmd/prefer-window-timers': 'error',
      'obsidianmd/validate-manifest': 'error',
      'obsidianmd/validate-license': 'error',
      'obsidianmd/commands/no-command-in-command-id': 'error',
      'obsidianmd/commands/no-plugin-id-in-command-id': 'error',
    },
  },
];
