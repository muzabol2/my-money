module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "prettier"],
  rules: {
    "no-console": "off",
    "no-undef": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["case", "default"], next: "*" },
      { blankLine: "any", prev: ["case", "default"], next: "case" },
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
    ],
    "arrow-body-style": ["error", "as-needed"],
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "no-duplicate-imports": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
  },
};
