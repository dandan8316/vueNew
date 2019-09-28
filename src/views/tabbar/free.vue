<template>
    <div id="free">
        <div class="free clear">
            <ul>
                <van-pull-refresh v-model="isLoading" :loosing-text="$t('m.loosingtext')" :loading-text="$t('m.loadingtext')" @refresh="onRefresh" :success-text="$t('m.refreshsuc')">
                    <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$t('m.nomore')" :loading-text="$t('m.loading')">
                        <!-- 加载的内容 -->
                        <div class="abox" v-for="item in deviceList" :key="item.id">
                            <li>
                                <!-- 视频的 -->
                                <a @click.prevent="golive(item.roomId,item.userId)">
                                    <div class="topVideo">
                                        <!-- <video src="" loop :poster="item.roomImage"></video> -->
                                        <img :src="item.coverUrl+'?imageView2/1/w/200'" alt="">
                                        <!-- 遮罩层 -->
                                        <div class="mask">
                                        </div>
                                        <!-- 1,左边语音视频图标 -->
                                        <div class="taps_left">
                                            <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="" v-show="item.liveType==storeData.liveType.VIDEO">
                                            <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-show="item.liveType==storeData.liveType.AUDIO">
                                        </div>
                                        <!-- 2,左边语音视频图标 -->
                                        <div class="taps_right">
                                            <img src="../../assets/image/tlminiicon/homepage_icon_free@2x.png" alt="" v-if="item.discount==0">
                                        </div>
                                        <!-- 3,底部左边的 -->
                                        <div class="taps_bottomleft">
                                            <img src="../../assets/image/live/huifangyemian_icon_redu@2x.png" alt="">
                                            <span>2034</span>
                                            <img src="../../assets/image/live/zhibohuifang_icon_guankan@2x.png" alt="">
                                            <span>1455</span>
                                        </div>
                                        <div class="taps_bottomright">
                                            <span>11:20</span>
                                        </div>
                                    </div>
                                </a>
                                <!-- 用户的信息 -->
                                <div class="userInfo" @click.prevent="jumptotopersonzhubo(item.owner.id,item.owner.headpic,item.owner.descs)">
                                    <span>{{item.infomation}}</span>
                                </div>
                            </li>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </ul>
        </div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                storeData: this.$store.state, //store视频的状态
                deviceList: [], //用于存放加载的数据
                loading: false, //控制上拉加载的加载动画
                finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false, //控制下拉刷新的加载动画
                pageCommit: {
                    page: "1",
                    rows: 10,
                },
                discountfree: {
                    discount: 0,
                },
                //进入房间的roomId
                live: {
                    roomId: "",
                },
                findUserId: '',
                data: "",
                scrollTop:""
            }
        },
        created() {
            // var fuhao = "123"
            // var num = "321"
            // var wo = "456"
            // this.commonMethods.gethehe("ha", "he")
            // this.commonMethods.two(fuhao,num,wo)
            // this.commonMethods.abctest()
        },
        methods: {
            // 点击之后进去直播间
            golive(roomId, id) {
                this.live.roomId = roomId;
                this.findUserId = id; //用户的id
                let roomIdLis = qs.stringify(this.live);
                this.$axios.post(this.api.globalApi.intoRoom, roomIdLis)
                    .then(res => {
                        this.data = res;
                        // console.log(res);
                        // 免费视频直接进去房间页
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
                        if (err.response.data.msg) {
                            this.$toast(err.response.data.msg)
                        } else if (err.response.data.langMsg) {
                            this.$toast(err.response.data.langMsg)
                        }
                    })
            },
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.discountfree); //参数序列化
                let self = this;
                this.$axios.post(this.api.discount, comValue)
                    .then(res => {
                        self.deviceList = res.data.data;
                        console.log(res.data.data.length);
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
                    // this.pageCommit.rows = 10,
                    // this.pageCommit.sort = "",
                    // this.pageCommit["room.contentType"] = "",
                    // this.pageCommit.ifFans = 0,
                    // this.pageCommit.labelCode = 0,
                    self.init(); //加载数据
                    this.pageCommit.page = 1;
                    this.pageCommit.page++;
                }, 500);
            },
            //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
            onLoad() {
                let self = this;
                setTimeout(() => {
                    let comValue = qs.stringify(self.discountfree); //页面一加载显示第一页的10条数据
                    self.$axios.post(this.api.discount, comValue)
                        .then(res => {
                            // console.log(res, 121313131, new Date());
                            //将获取到数据添加到数据列表里返回新数组
                            self.deviceList = self.deviceList.concat(res.data.data);
                            self.loading = false; //加载动画结束
                            // self.pageCommit.page++;
                            // if (res.data.data.length < 0) {
                            self.finished = true; //如果当前页大于总页码数，说明没数据，如果没有数据,就不调用接口
                            // }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }, 500);
            }
        },
    }
</script>
<style lang="scss" scoped>
    #free {
        width: 100%;
        height: 100%;
        .free {
            width: 100%;
            height: auto;
            margin-bottom: 2.5rem;
            padding-top: .65rem;
            ul {
                width: 100%;
                height: 100%;
                .van-pull-refresh {
                    .van-list {
                        // display: flex;
                        // justify-content: center;
                        // flex-wrap: wrap;
                        display: grid;
                        grid-template-columns: 50% 50%;
                        background: #fcfcfc;
                        .abox {
                            width: auto;
                            height: 9.7rem;
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
                                height: 9.7rem;
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
                                            border-radius: .25rem .25rem 0 0;
                                        } //1,左边的直播语音
                                        .taps_left {
                                            position: absolute;
                                            left: .25rem;
                                            top: .25rem;
                                            width: .85rem;
                                            height: .65rem;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            border-radius: .1rem;
                                            img {
                                                width: .8rem;
                                                height: .65rem;
                                                border-radius: 0;
                                            }
                                        } // 2,右边的free
                                        .taps_right {
                                            position: absolute;
                                            right: .25rem;
                                            top: .25rem;
                                            width: 1.35rem;
                                            height: .65rem;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            border-radius: .1rem;
                                            img {
                                                width: 1.35rem;
                                                height: .65rem;
                                                border-radius: 0;
                                            }
                                        } // 3,底部的左边部分
                                        .taps_bottomleft {
                                            position: absolute;
                                            left: .25rem;
                                            bottom: .25rem;
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
                                            right: .25rem;
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
                                } //5,用户的信息
                                .userInfo {
                                    width: 100%;
                                    height: 1.2rem;
                                    display: flex;
                                    align-items: center;
                                    span {
                                        font-size: .6rem;
                                        font-family: PingFang-SC-Medium;
                                        font-weight: 500;
                                        color: rgba(102, 102, 102, 1);
                                        margin-left: .275rem;
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
</style>