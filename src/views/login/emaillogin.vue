<template>
    <div id="login">
        <!-- 遮罩层 -->
        <div class="loginmask">
        </div>
        <div class="main_login">
            <div class="logo" v-cloak>
                <img :src="loginlogo">
            </div>
            <div class="changeemailphone">
                <span @click="logintophone">{{$t('m.changephonelogin')}}</span>
            </div>
            <!-- 用户名 -->
            <div class="user">
                <div class="pic">
                    <img src="../../assets/image/login/icon-user.png"></div>
                <input :placeholder="$t('m.penteremail')" v-model="loginUser.username" type="text">
            </div>
            <!-- <div class="descrip"> -->
            <!-- <span>请输入完整的邮箱格式:xxxxxx@xxx.email</span> -->
            <!-- </div> -->
            <!-- 密码 -->
            <div class="password">
                <div class="pic"><img src="../../assets/image/login/denglu_icon_mima@2x.png"></div>
                <input :placeholder="$t('m.loginpassword')" type="password" v-model="loginUser.password">
            </div>
            <!-- 图形验证码 -->
            <div class="vlicode">
                <div class="pic" v-if="!isencryption"><img src="../../assets/image/login/icon-code.png"></div>
                <input type="text" v-model="codeInput" :placeholder="$t('m.pentervcode')" class="write_input" v-if="!isencryption">
                <div class="vlicodeImg" @click="vlicode()" v-if="!isencryption">
                    <img :src="codeUrl" alt="">
                </div>
                <vue-recaptcha @verify="onVerify" @expired="onExpired" @reset="reset" :sitekey="sitekey" v-if="isencryption">
                </vue-recaptcha>
            </div>
            <!-- 登录的按钮 -->
            <div class="login" @click="login" ref="loginBackground">
                <span>{{$t('m.login')}}</span>
            </div>
            <!-- 忘记密码和注册的按钮 -->
            <div class="forget">
                <div class="_forget" @click="forgetpassword">
                    {{$t('m.forgot')}}
                </div>
                <div class="register" @click="toregister">
                    {{$t('m.register')}}
                </div>
            </div>
            <!-- 第三方登录 -->
            <footer>
                <div class="title">
                    <span></span>
                    <span>{{$t('m.Thirdpartylogin')}}</span>
                    <span></span>
                </div>
                <ul>
                    <li @click="weChat(item.acTypeCode)" v-for="(item, index) in thirdlogindata" :key="item.id"><img :src="item.logo"></li>
                </ul>
                <div class="company">{{company}}</div>
            </footer>
            <div class="conpanyline">
                {{$t('m.Officiacustomer')}}
            </div>
        </div>
        <!-- 登录的模态框选择 -->
        <van-popup v-model="showoneregist" :close-on-click-overlay="true">
            <div class="box">
                <div class="title">----————{{$t('m.loginmode')}}————----</div>
                <div class="email" @click="emailreg">
                    <img src="../../assets/image/login/loginemailphone.png" alt="">
                </div>
                <div class="meailtit">{{$t('m.emailregister')}}</div>
                <div class="phone" @click="phonereg">
                    <img src="../../assets/image/login/phoneregister.png" alt="">
                </div>
                <div class="phonetitle">{{$t('m.phoneregister')}}</div>
            </div>
        </van-popup>
        <!-- 重置密码的弹框 -->
        <van-popup v-model="showtwoforget" :close-on-click-overlay="true">
            <div class="box">
                <div class="title">----————{{$t('m.remakesway')}}————----</div>
                <div class="email" @click="emailforget">
                    <img src="../../assets/image/login/loginemailphone.png" alt="">
                </div>
                <div class="meailtit">{{$t('m.emailremake')}}</div>
                <div class="phone" @click="phoneforget">
                    <img src="../../assets/image/login/phoneregister.png" alt="">
                </div>
                <div class="phonetitle">{{$t('m.phoneremake')}}</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import qs from 'qs'
    import store from "../../store";
    import VueRecaptcha from 'vue-recaptcha'; //人机验证的插件
    export default {
        components: {
            VueRecaptcha
        },
        data() {
            return {
                sitekey: '6Ld9w7EUAAAAAOhYpEftwRNhBBq8FVz40kVqwzSF',
                //登录的模态框
                showoneregist: false,
                showtwoforget: false,
                //登录的部分
                codeUrl: "",
                codeInput: '',
                loginUser: {
                    "clientId": '', //用户id,
                    // "type": "login", //类型
                    "grant_type": "password",
                    "username": "", //用户名
                    "password": "", //密码
                    "actype": "email",
                    "clientId": "",
                    "code": "1212", //验证码
                    "clientIdRsa": ""
                },
                loginUserisEncrypt: {
                    "clientId": '', //用户id,
                    // "type": "login", //类型
                    "grant_type": "password",
                    "username": "", //用户名
                    "password": "", //密码
                    "actype": "email",
                    "clientId": "",
                    "code": "1234", //验证码
                    "clientIdRsa": ""
                },
                thirdlogindata: [],
                loginlogo: "",
                company: "",
                //是否开启人机验证,true为开启,false为不开启
                isencryption: true
            }
        },
        watch: {
            // 输入校验
            'loginUser': {
                deep: true,
                handler: function(newV, oldV) {
                    if (this.loginUser.username != "" && this.loginUser.password != "") {
                        this.$refs.loginBackground.style.background = "rgba(255,255,255,0.5)";
                    } else {
                        this.$refs.loginBackground.style.background = "transparent";
                    }
                }
            }
        },
        methods: {
            // 人机验证
            onVerify: function(response) {
                // console.log('Verify: ' + response)
                this.loginUserisEncrypt.captcha = response
            },
            onExpired: function() {
                console.log('Expired')
            },
            //重置
            reset() {},
            // 第三方登录，后台动态获取
            ThirdSystemResource() {
                this.$axios.get('/uaa/apid/currentPlat', )
                    .then(res => {
                        // this.loginlogo = res.data.data.plat.icon;
                        this.thirdlogindata = res.data.data.thirds;
                        this.company = res.data.data.plat.company;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //去邮箱注册
            emailreg() {
                this.$router.push({
                    path: '/emailregister'
                })
            },
            //去手机注册
            phonereg() {
                this.$router.push({
                    path: '/register'
                })
            },
            //去邮箱的忘记密码
            emailforget() {
                this.$router.push({
                    path: '/emailforgetpassword'
                })
            },
            phoneforget() {
                this.$router.push({
                    path: '/forgetpassword'
                })
            },
            //微信第三方的登录
            weChat(acTypeCode) {
                // $cookies.set("acTypeCode", acTypeCode);
                window.location.href = store.state.baseUrl + "/uaa/apid/wxLoginUser";
            },
            forgetpassword() {
                this.showtwoforget = true;
            },
            //登录
            login() {
                if ($cookies.get('access_token')) {
                    $cookies.remove('access_token');
                }
                let _this = this;
                var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
                if (this.loginUser.username == '') {
                    this.$toast(this.$t('m.tlemailEmpty'))
                } else if (!reg.test(this.loginUser.username)) {
                    this.$toast(this.$t('m.tlemailError'))
                } else if (this.loginUser.password == '') {
                    this.$toast(this.$t('m.tlPasswordEmpty'))
                } else {
                    var isEncrypt = true; //是否加密  true为加密 false 为不加密
                    if (isEncrypt) {
                        // 1,加密
                        let url = store.state.baseUrl + '/uaa/apid/rsaKey?funcCode=login'
                        this.$http.get(url, {
                                headers: {
                                    Authorization: store.state.baseAuth
                                }
                            })
                            .then(res => {
                                // //console.log(res)
                                this.loginUserisEncrypt.clientId = this.loginUser.clientId
                                // this.loginUserisEncrypt.code = this.codeInput;
                                this.loginUserisEncrypt.code = "1234";
                                // 加密的
                                var pwdKey = new RSAUtils.getKeyPair(res.data.data.exponent, "", res.data.data.modulus);
                                this.loginUserisEncrypt.username = RSAUtils.encryptedStringOfReversed(pwdKey, this.loginUser.username);
                                this.loginUserisEncrypt.password = RSAUtils.encryptedStringOfReversed(pwdKey, this.loginUser.password);
                                this.loginUserisEncrypt.clientIdRsa = res.data.data.clientIdRsa;
                                // let comments = this.loginUserisEncrypt;
                                let baseAuth = store.state.baseUrl + '/uaa/oauth/token'
                                this.$http.post(baseAuth, this.loginUserisEncrypt, {
                                        headers: {
                                            Authorization: store.state.baseAuth
                                        }
                                    })
                                    .then(res => {
                                        if (res.status == 200) {
                                            this.$toast(this.$t('m.tlloginSuccess'))
                                            //登录成功设置access_token
                                            _this.userTpken = 'bearer' + ' ' + res.data.access_token;
                                            $cookies.set("access_token", _this.userTpken);
                                            // 保存用户的邮箱号
                                            localStorage.setItem("loginemail", this.loginUser.username)
                                            window.localStorage.removeItem("tour_token")
                                            window.localStorage.removeItem("tourusertype")
                                            window.localStorage.removeItem("response")
                                            // 去首页
                                            this.$router.replace("/index")
                                        }
                                    })
                                    .catch(err => {
                                        if (err.body.error_description) {
                                            this.$toast(err.body.error_description)
                                        } else if (err.body.error) {
                                            this.$toast(err.body.error)
                                        } else {
                                            this.$toast(this.$t('m.tlloginFailed'))
                                        }
                                        this.reset()
                                    })
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    } else {
                        // 2,不加密
                        if (this.codeInput == '') {
                            this.$toast(this.$t('m.GraphicCodeEmpty'))
                        }
                        this.loginUser.code = this.codeInput;
                        // let comments = this.loginUser;
                        // let comValue = qs.stringify(comments);
                        let baseAuth = store.state.baseUrl + '/uaa/oauth/token'
                        this.$axios.post(baseAuth, this.loginUser, {
                                headers: {
                                    Authorization: store.state.baseAuth
                                }
                            })
                            .then(res => {
                                if (res.status == 200) {
                                    this.$toast(this.$t('m.tlloginSuccess'))
                                    //登录成功设置access_token
                                    _this.userTpken = 'bearer' + ' ' + res.data.access_token;
                                    $cookies.set("access_token", _this.userTpken);
                                    // 保存用户的邮箱号
                                    localStorage.setItem("loginemail", this.loginUser.username)
                                    window.localStorage.removeItem("tour_token")
                                    window.localStorage.removeItem("tourusertype")
                                    window.localStorage.removeItem("response")
                                    // 去首页
                                    this.$router.replace("/index")
                                }
                            })
                            .catch(err => {
                                if (err.body.error_description) {
                                    this.$toast(err.body.error_description)
                                } else if (err.body.error) {
                                    this.$toast(err.body.error)
                                } else {
                                    this.$toast(this.$t('m.tlloginFailed'))
                                }
                                 this.vlicode()
                            })
                    }
                }
            },
            //去注册页面
            //点击注册显示手机邮箱注册的模态选择框
            toregister() {
                this.showoneregist = true;
            }, //切换到手机登录
            logintophone() {
                this.$router.push({
                    path: '/login'
                })
            },
            //图形验证码
            vlicode() {
                this.$axios.get('/uaa/apid/validCode', {
                        headers: {
                            Authorization: ''
                        }
                    })
                    .then(res => {
                        //console.log(res);
                        var imgData = ('data:image/png;base64,' + res.data.data.code);
                        this.loginUser.clientId = res.data.data.clientId;
                        this.codeUrl = imgData;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        created() {
            this.loginlogo = window.localStorage.getItem('loginlogo')
            // 获取二维码的
            this.vlicode();
            // 获取第三方微信登录的
            this.ThirdSystemResource();
            // 1,记住登录的邮箱
        },
        mounted() {
            if (window.localStorage.getItem("loginemail") != null) {
                this.loginUser.username = window.localStorage.getItem("loginemail");
            }
        },
    }
</script>
<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }
    #login {
        width: 100%; // height: 100vh;
        height: 100%;
        background: url("../../assets/image/login/back.png") no-repeat; // background-size: cover;
        background-size: 100% 100%; // background-position: 100% 100%;
        .main_login {
            width: 100%;
            height: 100%;
            position: absolute;
            right: 0;
            bottom: 0;
            .backimg {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
                bottom: 0;
                right: 0;
                img {
                    width: 100%; // height: 100vh;
                    display: block;
                }
            }
            .logo {
                width: 100vw;
                height: fit-content;
                padding: .525rem 0 .975rem;
                display: flex;
                justify-content: center;
                img {
                    width: 2.75rem;
                    height: 2.75rem;
                    border-radius: 50%;
                }
            }
            .changeemailphone {
                width: 15rem;
                height: fit-content;
                margin: 0 auto;
                display: flex;
                justify-content: flex-end;
                flex-wrap: nowrap;
                padding-bottom: .675rem;
                span {
                    font-size: .85rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
            } //邮箱输入框
            .user {
                height: 2rem;
                width: 15rem;
                margin: 0 auto;
                display: flex;
                align-items: center;
                height: fit-content;
                border-bottom: 1Px solid transparent;
                border-color: rgba(255, 255, 255, 0.3);
                padding: 1.5rem 0 .475rem;
                input {
                    height: .85rem;
                    font-size: 0.75rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(238, 238, 238, 1);
                    background: none;
                    border: none;
                    flex: 1;
                }
                .pic {
                    height: fit-content;
                    width: 3.35rem;
                    img {
                        width: .825rem;
                        height: .875rem;
                        margin-left: .275rem;
                    }
                }
            } //描述
            .descrip {
                width: 16rem;
                height: 2rem;
                margin: 0 auto;
                font-size: 0.5rem;
                color: #ffffff; // padding-top: .25rem;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                flex-wrap: nowrap;
                span {
                    // margin-left: 10%;
                    font-size: 0.55rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            } //密码
            .password {
                height: 2rem;
                width: 15rem;
                margin: 0 auto;
                display: flex;
                align-items: center;
                height: fit-content;
                border-bottom: 1Px solid transparent;
                border-color: rgba(255, 255, 255, 0.3);
                padding: 1.325rem 0 .475rem; // background-color: blue;
                input {
                    height: .85rem;
                    font-size: 0.75rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(238, 238, 238, 1);
                    background: none;
                    border: none;
                    flex: 1;
                }
                .pic {
                    height: fit-content;
                    width: 3.35rem;
                    display: flex;
                    align-items: center;
                    img {
                        width: .825rem;
                        height: .875rem;
                        margin-left: 0.275rem;
                    }
                }
            } //登录按钮
            .login {
                display: block;
                width: 15rem;
                margin: 0 auto;
                margin-top: 2.5rem;
                height: 2rem;
                background-color: transparent;
                border: 1Px solid rgba(255, 255, 255, 1);
                border-radius: 0.25rem;
                display: flex;
                justify-content: center;
                align-items: center;
                &:active {
                    background-color: rgba(255, 255, 255, 0.7) !important;
                }
                span {
                    font-size: .85rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: bold;
                    color: #FFFFFF;
                }
            } //忘记密码和注册的
            .forget {
                width: 15rem;
                height: 1.65rem;
                margin: 0 auto;
                margin-top: .375rem;
                display: flex;
                justify-content: space-between;
                ._forget {
                    font-size: .65rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(238, 238, 238, 1);
                }
                .register {
                    font-size: .65rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    text-decoration: underline;
                    color: rgba(255, 255, 255, 1);
                }
            } //图形的验证码的部分
            .vlicode {
                height: fit-content;
                width: 15rem;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: fit-content;
                border-bottom: 1Px solid transparent;
                border-color: rgba(255, 255, 255, 0.3);
                padding: 1.325rem 0 .475rem;
                .pic {
                    height: fit-content;
                    width: 3.35rem;
                    display: flex;
                    align-items: center;
                    img {
                        margin-left: 0.275rem;
                        width: .825rem;
                        height: .875rem;
                    }
                }
                .write_input {
                    height: .85rem;
                    font-size: 0.75rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(238, 238, 238, 1);
                    background: none;
                    border: none;
                    width: 5rem;
                } //图形验证码的大盒子
                .vlicodeImg {
                    flex: 1;
                    height: 1.25rem; // background: rgba(220, 220, 220, 1);
                    border-radius: .1rem;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    img {
                        width: 3.325rem;
                        height: 1.25rem;
                    }
                }
            } //底部的部分
            footer {
                margin-bottom: 3rem;
                width: 17.5rem;
                margin: 0 auto;
                margin-top: 1.075rem;
                .title {
                    text-align: center;
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap;
                    margin-bottom: .75rem;
                    width: 17.5rem;
                    height: fit-content;
                    justify-content: center;
                    span {
                        font-size: .6rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: rgba(254, 254, 254, 1);
                        &:nth-of-type(1) {
                            width: 6rem;
                            height: 1Px;
                            font-weight: 400;
                            background-image: linear-gradient(to left, #808080, #808080, #808080, #808080, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
                        }
                        &:nth-of-type(2) {
                            margin: 0 .3rem;
                        }
                        &:nth-of-type(3) {
                            font-weight: 400;
                            width: 6rem;
                            height: 1Px;
                            background-image: linear-gradient(to right, #808080, #808080, #808080, #808080, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
                        }
                    }
                }
                ul {
                    overflow: hidden;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    li {
                        margin: 0 .1rem;
                        text-align: center;
                        color: #fff;
                        line-height: 1.6rem;
                        font-size: 0.7rem;
                        border: 0.025rem dashed #fff;
                        img {
                            display: block;
                            width: 1.8rem;
                            height: 1.8rem;
                            margin: 0 auto;
                        }
                    }
                }
                .company {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ffffff;
                    font-size: .5rem;
                    margin-top: .25rem;
                }
            }
        }
    }
    .conpanyline {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 1.75rem;
        background: rgba(255, 255, 255, 1);
        opacity: 0.2;
        font-size: .6rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(23, 23, 23, 1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loginmask {
        width: 100%;
        height: 100vh;
        background-color: #000000;
        opacity: 0.6;
    } // 注册的模态框选择
    .van-popup {
        border-radius: 0.3rem;
    }
    .box {
        width: 15rem;
        height: 20rem;
        background-color: #ffffff;
        border-radius: 0.25rem;
        .title {
            width: 100%;
            text-align: center;
            font-size: 0.7rem;
            color: #999;
        }
        .email {
            width: 100%;
            height: 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.75rem;
            img {
                width: 4rem;
                height: 4rem;
            }
        }
        .meailtit {
            width: 100%;
            text-align: center;
            font-size: 0.7rem;
            color: #999;
            margin-top: 0.5rem;
        }
        .phone {
            width: 100%;
            height: 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.75rem;
            img {
                width: 4rem;
                height: 4rem;
            }
        }
        .phonetitle {
            width: 100%;
            font-size: 0.7rem;
            color: #999;
            text-align: center;
            margin-top: 0.5rem;
        }
    } //
    .inputback {
        background: red;
    } // 2，登录的国家区号选择的样式
    @import '../../assets/style/country'
</style>