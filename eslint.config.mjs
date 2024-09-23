// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default createConfigForNuxt(
  {
    features: {
      tooling: true,
    },
  },
  eslintPluginPrettierRecommended,
).override('nuxt/vue/rules', {
  files: ['app.vue', 'error.vue', 'pages/**/*.vue', 'layouts/**/*.vue'],
  rules: {
    // disable the rule for these files
    'vue/multi-word-component-names': 'off',
  },
})
