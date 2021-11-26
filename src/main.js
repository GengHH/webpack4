/*
 * @Author: GengHH
 * @Date: 2020-11-18 14:41:17
 * @LastEditors: GengHH
 * @LastEditTime: 2021-11-26 14:46:10
 * @Description: file content
 * @FilePath: \vue2\src\main.js
 */
import Vue from "vue"
import App from "./App.vue"

import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.config.productionTip = false // 这个样式必须引入
Vue.use(Element)

const app = new Vue({
	el: "#app",
	//  data:{
	//    mymsg:'welcome to webpack4!'
	//  },
	//render: h => h(App)
	render: function(h) {
		return h(App)
	},
})
