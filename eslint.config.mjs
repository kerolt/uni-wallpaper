import pluginVue from "eslint-plugin-vue";

export default [
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "vue/multi-word-component-names": 0,
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 12,
          multiline: {
            max: 13,
          },
        },
      ],
      "vue/first-attribute-linebreak": ["off"],
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error"],
      // "vue/singleline-html-element-content-newline": ["ignore"]
    }
  }
];