// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'nuxt-monaco-editor'],
  app: {
    head: {
      title: 'AST Explorer',
    },
  },
  ssr: false,
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
  vue: {
    defineModel: true,
  },
  vite: {
    define: {
      'process.env': JSON.stringify({}),
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    'floating-vue/dist/style.css',
    '~/styles/vars.css',
    '~/styles/global.css',
    '~/styles/dropdown.css',
  ],
  devtools: {
    enabled: true,
  },
  imports: {
    dirs: ['./composables', './composables/language', './utils'],
  },
})
