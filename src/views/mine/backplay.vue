<template>
    <div id="playback" v-cloak>
        <!-- 推荐视频的主要的部分 -->
        <div class="g_short clear">
            <ul>
                <van-pull-refresh v-model="isLoading" :loosing-text="$t('m.loosingtext')" :loading-text="$t('m.loadingtext')" @refresh="onRefresh" :success-text="$t('m.refreshsuc')">
                    <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$t('m.nomore')" :loading-text="$t('m.loading')">
                        <!-- 加载的内容 -->
                        <a href="javascript:void(0);" v-for="item in deviceList" :key="item.id" @click="playback(item.roomId,item.payMoney,item.ownerId)">
                            <li>
                                <!-- 视频的 -->
                                <div class="topVideo">
                                    <!-- <video src="" loop :poster="item.roomImage"></video> -->
                                    <div class="imgcover">
                                        <img :src="item.roomImage+'?imageView2/1/w/400'" alt="">
                                    </div>
                                    <div class="mask">
                                    </div>
                                    <!-- 1,左边的视频和语音的类型图标 -->
                                    <div class="taps_left">
                                        <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="" v-if="item.liveType==storeData.liveType.VIDEO">
                                        <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-if="item.liveType==storeData.liveType.AUDIO">
                                    </div>
                                    <!-- 右边的money-->
                                    <div class="taps_money">
                                        <img src="../../assets/image/icon/goldicon.png" alt="">
                                        <span>{{item.payMoney}}</span>
                                        <img src="../../assets/image/icon/shangcheng_icon_kuozhan01@2x.png" alt="">
                                        </img>
                                    </div>
                                    <div class="taps_right">
                                        <span>{{item.vedioDuration}}</span>
                                    </div>
                                    <div class="taps_bottom">
                                        <div class="left">
                                            <img src="../../assets/image/index/homepage_icon_redu@2x.png" alt="">
                                            <span>{{item.detail.likeScore}}</span>
                                        </div>
                                        <div class="center">
                                            <img src="../../assets/image/live/zhibohuifang_icon_guankan@2x.png" alt="">
                                            <span>{{item.detail.backWatchCount}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 用户的信息 -->
                                <div class="userInfo">
                                    <div>{{item.roomAnnouncement}}</div>
                                    <div>{{item.upDate | capitalize}}</div>
                                </div>
                            </li>
                        </a>
                    </van-list>
                </van-pull-refresh>
            </ul>
        </div>
        <!-- 模态框的弹出提示 -->
        <van-popup v-model="showone" :close-on-click-overlay="false">
            <div class="buybox">
                <div class="top"><span>{{$t('m.buylive')}}</span></div>
                <!-- 2,右上角的关闭 -->
                <van-icon name="cross" class="buxboxicon" @click="videocancel" />
                <!-- 试看 -->
                <div class="liveroomtry" @click="goliveroomtry" v-if="isjoinmember">
                    <span>
                                                                                      {{$t('m.trysee')}}
                                                                                       </span>
                </div>
                <div class="buypayit" @click="videoconfirm">
                    <div class="right">
                        <img src="../../assets/image/icon/goldicon.png" alt="">
                        <span>{{money}}</span>
                        <span>{{$t('m.buycon')}}</span>
                    </div>
                </div>
                <div class="backgo" @click="tomember"><span>{{$t('m.Memberfree')}}</span></div>
            </div>
        </van-popup>
        <!-- 金币不足跳转到购买的页面-->
        <van-popup v-model="showtwo" :close-on-click-overlay="false">
            <div class="buybox">
                <div class="top"><span>{{$t('m.goldover')}}</span></div>
                <div class="buypayit" @click="videoconfirmpay">
                    <span>{{$t('m.gopay')}}</span>
                </div>
                <div class="backgo" @click="videocancelpay"><span>{{$t('m.back')}}</span></div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        props: ['findUserId'],
        data() {
            return {
                storeData: this.$store.state, //store视频的状态
                // 去试看的
                isjoinmember: this.$store.state.isvideotrysee,
                deviceList: [], //用于存放加载的数据
                loading: false, //控制上拉加载的加载动画
                finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false, //控制下拉刷新的加载动画
                pageCommit: {
                    page: '1',
                    rows: 10,
                    findOwnerId: ""
                },
                //是否显示语音和视频
                // isshowVideo: false,
                // ishowVoice: false,
                //点击之后的权限
                money: '',
                //进入房间的roomId
                live: {
                    roomId: "",
                },
                showone: false,
                //金币不足，跳转到引导充值的界面
                showtwo: false,
                //进入房间过的数据列表
                //购买房间视频的参数
                buylive: {
                    accType: 'coin', //账户类型coin
                    buyType: 'room_his',
                    dataId: '',
                    money: '',
                },
                data: '',
                // props的优先级 > data中的优先级 > menthods中的优先级
                buydata: ""
            }
        },
        filters: {
            capitalize: function(value) {
                return value.slice(0, 11)
            }
        },
        created() {
            //this.pageCommit.findOwnerId = this.$route.query.findUserId;
            if (window.localStorage.getItem('iosapp') == "yes") {
                this.findUserId = $cookies.get("iosid");
            } else {
                this.pageCommit.findOwnerId = window.localStorage.getItem("findUserId")
            }
            this.init()
        },
        methods: {
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post(this.api.globalApi.homepage, comValue)
                    .then(res => {
                        self.deviceList = res.data.data; //赋值给数组
                        console.log(res.data.data);
                        self.isLoading = false; //关闭下拉刷新效果 
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //下拉刷新
            onRefresh() {
                let self = this;
                setTimeout(() => {
                    self.init(); //加载数据
                }, 500);
            },
            //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
            onLoad() {
                let self = this;
                setTimeout(() => {
                    let comValue = qs.stringify(self.pageCommit); //页面一加载显示第一页的10条数据
                    self.$axios.post(this.api.globalApi.homepage, comValue)
                        .then(res => {
                            //console.log(res);
                            //console.log(res.data.data);
                            self.deviceList = self.deviceList.concat(res.data.data); //将获取到数据添加到数据列表里返回新数组
                            self.loading = false; //加载动画结束
                            self.pageCommit.page++;
                            if (res.data.data.length == "") {
                                self.finished = true; //如果当前页大于总页码数，说明没数据，如果没有数据，就不调用接口
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }, 500);
            },
            playback(roomId, money, id) {
                this.live.roomId = roomId;
                this.money = money;
                this.buylive.money = money;
                this.findUserId = id; //用户的id
                let roomIdLis = qs.stringify(this.live);
                this.$axios.post(this.api.globalApi.intoRoom, roomIdLis)
                    .then(res => {
                        this.data = res;
                        this.buydata = res;
                        // 已购买就直接进去房间页
                        if (res.data.err == "SUCCESS") {
                            this.$router.push({
                                path: '/liveroom',
                                query: {
                                    data: this.data,
                                    findUserId: this.findUserId
                                }
                            })
                        }
                    })
                    .catch(err => {
                        // 房间未购买就弹框引导购买
                        if (err.response.data.field == "room.unpay") {
                            this.showone = true;
                        } else if (err.response.data.field == "live.delete") {
                            //直播或者回放被删除或封禁就弹出一条消息
                            this.$toast("直播或回放被删除或封禁")
                        } else {
                            // this.$toast(err.response.data.langMsg)
                            if (err.response.data.langMsg) {
                                this.$toast(err.response.data.langMsg)
                            } else {
                                this.$toast(err.response.data.message)
                            }
                        }
                    })
            },
            goliveroomtry() {
                this.$axios.get(this.api.globalApi.intoRoomTry, {
                        params: {
                            roomId: this.live.roomId
                        }
                    })
                    .then(res => {
                        // //console.log(res);
                        this.liveroomtry = res;
                        //console.log(res.data.data.liveRoom.ifTry);
                        if (res.data.data.liveRoom.ifTry == 0) {
                            this.$toast("不允许试看")
                        } else if (res.data.data.liveRoom.ifTry == 1) {
                            this.$router.push({
                                path: '/liveroomtry',
                                query: {
                                    liveroomtry: this.liveroomtry,
                                    findUserId: this.findUserId
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //点击返回就退出房间
            videocancel() {
                this.showone = false;
            },
            // 去会员的界面
            tomember() {
                this.$router.push({
                    path: '/joinmember'
                })
            },
            // 点击购买的按钮
            videoconfirm() {
                this.buylive.dataId = this.live.roomId;
                let buylive = qs.stringify(this.buylive);
                this.$axios.post(this.api.globalApi.purchase, buylive)
                    .then(res => {
                        this.showone = false;
                        // 已购买就直接进去房间页
                        let roomIdLis = qs.stringify(this.live);
                        this.$axios.post(this.api.globalApi.intoRoom, roomIdLis)
                            .then(res => {
                                let data = res;
                                //console.log(res);
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
                        console.error(err);
                        this.showone = false;
                        this.showtwo = true;
                    })
            },
            videoconfirmpay() {
                this.$router.push({
                    path: '/mygold'
                })
            },
            //金币不足点击购买然后跳转到支付界面
            //金币不足直接返回上一级或者退出房间
            videocancelpay() {
                this.showone = false;
                this.showtwo = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    [v-cloak] {
        display: none !important;
    }
    #playback {
        height: 100vh;
        background-color: #ffffff;
        width: 100vw;
    }
    .g_short {
        width: 100%;
        height: auto;
        margin-bottom: 2.5rem;
        ul {
            width: 100%;
            height: 100%;
            .van-pull-refresh {
                .van-list {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: .65rem;
                    a {
                        width: 100%;
                        height: 13.85rem;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: -1px .1rem .5rem 0px rgba(209, 209, 209, 1);
                        margin-bottom: .525rem;
                        border-radius: .25rem;
                        padding-left: .25rem;
                        padding-right: .25rem;
                        li {
                            width: 100%;
                            height: 13.85rem;
                            .topVideo {
                                width: 100%;
                                height: 11.25rem;
                                position: relative;
                                .imgcover {
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                        border-radius: .25rem .25rem 0rem 0rem;
                                        object-fit: cover;
                                    }
                                } //图层蒙版
                                .mask {
                                    position: absolute;
                                    background-color: #000000;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    opacity: 0.5;
                                    border-radius: .25rem .25rem 0rem 0rem;
                                } //左边的直播语音
                                .taps_left {
                                    position: absolute;
                                    left: .25rem;
                                    top: .55rem;
                                    width: 0.8rem;
                                    height: .65rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: .1rem; // margin: 0 auto;
                                    img {
                                        width: .8rem;
                                        height: .65rem;
                                    }
                                } // 有限的金币的图标
                                .taps_money {
                                    position: absolute;
                                    right: .25rem;
                                    top: .55rem;
                                    width: auto;
                                    height: .65rem;
                                    background: #FF6000;
                                    border-radius: .1rem;
                                    display: flex;
                                    align-items: center; // justify-content: space-between;
                                    // margin: 0 auto;
                                    img {
                                        width: .45rem;
                                        height: .45rem;
                                        margin-right: .1rem;
                                        margin-left: .15rem;
                                        &:nth-of-type(2) {
                                            width: .225rem;
                                            height: .425rem;
                                            margin-right: .15rem;
                                        }
                                    }
                                    span {
                                        font-size: .55rem;
                                        font-family: PingFang-SC-Bold;
                                        font-weight: bold;
                                        color: rgba(255, 255, 255, 1);
                                        margin-right: .125rem;
                                        line-height: .65rem;
                                    }
                                } //右边的视频播放的时间
                                .taps_right {
                                    position: absolute;
                                    right: .275rem;
                                    bottom: .25rem;
                                    display: flex;
                                    span {
                                        font-size: .45rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(255, 255, 255, 1);
                                        line-height: .6rem;
                                    }
                                }
                                .taps_bottom {
                                    position: absolute; // bottom: .3rem;
                                    width: 100%; // left: .35rem;
                                    .left {
                                        position: absolute;
                                        left: .35rem;
                                        bottom: .3rem;
                                        img {
                                            width: .4rem;
                                            height: .5rem;
                                            margin-right: .2rem;
                                        }
                                        span {
                                            font-size: 0.6rem;
                                            font-family: PingFang-SC-Medium;
                                            font-weight: 500;
                                            color: rgba(255, 255, 255, 1); // line-height: .6rem;
                                        }
                                    }
                                    .center {
                                        position: absolute;
                                        left: 3.175rem;
                                        bottom: .3rem;
                                        img {
                                            width: .65rem;
                                            height: .5rem;
                                            margin-right: .2rem;
                                        }
                                        span {
                                            font-size: 0.6rem;
                                            font-family: PingFang-SC-Medium;
                                            font-weight: 500;
                                            color: rgba(255, 255, 255, 1);
                                            line-height: .325rem;
                                        }
                                    }
                                }
                            } //用户的信息
                            .userInfo {
                                width: 100%;
                                height: 2.25rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center; //用户描述
                                div {
                                    font-size: .55rem;
                                    font-family: PingFang-SC-Medium;
                                    font-weight: 500;
                                    color: rgba(102, 102, 102, 1);
                                    &:nth-of-type(1) {
                                        font-size: .5rem;
                                        font-family: PingFang-SC-Bold;
                                        font-weight: bold;
                                        color: rgba(51, 51, 51, 1);
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                    }
                                    &:nth-of-type(2) {
                                        width: 7rem;
                                        display: flex;
                                        justify-content: flex-end;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } //模态框的提示按钮
   @import '../../assets/scss/popup';
</style>