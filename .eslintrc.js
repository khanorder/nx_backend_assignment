// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.base.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'lf' }],
        '@typescript-eslint/no-explicit-any': 'warn'
    },
    settings: {
        'import/resolver': {
            typescript: { project: 'tsconfig.base.json' }
        }
    }
};
