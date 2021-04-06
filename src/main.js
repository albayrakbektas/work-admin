import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'firebase/firestore'
import {fa} from '/firebaseConfig'
import 'firebase/auth'


Vue.config.productionTip = false


let app = ''

fa.onAuthStateChanged(function ()  {
  if(!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

