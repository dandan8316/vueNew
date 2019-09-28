<template>
  <div id="hello">
    <!--头部开始-->
    <section class="header">
      <div class="set" @click="set">
        <!-- <img src="../assets/image/mine/me_icon_shezhi@2x.png" alt=""> -->
        <!-- <img src="../assets/image/tlminiicon/shouye_icon_more@2x.png" alt=""> -->
        <img src="../assets/image/tlminiicon/shangcheng_icon_kuozhan01@2x.png" alt="">
      </div>
      <div class="mine">{{$t('m.mine')}}</div>
      <div class="chat" @click="myMessage">
        <img src="../assets/image/mine/me_icon_xiaoxi@2x.png" alt="">
      </div>
    </section>
    <!-- 个人信息的主要部分 -->
    <section class="userInfo" @click="toperson(id,headpicd,descs)">
      <div class="userInfo_left">
        <img :src="headpic" alt="" @error="imgError">
      </div>
      <div class="userInfo_right">
        <div class="userInfo_rightTop">
          <ul>
            <li>{{nickname}}</li>
            <!-- 性别 -->
            <li>
              <img src="../assets/image/icon/homepsge_icon_11@2x.png" alt="" v-if="sisshow">
            </li>
            <li>
              <img src="../assets/image/icon/homepsge_icon_10@2x.png" alt="" v-if="mishow">
            </li>
            <li>
              <img src="../assets/image/icon/homepage_icon_zhongxing@2x.png" alt="" v-if="oisshow">
            </li>
          </ul>
        </div>
        <div class="userInfo_rightBottom">
          ID:<span>{{userKey}}</span>
        </div>
      </div>
      <div class="next">
        <van-icon name="arrow" />
      </div>
    </section>
    <!-- 主要区域 -->
    <div class="_main_section">
      <ul>
        <!-- 1,我的金币 -->
        <li @click="mygold">
          <img class="img" src="../assets/image/mine/me_icon_shouze@2x.png">
          <!-- {{$t('m.mygold')}} -->
          <van-cell :title="$t('m.mygold')" is-link :value="coin" />
          <!-- <span class="money">{{coin}}</span> -->
        </li>
        <!-- 2,会员的 -->
        <li @click="member" v-if="isjoinmember">
          <img class="img" src="../assets/image/mine/me_icon_huiyuan@2x.png">
          <!-- {{$t('m.mygold')}} -->
          <van-cell :title="$t('m.member')" is-link :value="expiration+$t('m.maturitytwo')" v-show="ismembership=='vip'" />
          <van-cell :title="$t('m.member')" is-link :value="$t('m.maturitythree')" v-show="ismembership=='none'" />
        </li>
        <!-- 3,购买记录 -->
        <li @click="buyhistory">
          <img class="img" src="../assets/image/mine/me_icon_goumaijilu@2x.png">
          <van-cell :title="$t('m.buyhistory')" is-link value="" />
        </li>
        <!-- 4,我的收益的 -->
        <li @click="myincome" v-if="ismyincome">
          <img class="img" src="../assets/image/mine/me_icon_wodeshouyi@2x.png">
          <van-cell :title="$t('m.myincome')" is-link value="" />
        </li>
        <!-- 5,套路守则的-->
        <li @click="taolurules" v-if="routinecode">
          <img class="img" src="../assets/image/mine/me_icon_shouze@2x.png">
          <van-cell :title="$t('m.routinecode')" is-link value="" />
        </li>
        <li @click="toset">
          <img class="img" src="../assets/image/mine/me_icon_shezhi@2x.png">
          <van-cell :title="$t('m.set')" is-link value="" />
        </li>
        <!-- 游客登录的模式 -->
        <van-popup v-model="isshowtourlogin" :close-on-click-overlay="true" :lazy-render="false" :round="true" id="tourpup">
          <div class="buybox2tourst">
            <div class="top"><span>{{$t('m.torlogin')}}</span></div>
            <img src="../assets/image/icon/biaoqianlan_icon_me02@3x.png" class="toplive" id="buybox3">
            <div class="buypayit" @click="videoconfirmpayone">
              <!-- <span>{{$t('m.tourtologin')}}</span> -->
              <span>{{$t('m.torstloginregist')}}</span>
            </div>
            <div class="backgo" @click="videocancelpaytwo">
              <van-icon name="cross" />
            </div>
            <div class="third_login">
              <div></div>
              <span>{{$t('m.Thirdpartylogin')}}</span>
              <div></div>
            </div>
            <div class="linelogin" @click="linelogin">
              <img src="https://myapp.smlvs.com/line.png" alt="">
            </div>
            <div class="linedes">
              LINE
            </div>
          </div>
        </van-popup>
      </ul>
    </div>
  </div>
</template>
<script>
  import Public from '../public.js';
  export default {
    // 控制会员充值的活动的按钮
    name: "",
    data() {
      return {
        // 会员的
        isjoinmember: this.$store.state.isjoinmember,
        // 收益的活动
        ismyincome: this.$store.state.myincome,
        // 套路守则的显示和隐藏
        routinecode: this.$store.state.routinecode,
        isshowtourlogin: false,
        //用户的头像
        headpic: '',
        // 用户名
        nickname: 'TL',
        //用户id
        userKey: '',
        //用户的金币的数量
        coin: '0',
        // 我的金币到期的时间
        expiration: '',
        // id
        id: '',
        headpicd: "",
        descs: "",
        // 2,性别
        sisshow: false,
        mishow: false,
        oisshow: false,
        //是否是会员
        ismembership: ""
      };
    },
    created() {
      //当前用户信息
      this.getuserinfos();
      this.getcoin()
    },
    mounted() {
      let self = this
      Public.$on('coinupdtate', function(val) {
        self.coin = val
      })
    },
    methods: {
      getcoin() {
        //我的金币的pay
        this.$axios.get('/pay/apiu/userMoney/user', )
          .then(res => {
            this.coin = res.data.data.coin
          })
          .catch(err => {
            console.error(err);
          })
      },
      //1,游客登录的,line登录
      linelogin() {
        window.location.href = this.$store.state.baseUrl + "/uaa/apid/line/login?toPage=index&loginType=" + "line";
      },
      getuserinfos() {
        this.$axios.get('/uaa/apiu/currentUser', )
          .then(res => {
            this.ismembership = res.data.data.resultVip;
            // //我的金币余额
            if (res.data.data.user.headpic) {
              this.headpic = res.data.data.user.headpic + '?imageView2/1/w/200'
            };
            if (res.data.data.user.nickname != "") {
              this.nickname = res.data.data.user.nickname;
            }
            this.userKey = res.data.data.user.userKey;
            this.id = res.data.data.user.id;
            this.headpicd = res.data.data.user.headpic;
            this.descs = res.data.data.user.descs;
            switch (res.data.data.user.sex != null) {
              case 1:
                this.sisshow = true;
                break;
              case 2:
                this.mishow = true;
                break;
              case 5:
                this.oisshow = true;
                break;
              default:
                break;
            }
            // if (res.data.data.user.sex) {
            //   if (res.data.data.user.sex == 1) {
            //     this.sisshow = true;
            //   } else if (res.data.data.user.sex == 2) {
            //     this.mishow = true;
            //   } else if (res.data.data.user.sex == 5) {
            //     this.oisshow = true;
            //   }
            // }
            // console.log(res.data.data.userVip.expireDate);
            // let exr = res.data.data.userVip.expireDate ;
            let exr = res.data.data.userVip.expireDate;
            if (exr != null || exr.length != 0) {
              this.expiration = res.data.data.userVip.expireDate;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 
      videoconfirmpayone() {
        this.$router.push({
          path: '/login'
        })
      },
      videocancelpaytwo() {
        this.isshowtourlogin = false;
      },
      //头像的图片出错后
      imgError() {
        this.headpic = require("../assets/image/icon/BBD_head.png");
      },
      //我的消息
      myMessage() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/myMessage'
          })
        }
      },
      //我的金币
      mygold() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/mygold'
          })
        }
      },
      // 会员
      member() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          if (this.ismembership == "vip") {
            this.$router.push({
              path: '/member',
              query: {
                member: this.expiration
              }
            })
          } else {
            this.$router.push({
              path: '/joinmember'
            })
          }
        }
      },
      //购买的历史记录
      buyhistory() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/buyhistory'
          })
        }
      },
      //购买的历史记录
      taolurules() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/agreement'
          })
        }
      },
      //我的收益的
      myincome() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/myincome'
          })
        }
      },
      // 个人主要的界面
      toperson(id, headpic, descs) {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          window.localStorage.setItem("frompath", this.$route.path)
          window.localStorage.setItem("findUserId", id)
          window.localStorage.setItem("headpic", headpic)
          this.$router.push({
            path: '/toperson',
            // query: {
            //   headpic: headpic,
            //   descs: descs
            // }
          })
        }
      },
      //返回上一级
      set() {
        // if (window.localStorage.getItem('tourusertype') == 7) {
        //   this.isshowtourlogin = true
        // } else {
        // }
        this.$router.push({
          path:'/free'
        })
      },
      // 
      toset() {
        if (window.localStorage.getItem('tourusertype') == 7) {
          this.isshowtourlogin = true
        } else {
          this.$router.push({
            path: '/set'
          })
        }
      },
      //退出登录
      gologinout() {
        //跳转到登录页
        this.$router.push({
          path: '/login'
        })
        this.$axios.get('/uaa/apiu/user/logout', )
          .then(res => {
            //console.log(res)
            // //console.log("退出成功");
            // window.sessionStorage.removeItem("Authorization");
            $cookies.remove('access_token');
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
  };
</script>

<style lang="scss" scoped>
  //背景颜色
  #hello {
    background: #f5f5f5;
    height: 100vh;
    width: 100%;
  } // 顶部
  .header {
    background-color: #ffffff;
    width: 100%;
    height: 2.2rem; // background-color: red;
    position: fixed;
    line-height: 2.2rem;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    box-shadow: 0px 2px 0px 0px rgba(245, 245, 245, 1);
    border-bottom: 1px solid #ccc;
    .set {
      display: flex;
      justify-content: center;
      align-items: center; // margin-left: .8rem;
      width: 2.5rem;
      img {
        width: .5rem;
        height: .9rem;
        transform: rotate(180deg)
      }
    }
    .mine {
      font-size: .85rem;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .chat {
      width: 2.5rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: .8rem;
        height: .8rem;
      }
    }
  } //用户信息
  section.userInfo {
    background-color: #fff;
    width: 100%;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2.2rem;
    .userInfo_left {
      width: 3.5rem;
      height: 100%;
      text-align: center;
      margin-right: .25rem;
      img {
        width: 2.75rem;
        height: 2.75rem;
        margin: 0 auto;
        margin-top: .375rem;
        border-radius: 50%;
      }
    }
    .userInfo_right {
      flex: 1;
      height: 100%;
      .userInfo_rightTop {
        width: 100%;
        height: 50%;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          li {
            &:nth-of-type(1) {
              font-size: .6rem;
              margin-right: .15rem;
            }
            &:nth-of-type(2) {
              img {
                width: .75rem;
                height: .75rem;
              }
            }
            &:nth-of-type(3) {
              img {
                width: 2.2rem;
                height: 1rem;
                margin-left: .1rem;
                margin-right: .1rem;
              }
            }
            &:nth-of-type(4) {
              img {
                width: .7rem;
                height: .7rem;
              }
            }
          }
        }
      }
      .userInfo_rightBottom {
        width: 100%;
        height: 50%;
        display: flex;
        font-size: .6rem;
        span {
          margin-left: .5rem;
        }
      }
    }
    .next {
      margin-right: .75rem;
      color: #999999;
      .van-icon {
        .van-icon {
          font-size: .8rem;
        }
      }
    }
  } // 主体的部分
  //主要区域的
  ._main_section {
    background-color: #ffffff;
    margin-top: .25rem;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      li {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: .025rem solid #ccc;
        box-sizing: border-box;
        height: 2rem;
        .van-cell {
          font-size: .7rem;
          line-height: 1.2rem;
          background-color: #fff;
          padding: .5rem .75rem;
          height: 2rem;
          border-bottom: .025rem solid #ccc;
        }
        .van-cell__title {
          font-size: .65rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        .van-cell__value {
          font-size: .65rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
        .van-cell__right-icon {
          margin-left: .25rem;
        }
        .van-cell__title,
        .van-cell__value {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: auto;
        }
        .van-cell__left-icon,
        .van-cell__right-icon {
          min-width: 1em;
          height: 1.2rem;
          font-size: .8rem;
          line-height: 1.2rem;
        }
        .img {
          width: .825rem;
          height: .8rem;
          margin-left: .75rem;
        }
      }
    }
  } // 游客登录的
  @import '../assets/scss/popup';
</style>
