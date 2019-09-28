<template>
    <div class="setbox">
        <van-nav-bar :title="$t('m.set')" left-arrow @click-left="onClickLeft" />
        <van-cell :title="$t('m.bindphone')" icon="" is-link @click="bindphone" :value="$t('m.Immediatelybinding')" />
        <!-- <van-cell :title="$t('m.staffservice')" icon="https://myapp.smlvs.com/line.png" is-link value="ID:bdsmkf" /> -->
        <van-cell :title="$t('m.contactus')" icon="" is-link value="" @click="contactus" />
        <van-cell :title="$t('m.commonproblem')" icon="" is-link value="" @click="lowproblem" />
        <van-cell :title="$t('m.language')" icon="" is-link :value="he" @click="languagechange" />
        <button id="exitout" @click.prevent="gologinout">{{$t('m.gologinout')}}</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                he: ""
            }
        },
        created() {
            this.getLanguage();
        },
        methods: {
            getLanguage() {
                var lang = window.localStorage.getItem("lang")
                var userlang = window.localStorage.getItem("userlang")
                if (userlang) {
                    if (userlang == "zh") {
                        this.he = this.$t('m.simplifiedChinese')
                    } else if (userlang == "en") {
                        this.he = this.$t('m.langenglish')
                    } else if (userlang == "ja") {
                        this.he = this.$t('m.Japanese')
                    }
                } else {
                    if (lang == "zh") {
                        this.he = this.$t('m.simplifiedChinese')
                    } else if (lang == "en") {
                        this.he = this.$t('m.langenglish')
                    } else if (lang == "ja") {
                        this.he = this.$t('m.Japanese')
                    }
                }
            },
            onClickLeft() {
                this.$router.push({
                    path: "/mine"
                })
            },
            // 去绑定手机的页面
            bindphone() {
                this.$router.push({
                    path: '/bindphone'
                })
            },
            languagechange() {
                this.$router.push({
                    path: '/languagechange'
                })
            },
            gologinout() {
                this.$axios.get(this.api.globalApi.loginOut, )
                    .then(res => {
                        //console.log(res)
                        // //console.log("退出成功");
                        // window.sessionStorage.removeItem("Authorization");
                        $cookies.remove('access_token');
                        this.$router.replace({
                            path: '/login'
                        })
                        // let routeData = this.$router.resolve({
                            // name: "login",
                            // query: params,
                            // params: {
                            //     catId: params.catId
                            // }
                        // });
                        // window.open(routeData.href, '_blank');
                        // sessionStorage.clear()
                    })
                    .catch(err => {
                        console.error(err);
                    })
                //跳转到登录页
            },
            // 联系我们的
            contactus() {
                this.$router.push({
                    path: '/contactus'
                })
            },
            // 常见问题
            lowproblem() {
                this.$router.push({
                    path: '/lowproblem'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setbox {
        width: 100%;
        height: 100vh;
        .van-nav-bar {
            height: 2.25rem;
            .van-nav-bar__title {
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
            .van-icon {
                color: #333333;
            }
        }
        #exitout {
            width: 15rem;
            height: 2rem;
            background: rgba(51, 51, 51, 1);
            border-radius: .25rem;
            display: block;
            margin: 6.875rem auto;
            text-align: center;
            line-height: 2rem;
            font-size: .85rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
        }
    }
</style>