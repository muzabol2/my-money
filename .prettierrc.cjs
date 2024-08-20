/** @type {import("prettier").Config} */

const IMPORT_ORDER_CONFIG = [
  ["<THIRD_PARTY_MODULES>"],
  ["^app"],
  ["^components"],
  ["^config"],
  ["^consts"],
  ["^context"],
  ["^hooks"],
  ["^icons"],
  ["^models"],
  ["^pages"],
  ["^reducers"],
  ["^services"],
  ["^styles"],
  ["^utils"],
  ["^\\./"],
  ["^\\../"],
].map((group) => group.join("|"));

module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 120,
  tabWidth: 2,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: IMPORT_ORDER_CONFIG,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
