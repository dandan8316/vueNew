<template>
    <div id="rooucezhubo" v-cloak>
        <div class="personInf">
            <span>{{$t('m.personMessage')}}</span>
        </div>
        <div class="bottom">
            <div class="userIcon" v-cloak v-if="imgicon">
                <img :src="imgicon" alt="" @error="imgError">
            </div>
            <div class="right">
                <div class="top" v-cloak>
                    <span>{{this.childrenLists.nickname}}</span>
                    <!-- 角色 -->
                    <img src="../../assets/image/icon/homepsge_icon_09@2x.png" v-if="ishowsexs" alt="">
                    <img src="../../assets/image/icon/homepsge_icon_08@2x.png" alt="" v-if="ishowsexm">
                    <img src="../../assets/image/icon/homepage_icon_xingbie@2x.png" alt="" v-if="ishowsexo">
                    <!-- 性别 -->
                    <img src="../../assets/image/icon/homepsge_icon_11@2x.png" alt="" v-if="sisshow">
                    <img src="../../assets/image/icon/homepsge_icon_10@2x.png" alt="" v-if="mishow">
                    <img src="../../assets/image/icon/homepage_icon_zhongxing@2x.png" alt="" v-if="oisshow">
                    <!-- 星座 -->
                    <!-- 魔蝎座 -->
                    <!-- <img src="../../assets/image/icon/homepage_icon_xingzuo01@2x.png" v-if="ishow1" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo02@2x.png" v-if="ishow2" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo03@2x.png" v-if="ishow3" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo04@2x.png" v-if="ishow4" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo05@2x.png" v-if="ishow5" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo06@2x.png" v-if="ishow6" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo07@2x.png" v-if="ishow7" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo08@2x.png" v-if="ishow8" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo09@2x.png" v-if="ishow9" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo10@2x.png" v-if="ishow10" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo11@2x.png" v-if="ishow11" alt="">
                        <img src="../../assets/image/icon/homepage_icon_xingzuo12@2x.png" v-if="ishow12" alt=""> -->
                    <img src="../../assets/image/icon/homepage_icon_xingzuo01@2x.png" v-if="this.childrenLists.constellation == '魔羯座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo02@2x.png" v-if="this.childrenLists.constellation == '金牛座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo03@2x.png" v-if="this.childrenLists.constellation == '白羊座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo04@2x.png" v-if="this.childrenLists.constellation == '巨蟹座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo05@2x.png" v-if="this.childrenLists.constellation == '狮子座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo06@2x.png" v-if="this.childrenLists.constellation == '处女座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo07@2x.png" v-if="this.childrenLists.constellation == '天秤座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo08@2x.png" v-if="this.childrenLists.constellation == '射手座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo09@2x.png" v-if="this.childrenLists.constellation == '双子座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo10@2x.png" v-if="this.childrenLists.constellation == '水瓶座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo11@2x.png" v-if="this.childrenLists.constellation == '双鱼座'" alt="">
                    <img src="../../assets/image/icon/homepage_icon_xingzuo12@2x.png" v-if="this.childrenLists.constellation == '天蝎座'" alt="">
                </div>
                <div class="center" v-cloak>
                    <span>ID：</span>
                    <span>{{this.childrenLists.userKey}}</span>
                    <!-- <span>[</span> -->
                    <!-- <span>5</span>
                                                                <span>分钟前.在线]</span> -->
                </div>
                <div class="bottom">
                    <img src="../../assets/image/mine/homepage_icon_didian@2x.png" alt="">
                    <span>{{this.childrenLists.city}}</span>
                </div>
            </div>
        </div>
        <div class="bottomline">
        </div>
        <!-- 更多功能 -->
        <div class="over">
            {{$t('m.tapsmorefunction')}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                findUserId: "",
                childrenLists: "",
                //默认的头像的图标
                imgicon: '',
                // 图标显示
                // 1，显示角色
                ishowsexs: false,
                ishowsexm: false,
                ishowsexo: false,
                // 2,性别
                sisshow: false,
                mishow: false,
                oisshow: false,
                // 3,星座
                ishow1: false, //魔蝎座
                ishow2: false, //金牛座
                ishow3: false, //白羊座
                ishow4: false, //巨蟹座
                ishow5: false, //狮子座
                ishow6: false, //处女座
                ishow7: false, //天秤座
                ishow8: false, //射手座
                ishow9: false, //双子座
                ishow10: false, //水瓶座
                ishow11: false, //双鱼座
                ishow12: false //天蝎座
            }
        },
        created() {
            // 如果是ios
            if (window.localStorage.getItem('iosapp') == "yes") {
                this.findUserId = $cookies.get("iosid");
            } else {
                this.findUserId = window.localStorage.getItem("findUserId")
            }
            this.$axios.get(this.api.globalApi.intoRoomUserinfo, {
                    params: {
                        findUserId: this.findUserId
                    }
                })
                .then(res => {
                    //console.log(res)
                    this.childrenLists = res.data.data.user;
                    //console.log(res.data.data.user.descs);
                    window.localStorage.setItem("descs", res.data.data.user.descs)
                    // window.localStorage.setItem("topersonzhubo", JSON.stringify(res.data.data.user));
                    // // 本地存储取值
                })
                .catch(err => {
                    console.error(err);
                })
            this.getchildren()
        },
        updated() {
            this.getchildren()
        },
        methods: {
            //头像的图片出错后默认的图片
            imgError() {
                this.imgicon = require('../../assets/image/icon/BBD_head.png');
            },
            getchildren() {
                if (this.childrenLists.headpic) {
                    this.imgicon = this.childrenLists.headpic + '?imageView2/1/w/100';
                }
                // 角色的
                if (this.childrenLists.sexRole == 1) {
                    this.ishowsexs = true;
                } else if (this.childrenLists.sexRole == 2) {
                    this.ishowsexm = true;
                } else if (this.childrenLists.sexRole == 5) {
                    this.ishowsexo = true;
                }
                // 性别的
                if (this.childrenLists.sex == 1) {
                    this.sisshow = true;
                } else if (this.childrenLists.sex == 2) {
                    this.mishow = true;
                } else if (this.childrenLists.sex == 5) {
                    this.oisshow = true;
                }
                // 星座的constellation
                // if (this.childrenLists.constellation == "魔羯座") {
                //     this.ishow1 = true;
                // } else if (this.childrenLists.constellation == "金牛座") {
                //     this.ishow2 = true;
                // } else if (this.childrenLists.constellation == "白羊座") {
                //     this.ishow3 = true;
                // } else if (this.childrenLists.constellation == "巨蟹座") {
                //     this.ishow4 = true;
                // } else if (this.childrenLists.constellation == "狮子座") {
                //     this.ishow5 = true;
                // } else if (this.childrenLists.constellation == "处女座") {
                //     this.ishow6 = true;
                // } else if (this.childrenLists.constellation == "天秤座") {
                //     this.ishow7 = true;
                // } else if (this.childrenLists.constellation == "射手座") {
                //     this.ishow8 = true;
                // } else if (this.childrenLists.constellation == "双子座") {
                //     this.ishow9 = true;
                // } else if (this.childrenLists.constellation == "水瓶座") {
                //     this.ishow10 = true;
                // } else if (this.childrenLists.constellation == "双鱼座") {
                //     this.ishow11 = true;
                // } else if (this.childrenLists.constellation == "天蝎座") {
                //     this.ishow12 = true;
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    } //个人信息
    .personInf {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: .8rem;
        line-height: .85rem;
        span {
            margin-left: .75rem;
            font-size: .65rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
    } //底部的用户的信息
    .bottom {
        width: 17.25rem;
        height: 2.75rem;
        margin: 0 auto;
        margin-top: .725rem;
        display: flex; // justify-content: flex-start;
        // align-items: flex-start;
        // padding-bottom: .75rem; 
        // border-bottom: 1px solid #f5f5f5;
        // 用户的头像
        .userIcon {
            width: 2.75rem;
            height: 2.75rem;
            margin-right: .55rem;
            img {
                width: 2.75rem;
                height: 2.75rem;
                display: block;
                border-radius: 50%;
            }
        } // 右边的用户信息的部分
        .right {
            height: 2.75rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-start;
            flex: 1;
            .top {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 33.33333%;
                span {
                    margin-right: .325rem;
                    font-size: .8rem;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }
                img {
                    width: .7rem;
                    height: .7rem;
                    margin-right: .25rem;
                    &:nth-of-type(3) {
                        width: 1.2rem;
                        height: .7rem;
                    }
                    &:nth-of-type(4) {
                        width: 1.2rem;
                        height: .7rem;
                    }
                }
            }
            .center {
                width: 100%;
                height: 33.33333%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span {
                    font-size: .6rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    &:nth-of-type(2) {
                        margin-right: .55rem;
                    }
                    &:nth-of-type(3),
                    &:nth-of-type(4),
                    &:nth-of-type(5) {
                        font-size: .55rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(7, 156, 84, 1);
                    }
                }
            }
            .bottom {
                width: 100%;
                height: 33.33333%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 0;
                span {
                    font-size: .6rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    margin-right: .25rem;
                }
                img {
                    width: .4rem;
                    height: .5rem;
                    margin-right: .25rem;
                }
            }
        }
    }
    .bottomline {
        width: 17.25rem;
        height: .75rem;
        margin: 0 auto; // margin-top: .725rem;
        border-bottom: 1px solid #f5f5f5;
    }
    .over {
        height: .7rem;
        font-size: .65rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: .85rem;
        text-align: center;
        margin-top: 4.725rem;
    }
</style>