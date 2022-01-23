import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import VueCompositionApi from "@vue/composition-api"


Vue.use(VueCompositionApi)
Vue.use(VueRouter)
Vue.use(firestorePlugin)
Vue.config.productionTip = false

import Chats from './components/Chats'
import Profile from './components/Profile'

import vuetify from './plugins/vuetify'


const router = new VueRouter({
  routes: [
    { path: '/', component: Chats },
    { path: '/chats', component:Chats, name: 'chat'},
    { path: '/chats/:id', component:Chats, name: 'chatId'},
    { path: '/profile/:id', component:Profile, name:'profile'},
  ]
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
