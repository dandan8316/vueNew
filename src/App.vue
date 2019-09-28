<template>
  <div id="#app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 账号在其他地方登录的弹框 -->
    <van-popup v-model="isshowtourlogin" @click-overlay="clicktankuang">
      <div class="buyboxapp">
        <div class="top">
          <span>{{responmessage}}</span>
          <!-- <span>账号异地登录</span> -->
        </div>
        <img src="../src/assets/image/icon/biaoqianlan_icon_me02@3x.png" class="toplive1" id="buybox3app">
        <div class="buypayit" @click="videoconfirmpayone">
          <span>{{$t('m.tourtologin')}}</span>
        </div>
      </div>
    </van-popup>
    <!-- 维护中 -->
    <van-popup v-model="isweihu" @click-overlay="clicktankuang">
      <div class="maintain">
        <div class="top">
          <span>页面正在维护中,预计7-15日恢复正常</span>
        </div>
        <div class="button" @click="maintenance">
          <span>{{$t('m.Gotit')}}</span>
        </div>
      </div>
    </van-popup>
    <!-- 维护中 -->
    <!-- <van-dialog v-model="isweihu" :title="testtitle" :confirmButtonText="testconfirm" :cancelButtonText="testcancel">
              </van-dialog> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //模态框矩阵
        isweihu: false, //维护找那个
        // testcancel: "", //取消的
        // testconfirm: "知道了", //确认的
        // testtitle: "页面正在维护中,预计7-15日恢复正常", //标题的
        isshowtourlogin: false, //异地登录
        responmessage: "", //账号登录消息
      }
    },
    mounted() {
      //游客登录的地方
      if ($cookies.get('access_token')) {
        window.localStorage.removeItem("tourusertype")
      } else {
        window.localStorage.setItem("tourusertype", "7")
      }
      if (window.localStorage.getItem("tourusertype")) {
        if (window.localStorage.getItem("tourusertype") == "7") {
          window.localStorage.removeItem("response")
        }
      }
      this.isloginother();
      // if(window.sessionStorage.getItem('errmaintain')){
      // }
    },
    updated() {
      if (navigator.onLine) {} else {
        this.$toast("Network disconnection")
      }
       this.isloginother()
      // 更新时设置语言
       this.glanguage()
    },
    // created() {
    // this.$cookies.set("default_unit_second","input_value","0");   
    // },
    methods: {
      // 账号登录
      isloginother() {
        //如果是登录注册忘记密码就隐藏，不是就显示
        if (this.$route.path == '/login' || this.$route.path == '/register' || this.$route.path == '/emailregister' || this.$route.path == '/emaillogin' || this.$route.path == '/forgetpassword' || this.$route.path == '/emailforgetpassword') {
          this.isshowtourlogin = false;
        } else {
          if (window.localStorage.getItem('response')) {
            this.responmessage = window.localStorage.getItem('response')
            this.isshowtourlogin = true;
          }
        }
        // 如果已经登录了，就删除游客的token
        if ($cookies.get('access_token')) {
          // window.localStorage.removeItem("tour_token")
          window.localStorage.removeItem("tourusertype")
        } else {
          window.localStorage.setItem("tourusertype", "7")
        }
        if (window.localStorage.getItem("tourusertype")) {
          if (window.localStorage.getItem("tourusertype") == 7) {
            window.localStorage.removeItem("response")
          }
        }
      },
      // 点击空白的地方关闭弹框
      clicktankuang() {
        window.localStorage.removeItem("response")
      },
      // 维护中
      maintenance() {
        this.isweihu = false;
      },
      // 点击去登录就去登录
      videoconfirmpayone() {
        this.$router.push({
          path: '/login'
        })
        this.isshowtourlogin = false
      },
      //2, 语言的国际化
      glanguage() {
        var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
        lang = lang.substr(0, 2); //截取lang前2位字符
        if (window.localStorage.getItem("userlang")) {
          //console.log("用户已经设置了语言");
        } else {
          window.localStorage.setItem("lang", lang)
        }
      },
      //游客的
    },
    isweihuclose() {
      this.isweihu = false;
    }
  }
</script>

<style lang="scss" scoped>
  // 
  #app {
    background-color: #fff;
  } // v模态框
  .van-popup {
    border-radius: .25rem;
  } // 子盒子
  .buyboxapp {
    width: 15rem;
    height: 7.5rem;
    position: relative;
    .top {
      width: 100%;
      margin-top: 2rem; // position: absolute;
      // top: 40
      display: flex;
      justify-content: center;
      span {
        color: black;
        font-weight: 500;
      }
    }
    .buypayit {
      width: 14.5rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000000;
      border-radius: 1rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: .5rem;
      span {
        font-size: .65rem;
        color: #fff;
        margin-right: .1rem;
      }
    }
    .backgo {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      height: 2rem;
      span {
        font-size: .65rem;
        color: black;
        font-weight: bold;
      }
    }
  } // 图片的logo
  #buybox3app {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
  } // 
  // .van-dialog {
  //   width: 15rem;
  //   height: 6.9rem;
  // }
  // .van-dialog__footer {
  //   overflow: hidden;
  //   -webkit-user-select: none;
  //   user-select: none;
  //   position: absolute;
  //   bottom: 10px;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }
  .maintain {
    background: rgba(255, 255, 255, 1);
    border-radius: .25rem;
    width: 14rem;
    height: 6.9rem;
    background: rgba(255, 255, 255, 1);
    border-radius: .25rem;
    .top {
      width: 10.75rem;
      height: auto;
      font-size: .75rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 1.125rem;
      margin: 1.5rem 32px 0 1.65rem;
      text-align: center;
    }
    .button {
      width: 7.775rem;
      height: 2rem;
      background: rgba(67, 67, 67, 1);
      border-radius: .25rem;
      margin: 1.1rem auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: .75rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>