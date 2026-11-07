import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "reference/**",
      "support.js",
      "_ds/**",
      "assets/**",
      "uploads/**",
    ],
  },
];

export default eslintConfig;
