module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'plugin:react/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'react/state-in-constructor': 0,
    indent: ['error', 2],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 0,
    'react/static-property-placement': ['error', 'static public field'],
    'react/prop-types': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    version: 'detect',
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
