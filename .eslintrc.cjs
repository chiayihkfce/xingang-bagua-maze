module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'react-hooks/exhaustive-deps': 'warn',
    // react-hooks v7 新增的嚴格規則，既有程式碼大量使用「同步 setState 初始化」
    // 模式，逐步重構前先降為警告，避免阻擋 CI
    'react-hooks/set-state-in-effect': 'warn',
    'prefer-const': 'error',
    'react-hooks/rules-of-hooks': 'error'
  }
};
