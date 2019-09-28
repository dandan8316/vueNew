<template>
    <div id="myMessage">
        <div class="myMessage">
            <!-- 顶部的导航栏 -->
            <van-nav-bar :title="$t('m.goldpay')" left-arrow @click-left="onClickLeft" fixed />
            </van-nav-bar>
            <div class="mygold">
                <span>{{$t('m.mygold')}}</span>
                <span>{{coin}}</span>
            </div>
            <div class="combo">
                <span>{{$t('m.packageselection')}} </span>
            </div>
            <!-- 购买金币 -->
            <van-radio-group v-model="radio">
                <ul v-for="(item, index) in payOptions" :key="item.id">
                    <!--第八个-->
                    <!-- <li @click="radio=item.payId"  > -->
                    <li @click="setradio(item.payId)">
                        <div class="left">
                            <div class="icon">
                                <img src="../../assets/image/icon/goldicon.png" alt="">
                            </div>
                            <div class="price">
                                <!-- <del v-if="item.baseCoin!=0">{{item.baseCoin}}</del>
                                                                                    <span>{{item.payCoin}}</span> -->
                                <del v-if="item.baseCoin!=0">{{item.baseCoin}}</del>
                                <span>{{item.payCoin}}</span>
                            </div>
                        </div>
                        <div class="center" v-if="item.baseCoin!=0">
                            <span>({{$t('m.addget')}}</span><span>{{item.givePercent}}</span><span>%)</span>
                            <div><span>{{item.otherInfo}}</span></div>
                        </div>
                        <div class="right">
                            <div class="money">
                                <span>{{item.payPrice}}</span>
                            </div>
                            <van-radio :name="item.payId" checked-color="#323332" />
                        </div>
                    </li>
                </ul>
            </van-radio-group>
            <!-- 支付方式 -->
            <div class="pay">
                <div class="paymor">
                    <span>{{$t('m.modeofpayment')}}</span>
                </div>
                <van-radio-group v-model="radiotwo">
                    <ul v-for="(item, index) in bankslist" :key="item.id">
                        <!-- 第一个-->
                        <li @click="setradio(item.payId)">
                            <div class="left">
                                <div class="icon">
                                    <img :src="item.bankTypeLogo" alt="">
                                </div>
                                <div class="price">
                                    <span>{{item.bankName}}</span>
                                </div>
                            </div>
                            <div class="right">
                                <van-radio :name="item.id" checked-color="#323332" />
                            </div>
                        </li>
                    </ul>
                </van-radio-group>
                <div class="paynow" @click="payMonry()">
                    <span>{{$t('m.payimmediately')}}</span>
                </div>
            </div>
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
</template>

<script>
    import $ from "jquery";
    import qs from "qs";
    import store from "../../store";
    import Public from '../../public.js';
    export default {
        data() {
            return {
                showpay: false,
                //金币的余额
                coin: "0",
                radio: "BASE1",
                // 默认订单的是stripe
                radiotwo: 3,
                storeData: this.$store.state,
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
                    return_url: "/mygold?payStatus=success",
                    // return_url: 'http://10.0.1.160:8080/#/paysuccess',
                    payId: "",
                    sign: "test",
                    payType: ""
                },
                datadorm: "",
                //获取支付订单的数据
                bankslist: {},
                //选项的数据
                payOptions: {},
                ishasclick: false,
                lang: ""
            };
        },
        created() {
            var payStatus = this.GetUrlParam("payStatus");
            // //console.log("payStatus=" + payStatus);
            if (payStatus == "success") {
                this.paysuccesstaps();
            }
            this.coinget();
            this.lang = this.getlang()
        },
     
        beforeRouteLeave(to, from, next) {
            this.updatecoin()
            next()

        },
        updated() {
            this.lang = this.getlang()
        },
        methods: {
            // 1,金币数量更新
            updatecoin() {
                Public.$emit('coinupdtate', this.coin)
                // alert(this.coin);
            },
            // 
            setradio(payId) {
                this.radio = payId;
                this.ishasclick = true;
            },
            // 页面一加载获取金币的数量
            coinget() {
                // var payType = 'jpy';
                // var currencyType = 'JPY'; //CNY/JPY/USD
                //console.log('----payType='+payType+' lang='+this.storeData.lang);
                // if(this.storeData.lang!='CN'){
                //     payType='jpy';
                // }
                //我的金币
                this.$axios
                    // .get("/pay/apiu/orderPayoption/queryPayType?payType=" + payType + '&currencyType=' + currencyType)
                    .get("/pay/apiu/orderPayoption/queryPayType?")
                    .then(res => {
                        // //console.log(res);
                        this.coin = res.data.data.moneyUseable;
                        this.bankslist = res.data.data.banks;
                        this.payOptions = res.data.data.payOptions;
                        this.order.payType = res.data.data.payOptions[0].payType;
                        // console.log(res.data.data.payOptions[0].payType);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            // 获取浏览器的参数
            GetUrlParam(paraName) {
                var url = document.location.toString();
                // //console.log("----GetUrlParam" + url);
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
            //0,点击之后返回上一级
            onClickLeft() {
                if (this.$route.query.routerPath != null) {
                    this.$router.push({
                        path: this.$route.query.routerPath
                    })
                } else {
                    this.$router.push({
                        path: '/mine'
                    })
                }
            },
            //1,点击生成订单
            payMonry() {
                // if (this.ishasclick == false) {
                //     this.$toast("请选择充值金额")
                // console.log("请选择");
                // } else {
                // 订单的部分参数赋值
                this.order.payId = this.radio;
                this.order.platBankId = this.radiotwo;
                this.order.authorization = $cookies.get("access_token");
                let payMonryorder = qs.stringify(this.order);
                // this.$axios.post('/pay/apid/stripePay/createOrder', payMonryorder)
                //     .then(res => {
                //         //console.log(res);
                //         window.localStorage.setItem("amount", res.data.data.amount);
                //         window.localStorage.setItem("coins", res.data.data.coins);
                //         window.localStorage.setItem("createDate", res.data.data.createDate);
                //         window.localStorage.setItem("currency", res.data.data.currency);
                //         window.localStorage.setItem("descs", res.data.data.descs);
                //         window.localStorage.setItem("image", res.data.data.image);
                //         window.localStorage.setItem("name", res.data.data.name);
                //         window.localStorage.setItem("order_no", res.data.data.order_no);
                //         window.localStorage.setItem("publishable_key", res.data.data.publishable_key);
                //         ////console.log(window.localStorage.getItem('publishable_key'));
                //         window.location.href = '/public/serverpages/stripePay.html';
                //     })
                //     .catch(err => {
                //         console.error(err);
                //     })
                // // 2,提交订单
                this.submit();
                // }
            },
            // 3，提交订单
            submit: function() {
                // 4，订单赋值给表单
                this.prepareOrder();
                // //console.log("----submit----");
                // 5，提交表单
                $("#chargeForm").submit();
            },
            // 创建订单，赋值给表单
            prepareOrder() {
                //var order={"platBankId":3, "bankType":"stripe", "chargeType":"coinUser","authorization":{}, currency:'CNY',return_url:'/#/paysuccess',payId:'BASE2',sign:'test'}
                //order.authorization = $cookies.get('Authorization');
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
        // 监测选项赋值
        watch: {
            radio() {
                this.order.payId = this.radio;
            },
            radiotwo() {
                // //console.log(this.radiotwo);
                this.order.platBankId = this.radiotwo;
            },
            // $route(to, from) {
            //     //console.log(from.path); //从哪来
            //     //console.log(to.path); //到哪去
            // },
        },
    };
</script>

<style lang="scss" scoped>
    #myMessage {
        width: 100%;
        height: 100vh;
        background-color: #f5f5f5;
        padding-top: 2.35rem;
        .myMessage {
            width: 100%;
            height: 100vh; //1,vant的左侧返回键的颜色
            .van-icon-arrow-left {
                color: #2b2b2b;
                font-size:1rem;
            } //2头部的中间的文字颜色
            .van-nav-bar__title {
                font-size: 0.8rem;
                color: #101010;
                font-weight: 700;
            } //3整个头部导航栏
            .van-nav-bar {
                border-bottom: 1px solid #eaeaea;
                width: 100%;
            } //4,我的金币
            .mygold {
                width: 100%;
                height: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #ffffff;
                span {
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                    font-size: 0.5rem;
                    color: #000000;
                }
            } //选择套餐
            .combo {
                width: 100%;
                height: 1.25rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span {
                    color: #313231;
                    font-size: 0.5rem;
                    margin-left: 0.4rem;
                }
            } //选择套餐的金额选择
            .van-radio-group {
                width: 100%;
                height: auto;
                ul {
                    width: 100%;
                    background-color: #ffffff;
                    height: 100%;
                    li {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        height: 2.5rem;
                        background-color: #ffffff;
                        z-index: 999;
                        .left {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 0.5rem;
                            .icon {
                                width: 1.75rem;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                img {
                                    width: 1rem;
                                    height: 1rem;
                                }
                            }
                            .price {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                                flex-wrap: wrap;
                                del {
                                    font-size: 0.5rem;
                                }
                                span {
                                    font-size: 0.8rem;
                                    font-weight: bolder;
                                    color: #000000;
                                }
                            }
                        }
                        .center {
                            color: #f5839a;
                            font-size: 0.5rem;
                        }
                        .right {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-right: 0.5rem;
                            .money {
                                width: 3.5rem;
                                height: 100%;
                                border: 1Px solid #323332;
                                border-radius: 1.4rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 0.65rem;
                                span {
                                    font-size: 0.6rem;
                                    font-weight: bold;
                                    color: #323332;
                                }
                            }
                        }
                    }
                }
            } // 支付方式
            .pay {
                .paymor {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 0.7rem;
                    margin-left: 0.25rem;
                }
                .van-radio-group {
                    width: 100%;
                    height: auto;
                    ul {
                        width: 100%;
                        background-color: #ffffff;
                        height: 100%;
                        li {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            height: 2.5rem;
                            background-color: #ffffff;
                            border-bottom: 1px solid #d8d8d8;
                            &:nth-of-type(1) {
                                background-color: #f0f2f5;
                                margin-left: 0.25rem;
                                span {
                                    font-size: 0.5rem;
                                }
                            }
                            .left {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 0.5rem;
                                .icon {
                                    width: 1.75rem;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    img {
                                        width: 1rem;
                                        height: 1rem;
                                    }
                                }
                                .price {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    flex-direction: column;
                                    flex-wrap: wrap;
                                    del {
                                        font-size: 0.5rem;
                                    }
                                    span {
                                        font-size: 0.8rem;
                                        font-weight: bolder;
                                        color: #000000;
                                    }
                                }
                            }
                            .right {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-right: 0.5rem;
                                .money {
                                    width: 3.5rem;
                                    height: 100%;
                                    border: 1Px solid #323332;
                                    border-radius: 1.4rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    margin-right: 0.65rem;
                                    span {
                                        font-size: 0.6rem;
                                        font-weight: bold;
                                        color: #323332;
                                    }
                                }
                            }
                        }
                    }
                }
            } //立即支付
            .paynow {
                width: 100%;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #323332;
                span {
                    font-size: 0.7rem;
                    color: #ffffff;
                }
            }
        }
    }
    iframe {
        width: 100%;
        height: 5rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .van-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        max-height: 100%;
        overflow-y: auto;
        background-color: #fff;
        -webkit-transition: 0.3s ease-out;
        transition: 0.3s ease-out;
        -webkit-overflow-scrolling: touch;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        width: 15rem;
        height: 20rem;
        border-radius: 0.5rem;
    }
    .title {
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        font-size: 0.7rem;
        background-color: #5dc351;
        color: #ffffff;
        align-items: center;
    }
    #html {
        margin-left: 30%;
        overflow: hidden;
        height: 40px;
    }
    .backout {
        width: 2.5rem;
        height: 1.5rem;
        background-color: #5dc351;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }
</style>