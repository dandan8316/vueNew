<template>
    <div id="buyhistory">
        <div class="buyhistory">
            <van-nav-bar :title="$t('m.buyhistory')" left-arrow @click-left="onClickLeft" fixed v-show="isiosapp" />
            <div class="navba" v-show="isiosapp">
                <span>{{$t('m.playback')}}</span>
                <!-- <router-link to="/buyhistory/buyhistoryson"></router-link> -->
            </div>
            <!-- 推荐视频的出口的地方-->
            <div class="exit">
                <keep-alive v-transition>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive v-transition>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                isiosapp: true
            }
        },
        created() {
            if (window.localStorage.getItem("iosapp") == "yes") {
                this.isiosapp = false;
            }
        },
        updated() {
            if (window.localStorage.getItem("iosapp") == "yes") {
                this.isiosapp = false;
            }
        },
        methods: {
            //点击左侧按钮返回上一级
            onClickLeft() {
                this.$router.push({
                    path: '/mine'
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    #buyhistory {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding-top: 1.9rem;
    }
    .buyhistory {
        //vant的左侧返回键的颜色
        .van-icon-arrow-left {
            color: #2b2b2b;
            font-size: .8rem;
        } //头部的中间的文字颜色
        .van-nav-bar__title {
            font-size: 1rem;
            color: #101010;
            font-weight: 700;
        } //整个头部导航栏
        .van-nav-bar {
            border: none;
        }
        .van-tab {
            width: 100%;
            height: 100vh;
            border: none;
        }
        .navba {
            width: 100%;
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .7rem;
        }
        .van-icon {
            position: relative;
            font: 0.7rem/1 "vant-icon";
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            font-size: 1rem;
        }
    }
    .exit {
        margin-bottom: 2rem;
        width: 100%;
        height: auto;
    }
</style>