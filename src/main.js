import Vue from 'vue'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Carousel3d from 'vue-carousel-3d';
import VueRouter from 'vue-router';
import {routes} from "./routes/routes.js";
import {store} from "./store/store.js"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSweetalert2);  
Vue.use(library)
Vue.use(Carousel3d);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  //aqui se ponen las rutas
  routes,
  mode:"history"
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
