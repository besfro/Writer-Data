import Vue from 'vue'
import App from './App.vue'

import 'ant-design-vue/dist/antd.css';
import { Select, Radio, Button, Icon, message } from 'ant-design-vue';
Vue.use(Radio)
Vue.use(Select)
Vue.use(Button)
Vue.use(Icon)
Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
