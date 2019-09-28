<template>
    <div id="search">
        <!-- 1,顶部的搜索界面 -->
        <div class="navsearch">
            <!-- 1.1左边的返回箭头 -->
            <div class="left" @click="go_left">
                <img src="../../assets/image/login/back_leftde.png" alt="">
            </div>
            <!-- 1.2搜索输入框 -->
            <!-- <div class="searchinput"> -->
            <!-- <img src="../../assets/image/live/homepage_icon_search@2x.png" alt=""> -->
            <!-- <span>直播回放标题、用户名、用户ID、房间ID</span> -->
            <!-- <!-- <input type="text" placeholder="直播回放标题、用户名、用户ID、房间ID"> -->
            <van-search placeholder="直播回放标题、用户名、用户ID、房间ID" v-model="taolusearch" shape="round" @focus="searchfocus" @blur="searchblur" @keypress="searchpress" />
            <!-- </div> -->
        </div>
        <!-- 2，热门搜索的 -->
        <div class="hotsearch" v-show="isshowhotsearch">
            <div class="taphot">热门搜索</div>
            <ul class="taphotList">
                <li>调教</li>
                <li>踩踏羞辱</li>
                <li>恋足</li>
                <li>调教恋足搞笑</li>
                <li>踩踏羞辱</li>
                <li>踩踏羞辱</li>
                <li>踩踏羞辱</li>
                <li>踩踏羞辱</li>
                <li>踩踏羞辱</li>
                <li>踩踏羞辱</li>
            </ul>
            <div class="hr">
            </div>
            <!-- 3，历史搜索的界面的 -->
            <div class="taphistory">
                <span>历史搜索</span>
                <img src="../../assets/image/live/beibao_icon_shanchu@2x.png" alt="">
            </div>
            <ul class="historylist">
                <li>恋足</li>
                <li>草莓丸子</li>
                <li>美腿</li>
                <li>踏踩羞辱</li>
                <li>踏踩羞</li>
                <li>踏踩羞3辱</li>
                <li>踏踩羞332辱</li>
                <li>踏踩羞23232辱</li>
                <li>踏踩羞</li>
                <li>踏踩羞2辱</li>
            </ul>
        </div>
        <!-- 3，没搜到结果 -->
        <div class="none" v-show="isshownone">
            <img src="../../assets/image/live/sousuo_image_queshengye@2x.png" alt="">
        </div>
        <div class="findnon" v-show="isshownone">
            什么都没找到，请重新输入哦~
        </div>
        <!-- 4，有结果就显示结果 -->
        <div id="playback" v-if="isshowresult">
            <!-- 推荐视频的主要的部分 -->
            <div class="g_short clear">
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
                                            <p class="taps_left">
                                                <span v-show="item.liveType==storeData.liveType.VIDEO">
                                                                                                                                                                                                                         <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="">
                                                                                                                                                                                                                                                                                                                                                                                                       </span>
                                                <span v-show="item.liveType==storeData.liveType.AUDIO">                                                          <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="">  </span>
                                            </p>
                                            <!-- 暂时去掉红包 -->
                                            <!-- <p class="taps_money">   <img src="../../assets/image/live/zhibohuifang_icon_hongbao@2x.png" alt="">  </p> -->
                                            <p class="taps_right">
                                                <img src="../../assets/image/icon/goldicon.png" alt="">
                                                <span>{{item.payMoney}}</span>
                                                <span> <img src="../../assets/image/live/shangcheng_icon_kuozhan01@2x.png" alt=""></span>
                                            </p>
                                            <div class="taps_bottom">
                                                <!-- 去掉城市 -->
                                                <!-- <div class="left">
                                                                                                                                                                                                                                                                                                            <img src="../../assets/image/live/huifangyemian_icon_dingwe@2x.png" alt="">
                                                                                                                                                                                                                                                                                                            <span>{{item.cityName}}</span>
                                                                                                                                                                                                                                                                                                        </div> -->
                                                <div class="center">
                                                    <img src="../../assets/image/live/zhibohuifang_icon_guankan@2x.png" alt="" id="imgsize">
                                                    <span>{{item.detail.watchCountSum}}</span>
                                                </div>
                                                <div class="right">
                                                    <span>{{item.vedioDuration}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <!-- 用户的信息 -->
                                    <div class="userInfo" @click.prevent="jumptotopersonzhubo(item.owner.id,item.owner.headpic,item.owner.descs)">
                                        <div class="user_icon">
                                            <img :src="item.headPicture+'?imageView2/1/w/200'" alt="">
                                        </div>
                                        <div class="user_right">
                                            <div class="user_taps">
                                                <span>{{item.userName}}</span>
                                            </div>
                                            <div class="user_descript">
                                                <span>{{item.roomAnnouncement}}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </ul>
            </div>
            <!-- 模态框的弹出提示 -->
            <van-popup v-model="showone" :close-on-click-overlay="false">
                <div class="buybox">
                    <div class="top"><span>{{$t('m.buylive')}}</span></div>
                    <img src="../../assets/image/zhibo/buyone.png" class="toplive">
                    <!-- 试看的按钮 -->
                    <div class="liveroomtry" @click="goliveroomtry" v-if="isjoinmember">
                        <span>{{$t('m.trysee')}}</span>
                    </div>
                    <div class="buypayit" @click="videoconfirm">
                        <div class="right">
                            <img src="../../assets/image/icon/goldicon.png" alt="">
                            <span>{{money}}</span>
                            <span>{{$t('m.buycon')}}</span>
                        </div>
                    </div>
                    <div class="backgo" @click="videocancel">
                        <span>{{$t('m.back')}}</span>
                    </div>
                </div>
            </van-popup>
            <!-- 金币不足跳转到购买的页面-->
            <van-popup v-model="showtwo" :close-on-click-overlay="false">
                <div class="buybox2">
                    <div class="top">
                        <!-- <span>您的金币不足，是否前往充值？</span> -->
                        <span>{{$t('m.goldover')}}</span>
                    </div>
                    <img src="../../assets/image/icon/goldicon.png" class="toplive">
                    <div class="buypayit" @click="videoconfirmpay">
                        <!-- <span>前往充值</span> -->
                        <span>{{$t('m.goldover')}}</span>
                    </div>
                    <div class="backgo" @click="videocancelpay">
                        <!-- <span>返回</span> -->
                        <span>{{$t('m.back')}}</span>
                    </div>
                </div>
            </van-popup>
            <!-- 游客登录的模式 -->
            <van-popup v-model="isshowtourlogin">
                <div class="buybox2">
                    <div class="top"><span>{{$t('m.torlogin')}}</span></div>
                    <img src="../../assets/image/icon/biaoqianlan_icon_me02@3x.png" class="toplive" id="buybox3">
                    <div class="buypayit" @click="videoconfirmpayone">
                        <span>{{$t('m.tourtologin')}}</span>
                    </div>
                    <div class="backgo" @click="videocancelpaytwo"><span>{{$t('m.tourtocancal')}}</span></div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                // 1,是否显示内容
                isshowhotsearch: true,
                // 2,是否显示直播的内容
                isshowresult: false,
                // 3，是否显示没找到结果的
                isshownone: false,
                // vue的套路search的
                taolusearch: "",
                // 4,搜索到结果的参数
                // 显示试看的
                isjoinmember: this.$store.state.isvideotrysee,
                isshowtourlogin: false,
                storeData: this.$store.state, //store视频的状态
                deviceList: [], //用于存放加载的数据
                loading: false, //控制上拉加载的加载动画
                finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false, //控制下拉刷新的加载动画
                pageCommit: {
                    page: '1',
                    rows: 10
                },
                //设置是语音还是视频的切换
                isshowvideo: false,
                isshowvoice: false,
                //视频的money
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
                findUserId: '',
                // 去试看的房间
                liveroomtry: "",
                buydata: ""
            }
        },
        methods: {
            // 搜索时触发
            searchpress() {
                this.isshowhotsearch = false;
                this.isshowresult = true;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post("/av/apiu/liveRoom/his", comValue)
                    .then(res => {
                        // //console.log("哈哈出发啦");
                        console.log(res);
                        self.deviceList = res.data.data; //赋值给数组
                        self.isLoading = false; //关闭下拉刷新效果
                    })
                    .catch(err => {
                        console.error(err);
                    })
                if (this.deviceList.length == 0) {
                    this.isshownone = true;
                    this.isshowhotsearch = false
                    this.isshowresult = false
                } else {
                    this.isshowhotsearch = false;
                    this.isshownone = false;
                    this.isshowresult = true;
                }
            },
            // 搜索框的获得焦点的事件
            searchfocus() {
                console.log("我获得了焦点");
                this.isshowhotsearch = true;
                this.isshowresult = false;
                this.isshownone = false;
            },
            // 搜索框失去了焦点
            searchblur() {
                console.log("我失去了焦点");
            },
            go_left() {
                this.$router.push({
                    path: '/live'
                })
            },
            // 游客登录的
            videoconfirmpayone() {
                this.$router.push({
                    path: '/login'
                })
            },
            videocancelpaytwo() {
                this.isshowtourlogin = false;
            },
            //刷线的
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post("/av/apiu/liveRoom/his", comValue)
                    .then(res => {
                        // //console.log("哈哈出发啦");
                        console.log(res);
                        self.deviceList = res.data.data; //赋值给数组
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
                    self.$axios.post('/av/apiu/liveRoom/his', comValue)
                        .then(res => {
                            // //console.log(res);
                            self.deviceList = self.deviceList.concat(res.data.data); //将获取到数据添加到数据列表里返回新数组
                            self.loading = false; //加载动画结束
                            self.pageCommit.page++;
                            if (res.data.data.length == "") {
                                self.finished = true; //如果当前页大于总页码数，说明没数据，如果没有数据，就不调用接口
                            }
                        })
                        .catch(err => {})
                }, 500);
            },
            //点击视频进入房间，已购买直接进入，未购买就去引导购买页
            golive(roomId, money, id) {
                if (window.localStorage.getItem('tourusertype') == 7) {
                    this.isshowtourlogin = true
                } else {
                    this.live.roomId = roomId;
                    this.money = money;
                    this.buylive.money = money;
                    this.findUserId = id; //用户的id
                    let roomIdLis = qs.stringify(this.live);
                    this.$axios.post('/av/apiu/liveRoom/intoRoom', roomIdLis)
                        .then(res => {
                            this.data = res;
                            // //console.log(res);
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
                }
            },
            // 去试看
            goliveroomtry() {
                this.$axios.get('/av/apiu/liveRoom/intoRoomTry', {
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
            // 点击购买的按钮
            videoconfirm() {
                this.buylive.dataId = this.live.roomId;
                let buylive = qs.stringify(this.buylive);
                this.$axios.post('/pay/apiu/userPay/purchase', buylive)
                    .then(res => {
                        // //console.log(res)
                        this.showone = false;
                        // 已购买就直接进去房间页
                        let roomIdLis = qs.stringify(this.live);
                        this.$axios.post('/av/apiu/liveRoom/intoRoom', roomIdLis)
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
                // console.log('----moneyaa')
                // moneyLack();
                // 将vue的方法暴露给ios
                // window.webkit.messageHandlers.videoconfirmpay.postMessage(null);
                // if (window.localStorage.getItem("iosapp") == "no") {
                this.$router.push({
                    path: '/mygold'
                })
                // }
            },
            //金币不足点击购买然后跳转到支付界面
            //金币不足直接返回上一级或者退出房间
            videocancelpay() {
                this.showone = false;
                this.showtwo = false;
            },
            //点击进入主播的个人主页
            jumptotopersonzhubo(id, headpic, descs) {
                if (window.localStorage.getItem('tourusertype') == 7) {
                    this.isshowtourlogin = true
                } else {
                    window.localStorage.setItem("frompath", this.$route.path)
                    window.localStorage.setItem("findUserId", id)
                    window.localStorage.setItem("headpic", headpic)
                    this.$router.push({
                        path: '/topersonzhubo',
                        query: {
                            findUserId: id
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #search {
        padding-top: 2.2rem;
    }
    .navsearch {
        width: 18.75rem;
        height: 2.2rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        .left {
            position: fixed;
            width: 1.925rem;
            top: 0;
            left: 0;
            height: 2.2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: .375rem;
                height: .675rem;
                margin-left: .75rem;
            }
        } //输入框的内容
        .van-search {
            position: fixed;
            top: .425rem;
            left: 1.925rem;
            width: 16.075rem;
            height: 1.35rem; // background: rgba(245, 245, 245, 1);
            background-color: #F5F5F5;
            border-radius: .675rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            border-radius: 0 .675rem .675rem 0;
            background-color: #F5F5F5;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            padding: 0;
            .van-cell {
                line-height: .7rem;
            }
            &:focus {
                color: #cccccc;
            }
            /deep/.van-field__control {
                font-size: .65rem;
            }
        }
    } //2,热门搜索的
    .hotsearch {
        width: 100vw;
        height: auto;
        .taphot {
            margin-top: 1.225rem;
            margin-left: .775rem;
            font-size: .65rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            line-height: .325rem;
        }
        .taphotList {
            width: auto;
            margin: .5rem .75rem 0;
            height: auto;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
                margin-right: .5rem;
                margin-bottom: .5rem;
                width: auto;
                height: auto;
                background: rgba(245, 245, 245, 1);
                border-radius: .15rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                text-align: center;
                padding: .35rem .5rem;
            }
        }
        .hr {
            width: 17.25rem;
            height: 1Px;
            background: rgba(245, 245, 245, 1);
            margin: 1.25rem auto;
        }
        .taphistory {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .75rem;
            span {
                margin-left: .775rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
                line-height: .325rem;
            }
            img {
                vertical-align: middle;
                width: .7rem;
                height: .75rem;
                margin-right: .775rem;
            }
        }
        .historylist {
            width: auto;
            margin: .5rem .75rem 0;
            height: auto;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
                margin-right: .5rem;
                margin-bottom: .5rem;
                width: auto;
                height: auto;
                background: rgba(245, 245, 245, 1);
                border-radius: .15rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                text-align: center;
                padding: .35rem .5rem;
            }
        }
    } // 没搜到结果
    .none {
        margin: 6.5rem auto 1.5rem;
        width: 7.4rem;
        height: 5.5rem;
        img {
            width: 7.4rem;
            height: 5.5rem;
        }
    } // 
    .findnon {
        margin: 0 auto;
        width: 100%;
        text-align: center;
        height: .575rem;
        font-size: .55rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    } // 搜索到结果
    #playback {
        margin-top: .5rem;
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
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
                    .abox {
                        width: 8.375rem;
                        height: 10.75rem;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: -1px 2px 10px 0px rgba(209, 209, 209, 1);
                        margin-bottom: .525rem;
                        border-radius: .25rem;
                        &:nth-of-type(2n) {
                            margin-left: .5rem;
                        }
                        li {
                            width: 8.375rem;
                            height: 10.75rem;
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
                                    } //左边的直播语音
                                    .taps_left {
                                        position: absolute;
                                        left: .25rem;
                                        top: .25rem;
                                        width: 0.8rem;
                                        height: 0.65rem;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        border-radius: .1rem;
                                        span {
                                            img {
                                                width: .8rem;
                                                height: .65rem;
                                                border-radius: 0;
                                            }
                                        }
                                    }
                                    .taps_money {
                                        position: absolute;
                                        left: 0.25rem;
                                        top: 1.125rem;
                                        width: 1.05rem;
                                        height: 1.625rem;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    } //右边的视频播放的时间
                                    .taps_right {
                                        position: absolute;
                                        top: .25rem;
                                        right: .25rem;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        width: auto;
                                        height: .65rem;
                                        background: rgba(255, 96, 0, 1);
                                        border-radius: .125rem;
                                        font-size: 0;
                                        img {
                                            width: .4rem;
                                            height: .4rem;
                                            margin: 0 .15rem;
                                        }
                                        span {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: .55rem;
                                            font-family: PingFang-SC-Medium;
                                            font-weight: 500;
                                            color: rgba(255, 255, 255, 1); // margin-right: .5rem;
                                            img {
                                                width: .4rem;
                                                height: .425rem;
                                            }
                                        }
                                    }
                                    .taps_bottom {
                                        position: absolute;
                                        left: .175rem;
                                        width: 100%;
                                        .left {
                                            position: absolute;
                                            left: .175rem;
                                            bottom: .2rem;
                                            img {
                                                margin-right: .15rem;
                                                width: .8125rem;
                                                height: .5625rem;
                                            }
                                            span {
                                                font-size: 0.45rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                                line-height: .6rem;
                                            }
                                        }
                                        .center {
                                            position: absolute;
                                            left: .175rem;
                                            bottom: .2rem;
                                            img {
                                                margin-right: .1rem;
                                                vertical-align: middle;
                                                width: .8125rem; // height: .5625rem;
                                            }
                                            span {
                                                font-size: .45rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                                line-height: .325rem;
                                            }
                                        }
                                        .right {
                                            position: absolute;
                                            right: .25rem;
                                            bottom: .2rem;
                                            img {
                                                width: .3rem;
                                                height: .5rem;
                                                width: .8125rem;
                                            }
                                            span {
                                                font-size: .45rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                            }
                                        }
                                    }
                                }
                            } //用户的信息
                            .userInfo {
                                width: 100%;
                                height: 2.25rem; // position: relative; //用户的头像
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .user_icon {
                                    width: 1.8rem;
                                    height: 1.8rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    margin-left: 5px;
                                    img {
                                        width: 1.8rem;
                                        height: 1.8rem;
                                        background: rgba(255, 255, 255, 1);
                                        border: 1Px solid rgba(255, 255, 255, 1);
                                        border-radius: 50%;
                                    }
                                } //用户描述
                                .user_right {
                                    flex: 1;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    flex-wrap: wrap;
                                    .user_taps {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
                                        height: 50%;
                                        width: 100%;
                                        span {
                                            font-size: .65rem;
                                            font-family: PingFang-SC-Bold;
                                            font-weight: bold;
                                            color: rgba(51, 51, 51, 1);
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 1;
                                            -webkit-box-orient: vertical;
                                        }
                                    }
                                    .user_descript {
                                        height: 50%;
                                        width: 100%;
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
                                        span {
                                            font-size: .55rem;
                                            font-family: PingFang-SC-Medium;
                                            font-weight: 500;
                                            color: rgba(102, 102, 102, 1);
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 1;
                                            -webkit-box-orient: vertical;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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
    } // 游客登录的显示
    #buybox3 {
        width: auto;
    }
</style>