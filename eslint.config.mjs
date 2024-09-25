import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  {files: ['**/*.{js,mjs,cjs,ts}',],},
  {languageOptions: { globals: globals.browser, },},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: {
    semi: 'error',
    quotes: ['error', 'single',],
    'comma-dangle': ['error', {
      'arrays': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
      'objects': 'always',
    },
    ],
    'eol-last': 'error',
  }, },
];
