import Vue from 'vue';
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small'
});
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission'; // 权限
import './error'; // 日志
import './cache';//页面缓存
import store from './store';
import gtMessage from "./api/system/Messager"

// Vue.prototype.$message = gtMessage;
// import {loadStyle} from './util/util'
import * as urls from '@/config/env';

import $ from 'jquery';

Vue.prototype.$ = $;
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
// import {
//   iconfontUrl,
//   iconfontVersion
// } from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';
import './styles/table.css';
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import thirdRegister from './components/third-register/main'
import avueUeditor from 'avue-plugin-ueditor';
import website from '@/config/website';
import './util/dialog';

import global_variable from "@/api/global_variable";
import router from './router/router';

Vue.prototype.GLOBAL = global_variable;


Vue.use(router);
Vue.use(VueAxios, axios);

Vue.use(window.AVUE, {
  size: 'small',
  tableSize: 'small',
  i18n: (key, value) => i18n.t(key, value)
});

Element.Dialog.props.closeOnClickModal.default = false;//修改默认点击遮罩不关闭弹窗

//注册全局容器
Vue.component('basicContainer', basicContainer);
Vue.component('basicBlock', basicBlock);
Vue.component('thirdRegister', thirdRegister);
Vue.component('avueUeditor', avueUeditor);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 加载website
Vue.prototype.website = website;

// // 动态加载阿里云字体库
// iconfontVersion.forEach(ele => {
//   loadStyle(iconfontUrl.replace('$key', ele));
// });

Vue.config.productionTip = false;

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

import './assets/ali/bladeIconFont.css'
import './assets/ali/systemIconFont.css'


window.vvm=gtMessage

new Vue({
  router,
  data: function () {
    return {
      reportAddress: 'PC20200924',//定义的全局报告URL地址
    }
  },
  $,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
