import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//1,导入vant的toast提示
// import {
//   Toast
// } from 'vant';

// Vue.use(Toast);

// 全局引入vantUI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//2, 语言的国际化
function glanguage() {
  var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2); //截取lang前2位字符
  if (window.localStorage.getItem("userlang")) {
    // //console.log("用户已经设置了语言");
  } else {
    window.localStorage.setItem("lang", lang)
  }
}
glanguage()
// 2.1国际化的
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  // locale: 'zh',    // 1,语言标识中文
  //  locale: 'en',    // 2,语言标识英文
  //  locale: 'ja',    // 2,日语
  // locale: window.localStorage.getItem("lang"),
  locale: window.localStorage.getItem("userlang") ? window.localStorage.getItem("userlang") : window.localStorage.getItem("lang"), //2,语言标识英文
  //this.$i18n.locale //通过切换locale的值来实现语言切换
  messages: {
    'zh': require('../public/Languagepack/zn.js'), // 中文语言包
    'en': require('../public/Languagepack/en.js'), // 英文语言包
    'ja': require('../public/Languagepack/ja.js') // 英文语言包
    // ja//日语的
  }
})

// 3,qs的序列化的
import qs from 'qs'
Vue.use(qs)
//引入videoPlayer
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
//  Vue.use(VueVideoPlayer)

// 4,全局引入vue-video-player包
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)

//引入video样式
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import '../src/assets/style/playercustomer.css'
import '../src/assets/style/vantcustomer.css'

//4.1引入hls.js
import 'videojs-contrib-hls.js/src/videojs.hlsjs'

// 全局引入css样式区域
// import './assets/scss/popup.scss'//模态框弹出的样式
// 6,引入移动端点击300ms延迟事件
import FastClick from 'fastclick';
import $ from 'jquery';

FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
FastClick.attach(document.body);
//7, 全局导入axios
import axios from "axios";
// 8,设置到了Vue的原型上 目的是让所有的 Vue实例共享
Vue.prototype.$axios = axios;

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;
// Vue.http.headers.common['Authorization'] = 'Basic d2ViX2FwcDpjaGFuZ2VpdA=='
//axios 支持设置基地址
axios.defaults.baseURL = store.state.baseUrl;
axios.defaults.timeout = 100000;
// axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('Authorization');
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// 9,导入cookies的安装包
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// if ($cookies.get("access_token")=="") {
//   tourstuser()
// } 
//$cookies.config(expireTimes, path)
// 设置cookies的有效期，为0代表浏览器关闭就删除cookies
//关闭浏览器或者1天之后删除
VueCookies.config("1d")
// 有效期一天
VueCookies.config('0||1d')

// 全局变量和函数
//1,全局vue变量
import commonvar from './globalvariable/commonvar.vue'
Vue.prototype.commonvar = commonvar
//2, 全局api变量
import api from './api/api.vue'
Vue.prototype.api = api
//3,全局函数
import base from './globalmethods/base.js'
Vue.use(base);
//4,公共的方法
import commonMethods from './globalmethods/globamethods.js'
Vue.prototype.commonMethods = commonMethods
//5,公共的api方法
import apiMethods from './api/api.js'
Vue.prototype.apiMethods = apiMethods

// Vue.prototype.changeData = function (){//this.changeData()
//   //console.log("呵呵");
//   }
// 11,引入rem.js的适配
import '../public/Features/rem.js'
// 12,pc桌面端的适配
import '@vant/touch-emulator'

// 全局过滤器
import filters from './filter/filter.js'
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 公共方法
import customer from './globalmethods/customer.js';
Object.keys(customer).forEach(key=>{
  Vue.prototype["$"+key] = customer[key] 
})


// 13,
// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router})
// 设置axios拦截器
// 请求发送之前 会触发这个回调函数
// 修改请求的设置
// 11,请求拦截器
// 14,vue路由的转场动画
function tourLogin() {
  $.ajax({
    url: store.state.baseUrl + '/uaa/apid/user/tourist', //url路径
    type: 'GET', //GET
    async: false, //或false,是否异步
    data: {},
    timeout: 2000, //超时时间
    dataType: 'json', //返回的数据格式：
    beforeSend: function (xhr) {},
    success: function (data, textStatus, jqXHR) {
      //console.log(data);
      let token = 'bearer ' + data.access_token
      $cookies.set("tour_token", token);
    },
    error: function (xhr, textStatus) {
      //console.log(textStatus);
    },
    complete: function () {}
  });
}

function getLang() {
  var lang = window.localStorage.getItem('userlang');
  if (!lang) {
    lang = store.state.lang;
  }
  if (lang == 'zh' || lang.indexOf('zh-') >= 0) {
    lang = 'CN';
  }
  return lang;
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
  if (r != null) return unescape(r[2]);
  return null;
}
//alert(GetQueryString("APPToken"));
if (GetQueryString("APPToken") == null) {
  window.localStorage.setItem("iosapp", "no")
} else {
  window.localStorage.setItem("iosapp", "yes");
  $cookies.set("access_token", GetQueryString("APPToken"));
  $cookies.set("iosid", GetQueryString("id"));
}
// 调用方法
axios.interceptors.request.use(
  config => {
    config.headers.lang = getLang();
    if (GetQueryString("APPToken") != null) {
      //window.localStorage.clear();
      // $cookies.set("access_token", GetQueryString("APPToken"));
      // $cookies.set("iosid", GetQueryString("id"));
      config.headers.Authorization = $cookies.get('access_token');
      window.localStorage.removeItem('tour_token')
      window.localStorage.removeItem('tourusertype')
      window.localStorage.removeItem('response')
    } else {
      // 1，已经登录就添加登录的token
      if ($cookies.get('access_token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = $cookies.get('access_token')
      } else if ($cookies.get('tour_token')) {
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        // 2,没有登录就添加游客的token
        // config.params = {"":""}
        config.headers.Authorization = $cookies.get('tour_token')
      }
    }
    // 1,已经登录就添加登录的token
    // if ($cookies.get('access_token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    //   config.headers.Authorization = $cookies.get('access_token')
    // } else {
    //   // 2,没有登录就添加游客的token
    //   config.headers.Authorization = $cookies.get('tour_token')
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
if (!$cookies.get('access_token') && !$cookies.get('tour_token')) {
  tourLogin();
}
// tokenHeader();
// 12，axios 响应拦截器
// 请求响应回
axios.interceptors.response.use((response) => {
  if (response.status == 200) {
    //成功
    // if(response.data.err==!"MAINTAIN"){
    //  alert("呵呵")
    // }
  }
  return response;
}, (error) => {
  if (error.response) {
    if (error.response.status != 404) {
      if (error.response.status == 500) {
        console.log(error.response.data.msg);
      } else if (error.response.status == 409) {
        window.localStorage.setItem("response", error.response.data.message)
      } else if (error.response.status == 401) {
        if (error.response.data.error == "invalid_token") {
          $cookies.remove("tour_token")
          $cookies.remove("access_token")
          var coun = 0;
          var timeI = setInterval(() => {
            location.reload()
            coun++
            if (coun > 2) {
              window.clearInterval(timeI);
            }
          }, 0);
        } else if (error.response.data.error == "Unauthorized" || error.response.data.error == "unauthorized") {
          var count = 0;
          $cookies.remove("tour_token")
          $cookies.remove("access_token")
          var timeId = setInterval(() => {
            location.reload()
            count++
            if (count > 2) {
              window.clearInterval(timeId);
            }
          }, 0);
          tourLogin()
        }
      }
    }
  }
  return Promise.reject(error);
});
//   if () 
//13,全局导航守卫 登录前先判断
router.beforeEach((to, from, next) => {
  if (to.matched.some(function (item) {
      return item.meta.auth
    })) {
    next();
  } else {
    let token = $cookies.get('access_token');
    if (token) {
      // 登录成功
      next();
    } else {
      // 没有token 没有登录
      // 回登录页 可以使用next 进行路由跳转
      // next({
      //   path: '/login',
      //   query: {
      //     redirect: to.fullPath
      //   } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // })
      next('/login')
    }
  }
  //如果是登录页不允许手动跳转过去
  if (to.path === '/login') {
    if ($cookies.get('access_token')) {
      next({
        path: from.path
      })
    } else {
      next()
    }
  }
})

Vue.config.productionTip = false;
//路由和store的挂载
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");