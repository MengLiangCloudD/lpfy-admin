import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   //地址
    // url:"http://2p495946b1.qicp.vip/",
    url:"http://www.yhtcs.cn/",
    // url:"http://jiayuan1912.51vip.biz/",//花生壳
    // url:'http://2p495946b1.qicp.vip/',
    // url:"http://zhangshenggui.natapp1.cc/",
    // url: "http://192.168.0.104:8080/", //阿贵
    // url: "http://192.168.1.195:8080/", //志浩33.21
    // url: "http://222.223.131.135:8888/", //春涛
  },
  mutations: {
    //保存url请求头
    setUrl(state, url) {
      localStorage.setItem("url", url);
      state.url = url;
    },
  },
  getters: {
    //获取url请求头
    getUrl(state) {
      return state.url;
    },
  },
  actions: {
    
    
  },
  modules: {
    user,
    app
  }
})