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
                <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-if="this.data.data.data.liveRoom.liveType ==  storeData.liveType.AUDIO">
            </div>
            <!-- 分享功能取消 -->
            <div class="sharezan" @click="likezan">
                <img src="../../assets/image/zhibo/dianzan02@2x.png" alt="">
            </div>
            <div class="score">
                {{score}}
            </div>
            <div class="close" @click="back">
                <img src="../../assets/image/mine/gerenxinxi_icon_shanchu@2x.png" alt="">
            </div>
            <!-----------活动专区------------------------------------------->
            <!-- 1,按钮 -->
            <div class="newactive" @click="newactive" v-if="isshownewactive">
                <img src="../../assets/image/icon/zhibojian_icon_huodongzhuanqu@2x.png" alt="">
            </div>
            <!-- 2,活动的弹窗 -->
            <!-- <van-popup v-model="shownewactive" position="right" id="activebox" /> -->
            <!-- 模态框的 -->
            <transition name="fade">
                <div class="activebox" v-show="shownewactive" @click="newactivebox">
                </div>
            </transition>
            <transition name="fade">
                <div class="navtop" v-show="shownewactive">
                    <img src="../../assets/image/live/huodongzhuanqu_image_zhuangshi@2x.png" alt="">
                </div>
            </transition>
            <!-- 活动盒子的 -->
            <transition name="fade">
                <div class="activeson" v-show="shownewactive">
                    <!-- 左侧的活动切换导航nav -->
                    <ul>
                        <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">{{item}}</li>
                    </ul>
                    <!-- <div class="tabCon">
                                                                                                                                                                                                                                                                            <div v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</div>
                                                                                                                                                                                                                     </div> -->
                    <!-- 右侧活动的切换子栏目内容content -->
                    <div class="tabCon">
                        <!-- 1,活动1日常任务-->
                        <div v-show="num == 0">
                            <ul>
                                <!-- 子内容1 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_01@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>签到7天送好礼</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>1</span>
                                            <span>/</span>
                                            <span>7</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_kedianjizhuangtai@2x.png" alt="">
                                            <span>签到</span>
                                        </p>
                                        <!-- <p>
                                                                                                                                                <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                                                                                                                                <span>已签到</span>
                                                                                                                                            </p> -->
                                    </div>
                                </li>
                                <!-- 子内容2 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_02@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>送出三次礼物 +5金币(新人额外+5金币)</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>1</span>
                                            <span>/</span>
                                            <span>3</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <!-- <p>
                                                                                                                                                <img src="../../assets/image/live/huodongzhuanqu_image_kedianjizhuangtai@2x.png" alt="">
                                                                                                                                                <span>已完成</span>
                                                                                                                                            </p> -->
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                            <span>未完成</span>
                                        </p>
                                    </div>
                                </li>
                                <!-- 子内容3 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_03@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>购买3次回放获得10金币</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>3</span>
                                            <span>/</span>
                                            <span>7</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_kedianjizhuangtai@2x.png" alt="">
                                            <span>领取</span>
                                        </p>
                                        <!-- <p>
                                                                                                                                              <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                                                                                                                                <span>已领取</span>
                                                                                                                                            </p> -->
                                    </div>
                                </li>
                                <!-- 子内容4 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_04@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p><span>充值一次</span><span>+20金币(新人额外+20金币)</span></p>
                                        <p>
                                            <span>进度:</span>
                                            <span>3</span>
                                            <span>/</span>
                                            <span>3</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <!-- <p>
                                                                                                                                                <img src="../../assets/image/live/huodongzhuanqu_image_kedianjizhuangtai@2x.png" alt="">
                                                                                                                                                <span>领取</span>
                                                                                                                                            </p> -->
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                            <span>已领取</span>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <p>注:新人额外奖励活动周期为1周~</p>
                                    <p>(一个支付宝账号仅可参与一次活动)</p>
                                </li>
                            </ul>
                        </div>
                        <!-- 2，活动2新人专享-->
                        <div v-show="num == 1">
                            <ul>
                                <!-- 子内容1 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_01@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>连续充值3天有好礼</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>3</span>
                                            <span>/</span>
                                            <span>3</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                            <span>已领取</span>
                                        </p>
                                        <!-- <p>
                                                                                                                                                 <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                                                                                                                                                                    <span>已领取</span>
                                                                                                                                             </p> -->
                                    </div>
                                </li>
                                <!-- 子内容2 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_05@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>充值累积6元，领取好礼</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>1</span>
                                            <span>/</span>
                                            <span>3</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                            <span>未完成</span>
                                        </p>
                                    </div>
                                </li>
                                <!-- 子内容3 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_06@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p>充值累积30元，领取好礼</p>
                                        <p>
                                            <span>进度:</span>
                                            <span>3</span>
                                            <span>/</span>
                                            <span>7</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_kedianjizhuangtai@2x.png" alt="">
                                            <span>领取</span>
                                        </p>
                                        <!-- <p>
                                                                                                                                                <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                                                                                                                                <span>已领取</span>
                                                                                                                                            </p> -->
                                    </div>
                                </li>
                                <!-- 子内容4 -->
                                <li>
                                    <div class="left">
                                        <img src="../../assets/image/live/huodongzhuanqu_icon_03@2x.png" alt="">
                                    </div>
                                    <div class="center">
                                        <p><span>开通会员</span><span>+50金币</span></p>
                                        <p>
                                            <span>进度:</span>
                                            <span>0</span>
                                            <span>/</span>
                                            <span>1</span>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <p>
                                            <img src="../../assets/image/live/huodongzhuanqu_image_zhihuizhuangtai@2x.png" alt="">
                                            <span>未完成</span>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <p>注:新人额外奖励活动周期为1周~</p>
                                    <p>(一个支付宝账号仅可参与一次活动)</p>
                                </li>
                            </ul>
                        </div>
                        <!--3，活动3-->
                        <div v-show="num == 2">内容3333</div>
                    </div>
                </div>
            </transition>
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
                score: "",
                likedata: {
                    evaluateType: "like", //favorite收藏
                    dataType: "video", //视频
                    dataId: "", //房间id
                    score: "", //1,点赞,-1取消点赞
                    descs: ""
                },
                // 查询是否点赞的参数
                islikeit: {
                    dataId: "",
                    dataType: "video",
                    evaluateType: "like"
                },
                // 控制活动的按钮
                isshownewactive: this.$store.state.isshownewactive,
                // 切换的列表
                tabs: ["日常任务", "新人专享", "活动1"],
                // tabContents: ["内容一", "内容二", "内容三"],
                num: 0,
                // 新人活动的
                shownewactive: false,
                // 进入房间后根据类型显示音频还是视频标识
                isshowvideo: false,
                isshohwvoice: false,
                storeData: this.$store.state,
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
                    width: 100,
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
                },
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
                    //ios端的
                    return true
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            next();
            window.localStorage.setItem("intoroompath", from.path);
        },
        created() {
            // 1,接收进入页面时的的视频数据（如有
            this.data = this.$route.query.data;
            // console.log("---"+this.data);
            this.findUserId.findUserId = this.$route.query.findUserId; //用户的findUserId
            this.isguanzhu.toUserId = this.$route.query.findUserId; //用户的id
            // 2,视频地址赋值
            // this.playerOptions.src = ;
            this.playerOptions.sources[0].src = this.data.data.data.originUrl
            // this.playerOptions.sources[0].src = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"
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
            //3, 判断视频的类型
            // let videotype = this.data.data.data.liveRoom.liveType
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
                // this.playerOptions.controls = false;
            }
            $('video').bind('contextmenu', function() {
                return false;
            });
            // $('video').attr(controlslist, nodownload);
            // $('video').attr('uc-video-toolbar-id', '');
            //this.onPlayerPlay(player);
            //6,,查我是否已经点赞过主播
            this.ishaslike()
        },
        mounted() {
            // $('vjs-big-play-button').css('z-index', "999")
        },
        methods: {
            // 查询点赞的状态
            ishaslike() {
                this.islikeit.dataId = this.data.data.data.liveRoom.roomId;
                let islikeitdata = qs.stringify(this.islikeit)
                this.$axios.post('/av/apiu/dataEvaluate/dataEvaluate', islikeitdata)
                    .then(res => {
                        // 等于0 说明没有点赞
                        let tluser = res.data.data.userScore;
                        this.score = tluser;
                        if (tluser < 0) {
                            this.score = Math.abs(tluser)
                        }
                        if (tluser == 0) {
                            this.likedata.score = "1"
                        } else if (tluser != 0) {
                            this.likedata.score = "-1"
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            // 点赞主播
            likezan() {
                console.log(this.data.data.data.liveRoom.roomId);
                this.likedata.dataId = this.data.data.data.liveRoom.roomId;
                let likedatazan = qs.stringify(this.likedata)
                this.$axios.post('/av/apiu/dataUserEvaluate/evaluate', likedatazan)
                    .then(res => {
                        console.log(res)
                        console.log(res.data.err);
                        if (res.data.err == "SUCCESS") {
                            this.score++
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            // 方法的
            tab(index) {
                this.num = index;
            },
            // 活动的部分的弹窗的蒙版
            newactivebox() {
                this.shownewactive = false;
            },
            // 活动的部分
            newactive() {
                this.shownewactive = true;
            },
            // 播放器的兼容性
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
                    $('body').find('video').attr('autoplay', "true")
                }
            },
            //返回上一级
            back() {
                if (window.localStorage.getItem("tryliveroom")) {
                    let tryliveroom = window.localStorage.getItem("tryliveroom")
                    this.$router.push(tryliveroom)
                } else {
                    let intoroompath = window.localStorage.getItem("intoroompath")
                    this.$router.push(intoroompath)
                }
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
            }
        }
    }
</script>

<style lang="scss">
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
            left: .375rem;
            top: .375rem;
            height: 1.55rem;
            display: flex;
            background: rgba(51, 51, 51, 0.3);
            border-radius: .75rem;
            z-index: 2000;
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
            left: .75rem;
            top: 2.7rem;
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
        .sharezan {
            position: fixed;
            border-radius: 50%;
            right: .75rem;
            bottom: 8.85rem;
            z-index: 99999;
            img {
                width: 1.55rem;
                height: 1.55rem;
                border-radius: 50%;
            }
        }
        .score {
            position: fixed;
            right: .75rem;
            bottom: 8.15rem;
            font-size: 12px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            text-shadow: 0px 1px 0px rgba(51, 51, 51, 1);
            text-align: center;
            width: 1.55rem;
        }
        .close {
            position: fixed;
            width: 1.55rem;
            height: 1.55rem;
            background: rgba(51, 51, 51, 0.3);
            border-radius: 50%;
            top: .375rem;
            right: .375rem;
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                opacity: 0.5;
            }
        }
    }
    .player-container {
        margin-top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .vjs-tech {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
    } // 1,新人的活动专享
    // 1.1活动的按钮
    .newactive {
        position: fixed;
        right: .2rem;
        bottom: 13.1rem;
        width: 3rem;
        height: 2.45rem;
        img {
            width: 100%;
            height: 100%;
        }
    } // 1.2弹框蒙版
    .activebox {
        width: 100vw;
        height: 100vh;
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 1000;
    } // 头部的
    .navtop {
        position: fixed;
        right: 0;
        bottom: 13.8rem;
        z-index: 2000;
        width: 12.5rem;
        height: 3.65rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 12.5rem;
            height: 3.65rem;
        }
    } // 1.3弹框tab的切换
    .activeson {
        // background-color: green;
        position: fixed;
        right: 0;
        bottom: .175rem;
        z-index: 2000;
        width: 15.7rem;
        height: 15.2rem;
        display: flex;
        justify-content: flex-start; // 1,弹框的头部nav
        ul {
            width: 3.2rem;
            height: 15.2rem;
            li {
                width: 2.85rem;
                height: 1.4rem;
                font-size: .5rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                background-image: url('../../assets/image/live/zhibojian_image_daohangkuangweixuanzhong@2x.png');
                background-size: cover;
                margin-bottom: .2rem;
                margin-left: .35rem;
                &.active {
                    width: 3.2rem;
                    height: 1.55rem;
                    background-image: url('../../assets/image/live/huodongzhuanqu_image_richangrenwu@2x.png');
                    background-size: cover;
                    margin-left: 0;
                    font-size: .65rem;
                    font-family: PingFang-SC-Bold;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        } // 2,活动的子栏目
        .tabCon {
            width: 12.5rem;
            height: 15.2rem;
            div {
                width: 100%;
                height: 100%;
                background-size: cover; // 3,活动内容板块第一个
                &:first-of-type {
                    background-image: url('../../assets/image/live/huodongzhuanqu_image_dikuang@2x.png');
                    border-radius: .2rem; // box-shadow: 0px 0px .7rem 1px #fff inset;
                    ul {
                        width: 12.5rem;
                        height: 15.2rem;
                        padding-top: .6rem;
                        li {
                            width: 11.8rem;
                            height: 2.5rem;
                            background: rgba(255, 253, 247, 1);
                            border: .025rem solid;
                            border-image: linear-gradient(0deg, rgba(255, 22, 108, 1), rgba(255, 118, 21, 1)) 10 10;
                            box-shadow: 0px 3px 3px 0px rgba(115, 115, 115, 0.31);
                            border-radius: .15rem;
                            margin-bottom: .4rem;
                            .left {
                                height: 2.5rem;
                                width: 2.5rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: rgba(255, 253, 247, 1);
                                img {
                                    width: 1.9rem;
                                    height: 1.9rem;
                                }
                            }
                            .center {
                                height: 100%;
                                display: flex;
                                flex: 1;
                                justify-content: flex-start;
                                align-items: center;
                                flex-wrap: wrap;
                                background: rgba(255, 253, 247, 1);
                                margin-left: .15rem;
                                margin-right: .15rem;
                                p {
                                    &:nth-of-type(1) {
                                        font-size: .55rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(51, 51, 51, 1);
                                    }
                                    &:nth-of-type(2) {
                                        font-size: .45rem;
                                        font-family: PingFang-SC-Regular;
                                        font-weight: 400;
                                        color: rgba(153, 153, 153, 1);
                                    }
                                }
                            }
                            .right {
                                width: 3.5rem;
                                height: 2.5rem;
                                background: rgba(255, 253, 247, 1);
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                p {
                                    width: 3rem;
                                    height: 1.125rem;
                                    border: .025rem solid;
                                    position: relative;
                                    img {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                    }
                                    span {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        font-size: .65rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(255, 255, 255, 1);
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }
                            }
                            &:nth-of-type(1) {
                                border-radius: .15rem;
                            }
                            &:nth-of-type(5) {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                background: none;
                                border: none;
                                p {
                                    font-size: .45rem;
                                    font-family: PingFang-SC-Regular;
                                    font-weight: 400;
                                    color: rgba(238, 238, 238, 1);
                                    line-height: .65rem;
                                    margin-bottom: .1rem;
                                }
                            }
                        }
                    }
                } // 4,活动内容板块第二个
                &:nth-of-type(2) {
                    background: linear-gradient(0deg, rgba(255, 59, 91, 1) 0%, rgba(255, 160, 31, 1) 100%);
                    border-radius: .2rem; // box-shadow: 0px 0px .7rem 1px #fff inset;
                    ul {
                        width: 12.5rem;
                        height: 15.2rem;
                        padding-top: .6rem;
                        li {
                            width: 11.8rem;
                            height: 2.5rem;
                            background: rgba(255, 253, 247, 1);
                            border: .025rem solid;
                            border-image: linear-gradient(0deg, rgba(255, 22, 108, 1), rgba(255, 118, 21, 1)) 10 10;
                            box-shadow: 0px 3px 3px 0px rgba(115, 115, 115, 0.31);
                            border-radius: .15rem;
                            margin-bottom: .4rem;
                            .left {
                                height: 2.5rem;
                                width: 2.5rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: rgba(255, 253, 247, 1);
                                img {
                                    width: 1.9rem;
                                    height: 1.9rem;
                                }
                            }
                            .center {
                                height: 100%;
                                display: flex;
                                flex: 1;
                                justify-content: flex-start;
                                align-items: center;
                                flex-wrap: wrap;
                                background: rgba(255, 253, 247, 1);
                                margin-left: .15rem;
                                margin-right: .15rem;
                                p {
                                    &:nth-of-type(1) {
                                        font-size: .55rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(51, 51, 51, 1);
                                    }
                                    &:nth-of-type(2) {
                                        font-size: .45rem;
                                        font-family: PingFang-SC-Regular;
                                        font-weight: 400;
                                        color: rgba(153, 153, 153, 1);
                                    }
                                }
                            }
                            .right {
                                width: 3.5rem;
                                height: 2.5rem;
                                background: rgba(255, 253, 247, 1);
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                p {
                                    width: 3rem;
                                    height: 1.125rem;
                                    border: .025rem solid;
                                    position: relative;
                                    img {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                    }
                                    span {
                                        display: block;
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        font-size: .65rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(255, 255, 255, 1);
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }
                            }
                            &:nth-of-type(1) {
                                border-radius: .15rem;
                            }
                            &:nth-of-type(5) {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                background: none;
                                border: none;
                                p {
                                    font-size: .45rem;
                                    font-family: PingFang-SC-Regular;
                                    font-weight: 400;
                                    color: rgba(238, 238, 238, 1);
                                    line-height: .65rem;
                                    margin-bottom: .1rem;
                                }
                            }
                        }
                    }
                } // 5,活动内容板块的第三个
                &:nth-of-type(3) {
                    background: linear-gradient(0deg, rgba(255, 59, 91, 1) 0%, rgba(255, 160, 31, 1) 100%);
                    border-radius: .2rem; // box-shadow: 0px 0px .7rem 1px #fff inset;
                }
            }
        }
    } // 1.4弹框出现的动画
    .fade-enter-active {
        animation: fade-in .5s;
    } // 1.5弹窗离开的动画
    .fade-leave-active {
        animation: fadeOutRight .5s;
    }
    @keyframes fade-in {
        from {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
    @keyframes fadeOutRight {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }
</style>