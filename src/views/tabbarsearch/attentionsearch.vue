<template>
    <div id="attention">
        <div class="attention clear">
            <!-- 如果没有关注的主播就显示 -->
            <div class="noattention">
                <img src="../../assets/image/tlminiicon/nocare.png" alt="">
                <p>还没有关注的主播哦~</p>
            </div>
            <!-- 按热度和时间 -->
            <div class="hotortime">
                <div class="left">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire02@2x.png" alt="">
                    <span>按热度</span>
                </div>
                <div class="right">
                    <img src="../../assets/image/tlminiicon/homepage_icon_zuire01@2x.png" alt="">
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
                                        <!-- 1,左边语音视频图标 -->
                                        <div class="taps_left">
                                            <div class="leftlive">
                                                <span>LIVE</span>
                                                <img src="../../assets/image/zhibo/zhibozhong.gif" alt="">
                                            </div>
                                            <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="" v-show="item.liveType==storeData.liveType.VIDEO">
                                            <img src="../../assets/image/icon/zhibohuifang_icon_yuyin@2x.png" alt="" v-show="item.liveType==storeData.liveType.AUDIO">
                                        </div>
                                        <!-- 2,左边语音视频图标 -->
                                        <!-- <div class="taps_right">
                                                                                                            <img src="../../assets/image/icon/zhibohuifang_icon_shiping@2x.png" alt="">
                                                                                                        </div> -->
                                        <div class="taps_righttwo">
                                            <img src="../../assets/image/icon/goldicon.png" alt="">
                                            <span>2006</span>
                                        </div>
                                        <!-- 3,底部左边的 -->
                                        <div class="taps_bottomleft">
                                            <img src="../../assets/image/live/huifangyemian_icon_redu@2x.png" alt="">
                                            <span>2034</span>
                                            <img src="../../assets/image/live/zhibohuifang_icon_guankan@2x.png" alt="">
                                            <span>1455</span>
                                        </div>
                                        <div class="taps_bottomright">
                                            <span>{{item.payMoney}}</span>
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
            }
        },
        created() {},
        methods: {
            init() {
                //当下拉刷新的时候,默认显示第一页的20条数据
                this.pageCommit.page = 1;
                this.pageCommit.rows = 20;
                let comValue = qs.stringify(this.pageCommit); //参数序列化
                let self = this;
                this.$axios.post("/av/apiu/liveRoom/his", comValue)
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
                    this.pageCommit.rows = 10,
                        this.pageCommit.sort = "",
                        this.pageCommit["room.contentType"] = "",
                        this.pageCommit.ifFans = 0,
                        this.pageCommit.labelCode = 0,
                        self.init(); //加载数据
                    this.pageCommit.page = 1
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
    #attention {
        width: 100%;
        height: 100%;
        .attention {
            width: 100%;
            height: auto;
            margin-bottom: 2.5rem;
            padding-top: .65rem; // 没有关注的主播就显示
            .noattention {
                width: 100%;
                height: 5.875rem;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                border-bottom: 1Px solid #F5F5F5;
                img {
                    width: 3.8rem;
                    height: 3.8rem;
                    margin-top: .65rem;
                }
                p {
                    width: 100%;
                    height: fit-content;
                    font-size: .6rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
            } // 热度和时间
            .hotortime {
                width: 100%;
                height: 1.25rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
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
                            height: 10.75rem;
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
                                height: 10.75rem;
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
                                        } //1,左边的直播语音
                                        .taps_left {
                                            position: absolute;
                                            left: .25rem;
                                            top: .25rem;
                                            display: flex;
                                            align-items: center;
                                            border-radius: .1rem;
                                            .leftlive {
                                                background: #00d48c;
                                                border-radius: 0.1rem;
                                                height: fit-content;
                                                width: 2rem;
                                                display: flex;
                                                justify-content: center;
                                                align-items: center;
                                                margin-right: .25rem;
                                                span {
                                                    font-size: .6rem;
                                                    font-family: PingFang-SC-Bold;
                                                    font-weight: bold;
                                                    color: rgba(255, 255, 255, 1);
                                                    margin-right: 0.1rem;
                                                    margin-left: .1rem;
                                                }
                                                img {
                                                    width: 0.35rem;
                                                    height: 0.4rem;
                                                    margin-right: 0.1rem;
                                                }
                                            }
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
                                        }
                                        .taps_righttwo {
                                            position: absolute;
                                            right: .25rem;
                                            top: .25rem;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            border-radius: .1rem;
                                            width: fit-content;
                                            height: fit-content;
                                            background: rgba(255, 96, 0, 1);
                                            border-radius: .1rem;
                                            img {
                                                width: .5rem;
                                                height: .5rem;
                                                border-radius: 0;
                                                margin-left: .1rem;
                                                margin-right: .1rem;
                                            }
                                            span {
                                                font-size: .6rem;
                                                font-family: PingFang-SC-Medium;
                                                font-weight: 500;
                                                color: rgba(255, 255, 255, 1);
                                                margin-right: .1rem;
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
                                        margin-left: .25rem;
                                        margin-right: .1rem;
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
        }
    }
</style>