import ArcoVue from '@arco-design/web-vue';
import { defineNuxtPlugin } from 'nuxt/app';
import '@arco-design/web-vue/dist/arco.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ArcoVue);
});
