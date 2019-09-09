import Vue from 'vue'
import App from './App.vue'

import './assets/css/common.css'
import router from './router'

import './plugins/vant'

//引入store
import store from './store'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')