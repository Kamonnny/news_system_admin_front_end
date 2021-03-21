import App from './App.vue'
import router from './router'
import setupAntDesign from './lib/setupAntDesign'
import { store, key } from './store'
import { createApp } from 'vue'
import './assets/less/global.less'

createApp(App).use(setupAntDesign).use(store, key).use(router).mount('#app')
