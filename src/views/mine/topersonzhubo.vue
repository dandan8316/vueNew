<template>
    <div id="hello" v-cloak>
        <!--头部开始-->
        <div class="header">
            <div class="set" @click="back">
                <van-icon name="arrow-left" color="#fff" />
            </div>
        </div>
        <!-- 顶部区域开始 -->
        <div class="top">
            <div class="topmain">
                <div class="imgtop" v-cloak>
                    <img :src="headPictureicon" alt="" @error="imgError">
                </div>
                <!-- 图层蒙版 -->
                <div class="mask">
                </div>
                <!-- <div class="voice">
                                                                                                                                            <span> <img src="../../assets/image/mine/yuyin.png" alt="">                                          </span>
                                                                                                                                           <span>15</span>
                                                                                                                                            <span>秒</span>                                                                                        </div> -->
                <div class="hello" v-cloak>
                    <span>{{descs}}</span>
                </div>
            </div>
        </div>
        <!-- 底部区域开始 -->
        <!-- <div class="bottom_nav" :class="navbarFixed==true?'isfixedbottom_nav':'bottom_nav'"> -->
        <div class="bottom_nav">
            <ul>
                <li>
                    <!-- <router-link :to="{path:'/topersonzhubo/roucezhubo',query:{findUserId:this.findUserId,dataList:this.dataList}}">资料</router-link>  -->
                    <router-link to="/topersonzhubo/roucezhubo">{{$t('m.resouce')}}</router-link>
                </li>
                <li>
                    <!-- <router-link :to="{path:'/topersonzhubo/backplayzhubo',query:{findUserId:this.findUserId}}">回放</router-link> -->
                    <router-link to="/topersonzhubo/backplayzhubo">{{$t('m.playback')}}</router-link>
                </li>
            </ul>
            <!-- <van-tabs v-model="active">
                                                      <van-tab :title="$t('m.resouce')">
                                                          <rouce :childrenList="this.dataList"></rouce>
                                                      </van-tab>
                                                      <van-tab :title="$t('m.playback')">
                                                          <backplay :findUserId="this.findUserId"></backplay>
                                                      </van-tab>
                                                  </van-tabs> -->
            <!-- 路由的出口 -->
            <!-- <navigation> -->
            <keep-alive>
                    <router-view></router-view>
            </keep-alive>
            <!-- <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view> -->
            <!-- </navigation> -->
        </div>
    </div>
</template>
<script>
    // import rouce from './roucezhubo'; //主播的个人信息的组件
    // import backplay from './backplayzhubo'; //回放的个人视频资料
    export default {
        // components: {
        //     rouce,
        //     backplay
        // },
        data() {
            return {
                // leftrouce: true,
                // rightzhubo: false,
                rouce: 'rouce',
                backplay: 'backplay',
                currentView: 'rouce',
                active: 2,
                istrue: true,
                istrue1: false,
                //接收的id的参数
                // findUserId: '',
                dataList: {},
                headPictureicon: '',
                // 描述
                descs: '',
                beforepath: "",
                // 是否固定顶部的导航栏
                // navbarFixed:false
            }
        },
        updated() {
            // if (window.localStorage.getItem("descs")) {
            //     this.descs = window.localStorage.getItem("descs");
            // }
        },
        created() {
            //从上一个页面拿到findUserId赋值到本页面
            // this.findUserId = this.$route.query.findUserId;
            // this.findUserId = window.localStorage.getItem("findUserId");
            if (window.localStorage.getItem("headpic")) {
                this.headPictureicon = window.localStorage.getItem("headpic")
            }
            //   this.descs = window.localStorage.getItem("descs");
            if (window.localStorage.getItem("descs")) {
                this.descs = window.localStorage.getItem("descs");
            }
            // this.$axios.get('/uaa/apiu/user/get', {
            //         params: {
            //             findUserId: this.findUserId
            //         }
            //     })
            //     .then(res => {
            //         //console.log(res)
            //         this.dataList = res.data.data.user;
            //         // 描述
            //         this.descs = res.data.data.user.descs;
            //         
            //         // 从上一个页面获取的数据存入localstorage
            //         // window.localStorage.setItem("topersonzhubo", JSON.stringify(res.data.data.user));
            //         // // 本地存储取值
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     })
        },
        // 获取vue的路由的上一级路由的路径
        // beforeRouteEnter(to, from, next) {
        //     next(vm => {
        //         // 通过 `vm` 访问组件实例,将值传入oldUrl
        //         vm.oldUrl = from.path
        //         window.localStorage.setItem("frompath", from.path)
        //     })
        // },
        // beforeRouteLeave(to, from, next) {
        //     this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        //     next()
        // },
        // //进入该页面时，用之前保存的滚动位置赋值
        // beforeRouteEnter(to, from, next) {
        //     next(vm => {
        //         document.body.scrollTop = vm.scrollTop
        //     })
        // },
        methods: {
            //     gotorouce(){ 
            //    this.$router.push({
            //        path:'/topersonzhubo/roucezhubo',
            //        query:{
            //            childrenList:this.dataList
            //        }
            //    })
            //     },
            imgError() {
                this.headPictureicon = require('../../assets/image/icon/biaoqianlan_icon_wode02@2x.png');
            },
            //返回上一级
            back() {
                let frompath = window.localStorage.getItem("frompath")
                this.$router.push({
                    path: frompath
                })
            },
            // handleScroll(){
            //     var scrollTop = window.pageYOffset||document.documentElement.scrollTop || document.body.scrollTop
            //     var offsetTop = document.querySelector('.bottom_nav').offsetTop
            //     if(scrollTop>offsetTop){
            //         this.navbarFixed =true;
            //     }else if(scrollTop<offsetTop){
            //         this.navbarFixed =false;
            //     }
            // }
            // handleScroll() {
            //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //     var offsetTop = document.querySelector('.bottom_nav').offsetTop;
            //     var scrollsun = offsetTop + scrollTop;
            //     if (scrollTop > offsetTop) {
            //         document.querySelector('.bottom_nav').style.top = scrollTop + 'px';
            //     } else if (scrollTop > offsetTop) {
            //         document.querySelector('.bottom_nav').style.top = scrollsun + 'px';
            //     }
            // }
        },
        // 滚动
        // mounted() {
        //     window.addEventListener('scroll', this.handleScroll)
        // },
        // destroyed() {
        //     window.removeEventListener('scroll', this.handleScroll)
        // }
    };
</script>

<style lang="scss" scoped>
    // 花胡子不显示
    [v-cloak] {
        display: none !important;
    } //背景颜色
    #hello {
        background: #ffffff;
        height: 100vh;
        width: 100%;
    } // 顶部
    .header {
        width: 100%;
        height: 2.2rem;
        position: fixed;
        line-height: 2.2rem;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        top: 0;
        left: 0;
        .set {
            width: .8rem;
            height: .8rem;
            margin-left: .8rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .mine {
            margin-left: 6.95rem;
            font-size: .85rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .chat {
            width: .8rem;
            height: .8rem;
            margin-right: .5rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .top {
        width: 100%;
        height: 16.25rem;
        .topmain {
            width: 100%;
            height: 100%;
            position: relative;
            .imgtop {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            } //图层蒙版
            .mask {
                position: absolute;
                background-color: #000000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0.3; // border-radius: .25rem .25rem 0rem 0rem;
            }
            .voice {
                position: absolute;
                left: .75rem;
                top: 11.85rem;
                z-index: 888;
                display: flex;
                border-radius: .5rem;
                background-color: #ffffff;
                padding: .25rem;
                span {
                    font-size: .55rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(7, 156, 84, 1);
                    img {
                        width: .4rem;
                        height: .55rem;
                    }
                    &:nth-last-of-type(2) {
                        margin-left: 2.15rem;
                    }
                }
            }
            .hello {
                position: absolute;
                left: .775rem;
                bottom: .55rem;
                span {
                    height: .625rem;
                    font-size: .6rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(252, 142, 13, 1);
                    line-height: .65rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }
    } // 底部的主要部分
    .isfixedbottom_nav {
        width: 100%;
        position: fixed;
        top: 0;
        right: 0;
    }
    .bottom_nav {
        width: 100%;
        ul {
            width: 100%;
            height: 2.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            background-color: #ffffff;
            li {
                width: 50%;
                height: 2.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: 100%;
                    font-size: .65rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: gray;
                    line-height: .65rem;
                    &.router-link-active {
                        font-size: .85rem !important;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: black;
                        border-bottom: .1rem solid black;
                        border-radius: .1rem;
                    }
                }
            }
        }
    }
</style>

