<template>
    <div id="reg">
        <div class="main">
            <!-- 顶部的 -->
            <div class="top">
                <div class="back" @click="back">
                    <img src="../../assets/image/icon/shouye_icon_more@2x.png" alt="">
                </div>
                <span>{{$t('m.phoneregister')}}</span>
                <div class="right">
                </div>
            </div>
            <!-- 输入手机号的和邮箱注册的 -->
            <div class="Infoone">
                <!-- 区号的选择 -->
                <div class="pic">
                    <div id="quhao">
                        <span class="couns" v-show="true" @click.stop="isShow=!isShow"><img :src="ctr" alt=""></span>
                        <ul v-show="isShow" id="search" name="phone">
                            <template v-if="quhao.length>0">
                                                                                                                                                                                         <li v-for="(n,index) in quhao" :key='n.index' :class="n.quhaos" @click.stop="getQuhaos(n.quhaoimg,n.quhaos)">
                                                                                                                                                                                                             <img :src="n.quhaoimg" alt="">
                                                                                                                                                                                                             {{n.label}} +{{n.quhaos}}
                                                                                                                                                                                     </li>
</template>
		               </ul>
	         </div>
                </div>
                <input v-model.trim="userInfo.account.account" class="inputNum" type="text" value="" :placeholder="$t('m.penerphone')" />
            </div>
            <!-- 此处暂时省略滑块验证 -->
            <!-- 输入手机的图形验证码 -->
            <div class="vlicode">
                <div class="pic">
                    <img src="../../assets/image/login/icon-code.png"></div>
                <input type="text" v-model="codeInput" :placeholder="$t('m.pentervcode')" class="write_input">
                <div class="vlicodeImg" @click="vlicode">
                    <img :src="codeImg" alt="">
                </div>
            </div>
            <!-- 获取手机的短信验证码-->
            <div class="Infotwo">
                <div class="pic"><img src="../../assets/image/login/icon-code.png"></div>
                <input v-model="userInfo.code" class="code" type="text" value="" :placeholder="$t('m.logincode')" />
                <!-- 验证码 -->
                <span v-show="show" @click="sendcode" class="codetxt" disabled type="button">{{btntxt}}</span>
                <span v-show="!show" class="codetxt" type="button" :disabled="isforbid">{{count}} {{$t('m.sget')}}</span>
            </div>
            <!-- 请设置填写密码 -->
            <div class="password">
                <div class="pic"><img src="../../assets/image/login/zhucezhanghao_icon_mima.png"></div>
                <input type="password" :placeholder="$t('m.psetpwd')" v-model="userInfo.user.password">
            </div>
            <!-- 注册按钮 -->
            <div class="login_btn" @click="register()">
                <!-- <input type="button" value="注册"> -->
                 <!-- <vue-recaptcha sitekey="6Ld9w7EUAAAAAOhYpEftwRNhBBq8FVz40kVqwzSF" :loadRecaptchaScript="true"> -->
                <van-button class="btn" size="large">{{$t('m.register')}}</van-button>
                 <!-- </vue-recaptcha> -->
            </div>
            <!-- 用户协议 -->
            <!-- <div class="us" @click="agreement">
                                                                                                    注册即代表您同意 <span>《套路用户协议》</span>
                                                                                                </div> -->
        </div>
    </div>
</template>

<script>
    // 导入国家的
    // import countries from './countryselect/countryList'
    import qs from 'qs'
    import $ from 'jquery'
    import arrs from '../../lib/loginCountry/arrs.js'
    import {
        prototype
    } from 'events';
    export default {
        // 区号的选择
        data() {
            return {
                // 国家区号的
                currentCode: this.countryCode,
                hideSubMenu: true,
                // 验证码的
                isforbid: 'false',
                btntxt: this.$t('m.getcode'),
                time: 0,
                show: true,
                count: '',
                timer: null,
                codeInput: '',
                codeImg: '',
                //请求短信验证码接口时需要提交的参数
                smsSend: {
                    "acType": 'mobile', //类型
                    "mobile": "", //手机号,                       
                    "clientId": '', //用户id,
                    "type": "regist", //类型
                    "code": "", //短信验证码
                    "areaCode": "", //国家区号的
                },
                userInfo: {
                    "account": {
                        "acType": "mobile",
                        "areaCode": "", //国家区号的
                        "account": ""
                    },
                    "code": "",
                    "regist": {
                        "registDev": "",
                        "registSource": 0,
                        "sourceInfo": "",
                        "sourceType": 0
                    },
                    "user": {
                        "city": "",
                        "cityName": "",
                        "constellation": "",
                        "country": "",
                        "descs": "",
                        "headpic": "",
                        "infoVoice": "",
                        "infoVoiceDuration": 0,
                        "lang": "",
                        "nickname": "",
                        "password": "",
                        "province": "",
                        "sex": "1",
                        "status": 0,
                        "tendency": "",
                        "usertype": 1
                    }
                },
                isShow: false,
                ctr: '',
                quhao: "",
                quhaoimg: "",
                arrs: arrs
            }
        },
        methods: {
            getSrcList() {
                this.isShow = false;
                this.quhao = this.arrs
            },
            //改变时获取区号和国籍
            getQuhaos(e, quhaos) {
                this.quhao = this.arrs
                // this.ctr = e.replace(/[0-9]/ig, ""); //正则匹配
                this.ctr = e; //正则匹配
                this.isShow = false;
                window.localStorage.setItem("quhaos", quhaos)
                // 区号赋值给短信验证码
                this.smsSend.areaCode = quhaos;
                // 注册的区号赋值
                this.userInfo.account.areaCode = quhaos;
            },
            //发送短信验证码的验证
            sendcode() {
                var _this = this;
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if (this.userInfo.account.account == '') {
                    this.$toast(this.$t('m.tlphoneEmpty'));
                } else if (!reg.test(this.userInfo.account.account)) {
                    this.$toast(this.$t('m.tlphoneError'))
                } else if (this.codeInput == '') {
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else {
                    this.time = 60;
                    this.disabled = true;
                    //验证码的时间设置 
                    this.getCode();
                    //手机号争取后调取接口
                    // 获取国家的区号
                    // this.smsSend.areaCode = this.currentData.dialCode;
                    let commentssmsSend = this.smsSend;
                    commentssmsSend.code = this.codeInput;
                    commentssmsSend.mobile = this.userInfo.account.account;
                    let commentssmsSendhhh = qs.stringify(commentssmsSend);
                    this.$axios.post(this.api.globalApi.smsCode,
                            commentssmsSendhhh
                        )
                        .then(res => {
                            if (res.status == 200) {
                                if (res.data.err == "SUCCESS") {
                                    _this.$toast(_this.$t('m.verificationHasSend'))
                                } else if (res.data.err == "ERR_INVALID_OPERATE") {
                                    if (res.data.langMsg) {
                                        _this.$toast(res.data.langMsg)
                                    } else if (res.data.msg) {
                                        _this.$toast(res.data.msg)
                                    } else if (res.data.message) {
                                        _this.$toast(res.data.message)
                                    }
                                }
                            } else {
                                _this.$toast("Network Error!")
                            }
                        }).catch(function(err) {
                            _this.vlicode()
                            if (err.response.data.err == "FAILED") {
                                var temp = JSON.parse(err.response.data.langMsg);
                                _this.$toast(temp.cnMsg);
                            } else if (err.response.data.msg) {
                                _this.$toast(err.response.data.msg)
                            } else if (err.response.data.langMsg) {
                                _this.$toast(err.response.data.langMsg)
                            } else if (err.response.data.message) {
                                _this.$toast(err.response.data.message)
                            }
                        });
                }
            },
            //倒计时
            getCode() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            // 注册
            register() {
                let that = this;
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if (this.userInfo.account.account == '') {
                    this.$toast(this.$t('m.tlphoneEmpty'))
                } else if (!reg.test(this.userInfo.account.account)) {
                    this.$toast(this.$t('m.tlphoneError'))
                } else if (this.codeInput == '') {
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else if (this.userInfo.code == '') {
                    this.$toast(this.$t('m.SMSVerificationCode'))
                } else if (this.userInfo.user.password == '') {
                    this.$toast(this.$t('m.tlPasswordEmpty'))
                } else {
                    this.$axios.post(this.api.globalApi.mobileRegister, this.userInfo, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => {
                            if (res.status == 200) {
                                //注册成功就跳转到登录页
                                that.$toast(that.$t('m.registrationSuccess'))
                                this.$router.push({
                                    path: '/userInfo',
                                    query: {
                                        toPath: this.$route.path
                                    }
                                })
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
                            that.vlicode()
                        })
                }
            },
            //用户的协议
            agreement() {
                this.$router.push({
                    path: '/agreement'
                })
            },
            //返回
            back() {
                this.$router.go(-1);
            },
            //图形验证码的接口
            vlicode() {
                this.$axios.post(this.api.globalApi.vlicode)
                    .then(res => {
                        //获取后台返回的图片，拼接成图片的地址，然后返回
                        var imgData = ('data:image/png;base64,' + res.data.data.code);
                        //获取后端返回的客户端的id
                        this.smsSend.clientId = res.data.data.clientId;
                        //把获取的图片路径赋值到图片上面去
                        this.codeImg = imgData;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        //页面加载完成后就调用一次图形验证码来刷新图形验证码
        created() {
            this.vlicode();
            this.quhao = this.arrs //手机的国家区号areaCode的代码设置
            if (window.localStorage.getItem("quhaos")) {
                let quhao = window.localStorage.getItem("quhaos");
                // 将区号赋值给短信验证码参数
                this.smsSend.areaCode = quhao;
                // 注册的区号
                this.userInfo.account.areaCode = quhao;
                this.quhaoimg = quhao;
                this.arrs.forEach(e => {
                    if (this.quhaoimg == e.quhaos) {
                        // 1,用户选择的图片
                        this.ctr = e.quhaoimg;
                        // 2，用户选择的短信验证码
                        this.smsSend.areaCode = e.quhaos;
                        // 3，用户选择的手机短信验证码
                        this.userInfo.account.areaCode = e.quhaos;
                    }
                });
            } else {
                //1,默认的国籍图片显示
                this.ctr = this.arrs[0].quhaoimg
                //2,短信验证码的=>默认的国际区号
                this.smsSend.areaCode = this.arrs[0].quhaos;
                // 3,注册的=>默认的国际区号
                this.userInfo.account.areaCode = this.arrs[0].quhaos;
            }
        },
        mounted() {
            window.addEventListener('click', this.getSrcList()) //添加监听事件
        },
    }
</script>

<style lang="scss" scoped>
    #reg {
        height: 100vh;
        width: 100%; // background-color: #fafafa;
        background-color: #f5f5f5;
    }
    .main {
        width: 100%;
        height: 100vh;
        .top {
            width: 100%;
            height: 2rem;
            background-color: #fff;
            text-align: center;
            font-size: .8rem;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .back {
                font-size: 1.3rem;
                align-items: center;
                width: 1.75rem;
                height: 100%;
                padding-left: .75rem;
                display: flex;
                justify-content: flex-start;
                img {
                    height: .7rem;
                    width: .375rem;
                    transform: rotate(180deg);
                }
            }
            span {
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
            .right {
                width: 2.5rem;
                height: 100%;
            }
        } //手机注册账号
        .Infoone {
            width: 15rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            margin: 0 auto;
            margin-top: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pic {
                height: 2rem;
                width: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                position: relative; // padding-left: 0.85rem;
                // background-color: red;
            }
            .inputNum {
                // margin-left: 2.2rem;
                // background-color: green;
                flex: 1;
                border: none; // padding-left: .15rem;
                font-size: .65rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    width: 18.55rem;
                    font-size: .65rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                }
            }
        } //手机的图形验证码
        // 图形验证码的部分
        .vlicode {
            height: 2rem;
            width: 15rem;
            margin: 0 auto;
            margin-top: .5rem;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            .pic {
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                width: 2rem; // background-color: red;
                img {
                    width: .8rem;
                    height: .9rem;
                }
            } //图形验证码输入框的
            .write_input {
                height: 2rem;
                flex: 1;
                background: none;
                border: none; // background-color: green;
                font-size: .65rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    width: 18.55rem;
                    font-size: .65rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                }
            } //图形验证码的大盒子
            .vlicodeImg {
                width: 3.375rem;
                height: 1.5rem;
                background: rgba(220, 220, 220, 1);
                border-radius: .1rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        } //手机短信的验证码
        .Infotwo {
            width: 15rem;
            height: 2rem;
            margin: 0 auto;
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            .pic {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem; // background-color: red;
                margin-right: .75rem;
                img {
                    width: .8rem;
                    height: .9rem;
                }
            } //输入框
            .code {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center; // padding-left: .75rem;
                border: none; // background-color: green;
                font-size: .65rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    width: 18.55rem;
                    font-size: .65rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                }
            }
            .codetxt {
                width: 4.7rem;
                height: 1.2rem;
                background: rgba(51, 51, 51, 1);
                border-radius: .1rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                display: flex;
                justify-content: center;
                align-items: center;
            }
        } // 手机密码设置
        .password {
            width: 15rem;
            height: 2rem;
            background-color: #ffffff;
            margin: 0 auto;
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .pic {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2rem;
                height: 2rem; // background-color: red;
                margin-right: .75rem;
                img {
                    width: .8rem;
                    height: .9rem;
                }
            }
            input {
                border: none;
                flex: 1; // padding-left: .7rem;
                line-height: 2rem;
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    font-size: .6rem;
                }
            }
        } //注册按钮
        .login_btn {
            margin: 0 auto;
            margin-top: 3.5rem;
            width: 15rem;
            height: 2rem;
            background: rgba(67, 67, 67, 1);
            border-radius: .25rem;
            .btn {
                width: 15rem;
                height: 2rem;
                border-radius: .25rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                background: #434343;
                text-align: center;
                line-height: 2rem;
            }
        } //用户协议
        .us {
            width: 80%;
            margin: .25rem auto;
            height: .6rem;
            text-align: center;
            font-size: .6rem;
            color: #999999;
            span {
                color: #333333;
            }
        }
    } // 2，导入登录的国家区号选择
    @import "../../assets/style/country"
</style>