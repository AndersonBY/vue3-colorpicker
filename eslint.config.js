import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import storybook from "eslint-plugin-storybook";
import vueParser from "vue-eslint-parser";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        jsxPragma: "React",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        HTMLElement: "readonly",
        MouseEvent: "readonly",
        FocusEvent: "readonly",
        HTMLInputElement: "readonly",
        Event: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      vue,
      prettier,
      jest,
      storybook,
    },
    files: ["**/*.{js,jsx,ts,tsx,vue}"],
    rules: {
      "@typescript-eslint/ban-ts-ignore": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "vue/custom-event-name-casing": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "space-before-function-paren": "off",
      "vue/attributes-order": "off",
      "vue/one-component-per-file": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/attribute-hyphenation": "off",
      "vue/require-default-prop": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: [".vue"],
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        HTMLElement: "readonly",
        MouseEvent: "readonly",
        FocusEvent: "readonly",
        HTMLInputElement: "readonly",
        Event: "readonly",
      },
    },
    rules: {
      ...vue.configs.recommended.rules,
      "no-undef": "error",
    },
  },
  {
    files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.stories.{js,ts,jsx,tsx}"],
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
];
