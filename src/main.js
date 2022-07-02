import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import gojs from 'gojs'
Vue.config.productionTip = false
Vue.use(gojs)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
