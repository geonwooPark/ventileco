module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@next/next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    JSX: true,
  },
  ignorePatterns: ["src", "node_modules"],
  rules: {
    "react/react-in-jsx-scope": "off", //jsx파일에서 React를 import 하지 않아도 됨.
    "no-unused-vars": "off", //타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
    "@typescript-eslint/no-unused-vars": "warn", // 대신 사용하지 않는 변수는 @typescript/eslint를 통해 잡아줌.
    "react/require-default-props": "off",
    "no-underscore-dangle": "off",
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
  },
};
