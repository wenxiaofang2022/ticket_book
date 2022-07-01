import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import http from './api/httpList.js';
import cookie from 'vue-cookie';

const app = createApp(App).use(store).use(router);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$http = http;
app.config.globalProperties.$cookie = cookie;
app.mount('#app');