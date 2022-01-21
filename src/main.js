import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import VueCompositionApi from "@vue/composition-api"


Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

import Home from './components/Home'
import vuetify from './plugins/vuetify'


const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/chats/:id', component:Home, name: 'chat'},

  ]
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
