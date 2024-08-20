module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["build/", "node_modules/", "**/dist/**/*", "**/coverage/**/*", "**/jest_html_reporters/**/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
  plugins: ["@typescript-eslint", "import", "prettier", "react", "react-hooks", "react-refresh"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "arrow-body-style": ["error"],
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
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": "off", // for ignoring double check on typescript prop types
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "prettier/prettier": ["error", { endOfLine: "lf" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    // "@typescript-eslint/consistent-type-imports": "error",
    // "import/no-cycle": ["error"],
    // "import/no-default-export": "error",
    // "import/prefer-default-export": "off",
    // "import/group-exports": "error",
    // "import/exports-last": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [
          ["app", "./src/app"],
          ["components", "./src/components"],
          ["config", "./src/config"],
          ["consts", "./src/consts"],
          ["context", "./src/context"],
          ["icons", "./src/icons"],
          ["models", "./src/models"],
          ["pages", "./src/pages"],
          ["reducers", "./src/reducers"],
          ["services", "./src/services"],
          ["styles", "./src/styles"],
          ["utils", "./src/utils"],
        ],
        extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
      },
    },
  },
  globals: {
    window: true,
    module: true,
  },
};
