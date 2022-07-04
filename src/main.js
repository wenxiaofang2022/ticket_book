import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import http from './api/httpList.js';
import cookie from 'vue-cookie';
import SvgIcon from "@/components/svgIcon";
import CommonModal from "@/components/modal";

const app = createApp(App).use(store).use(router).component('svg-icon',SvgIcon).component('common-modal',CommonModal);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$http = http;
app.config.globalProperties.$cookie = cookie;
app.mount('#app');

const req = require.context('@/icons', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);