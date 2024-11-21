module.exports = {
  root: true,
  plugins: ["stylelint-order"],
  extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
          "extend",
          "use",
        ],
      },
    ],
    "no-empty-source": null,
    "named-grid-areas-no-invalid": null,
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "no-invalid-position-at-import-rule": null,
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    "unit-no-unknown": [
      true,
      {
        ignoreUnits: ["rpx"],
      },
    ],
    "order/order": [
      [
        "dollar-variables",
        "custom-properties",
        "at-rules",
        "declarations",
        {
          type: "at-rule",
          name: "supports",
        },
        {
          type: "at-rule",
          name: "media",
        },
        "rules",
      ],
      {
        severity: "warning",
      },
    ],
    "media-feature-range-notation": null,
    "import-notation": null,
    "function-no-unknown": null,
    "custom-property-pattern": null,
    "selector-class-pattern": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
  },
  overrides: [
    {
      files: ["**/*.{vue,html,scss,sass}"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
