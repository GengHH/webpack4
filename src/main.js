import Vue from 'vue'
import App from './App.vue'
<<<<<<< Updated upstream
//import Element from 'element-ui'
 
Vue.config.productionTip = false; // 这个样式必须引入
//Vue.use(Element); 
=======
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false; // 这个样式必须引入
Vue.use(Element);
>>>>>>> Stashed changes

const app = new Vue({
  el: '#app',
  //  data:{
  //    mymsg:'welcome to webpack4!'
  //  },
  //render: h => h(App)
  render: function (h) {
    return h(App);
  }
});