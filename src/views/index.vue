<template>
    <div id="index">
        <!-- 头部 -->
        <div class="header">
            <!-- 搜索栏 -->
            <div class="head_nav" v-show="istourusertype">
                <div class="left_icon" @click="touserInfo">
                    <img src="../assets/image/tlminiicon/usericon.png" alt="">
                </div>
                <!-- <div class="search" @click="tosearch"> -->
                <div class="search">
                    <img src="../assets/image/tlminiicon/search.png" alt="">
                    <span>搜索你的喜欢</span>
                </div>
            </div>
            <!-- 导航栏 -->
            <ul class="ul">
                <li v-for="(item, index) in tabbars " :key="item.index">
                    <router-link :to="item.name">
                        {{item.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 路由切换的出口 -->
        <div class="exit" ref="outexit">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                //tababar的切换数据
                tabbars: [{
                        // 1,free免费
                        name: 'free',
                        title: "Free"
                    },
                    // 2,关注
                    {
                        name: 'attention',
                        title: '关注',
                        // title: 'Free',
                    },
                    // 3,精选
                    {
                        name: 'featured',
                        // title: 'Free'
                        title: '精选'
                    },
                    // 4,主播
                    {
                        name: 'anchor',
                        // title: 'Free'
                        title: '主播'
                    }
                ],
                // 是否登录
                istourusertype: true,
                wechatlogin: {
                    actype: '',
                    username: ''
                },
            }
        },
        created() {
            // 游客就隐藏搜索栏
            // if (window.localStorage.getItem("tourusertype") == 7) {
            //     this.istourusertype = false;
            //     this.$refs.outexit.style.marginTop = 1.8 + "rem";
            // } else if (window.localStorage.getItem("tourusertype") != 7) {
            //     this.istourusertype = true;
            //     this.$refs.outexit.style.marginTop = 4 + "rem";
            // }
            // 第三方登录
            if (this.$route.query.openid) {
                // this.wechatlogin.actype = $cookies.get("acTypeCode")
                this.wechatlogin.username = this.$route.query.openid;
                if (this.$route.query.actype) {
                    this.wechatlogin.actype = this.$route.query.actype;
                    this.thirdwelogin()
                }
            }
        },
        mounted() {
            // 游客就隐藏搜索栏
            // if (window.localStorage.getItem("tourusertype") == 7) {
            //     this.$refs.outexit.style.marginTop = 1.8 + "rem";
            // } else if (window.localStorage.getItem("tourusertype") != 7) {
            //     this.$refs.outexit.style.marginTop = 4 + "rem";
            // }
        },
        methods: {
            // 1,去搜索的页面
            // tosearch() {
            //     this.$router.push({
            //         // path: '/search'
            //         path: '/searchindex'
            //     })
            // },
            //我的
            touserInfo() {
                this.$router.push({
                    path: '/mine'
                })
            },
            //第三方登录的
            thirdwelogin() {
                let wechatlogin = qs.stringify(this.wechatlogin);
                this.$axios.post('/uaa/oauth/third', wechatlogin)
                    .then(res => {
                        window.localStorage.removeItem('tourusertype')
                        window.localStorage.removeItem('response')
                        $cookies.set("access_token", 'bearer ' + res.data.access_token);
                        this.$toast("登录成功")
                    })
                    .catch(err => {
                        this.$toast(err.response.data.message)
                    })
            },
        }
    }
</script>
<style lang="scss" scoped>
    [v-cloak] {
        display: none !important;
    } //顶部
    .header {
        height: fit-content;
        width: 100vw;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999999999; // 搜索栏
        .head_nav {
            width: 100vw;
            height: 2.2rem;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            .left_icon {
                width: 1.5rem;
                height: 1.5rem;
                padding-left: .75rem;
                padding-right: .5rem;
                display: flex;
                justify-content: center;
                align-items: center; // background-color: yellow;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .search {
                width: 14.5rem;
                height: 1.5rem;
                background: rgba(238, 238, 238, 1);
                border-radius: .75rem;
                display: flex;
                align-items: center;
                padding-left: .75rem;
                img {
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 50%;
                    margin-right: .5rem;
                }
                span {
                    font-size: .6rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            }
        } // 导航栏
        .ul {
            width: 100vw;
            height: 1.75rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px .25rem 0px 0px rgba(238, 238, 238, 1);
            display: flex;
            box-sizing: border-box;
            align-items: center;
            li {
                width: fit-content;
                padding-left: 1rem;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center; //background-color: red;
                &:nth-of-type(1) {
                    padding-left: .9rem;
                }
                a {
                    text-align: center;
                    width: 100%;
                    height: 90%;
                    font-size: .75rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(102, 102, 102, 1);
                    display: flex;
                    align-items: center;
                    position: relative;
                    div {
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: none;
                        width: 24px;
                        height: .125rem;
                        background: rgba(51, 51, 51, 1);
                        border-radius: .075rem;
                    }
                    &.router-link-active {
                        position: relative;
                        font-size: .85rem;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1);
                        display: flex;
                        align-items: center;
                        &::after {
                            content: '';
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            width: 1.2rem;
                            height: .125rem;
                            background: rgba(51, 51, 51, 1);
                            border-radius: .075rem;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }
    } // 路由的出口
    .exit {
        width: 100%;
        height: 100%;
        margin-top: 4rem;
        margin-bottom: 1rem; // background-color: red;
    }
</style>