import { createApp } from 'vue';
import App from './app.vue';
import './index.css';
import 'vuetify/styles';
import vuetify from './plugins/vuetify';
import vueI18n from './plugins/i18n/vue-i18n';
import pinia from './plugins/pinia';

const app = createApp(App);

// plugins
app.use(pinia);
app.use(vueI18n);
app.use(vuetify);
// MOUNT
app.mount('#app');
