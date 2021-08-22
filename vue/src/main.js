import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import VueCountdownTimer from 'vuejs-countdown-timer'
import store from './store'
Vue.use(VueCountdownTimer)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
