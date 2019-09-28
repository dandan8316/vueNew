<template>
    <div id="userInfo">
        <div class="header">
            <div class="left" @click="back">
                <img src="../../../assets/image/tlminiicon/shouye_icon_more@2x.png" alt="">
            </div>
            <div class="center">
                <span>{{this.$t('m.completeMaterial')}}</span>
            </div>
            <div class="right">
                <span></span>
            </div>
        </div>
        <!-- 底部区域 -->
        <div class="pop">
            <!-- 1,性别 -->
            <div class="roommodel">
                <div class="rooms">
                    {{this.$t('m.sex')}}
                </div>
                <ul>
                    <li v-for="(it, index) in roommodel" :key="it.index" :class="{liactive:index == numtwo}" @click="liactivetwo(index,it.name)">
                        {{it.name}}
                    </li>
                </ul>
                <div class="hr">
                </div>
            </div>
            <!-- 2,圈子 -->
            <div class="sort">
                <div class="sortnav">
                    {{this.$t('m.circle')}}
                </div>
                <ul>
                    <li v-for="(item, index) in sortdata" :key="item.index" :class="{liactive:index == num}" @click="liactive(index,item.name)">
                        {{item.name}}
                    </li>
                </ul>
                <div class="hr">
                </div>
            </div>
            <!-- 3,爱好-->
            <div class="tapslist">
                <div class="rooms">
                    {{this.$t('m.Hobby')}}
                </div>
                <ul>
                    <li v-for="(it, index) in tapslist" :key="it.index" :class="{liactive:index == numthree}" @click="liactivethree(index,it.name)">
                        {{it.name}}
                    </li>
                </ul>
            </div>
            <!--5, 重置筛选和确认的 -->
            <div class="bottomsel" @click="bottomselright">
                <span>                                                                                    {{this.$t('m.confirm')}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                // 筛选的模拟的数据
                num: 0, //圈子
                numtwo: 0, //性别
                numthree: 0, //性取向
                // 1,性别
                roommodel: [{
                        name: this.$t('m.man')
                    },
                    {
                        name: this.$t('m.woman')
                    }
                ],
                // 2,圈子
                sortdata: [{
                        name: this.$t('m.s')
                    },
                    {
                        name: this.$t('m.m')
                    },
                    {
                        name: this.$t('m.other')
                    },
                ],
                // 3，爱好
                tapslist: [{
                        name: "Foot fetish"
                    },
                    {
                        name: "Bondage"
                    },
                    {
                        name: "Beautiful legs"
                    },
                    {
                        name: "Beauty"
                    },
                    {
                        name: "Heavy mouth"
                    },
                    {
                        name: "Other"
                    }
                ],
                langge: {
                    lang: "en",
                    lookupCodes: "videoLabels"
                },
                // 保存信息
                saveUserInfo: {
                    sex: "1", //1,2
                    sexRole: '1', //角色1,2,5
                    hobby: "Foot fetish"
                }
            }
        },
        created() {
            this.updataSuccess()
        },
        methods: {
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
                this.$axios.post('/config/apid/lookup/itemNames', qs.stringify(this.langge))
                    .then(res => {
                        //创建obj对象
                        // 将对象转换成数组
                        // var arr = []
                        let objTmp = res.data.data.videoLabels;
                        this.tapslist[0].name = this.$t('m.All')
                        this.tapslist[1].name = objTmp.LABEL_CHAT
                        this.tapslist[2].name = objTmp.LABEL_BDSM
                        this.tapslist[3].name = objTmp.LABEL_NEW
                        this.tapslist[4].name = objTmp.LABEL_FOOT
                        this.tapslist[5].name = objTmp.LABEL_SKILL
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            // 1,性别
            liactivetwo(index, name) {
                this.numtwo = index;
                switch (index) {
                    case 0:
                        this.saveUserInfo.sex = "1"
                        break;
                    case 1:
                        this.saveUserInfo.sex = "2"
                        break;
                    default:
                        break;
                }
            },
            //2, 角色
            liactive(index, name) {
                this.num = index;
                // console.log(index);
                // console.log(name);
                switch (index) {
                    case 0:
                        this.saveUserInfo.sexRole = "1";
                        break;
                    case 1:
                        this.saveUserInfo.sexRole = "2";
                        break;
                    case 2:
                        this.saveUserInfo.sexRole = "3";
                        break;
                    default:
                        this.saveUserInfo.sexRole = "1";
                        break;
                }
            },
            // 3,爱好
            liactivethree(index, it) {
                this.numthree = index;
                this.saveUserInfo.hobby = it
            },
            // 4,保存按钮
            bottomselright() {
                var that = this;
                this.$axios.post('/uaa/apiu/user/update', this.saveUserInfo, )
                    .then(res => {
                        if (res.status == 200) {
                            if (this.$route.query.toPath == "/register") {
                                this.$router.push({
                                    path: '/login'
                                })
                            } else if (this.$route.query.toPath == "/emailregister") {
                                this.$router.push({
                                    path: '/emaillogin'
                                })
                            }
                        }
                    })
                    .catch(err => {
                        let errValue = err.response.data;
                        if (errValue.message) {
                            that.$toast(errValue.message)
                        } else if (errValue.msg) {
                            that.$toast(errValue.msg)
                        } else if (errValue.langMsg) {
                            that.$toast(errValue.langMsg)
                        }
                    })
            },
            updataSuccess() {},
            // 5,返回上一级
            back() {
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang="scss" scoped>
    #userInfo {
        width: 100vw;
        height: 100vh;
        background-color: #f5f5f5;
    }
    .header {
        width: 100vw;
        height: 2.2rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 1Px 0px 0px rgba(238, 238, 238, 1);
        .left {
            width: .5rem;
            padding: 0 .75rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                transform: rotateZ(180deg)
            }
        }
        .center {
            width: fit-content;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-size: .85rem;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
            }
        }
        .right {
            height: 100%;
            width: .5rem;
            padding: 0 .75rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    } //  资料盒子的样式
    .pop {
        width: 100vw;
        height: auto;
        min-height: 24.2rem;
        background-color: #ffffff;
        z-index: 999999; // 排序
        border-top: 1Px solid #EEEEEE;
        .sort {
            width: 100vw;
            height: auto;
            padding-top: .5rem;
            .sortnav {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                padding-bottom: .475rem;
                padding-left: .775rem;
            }
            ul {
                width: auto;
                height: auto;
                padding-left: .775rem;
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
                    min-width: 2.5rem;
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
            padding-top: .5rem;
            .wmennav {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                padding-bottom: .475rem;
                padding-left: .775rem;
            }
            ul {
                width: auto;
                height: auto;
                padding-left: .775rem;
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
                    min-width: 2.5rem;
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
            padding-top: .5rem;
            .rooms {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                padding-bottom: .475rem;
                padding-left: .775rem;
            }
            ul {
                width: auto;
                height: auto;
                padding-left: .775rem;
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
                    min-width: 2.5rem;
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
            padding-top: .5rem;
            .rooms {
                font-size: .75rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                padding-bottom: .475rem;
                padding-left: .775rem;
            }
            ul {
                width: auto;
                height: auto;
                padding-left: .775rem;
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
                    min-width: 2.5rem;
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
            width: 15rem;
            height: 2rem;
            background: rgba(67, 67, 67, 1);
            border-radius: .25rem;
            margin: 0 auto;
            margin-top: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &:active {
                opacity: 0.8;
            }
            span {
                font-size: .85rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
        }
    } //选中的按钮
    .liactive {
        background: rgba(51, 51, 51, 1);
        font-size: .75rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1) !important;
    }
</style>