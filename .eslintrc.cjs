module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:qwik/recommended",
    "plugin:storybook/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json"],
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { "import/resolver": { typescript: true, node: true } },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "no-multiple-empty-lines": 2,

    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/consistent-type-imports": [
      2,
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],

    "import/no-unresolved": [
      2,
      {
        ignore: ["@qwik-client-manifest"],
      },
    ],
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        distinctGroup: true,
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": 2,
    "import/consistent-type-specifier-style": [2, "prefer-top-level"],
  },
};
