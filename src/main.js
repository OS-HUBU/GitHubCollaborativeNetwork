import Vue from 'vue'
// import App from './App.vue'
import App1 from './APP1.vue'
import "@/css/reset.css"
import "@/css/index.css"
import "@/css/common.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';




Vue.use(ElementUI);

Vue.config.productionTip = false



new Vue({
  render: h => h(App1),
}).$mount('#app')
