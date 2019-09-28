<template>
    <div>
        <!-- 1,模态框的弹出提示 -->
        <!-- <van-popup v-model="isshowbuy" :close-on-click-overlay="false" :lazy-render="false" round @click-overlay="clickOverlaynobuy"> -->
        <van-popup v-model="isshowbuy" :close-on-click-overlay="false" :lazy-render="false" round>
            <div class="buybox">
                <!-- 1,文字 -->
                <div class="top"><span>{{$t('m.buylive')}}</span></div>
                <!-- 2,右上角的关闭 -->
                <van-icon name="cross" class="buxboxicon" @click="nobuyvideo" />
                <!-- <div class="liveroomtry"  >
                    <span>
                                         {{$t('m.trysee')}}
                                    </span>
                </div> -->
                <!-- 3，买下它 -->
                <div class="buypayit" @click="videoconfirm">
                    <!-- <div class="buypayit"> -->
                    <div class="right">
                        <img src="../assets/image/icon/goldicon.png" alt="">
                        <span>{{this.buylive.money}}</span>
                        <span>{{$t('m.buycon')}}</span>
                    </div>
                </div>
                <!--4， 去开通会员的界面 -->
                <div class="backgo" @click="tomember"><span>{{$t('m.Memberfree')}}</span></div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name: "goldInadequate",
        props: {
            isnobuy: Boolean,
            roomid: "",
            buylive: Object,
            finduser: ""
        },
        data() {
            return {
                isshowbuy: this.isnobuy,
                //1,进入房间的roomId
                live: {
                    roomId: this.roomid
                },
                // 3,购买房间视频的参数
                buylivedata: this.buylive,
                findUserId: this.finduser
            }
        },
        watch: {
            deep: true,
            //未购买关闭
            isnobuy: function(newValue, oldValue) {
                this.isshowbuy = newValue
            },
            // 房间id
            roomid: function(newValue, oldValue) {
                this.live.roomId = newValue
            },
            // 购买参数
            buylive: function(newValue, oldValue) {
                this.buylivedata = newValue
            },
            //findUserId
            finduser: function(newValue, oldValue) {
                this.findUserId = newValue
            },
        },
        methods: {
            //关闭盒子
            nobuyvideo() {
                this.$emit("nobuyvideoclose", false);
            },
            // goldenougn
            goldenougn() {
                this.$emit("goldenougn", true);
            },
            //关闭遮罩层
            // clickOverlaynobuy() {
            //     this.$emit("nobuyvideoclose", false);
            // },
            // 去会员界面
            // 去会员的界面
            tomember() {
                this.nobuyvideo()
                this.$router.push({
                    path: '/joinmember',
                    query: {
                        routerPath: this.$route.path
                    }
                })
            },
            //点击购买的按钮
            videoconfirm() {
                this.buylivedata.dataId = this.live.roomId;
                let buylive = qs.stringify(this.buylivedata);
                this.$axios
                    .post("/pay/apiu/userPay/purchase", buylive)
                    .then(res => {
                        ////console.log(res);
                        // this.showone = false;
                        this.nobuyvideo()
                        // 已购买就直接进去房间页
                        let roomIdLis = qs.stringify(this.live);
                        this.$axios.post('/av/apiu/liveRoom/intoRoom', roomIdLis)
                            .then(res => {
                                let data = res;
                                // 已购买就直接进去房间页
                                if (res.data.err == "SUCCESS") {
                                    this.$router.push({
                                        path: '/liveroom',
                                        query: {
                                            data: data,
                                            findUserId: this.findUserId
                                        }
                                    })
                                }
                            })
                    })
                    .catch(err => {
                        if (err.response.data.err == "DATA_NOT_EXSIT") {
                            this.$toast(err.response.data.langMsg)
                            this.nobuyvideo()
                            // 金币不足
                        } else if (err.response.data.err == "ERR_MONEY_NOT_ENOUGH") {
                            this.nobuyvideo()
                            this.goldenougn()
                        } else {
                            if (err.response.data.langMsg) {
                                this.$toast(err.response.data.langMsg)
                            } else {
                                this.$toast(err.response.data.msg)
                            }
                        }
                    });
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/popup.scss';
</style>