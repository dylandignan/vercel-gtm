const { FlatCompat } = require("@eslint/eslintrc")

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  ...compat.extends("next/core-web-vitals", "prettier"),
  {
    rules: {
      "react/jsx-curly-spacing": "off",
      "react/jsx-equals-spacing": "off",
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",
      "react/jsx-max-props-per-line": "off",
      "react/jsx-tag-spacing": "off",
      "react/jsx-wrap-multilines": "off",
    },
  },
]
