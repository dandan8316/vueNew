
<template>
    <div id="video">
        <div class="live">
            <!-- 如果是语音就显示 -->
            <div class="voiceimg" v-if="this.data.data.data.liveRoom.liveType==storeData.liveType.AUDIO">
                <img :src="this.data.data.data.liveRoom.roomImage" alt="">
            </div>
            <!-- 播放器的容器位置 -->
            <div class="player-container">
                <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @canplay="onPlayerCanplay($event)" :playsinline="playsinline"> </video-player>
            </div>
            <div class="userInfo">
                <div class="icon">
                    <img :src="this.data.data.data.liveRoom.headPicture" alt="">
                </div>
                <div class="center">
                    <div class="top">
                        <span>{{this.data.data.data.liveRoom.userName}} </span>
                    </div>
                    <div class="bottom">
                        <span>{{this.data.data.data.liveRoom.detail.watchCountSum}}</span><span>观看</span>
                    </div>
                </div>
                <div class="right" v-show="isshowfollowcommit" @click.prevent="isfollowme">
                    <!-- 关注主播的 -->
                    <img src="../../assets/image/live/zhibojian_icon_guanzhu@2x.png" alt="">
                </div>
            </div>
            <div class="id">
                <span>套路ID:</span><span>{{this.data.data.data.liveRoom.roomId}}</span>
            </div>
            <div class="videovoice">
                <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="" v-if="this.data.data.data.liveRoom.liveType == storeData.liveType.VIDEO">
                <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-if="this.data.data.data.liveRoom.liveType == storeData.liveType.AUDIO">
            </div>
            <!-- 分享功能取消 -->
            <!-- <div class="share">
                                   <img src="../../assets/image/live/fenxiang.png" alt="">
                                     </div> -->
            <div class="close" @click="back">
                <img src="../../assets/image/mine/gerenxinxi_icon_shanchu@2x.png" alt="">
            </div>
            <!-- 环形进度条 -->
            <van-circle v-model="currentRate" :rate="rate" :stroke-width="60" fill="#fff" :speed="100" :size="size" :text="text" layer-color="#ebedf0" color="#000000" @click.native="trybuyit" v-if="isshowcircle" />
            <!-- 模态框的弹出提示 -->
            <van-popup v-model="showone" :close-on-click-overlay="false">
                <div class="buybox">
                    <div class="top"><span>{{$t('m.buylive')}}</span></div>
                    <img src="../../assets/image/zhibo/buyone.png" class="toplive">
                    <div class="buypayit" @click="videoconfirm">
                        <div class="right">
                            <img src="../../assets/image/icon/goldicon.png" alt="">
                            <span>{{this.data.data.data.liveRoom.payMoney}}</span>
                            <span>{{$t('m.buycon')}}</span>
                        </div>
                    </div>
                    <div class="backgo" @click="videocancel"><span>{{$t('m.back')}}</span></div>
                </div>
            </van-popup>
            <!-- 金币不足跳转到购买的页面-->
            <van-popup v-model="showtwo" :close-on-click-overlay="false">
                <div class="buybox2">
                    <div class="top"><span>{{$t('m.goldover')}}</span></div>
                    <img src="../../assets/image/icon/goldicon.png" class="toplive">
                    <div class="buypayit" @click="videoconfirmpay">
                        <span>{{$t('m.gopay')}}</span>
                    </div>
                    <div class="backgo" @click="videocancelpay"><span>{{$t('m.back')}}</span></div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import qs from 'qs'
    import {
        win32
    } from 'path';
    export default {
        data() {
            return {
                buylive: {
                    accType: 'coin', //账户类型coin
                    buyType: 'room_his',
                    dataId: '',
                    money: '',
                },
                storeData: this.$store.state,
                size: "50Px",
                //视频的money购买的价格
                money: '',
                //买下这个直播的界面
                showone: false,
                //金币不足，跳转到引导充值的界面
                showtwo: false,
                // 圆形进度条
                currentRate: 20,
                isshowcircle: true,
                text: "购买",
                rate: 0,
                // 进入房间后根据类型显示音频还是视频标识
                isshowvideo: false,
                isshohwvoice: false,
                //视频的数据
                data: '',
                headPicture: '',
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    controls: true, //控制条
                    preload: 'auto', //视频预加载
                    muted: false, //默认情况下将会消除任何音频。
                    loop: false, //导致视频一结束就重新开始。
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    // controlsList: "nodownload",
                    sources: [{
                        type: 'application/x-mpegURL',
                        src: ''
                        // https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8
                    }],
                    poster: "", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '主播正在赶来，请先观看其他视频', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    //控制栏
                    controlBar: {
                        timeDivider: true, //时间分割线
                        durationDisplay: true, //总时间
                        remainingTimeDisplay: false, //显示视频中剩余的时间
                        fullscreenToggle: true, //全屏按钮
                        // controlsList: false
                    },
                    controlsList: "nodownload"
                },
                findUserId: {
                    findUserId: '',
                },
                // 是否关注过我
                isshowfollowcommit: '',
                isguanzhu: {
                    action: '',
                    toUserId: ''
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
            playsinline() {
                var ua = navigator.userAgent.toLocaleLowerCase();
                //x5内核
                if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                    return false
                } else {
                    //ios端
                    return true
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            next();
            window.localStorage.setItem("tryliveroom", from.path)
        },
        created() {
            // 1,接收进入页面时的的视频数据（如有
            this.data = this.$route.query.liveroomtry;
            this.findUserId.findUserId = this.$route.query.findUserId; //用户的findUserId
            this.isguanzhu.toUserId = this.$route.query.findUserId; //用户的id
            // 2,视频地址赋值
            this.playerOptions.sources[0].src = this.data.data.data.originUrl;
            // 6，页面一加载就查看我是否关注过主播
            let mysubscribe = qs.stringify(this.findUserId)
            this.$axios.post('/av/apiu/userFans/mysubscribe', mysubscribe)
                .then(res => {
                    // 未关注，显示按钮，
                    if (!res.data.data) {
                        this.isshowfollowcommit = true;
                        this.isguanzhu.action = "subscribe"
                    } else if (res.data.data) {
                        this.isshowfollowcancal = false;
                        this.isguanzhu.action = "unsubscribe"
                    }
                })
                .catch(err => {
                    console.error(err);
                })
            //3, 判断视频的类型的
            let str = this.data.data.data.originUrl;
            if (str.indexOf(".m3u8") != -1) {
                this.playerOptions.sources[0].type = 'application/x-mpegURL';
            } else if (str.indexOf(".mp4") != -1) {
                this.playerOptions.sources[0].type = 'Video/mp4';
            }
            // 4,视频的封面地址
            if (this.data.data.data.liveRoom.liveType != 2) {
                this.playerOptions.poster = this.data.data.data.liveRoom.roomImage;
            }
            // //console.log("视频的地址是" + this.playerOptions.poster);
            // 5,根据liveType显示视频还是语音标识
            // 控制进度条的显示隐藏
            //    this.playerOptions.controls = true;
            if (this.data.data.data.liveRoom.liveStatus == 1) {
                this.playerOptions.controls = false;
            }
            $('video').bind('contextmenu', function() {
                return false;
            });
        },
        mounted() {
            // 圆形进度条
            // this.circleadd()
        },
        destroyed() {
         window.clearInterval(clock)   
        },
        methods: {
            onPlayerCanplay(player) {
                // //console.log('player Canplay!', player)
                //解决自动全屏
                var ua = navigator.userAgent.toLocaleLowerCase();
                //x5内核
                if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                    $('body').find('video').attr('x-webkit-airplay', true).attr('x5-playsinline', true).attr('webkit-playsinline', true).attr('playsinline', true)
                } else {
                    //ios端
                    $('body').find('video').attr('webkit-playsinline', "true").attr('playsinline', "true")
                }
            },
            //返回上一级
            back() {
                this.$router.go(-1);
                window.localStorage.removeItem("tryliveroom")
            },
            // 关注我
            isfollowme() {
                this.isshowfollowcommit = false;
                // //console.log("ok");
                // 先查看是否关注过
                let findUserIds = qs.stringify(this.isguanzhu);
                this.$axios.post('/av/apiu/userFans/subscribe', findUserIds)
                    .then(res => {
                        //console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            // 0,圆形进度条倒计时
            circleadd() {
                var clock = window.setInterval(() => {
                    this.rate++;
                    if (this.rate == 100) {
                        window.clearInterval(clock)
                        if (this.isshowcircle == true) {
                            this.$router.go(-1);
                            window.localStorage.removeItem("tryliveroom")
                        }
                    }
                }, 100);
            },
            // 1,点击显示购买的弹框
            trybuyit() {
                this.showone = true;
                this.isshowcircle = false;
                // this.showtwo = true;
            },
            //  2,返回就关掉弹窗然后返回上一级
            videocancel() {
                // 关掉购买的界面
                this.showone = false;
                // 返回上一级
                this.$router.go(-1);
            },
            // 3,点击购买的
            videoconfirm() {
                let data = this.data;
                this.buylive.dataId = this.data.data.data.liveRoom.roomId; //房间的id
                this.buylive.money = this.data.data.data.liveRoom.payMoney; //房间需要支付的money
                let buylive = qs.stringify(this.buylive);
                this.$axios.post('/pay/apiu/userPay/purchase', buylive)
                    .then(res => {
                        // //console.log(res)
                        this.showone = true;
                        // 已购买就直接进去房间页
                        let data = this.data
                        if (res.data.err == "SUCCESS") {
                            this.$router.push({
                                path: '/liveroom',
                                query: {
                                    data: data,
                                    findUserId: this.findUserId.findUserId
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        this.showone = false;
                        this.showtwo = true;
                    })
            },
            // 4,金币不足显示金币弹出框
            // 4.1,前往充值就去mygold
            videoconfirmpay() {
                this.$router.push({
                    path: '/mygold'
                })
            },
            videocancelpay() {
                this.showtwo = false;
                this.showone = false;
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/player.scss";
    .live {
        position: relative;
        width: 100vw;
        height: 100vh;
        .voiceimg {
            position: fixed;
            left: 0;
            right: 0;
            top: 25%;
            bottom: 0;
            width: 100vw;
            height: 15rem;
            z-index: 100;
            img {
                width: 100%;
                height: auto;
            }
        }
        .userInfo {
            position: fixed;
            left: .65rem;
            top: .95rem;
            height: 1.55rem;
            display: flex;
            background: rgba(51, 51, 51, 0.3);
            border-radius: .75rem;
            z-index: 200;
            .icon {
                width: 1.55rem;
                height: 1.55rem;
                margin-right: .15rem;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .center {
                height: auto;
                width: auto;
                .top {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    width: 4rem;
                    span {
                        font-size: .5rem;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        color: #fff;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
                .bottom {
                    height: 50%;
                    font-size: .5rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: .75rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    span {
                        font-size: .5rem;
                        font-family: PingFang-SC-Regular;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        margin-right: .1rem;
                        &:nth-of-type(1) {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
            .right {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 1.65rem;
                    height: 1rem;
                    border-radius: .75rem;
                }
            }
        }
        .id {
            position: fixed;
            left: .65rem;
            top: 2.6rem;
            width: auto;
            z-index: 200;
            span {
                font-size: .6rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                &:nth-of-type(1) {
                    margin-right: .4rem;
                }
            }
        }
        .videovoice {
            position: fixed;
            left: .65rem;
            top: 3.6rem;
            width: auto;
            z-index: 200;
            img {
                width: .8rem;
                height: .65rem;
            }
        }
        .share {
            position: fixed;
            top: .65rem;
            right: 3.05rem;
            border-radius: 50%;
            img {
                width: 1.55rem;
                height: 1.55rem;
                border-radius: 50%;
            }
        }
        .close {
            position: fixed;
            top: .65rem;
            right: .55rem;
            width: 1.55rem;
            height: 1.55rem;
            border-radius: 50%;
            z-index: 200;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
    .player-container {
        margin-top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .video-js .vjs-tech {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    }
    .van-circle {
        position: relative;
        text-align: center;
        display: inline-block;
        position: absolute;
        top: 25vh;
        right: 2vw;
        z-index: 999;
    } //模态框的提示按钮
    .buybox {
        width: 15rem;
        height: 16.35rem;
        .top {
            width: 100%;
            text-align: center;
            margin-top: 3.5rem;
            span {
                color: black;
                font-weight: 500;
            }
        }
        .toplive {
            display: block;
            width: 7rem;
            height: 4.75rem;
            margin: 0 auto;
            margin-top: 1.85rem;
        }
        .liveroomtry {
            background-color: #333333;
            display: flex;
            justify-content: center;
            margin: 0 auto;
            border-radius: 1rem;
            width: 90%;
            height: 2rem;
            align-items: center;
            margin-top: .25rem;
            span {
                font-size: .65rem;
                color: #fff;
            }
        }
        .buypayit {
            width: 14.5rem;
            height: 2rem;
            margin: 0 auto;
            margin-top: 0.75rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #333333;
            border-radius: 1rem;
            .right {
                display: flex;
                span {
                    font-size: .65rem;
                    color: #fff;
                    margin-right: .1rem;
                }
                img {
                    width: .9rem;
                    height: .9rem;
                    margin-right: .25rem;
                }
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
    } //引导充值的第二个模态框
    .buybox2 {
        width: 15rem;
        height: 16.35rem;
        .top {
            width: 100%;
            margin-top: 3.5rem;
            display: flex;
            justify-content: center;
            span {
                color: black;
                font-weight: 500;
            }
        }
        .toplive {
            display: block;
            width: 7rem;
            height: 4.75rem;
            margin: 0 auto;
            margin-top: 1.85rem;
        }
        .buypayit {
            width: 14.5rem;
            height: 2rem;
            margin: 0 auto;
            margin-top: 2.75rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #000000;
            border-radius: 1rem;
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
    }
</style>