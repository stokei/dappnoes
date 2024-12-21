import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
  ...compat.plugins("react", "simple-import-sort"),
  {
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'only-multiline'],
      'linebreak-style': ['error', 'unix'],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'newline-per-chained-call': 'off',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'no-empty': 'off',
      'no-empty-pattern': 'off',
      'no-unsafe-optional-chaining': 'off',
  
      // TSlint
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/indent': 'off',
  
      // Next.js
      '@next/next/no-html-link-for-pages': 'off',
  
      // React
      'react/jsx-key': 'off',
      'react/display-name': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/no-array-index-key': 'off',
      'react-hooks/exhaustive-deps': [
        'error',
        {
          enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        },
      ],
  
      // Imports
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `next` and `react` related packages come first.
            ['^next', '^react', '^@?\\w'],
            // Internal packages.
            ['^(@)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    }
  }
];

export default eslintConfig;
