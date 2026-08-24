import tsParser from '@typescript-eslint/parser';
import obsidianmd from 'eslint-plugin-obsidianmd';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      }
    },
    plugins: {
      obsidianmd: obsidianmd.default || obsidianmd,
    },
    rules: {
      'obsidianmd/no-static-styles-assignment': 'error',
    },
  },
];
