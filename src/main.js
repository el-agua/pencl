import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import vuelidate from "vuelidate";
import VueMathjax from 'vue-mathjax'




Vue.config.productionTip = false
Vue.use(vuelidate)
Vue.use(VueMathjax)
Vue.use(Buefy)
new Vue({
  router,
  
  render: h => h(App)
}).$mount('#app')

