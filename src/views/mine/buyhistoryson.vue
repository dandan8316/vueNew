<template>
    <div id="buyhistoryson">
        <!-- <div class="buyhistory"> -->
        <!-- 推荐视频的主要的部分 -->
        <router-view>
        </router-view>
        <div class="g_short clear">
            <ul>
                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :loosing-text="$t('m.loosingtext')" :loading-text="$t('m.loadingtext')" :success-text="$t('m.refreshsuc')">
                    <!-- 上拉加载的动画 -->
                    <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$t('m.nomore')" :loading-text="$t('m.loading')">
                        <!-- 加载的内容 -->
                        <a href="javascript:void(0);" v-for="item in deviceList" @click.prevent="go_live(item.liveRoom.roomId,item.liveRoom.ownerId)" :key="item.id">
                            <div class="top">
                                <div class="left">
                                    <img :src="item.liveRoom.roomImage+'?imageView2/1/w/200'" alt="">
                                    <!-- 遮罩层 -->
                                    <div class="mask">
                                    </div>
                                    <div class="labelname">
                                        <span>{{item.liveRoom.userName}}</span>
                                    </div>
                                    <!-- 视频的类型 -->
                                    <div class="tapleftimg">
                                        <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="" v-show="item.liveRoom.liveType==storeData.liveType.VIDEO">
                                        <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-show="item.liveRoom.liveType==storeData.liveType.AUDIO">
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="title">
                                        <span>{{item.liveRoom.vedioDuration}}</span>
                                        <span>{{item.liveRoom.updateTime | capitalize}}</span>
                                    </div>
                                    <div class="centertitle">
                                        <span>
                                                                         {{item.liveRoom.roomAnnouncement}}
                                                                          </span>
                                    </div>
                                    <div class="bottomtitle">
                                        <!-- <span>评论</span> -->
                                        <!-- <span>3456</span> -->
                                        <span>{{$t('m.hot')}}</span>
                                        <span>{{item.liveRoom.detail.totalCoin}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 暂时去掉不要这个 -->
                            <div class="bottomdes">
                                <span></span>
                            </div>
                        </a>
                    </van-list>
                </van-pull-refresh>
            </ul>
        </div>
        <!-- </div> -->
        <!-- <div v-if="he">暂无数据</div> -->
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                storeData: this.$store.state, //store视频的状态
                isactive: 2, //tab栏切换的
                deviceList: [], //用于存放加载的数据
                loading: false, //控制上拉加载的加载动画
                finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false, //控制下拉刷新的加载动画
                pageCommit: {
                    page: '1',
                    rows: 10,
                    // findOwnerId: ''
                },
                //进入房间的roomId
                live: {
                    roomId: "",
                },
                // 用户的findUserId
                findUserId: ''
            }
        },
        // 过滤时间
        filters: {
            capitalize: function(value) {
                value = value.slice(0, 11)
                return value
            }
        },
        methods: {
            //点击进入直播间
            go_live(roomId, id) {
                this.live.roomId = roomId;
                this.findUserId = id; //用户的id
                let roomIdLis = qs.stringify(this.live);
                this.$axios.post(this.api.globalApi.intoRoom, roomIdLis)
                    .then(res => {
                        this.data = res;
                        //成功就去房间页
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
                        // 房间未购买就弹框引导购买
                        if (err.response.data.field == "room.unpay") {
                            // this.showone = true;
                            this.$toast("房间未购买")
                        } else if (err.response.data.field == "live.delete") {
                            //直播或者回放被删除或封禁就弹出一条消息
                            this.$toast("直播或回放被删除或封禁")
                        } else {
                            if (err.response.data.msg) {
                                this.$toast(err.response.data.msg)
                            } else if (err.response.data.langMsg) {
                                this.$toast(err.response.data.langMsg)
                            } else if (err.response.data.message) {
                                this.$toast(err.response.data.message)
                            } else {
                                this.$toast(err)
                            }
                        }
                        //console.log(err);
                    })
            },
            //点击左侧按钮返回上一级
            onClickLeft() {
                this.$router.go(-1);
            },
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post(this.api.globalApi.buyList, comValue)
                    .then(res => {
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
                    self.$axios.post(this.api.globalApi.buyList, comValue)
                        .then(res => {
                            //console.log(res.data.data.length);
                            //console.log(res.data.data);
                            if (res.data.data.length == 0) {
                                self.loading = false;
                                self.finished = true; //如果当前页大于总页码数，说明没数据，如果没有数据，就不调用接口
                            } else if (res.data.data.length != 0) {
                                self.deviceList = self.deviceList.concat(res.data.data); //将获取到数据添加到数据列表里返回新数组
                                self.loading = false; //加载动画结束
                                self.pageCommit.page++;
                                // 如果没有购买过，就停止加载动画
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }, 500);
            },
            // playback(roomId) {
            //     this.$router.push({
            //         path: '/playback',
            //         query: {
            //             roomId: roomId
            //         }
            //     })
            // }
        },
    }
</script>

<style lang="scss" scoped>
    #buyhistoryson {
        width: 100%;
        height: 100%;
        background-color: #fff; // padding-top: 1.9rem;
    } //主要的部分
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
                    a {
                        width: 100%;
                        height: auto;
                        display: flex;
                        margin: 0 .75rem;
                        justify-content: center;
                        align-items: center;
                        border-bottom: 1px solid #f7f7f7;
                        .top {
                            width: 18.05rem;
                            height: 5rem;
                            display: flex;
                            padding-top: .25rem;
                            .left {
                                width: 5rem;
                                height: 5rem;
                                position: relative;
                                img {
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                } //图层蒙版
                                .mask {
                                    position: absolute;
                                    background-color: #000000;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    opacity: 0.5;
                                }
                                .labelname {
                                    position: absolute;
                                    left: .225rem;
                                    bottom: .15rem;
                                    span {
                                        width: 2rem;
                                        height: .5rem;
                                        font-size: .5rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(255, 255, 255, 1);
                                    }
                                }
                                .tapleftimg {
                                    position: absolute;
                                    left: .25rem;
                                    top: .25rem;
                                    width: 0.8rem;
                                    height: 0.65rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: .1rem;
                                    img {
                                        width: .8rem;
                                        height: .65rem;
                                        border-radius: 0;
                                    }
                                }
                            }
                            .right {
                                flex: 1;
                                height: 5rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-wrap: wrap;
                                .title {
                                    width: 100%;
                                    height: 33.333333%;
                                    border-radius: .25rem;
                                    display: flex;
                                    span {
                                        font-size: .6rem;
                                        border: 1Px solid #ff9f43;
                                        display: flex;
                                        justify-content: center;
                                        align-content: center;
                                        width: auto;
                                        height: .7rem;
                                        margin-left: .45rem;
                                        border-radius: .2rem;
                                        line-height: .7rem;
                                        color: #ff9f43;
                                        &:nth-of-type(2) {
                                            color: #999;
                                            width: auto;
                                            height: .7rem;
                                            margin-left: .1rem;
                                            border: 1Px solid #999;
                                            border-radius: .2rem;
                                        }
                                    }
                                }
                                .centertitle {
                                    width: 100%;
                                    height: 33.333333%;
                                    span {
                                        margin-left: .45rem;
                                        color: #2b2b2b;
                                        font-size: .8rem;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;
                                    }
                                }
                                .bottomtitle {
                                    width: 100%;
                                    height: 33.333333%;
                                    span {
                                        color: #2b2b2b;
                                        font-size: .6rem;
                                        &:nth-of-type(1) {
                                            margin-left: .45rem;
                                        }
                                        &:nth-of-type(2) {
                                            margin-left: .15rem;
                                            color: #ff9f43;
                                        }
                                        &:nth-of-type(3) {
                                            margin-left: .5rem;
                                        }
                                        &:nth-of-type(4) {
                                            margin-left: .15rem;
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
</style>