import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Notifications from "vt-notifications";
Vue.use(Vuetify);
Vue.use(Notifications);
export default new Vuetify({
    theme: {
        dark: true,
    },
});
