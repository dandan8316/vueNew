<template>
    <div>
        <van-nav-bar :title="$t('m.language')" left-arrow @click-left="onClickLeft" />
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell :title="$t('m.chinese')" clickable>
                    <van-radio name="1" checked-color="#323332" @click="radiozh" />
                </van-cell>
                <van-cell :title="$t('m.langenglish')" clickable>
                    <van-radio name="2" checked-color="#323332" @click="radioen" />
                </van-cell>
                <van-cell :title="$t('m.Japanese')" clickable>
                    <van-radio name="3" checked-color="#323332" @click="radioja" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </div>
</template>

<script>
    import {
        clearTimeout,
        setInterval,
        setTimeout
    } from 'timers';
    export default {
        data() {
            return {
                radio: ''
            }
        },
        beforeCreate() {
            // window.localStorage.setItem("userlang", 'zh')
        },
        created() {
            var lang = window.localStorage.getItem("userlang") ? window.localStorage.getItem("userlang") : window.localStorage.getItem("lang")
            //console.log(lang);
            if (lang == "zh") {
                this.radio = "1"
            } else
            if (lang == "en") {
                this.radio = "2"
            } else if (lang == "ja") {
                this.radio = "3"
            }
        },
        methods: {
            onClickLeft() {
                this.$router.push({
                    path:'/set'
                });
                
            },
            radiozh() {
                window.localStorage.setItem("userlang", 'zh')
                this.$toast.success("success")
                //console.log("中文的");
                let colckzh = window.setTimeout(() => {
                    this.$router.go(0);
                    window.clearInterval(colckzh)
                }, 1000);
            },
            radioen() {
                window.localStorage.setItem("userlang", 'en')
                this.$toast.success("success")
                //console.log("英文");
                let colcken = window.setTimeout(() => {
                    this.$router.go(0);
                    window.clearInterval(colcken)
                }, 1000);
            },
            radioja() {
                //console.log("日本的");
                window.localStorage.setItem("userlang", 'ja')
                this.$toast.success("success")
                let colckja = window.setTimeout(() => {
                    this.$router.go(0);
                    window.clearInterval(colckja)
                }, 1000);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .van-nav-bar {
        height: 2.25rem;
        .van-nav-bar__title {
            font-size: .85rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            width: 66px;
        }
        .van-icon {
            color: #333333;
        }
    }
</style>