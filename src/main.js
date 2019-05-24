// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './stores'
import App from './App'
import router from './router'
import './common/styles/reset.css'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import { Button,Cell, IndexList, IndexSection,Search,Field,Header,Progress} from 'mint-ui'
import Loading from '@/components/component/Loading/Loading'
Vue.component('Loading',Loading)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Cell.name, Cell)
Vue.component(Search.name, Search)
Vue.component(Field.name, Field)
Vue.component(IndexList.name, IndexList)
Vue.component(Progress.name, Progress)
Vue.component(IndexSection.name, IndexSection)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
