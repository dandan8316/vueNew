<template>
    <div id="myMessage">
        <div class="myMessage">
            <!-- 顶部的导航栏 -->
            <van-nav-bar :title="$t('m.minemessage')" left-arrow @click-left="onClickLeft" fixed/>
            <ul class="customer_service">
                <li class="customerBox" v-for="(item, index) in dataLists" :key="item.id" @click="gotoson(item.msgCategory)">
                    <div class="leftIcon">
                        <img src="../../assets/image/login/denglu_image_logo@2x.png" alt="">
                    </div>
                    <div class="rightMessage">
                        <div class="top">
                            <span>{{item.msgCategory}}</span>
                            <span>{{item.formatTime}}</span>
                        </div>
                        <div class="bottom">
                            <span>{{item.content}}</span>
                        </div>
                    </div>
                </li>
                <div class="nomessage" v-show="isshownomessage" v-cloak>
                    <span>  {{$t('m.minemessagetaps')}}~</span>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                timeago: '',
                dataLists: {},
                isshownomessage: false,
                // getlookup:{
                //     lang:"en",
                //     lookupCodes:""
                // }
            }
        },
        created() {
            this.mycategory()
        },
        methods: {
            mycategory(){
                  this.$axios.post(this.api.globalApi.systemMyCategory)
                .then(res => {
                    //console.log(res)
                    this.dataLists = res.data.data;
                    if (res.data.data.length > 0) {
                        this.isshownomessage = false;
                    }else {
                        this.isshownomessage = true;

                    }
                    // var shijan = res.data.data;
                    // shijan.forEach(e => {
                    //     //console.log(e.sendTime);
                    //     var oldDate = e.sendTime; //旧时间
                    //     var activeDate = new Date(); //当前的时间
                    //     //当前的时间减去旧的时间
                    //     var diffDate = activeDate.getTime() - new Date(oldDate).getTime();
                    //     //算出时间差
                    //     var days = Math.floor(diffDate / (24 * 3600 * 1000));
                    //     this.timeago = days;
                    // });
                })
                .catch(err => {
                    console.error(err);
                })
            },
            // 获取数据词典
            // getlookup(){
            //     axios.post('/config/apid/lookup/itemNames',params)
            //     .then(res => {
            //         //console.log(res)
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     })
            // },
            //点击之后返回上一级
            onClickLeft() {
                this.$router.go(-1);
            },
            //去子消息的目录
            gotoson(msgType) {
                this.$router.push({
                    path: '/mymesasageson',
                    query: {
                        msgCategory: msgType
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }
    #myMessage {
        width: 100%;
        height: 100vh;
        background-color: #f5f5f5;
        padding-top: 2.35rem;
        .myMessage {
            //1,vant的左侧返回键的颜色
            .van-icon-arrow-left {
                color: #2b2b2b;
                font-size: .8rem;
            } //2头部的中间的文字颜色
            .van-nav-bar__title {
                font-size: .8rem;
                color: #101010;
                font-weight: 700;
            } //3整个头部导航栏
            .van-nav-bar {
                border-bottom: 1px solid #eaeaea;
            } //4,客服消息
            .customer_service {
                width: 100%;
                height: 2.875rem; //57.5,62.5
                background-color: #ffffff;
                .customerBox {
                    display: flex;
                    background-color: #ffffff;
                    height: 2.75rem;
                    .leftIcon {
                        width: 3.125rem;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 2.25rem;
                            height: 2.25rem;
                        }
                    } //右边的部分
                    .rightMessage {
                        display: flex;
                        flex-wrap: wrap;
                        flex: 1;
                        justify-content: center;
                        align-items: center;
                        .top {
                            width: 100%;
                            height: 50%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            span {
                                font-size: .7rem;
                                font-weight: 500;
                                font-family: PingFang-SC-Bold;
                                font-weight: bold;
                                color: #333333;
                                &:nth-of-type(2) {
                                    font-size: .7rem;
                                    font-weight: 500;
                                    font-family: PingFang-SC-Bold;
                                    color: #a7a7a7;
                                    margin-right: .25rem;
                                }
                            }
                        }
                        .bottom {
                            width: 100%;
                            height: 50%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            span {
                                font-size: .5rem;
                                font-family: PingFang-SC-Bold;
                                font-weight: bold;
                                color: #333333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                        }
                    }
                } // 暂时没有更多消息了
                .nomessage {
                    font-size: .65rem;
                    width: 100%;
                    height: 1rem;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            }
        }
    }
</style>