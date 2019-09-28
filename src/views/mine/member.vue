<template>
    <div id="joinmember">
        <!-- 顶部的返回按钮 -->
        <section class="nav">
            <van-nav-bar :title="$t('m.Membership')" fixed left-arrow @click-left="onClickLeft" z-index="2000" /></van-nav-bar>
        </section>
        <!-- 广告 -->
        <div class="banner">
            <p><span>{{$t('m.maturity')}}</span><span>{{membervip}}</span><span>{{$t('m.maturitytwo')}}</span></p>
        </div>
        <!-- 活动的 -->
        <ul class="vipselect">
            <li>{{$t('m.extendedmembership')}}</li>
            <li @click="vipselect(index)" v-for="(item, index) in vipselectList" :key="item.id" :class="{liactive:index == num}">
                <div class="left">
                    <p>{{item.p1}}</p>
                    <p>{{item.p2}}</p>
                </div>
                <div class="right">
                    <p><span>{{item.yuan}}</span><span>{{item.payPrice}}</span></p>
                </div>
            </li>
        </ul>
        <!-- 底部的 -->
        <div class="footer">
            <div class="left">
                <p>
                    <span>{{$t('m.zhifujineL')}}</span>
                    <span>{{$t('m.renminbi')}}</span>
                    <span>{{money}}</span>
                </p>
                <p>
                    <span>{{ymaturity}}</span>
                </p>
            </div>
            <div class="right" @click="payMonry()">
                <span>{{$t('m.extendedmembership')}}</span>
            </div>
            <div style="display: none">
                <form @submit.prevent="submit" action="/charge" method="POST" id="chargeForm">
                    <span>currency</span><input name="currency" id="currency" value=""><br />
                    <span>baseUrl</span><input name="baseUrl" id="baseUrl" value=""><br />
                    <span>chargeType</span><input name="chargeType" id="chargeType" value=""><br />
                    <span>authorization</span><input name="authorization" id="authorization" value=""><br />
                    <span>bankType</span><input name="bankType" id="bankType" value="stripe"><br />
                    <span>payId</span><input name="payId" id="payId" value=""><br />
                    <span>payType</span><input name="payType" id="payType" value=""><br />
                    <span>platBankId</span><input name="platBankId" id="platBankId" value=""><br />
                    <span>return_url</span><input name="return_url" id="return_url" value=""><br />
                    <span>sign</span><input name="sign" id="sign" value=""><br />
                    <button type="submit" name="formSubmit" id="formSubmit" value="submit" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import qs from "qs";
    import store from "../../store";
    export default {
        data() {
            return {
                num: 0,
                vipselectList: [],
                money: "",
                ymaturity: this.$t('m.validityperiod1'),
                //提交订单需要的参数
                order: {
                    platBankId: 3,
                    bankType: "stripe",
                    _chargeType: "coinUser",
                    get chargeType() {
                        return this["_chargeType"];
                    },
                    set chargeType(value) {
                        this["_chargeType"] = value;
                    },
                    authorization: "",
                    currency: "JPY",
                    // return_url: 'https://h5.taolu.biz/#/paysuccess',
                    // return_url: '/#/paysuccess',
                    return_url: "/joinmember?payStatus=success",
                    // return_url: 'http://10.0.1.160:8080/#/paysuccess',
                    payId: "",
                    sign: "test",
                    payType: ""
                },
                membervip: "",
                lang: ""
            }
        },
        created() {
            this.membervip = this.$route.query.member;
            // 默认的是第一个
            this.getpayList();
            var payStatus = this.GetUrlParam("payStatus");
            if (payStatus == "success") {
                this.paysuccesstaps();
            }
            this.lang = this.getlang()
        },
        updated() {
            this.lang = this.getlang()
        },
        methods: {
            // 获取浏览器的参数
            GetUrlParam(paraName) {
                var url = document.location.toString();
                var arrObj = url.split("?");
                if (arrObj.length > 1) {
                    var arrPara = arrObj[1].split("&");
                    var arr;
                    for (var i = 0; i < arrPara.length; i++) {
                        arr = arrPara[i].split("=");
                        if (arr != null && arr[0] == paraName) {
                            return arr[1];
                        }
                    }
                    return "";
                } else {
                    return "";
                }
            },
            // 1,返回上一级
            onClickLeft() {
                this.$router.push({
                    path: '/mine'
                })
            },
            // 点击选中的
            vipselect(index) {
                this.num = index;
                this.ymaturity = this.vipselectList[index].month1;
                this.money = this.vipselectList[index].payPrice;
                this.order.payId = this.vipselectList[index].payId;
                this.order.payType = this.vipselectList[index].payType;
            },
            watch: {},
            mounted() {},
            // 获取列表
            getpayList() {
                this.$axios
                    .get(this.api.globalApi.queryPayType, {
                        params: {
                            payType: "vip"
                        }
                    })
                    .then(res => {
                        let vipselectList = [{
                                p1: this.$t('m.monthlycard'),
                                p2: this.$t('m.monthlycarddesc'),
                                yuan: this.$t('m.renminbi'),
                                month1: this.$t('m.validityperiod1')
                            }, {
                                p1: this.$t('m.seasoncard'),
                                p2: this.$t('m.seasoncarddesc'),
                                yuan: this.$t('m.renminbi'),
                                month1: this.$t('m.validityperiod2'),
                            },
                            {
                                p1: this.$t('m.yearcard'),
                                p2: this.$t('m.yearcarddesc'),
                                yuan: this.$t('m.renminbi'),
                                month1: this.$t('m.validityperiod3')
                            },
                        ];
                        let arr1 = res.data.data.payOptions;
                        let obj = vipselectList;
                        let pushArr = res.data.data.payOptions;
                        for (var i = 0; i < pushArr.length; i++) {
                            for (var j = 0; j < obj.length; j++) {
                                obj[i].payPrice = pushArr[i].payPrice;
                                obj[i].id = pushArr[i].id;
                                obj[i].payId = pushArr[i].payId;
                                obj[i].payType = pushArr[i].payType;
                            }
                        }
                        this.vipselectList = obj;
                        this.money = this.vipselectList[0].payPrice;
                        this.order.payId = this.vipselectList[0].payId;
                        this.order.payType = this.vipselectList[0].payType;
                        console.log(this.vipselectList);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 1，点击生成订单
            payMonry() {
                // 订单的部分参数赋值
                this.order.authorization = $cookies.get("access_token");
                let payMonryorder = qs.stringify(this.order);
                // 2,提交订单
                this.submit();
            },
            //  3，提交订单
            submit() {
                // 4，订单赋值给表单
                this.prepareOrder();
                // 5，提交表单
                $("#chargeForm").submit();
            },
            // 创建订单，赋值给表单
            prepareOrder() {
                $("#chargeForm").attr(
                    "action", store.state.baseUrl + "/pay/apid/stripePay/createOrderPage?lang=" + this.lang
                );
                $('#baseUrl').val(window.location.protocol + '//' + window.location.host + '/');
                $("#currency").val(this.order.currency);
                $("#chargeType").val(this.order._chargeType);
                $("#bankType").val(this.order.bankType);
                $("#platBankId").val(this.order.platBankId);
                $("#payId").val(this.order.payId);
                $("#payType").val(this.order.payType);
                $("#sign").val(this.order.sign);
                $("#return_url").val(this.order.return_url);
                $("#authorization").val(this.order.authorization);
            },
            //6,支付成功后显示的成功的消息提示显示
            paysuccesstaps() {
                setTimeout(() => {
                    this.$toast.success("充值成功");
                }, 1000);
            }
        },
    }
</script>
<style lang="scss" scoped>
    .nav {
        width: 100%;
        height: 2.3rem;
    } // 1，会员套餐
    .van-nav-bar {
        position: fixed;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        height: 2.3rem;
        line-height: 2.3rem;
        background-color: #fff;
    }
    .van-nav-bar__left {
        left: .75rem
    }
    .van-nav-bar__left,
    .van-nav-bar__right {
        bottom: 0;
        font-size: .7rem;
        position: absolute;
    }
    .van-nav-bar .van-icon {
        color: #333333;
        vertical-align: middle;
    }
    .van-nav-bar__arrow {
        min-width: 1em;
        font-size: .8rem;
    }
    .van-nav-bar__title {
        font-size: .85rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 2.3rem;
    } //
    #joinmember {
        background-color: #F5F5F5;
        width: 100%;
        height: 100vh;
    } // 广告的
    .banner {
        width: 100%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: #fff; // margin-top: 2.3rem;
        span {
            margin-left: .8rem;
            font-size: .55rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(255, 96, 0, 1);
            &:nth-of-type(2) {
                margin: 0;
                margin-left: .1rem;
            }
            ;
            &:nth-of-type(3) {
                margin: 0;
                margin-left: .1rem;
            }
            ;
        }
    } // 选项的
    .vipselect {
        width: 100%;
        height: 25rem;
        margin-top: .5rem;
        padding-top: .75rem;
        padding-bottom: .75rem;
        background-color: #fff;
        li {
            margin: 0 auto;
            margin-bottom: .5rem;
            width: 17.25rem;
            height: 4rem;
            border-radius: .25rem;
            padding-left: .525rem;
            padding-right: .525rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: 1Px solid rgba(238, 238, 238, 1);
            border: radius 5px;
            &:nth-of-type(1) {
                height: .9rem;
                font-size: .75rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                display: flex;
                justify-content: flex-start;
                color: rgba(51, 51, 51, 1);
                background-color: #fff;
                border: none;
            }
            .left {
                width: 11.625rem;
                height: 4rem;
                position: relative;
                p {
                    width: 100%;
                    height: auto;
                    margin: 0;
                    position: absolute;
                    &:nth-of-type(1) {
                        font-size: .75rem;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(51, 51, 51, 1); // display: flex;
                        top: .675rem;
                        left: .525rem; // justify-content: flex-start;
                        // align-items: center;
                    }
                    &:nth-of-type(2) {
                        font-size: .65rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(102, 102, 102, 1); // display: flex;
                        // justify-content: flex-start;
                        // align-items: center;
                        // flex-wrap: wrap;
                        left: .525rem;
                        top: 1.8rem;
                    }
                }
            }
            .right {
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                p {
                    span {
                        font-size: .85rem;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(255, 96, 0, 1);
                    }
                }
            }
        }
    }
    .liactive {
        background: rgba(255, 96, 0, 0.2);
        border: 1Px solid #FF6000 !important;
    } // 底部的
    .footer {
        width: 100%;
        height: 2.45rem;
        position: fixed;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -.05rem 0px 0px rgba(238, 238, 238, 1);
        display: flex;
        align-items: center;
        .left {
            flex: 1;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            p {
                width: 100%;
                height: 50%;
                margin: 0;
                &:nth-of-type(1) {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    span {
                        font-size: .65rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(102, 102, 102, 1);
                        &:nth-of-type(1) {
                            margin-right: .35rem;
                        }
                        ;
                        &:nth-of-type(2) {
                            font-family: PingFang-SC-Medium;
                            font-weight: 500;
                            color: rgba(255, 126, 75, 1);
                            margin-right: .05rem;
                        }
                        ;
                        &:nth-of-type(3) {
                            margin-right: .75rem;
                            font-family: PingFang-SC-Medium;
                            font-weight: 500;
                            color: rgba(255, 126, 75, 1);
                            margin-right: .75rem;
                        }
                    }
                }
                &:nth-of-type(2) {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    span {
                        font-size: .5rem;
                        font-family: PingFang-SC-Regular;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        margin-right: .75rem;
                    }
                }
            }
        }
        .right {
            width: 5.65rem;
            height: 2.45rem;
            background: hsl(0, 0%, 20%);
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                color: #FFFFFFFF;
                font-size: .75rem;
            }
        }
    }
</style>