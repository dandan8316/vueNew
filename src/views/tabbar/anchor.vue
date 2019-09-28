<template>
    <div id="anchor">
        <div class="anchor clear">
            <!-- 如果没有关注的主播就显示 -->
            <!-- 按热度和时间 -->
            <div class="hotortime">
                <div class="select" @click="select">
                    <span>{{$t('m.filter')}}</span>
                    <img src="../../assets/image/live/zhibo_icon_xiala@2x.png" alt="" ref="topbottom">
                </div>
                <div class="left" @click="hotCount">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire02@2x.png" alt="" v-show="updataimg">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire01@2x.png" alt="" v-show="!updataimg">
                    <span>按热度</span>
                </div>
                <div class="right" @click="upDate">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire02@2x.png" alt="" v-show="!updataimg">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire01@2x.png" alt="" v-show="updataimg">
                    <span>按时间</span>
                </div>
            </div>
            <!-- 视频列表 -->
            <ul>
                <van-pull-refresh v-model="isLoading" :loosing-text="$t('m.loosingtext')" :loading-text="$t('m.loadingtext')" @refresh="onRefresh" :success-text="$t('m.refreshsuc')">
                    <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$t('m.nomore')" :loading-text="$t('m.loading')">
                        <!-- 加载的内容 -->
                        <div class="abox" v-for="item in deviceList" :key="item.id">
                            <li>
                                <!-- 视频的 -->
                                <a @click.prevent="golive(item.roomId,item.payMoney,item.ownerId)">
                                    <div class="topVideo">
                                        <!-- <video src="" loop :poster="item.roomImage"></video> -->
                                        <img :src="item.roomImage+'?imageView2/1/w/200'" alt="">
                                        <!-- 遮罩层 -->
                                        <div class="mask">
                                        </div>
                                        <!-- 3,底部左边的 -->
                                        <div class="taps_bottomleft">
                                            <img src="../../assets/image/live/huifangyemian_icon_redu@2x.png" alt="">
                                            <span>{{item.hotCount |numadd}}</span>
                                            <!-- <img src="../../assets/image/live/zhibohuifang_icon_guankan@2x.png" alt="">
                                                                                                                                                <span>1455</span> -->
                                        </div>
                                        <div class="taps_bottomright">
                                            <span>{{item.userName}}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </ul>
        </div>
        <!-- mask蒙版-->
        <transition name="fade">
            <div class="popmask" v-if="showpop" @click="select">
            </div>
        </transition>
        <!--筛选的弹出层-->
        <transition name="fade">
            <div class="pop" v-if="showpop">
                <!-- 1,标签 -->
                <div class="tapslist">
                    <div class="rooms">
                        {{$t('m.label')}}
                    </div>
                    <ul>
                        <li v-for="(it, index) in tapslist" :key="it.index" :class="{liactive:index == numthree}" @click="liactivethree(index,it.name)">
                            {{it.name}}
                        </li>
                    </ul>
                </div>
                <!-- 2,频道/男权女权 -->
                <div class="wmen">
                    <div class="wmennav">
                        {{$t('m.Malefemale')}}
                    </div>
                    <ul>
                        <li v-for="(it, index) in wmendata" :key="it.index" :class="{liactive:index == numone}" @click="liactiveone(index,it.name)">
                            {{it.name}}
                        </li>
                    </ul>
                </div>
                <!--5, 重置筛选和确认的 -->
                <div class="bottomsel">
                    <div class="left" @click="bottomselleft">
                        {{$t('m.Resetfilter')}}
                    </div>
                    <div class="right" @click="bottomselright">
                        <span>
                                                                                                                                                                                                       {{$t('m.confirm')}}
                                                                                                                                                                                                    </span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 1,游客未登录弹窗 -->
        <touristbox :isshowtourlogin="isshowtourl" @closetourstbox="closetourstbox"></touristbox>
        <!-- 2,视频未购买弹框 -->
        <goldInadequate :isnobuy="showone" :roomid="live.roomId" :finduser="findUserId" :buylive="buylive" @nobuyvideoclose="nobuyvideoclose" @goldenougn="nogoldenougn"></goldInadequate>
        <!-- 3,金币不足的弹窗 -->
        <gotopay :gotopay="isshowgotopay" @topayclosepay="sontopayclosepay">
        </gotopay>
    </div>
</template>
<script>
    import qs from 'qs'
    // import Public from '../../public.js';bus总线
    import touristbox from '../../components/touristbox.vue'; //未登录
    import goldInadequate from '../../components/goldInadequate.vue'; //未购买
    import gotopay from '../../components/gotopay.vue'; //未购买
    export default {
        components: {
            touristbox,
            goldInadequate,
            gotopay
        },
        data() {
            return {
                updataimg: true,
                storeData: this.$store.state, //store视频的状态
                deviceList: [], //用于存放加载的数据
                loading: false, //控制上拉加载的加载动画
                finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false, //控制下拉刷新的加载动画
                pageCommit: {
                    page: "1",
                    rows: 10,
                    // 1,排序排序字段(hotCount最热/upDate最新/watchCount观看最多likeCount 点赞最多)
                    sort: "",
                    // 2,男权女权man woman
                    "room.contentType": "",
                    //4,标签
                    "room.labelCode": "",
                    "roomUp.ifGood": "0",
                    sort: "hotCount",
                },
                //筛选蒙版的显示和隐藏
                showpop: false,
                // 筛选的模拟的数据
                numone: 0, //男权女权
                numthree: 0, //标签
                // 男权女权
                wmendata: [{
                        name: this.$t('m.All')
                    },
                    {
                        name: this.$t('m.Males')
                    },
                    {
                        name: this.$t('m.Females')
                    }
                ],
                // 标签
                tapslist: [{
                        name: this.$t('m.All')
                    },
                    {
                        name: ""
                    },
                    {
                        name: ""
                    },
                    {
                        name: ""
                    },
                    {
                        name: ""
                    },
                    {
                        name: ""
                    }
                ],
                langge: {
                    lang: "en",
                    lookupCodes: "videoLabels"
                },
                // 观看视频需要的参数
                //1,进入房间的roomId
                live: {
                    roomId: "",
                },
                // 2,弹窗的money
                money: '',
                // 3,购买房间视频的参数
                buylive: {
                    accType: 'coin', //账户类型coin
                    buyType: 'room_his',
                    dataId: '',
                    money: '',
                },
                // 4,用户id
                findUserId: '',
                // 5,成功之后的数据
                data: "",
                //6,模态框登录组件
                isshowtourl: false,
                //7,未购买
                showone: false,
                //8,金币不足
                isshowgotopay: false
            }
        },
        mounted() {
            this.languageget()
        },
        watch: {
            //9
            isshowtourl: function(newValue, oldValue) {
                this.isshowtourl = newValue
            }
        },
        methods: {
            //10,游客关闭模态框
            closetourstbox(data) {
                this.isshowtourl = data;
            },
            // 11,未购买关闭
            nobuyvideoclose(data) {
                this.showone = data
            },
            // 12,支付关闭
            sontopayclosepay(data) {
                this.isshowgotopay = data
            },
            //13,金币不足
            nogoldenougn(data) {
                this.isshowgotopay = data
            },
            //14,点击之后进去直播间
            golive(roomId, money, id) {
                if (window.localStorage.getItem('tourusertype') == 7) {
                    this.isshowtourl = true
                } else {
                    this.live.roomId = roomId;
                    this.money = money;
                    this.buylive.money = money;
                    this.findUserId = id; //用户的id
                    let roomIdLis = qs.stringify(this.live);
                    this.$axios.post(this.api.globalApi.intoRoom, roomIdLis)
                        .then(res => {
                            this.data = res;
                            //已购买就直接进去房间页
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
                            // if (err.response.data.field == "room.unpay") {
                            if (err.response.data.err == "UNPAY") {
                                this.showone = true;
                            } else if (err.response.data.field == "live.delete") {
                                //直播或者回放被删除或封禁就弹出一条消息
                                // this.$toast("直播或回放被删除或封禁")
                                this.$toast(err.response.data.message)
                            } else {
                                // this.$toast(err.response.data.langMsg)
                                if (err.response.data.langMsg) {
                                    this.$toast(err.response.data.langMsg)
                                } else {
                                    this.$toast(err.response.data.message)
                                }
                            }
                        })
                }
            },
            //按照热度
            hotCount() {
                this.updataimg = !this.updataimg;
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                this.pageCommit.sort = "hotCount";
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post(this.api.his, comValue)
                    .then(res => {
                        self.deviceList = res.data.data;
                        self.isLoading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }, //按照时间
            upDate() {
                this.updataimg = !this.updataimg;
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                this.pageCommit.sort = "upDate";
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post(this.api.his, comValue)
                    .then(res => {
                        self.deviceList = res.data.data;
                        self.isLoading = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //获取标签的
            languageget() {
                var lang = window.localStorage.getItem('userlang')
                if (!lang) {
                    lang = window.localStorage.getItem('lang')
                }
                if (lang == 'zh' || lang.indexOf('zh-') >= 0) {
                    lang = 'CN';
                }
                if (lang == 'ja' || lang.indexOf('ja-') >= 0) {
                    lang = 'JP';
                }
                this.langge.lang = lang;
                this.$axios.post(this.api.globalApi.itemNames, qs.stringify(this.langge))
                    .then(res => {
                        let objTmp = res.data.data.videoLabels;
                        this.tapslist[0].name = this.$t('m.All')
                        this.tapslist[1].name = objTmp.LABEL_CHAT
                        this.tapslist[2].name = objTmp.LABEL_BDSM
                        this.tapslist[3].name = objTmp.LABEL_NEW
                        this.tapslist[4].name = objTmp.LABEL_FOOT
                        this.tapslist[5].name = objTmp.LABEL_SKILL
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //筛选的显示隐藏控制
            select() {
                this.showpop = !this.showpop;
                if (this.showpop == true) {
                    this.$refs.topbottom.style['transform'] = `rotate(180deg)`
                } else {
                    this.$refs.topbottom.style['transform'] = `rotate(0deg)`
                }
            },
            // 男权女权
            liactiveone(index, name) {
                this.numone = index;
                console.log(name);
                switch (index) {
                    case 0:
                        this.pageCommit["room.contentType"] = ""
                        break;
                    case 1:
                        this.pageCommit["room.contentType"] = "man"
                        break;
                    case 2:
                        this.pageCommit["room.contentType"] = "woman"
                        break;
                    default:
                        break;
                }
            },
            liactivethree(index, it) {
                this.numthree = index;
                console.log(it);
                switch (index) {
                    case 0:
                        this.pageCommit["room.labelCode"] = ""
                        break;
                    case 1:
                        this.pageCommit["room.labelCode"] = "LABEL_CHAT"
                        break;
                    case 2:
                        this.pageCommit["room.labelCode"] = "LABEL_BDSM"
                        break;
                    case 3:
                        this.pageCommit["room.labelCode"] = "LABEL_NEW"
                        break;
                    case 4:
                        this.pageCommit["room.labelCode"] = "LABEL_FOOT"
                        break;
                    case 5:
                        this.pageCommit["room.labelCode"] = "LABEL_SKILL"
                        break;
                    default:
                        break;
                }
            },
            // 筛选确认的
            bottomselright() {
                this.pageCommit.page = 1
                this.pageCommit.rows = 10
                let comValue = qs.stringify(this.pageCommit); //页面一加载显示第一页的10条数据
                this.$axios.post(this.api.his, comValue)
                    .then(res => {
                        this.deviceList = res.data.data;
                    })
                    .catch(err => {})
                this.$refs.topbottom.style['transform'] = `rotate(0deg)`
                this.showpop = false;
                this.finished = false;
                this.pageCommit.page = 1;
                this.pageCommit.page++;
            },
            // 重置筛选的
            bottomselleft() {
                this.num = 0,
                    this.numone = 0,
                    this.numthree = 0,
                    this.pageCommit.page = 1,
                    this.pageCommit.rows = 10,
                    this.pageCommit.sort = "hotCount",
                    this.pageCommit["room.contentType"] = "",
                    this.pageCommit["room.labelCode"] = ""
            },
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post(this.api.his, comValue)
                    .then(res => {
                        self.deviceList = res.data.data;
                        //赋值给数组
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
                    this.pageCommit.page = 1
                    this.pageCommit.rows = 10,
                        this.pageCommit["room.contentType"] = "",
                        this.pageCommit.labelCode = 0,
                        this.pageCommit.sort = "hotCount",
                        self.init(); //加载数据
                }, 500);
            },
            //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
            onLoad() {
                let self = this;
                setTimeout(() => {
                    let comValue = qs.stringify(self.pageCommit); //页面一加载显示第一页的10条数据
                    self.$axios.post(this.api.his, comValue)
                        .then(res => {
                            // //console.log(res);
                            //将获取到数据添加到数据列表里返回新数组
                            self.deviceList = self.deviceList.concat(res.data.data);
                            self.loading = false; //加载动画结束
                            self.pageCommit.page++;
                            if (res.data.data.length == "") {
                                self.finished = true; //如果当前页大于总页码数，说明没数据，如果没有数据，就不调用接口
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }, 500);
            },
        },
    }
</script>
<style lang="scss" scoped>
    #anchor {
        width: 100%;
        height: 100%;
        position: relative;
        .anchor {
            width: 100%;
            height: auto;
            margin-bottom: 2.5rem;
            padding-top: .65rem; // 没有关注的主播就显示
            // 热度和时间
            .hotortime {
                width: 100%;
                height: 1.25rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                position: relative;
                .select {
                    position: absolute;
                    left: .75rem;
                    top: 0;
                    width: 2.5rem;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-right: .475rem;
                    span {
                        font-size: .65rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                        line-height: .65rem;
                        margin-right: .2rem;
                        vertical-align: middle;
                    }
                    img {
                        width: .45rem;
                    }
                }
                .left {
                    width: fit-content;
                    height: fit-content;
                    img {
                        width: .6rem;
                        height: .6rem;
                        margin-right: .1rem;
                    }
                    span {
                        font-size: .65rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                    }
                }
                .right {
                    width: fit-content;
                    height: fit-content;
                    margin-right: .75rem;
                    margin-left: 1.1rem;
                    img {
                        width: .6rem;
                        height: .6rem;
                        margin-right: .1rem;
                    }
                    span {
                        font-size: .65rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            } // 视频列表
            ul {
                width: 100%;
                height: 100%;
                .van-pull-refresh {
                    .van-list {
                        display: grid;
                        grid-template-columns: 50% 50%;
                        background: #fcfcfc;
                        .abox {
                            width: auto;
                            height: 8.5rem;
                            background: transparent;
                            margin-bottom: .525rem;
                            position: relative;
                            &:nth-of-type(2n+1) {
                                li {
                                    position: absolute;
                                    top: 0;
                                    right: .25rem;
                                }
                            }
                            &:nth-of-type(2n) {
                                li {
                                    position: absolute;
                                    top: 0;
                                    left: .25rem;
                                }
                            }
                            li {
                                width: 8.4rem;
                                height: 100%;
                                background-color: #ffffff;
                                box-shadow: -1Px 2Px 5Px 0Px rgba(209, 209, 209, 1);
                                border-radius: .25rem;
                                a {
                                    width: 100%;
                                    height: 8.5rem;
                                    display: block;
                                    .topVideo {
                                        width: 100%;
                                        height: 8.5rem;
                                        position: relative;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                            object-fit: cover;
                                            border-radius: .25rem .25rem 0rem 0rem;
                                        } // 遮罩层
                                        //图层蒙版
                                        .mask {
                                            position: absolute;
                                            background-color: #000000;
                                            left: 0;
                                            top: 0;
                                            width: 100%;
                                            height: 100%;
                                            opacity: 0.5;
                                            border-radius: .25rem;
                                        } // 3,底部的左边部分
                                        .taps_bottomleft {
                                            position: absolute;
                                            left: .25rem;
                                            top: .25rem;
                                            width: fit-content;
                                            height: fit-content;
                                            display: flex;
                                            align-items: baseline;
                                            border-radius: .1rem;
                                            img {
                                                width: .35rem;
                                                height: .5rem;
                                                border: none;
                                                margin-right: .2rem;
                                                &:nth-of-type(2) {
                                                    width: .65rem;
                                                    height: auto;
                                                    margin-left: .475rem;
                                                }
                                            }
                                            span {
                                                font-size: .6rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                                &:nth-of-type(2) {
                                                    margin-left: .2rem;
                                                }
                                            }
                                        } //4,底部的右边的部分
                                        .taps_bottomright {
                                            position: absolute;
                                            bottom: .25rem;
                                            left: .25rem;
                                            display: flex;
                                            align-items: baseline;
                                            width: fit-content;
                                            height: fit-content;
                                            span {
                                                font-size: .6rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } //登录等的弹出层
    @import '../../assets/scss/popup.scss'; //筛选的按钮的样式
    .select {
        position: fixed;
        right: 0;
        top: 0;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: .475rem;
        z-index: 999;
        span {
            font-size: .65rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: .65rem;
            margin-right: .2rem;
            vertical-align: middle;
        }
        img {
            width: .45rem;
        }
    } //蒙版mask的遮罩层
    .popmask {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 1.9rem;
        left: 0;
        background-color: #000000;
        z-index: 50;
        opacity: 0.5; // 排序
    } // 弹出层的显示和隐藏
    .pop {
        width: 100vw;
        height: auto;
        min-height: 7.5rem;
        position: absolute;
        top: 1.9rem;
        left: 0; // background-color: red;
        background-color: #ffffff;
        z-index: 999999; // 排序
        border-top: 1Px solid #EEEEEE;
        .sort {
            width: 100vw;
            height: auto;
            margin-top: .725rem;
            .sortnav {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                margin-bottom: .475rem;
                margin-left: .775rem;
            }
            ul {
                width: 17.25rem;
                height: auto;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: fit-content;
                    padding: 0 .5rem;
                    height: 1.45rem;
                    border: 1px solid rgba(153, 153, 153, 1);
                    border-radius: .75rem; // 文字样式
                    font-size: .75rem;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: .5rem;
                    margin-bottom: .5rem;
                }
            }
            .hr {
                width: 18rem;
                height: 1px;
                background: rgba(245, 245, 245, 1);
                margin: 0 auto;
            }
        } // 男权女权
        .wmen {
            width: 100vw;
            height: auto;
            margin-top: .5rem;
            .wmennav {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                margin-bottom: .475rem;
                margin-left: .775rem;
            }
            ul {
                width: 17.25rem;
                height: auto;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: fit-content;
                    padding: 0 .5rem;
                    height: 1.45rem;
                    border: 1px solid rgba(153, 153, 153, 1);
                    border-radius: .75rem; // 文字样式
                    font-size: .75rem;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: .5rem;
                    margin-bottom: .5rem;
                }
            }
            .hr {
                width: 18rem;
                height: 1px;
                background: rgba(245, 245, 245, 1);
                margin: 0 auto;
            }
        } // 房间类型
        .roommodel {
            width: 100vw;
            height: auto;
            margin-top: .5rem;
            .rooms {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                margin-bottom: .475rem;
                margin-left: .775rem;
            }
            ul {
                width: 17.25rem;
                height: auto;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: fit-content;
                    padding: 0 .5rem;
                    height: 1.45rem;
                    border: 1px solid rgba(153, 153, 153, 1);
                    border-radius: .75rem; // 文字样式
                    font-size: .75rem;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: .5rem;
                    margin-bottom: .5rem;
                }
            }
            .hr {
                width: 18rem;
                height: 1px;
                background: rgba(245, 245, 245, 1);
                margin: 0 auto;
            }
        } //标签
        .tapslist {
            width: 100vw;
            height: auto;
            margin-top: .5rem;
            .rooms {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                margin-bottom: .475rem;
                margin-left: .775rem;
            }
            ul {
                width: 17.25rem;
                height: auto;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: fit-content;
                    padding: 0 .5rem;
                    height: 1.45rem;
                    border: 1px solid rgba(153, 153, 153, 1);
                    border-radius: .75rem; // 文字样式
                    font-size: .75rem;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: .5rem;
                    margin-bottom: .5rem;
                }
            }
            .hr {
                width: 18rem;
                height: 1px;
                background: rgba(245, 245, 245, 1);
                margin: 0 auto;
            }
        } // 底部的确认的按钮
        .hr {
            width: 18rem;
            height: 1px;
            background: rgba(245, 245, 245, 1);
            margin: 2rem auto 0;
        }
        .bottomsel {
            width: 100%;
            height: 2.2rem;
            display: flex;
            .left {
                width: 50%;
                height: 2.2rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                &:active {
                    background-color: #333333;
                    opacity: 0.5;
                }
            }
            .right {
                width: 50%;
                height: 2.2rem;
                background: rgba(51, 51, 51, 1);
                box-shadow: 0px -1px 0px 0px rgba(238, 238, 238, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                &:active {
                    opacity: 0.8;
                }
                span {
                    font-size: .65rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    } // 筛选框的激活的按钮
    .liactive {
        background: rgba(51, 51, 51, 1);
        font-size: .75rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1) !important;
    }
</style>