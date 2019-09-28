<template>
    <div id="login">
        <!-- 遮罩层 -->
        <div class="loginmask">
        </div>
        <div class="main_login" v-cloak>
            <div class="logo">
                <img :src="loginlogo">
            </div>
            <div class="changeemailphone">
                <span @click="logintoemail">{{$t('m.changeemaillogin')}}</span>
            </div>
            <!-- 1,手机号 -->
            <div class="user">
                <div class="pic">
                    <!-- 区号的选择----------------------------------------------->
                    <div id="quhao">
                        <span class="couns" v-show="true" @click.stop="isShow=!isShow">
                                                                                                                                                                                                                                                            <img :src="ctr" alt=""></span>
                        <ul v-show="isShow" id="search" name="phone">
                            <template v-if="quhao.length>0">
                                                                                                                                    <li v-for="(n,index) in quhao" :key='n.index' :class="n.quhaos" @click.stop="getQuhaos(n.quhaoimg,n.quhaos)">  
                                                                                                                                        <img :src="n.quhaoimg" alt="">                                                                                                                            {{n.label}} +{{n.quhaos}}
                                                                                                                         </li>
</template>
		                 </ul>
	               </div>
                   <!-- 区号选择的分割线 --------------------------------------->
                </div>
                <input :placeholder="$t('m.loginphone')" v-model="loginUser.username" class="inputback" type="text">
            </div>
            <!-- <div class="descrip"> -->
                <!-- <span>海外手机请按照"国家代码-手机号"格式输入。如65-888888</span> -->
            <!-- </div> -->
            <!--2, 密码 -->
            <div class="password">
                <div class="pic"><img src="../../assets/image/login/denglu_icon_mima@2x.png"></div>
                <input :placeholder="$t('m.loginpassword')" type="password" v-model="loginUser.password" class="inputback">
            </div>
            <!--3, 图形验证码 -->
           <div class="vlicode">
               <!-- <div class="pic"><img src="../../assets/image/login/icon-code.png"></div>
               <input type="text" v-model="codeInput" :placeholder="$t('m.pentervcode')" class="write_input">
               <div class="vlicodeImg" @click="vlicode()">
                   <img :src="codeUrl" alt="">
               </div>  -->
               <!-- <img src="" alt="">
               <!-- 人机 -->
                 <vue-recaptcha
          @verify="onVerify"
          @expired="onExpired"
          @reset="reset"
          :sitekey="sitekey">
        </vue-recaptcha>
           </div>
                   <!-- 4,登录的按钮 -->
              <button @click="login" class="login" ref="loginBackground">{{$t('m.login')}}</button >
                   <!--5, 忘记密码和注册的按钮 -->
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
                <ul >
                    <li @click="weChat(item.acTypeCode)" v-for="(item, index) in thirdlogindata" :key="item.id"><img :src="item.logo"></li>
                </ul>
                <div class="company">{{company}}</div>
            </footer>
            <div class="conpanyline">
        {{$t('m.Officiacustomer')}}
            </div>
        </div>
        <van-popup v-model="showoneregist" :close-on-click-overlay="true">
            <div class="box">
                <div class="title">----————{{$t('m.loginmode')}}————----</div>
                <div class="email" @click="emailreg">
                    <img src="../../assets/image/login/loginemailphone.png" alt="">
                </div>
                <div class="meailtit">{{$t('m.emailregister')}}
                </div>
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
    import VueRecaptcha from 'vue-recaptcha'; //人机验证的插件
    import store from "../../store";
    // 引入security.js的文件
    import qs from "qs";
    // 区号的数据导入
    import arrs from "../../lib/loginCountry/arrs.js";
    import {
        win32
    } from 'path';
    export default {
        components: {
            VueRecaptcha
        },
        data() {
            return {
                loginrecaptcha: "",
                recaptchalogin: "",
                // 谷歌
                sitekey: '6Ld9w7EUAAAAAOhYpEftwRNhBBq8FVz40kVqwzSF',
                // sitekey: '',
                // 
                isShow: false,
                ctr: '',
                quhao: "",
                quhaoimg: "",
                // 区号的数据
                arrs: arrs,
                //注册的模态框
                showoneregist: false,
                showtwoforget: false,
                codeUrl: "",
                codeInput: "",
                loginUser: {
                    clientId: "", //用户id,
                    // "type": "login", //类型
                    grant_type: "password",
                    username: "", //用户名
                    password: "", //密码
                    actype: "mobile",
                    clientId: "",
                    code: "12334", //验证码,
                    areaCode: "", //国际区号的
                    clientIdRsa: ""
                },
                loginUserisEncrypt: {
                    clientId: "", //用户id,
                    // "type": "login", //类型
                    grant_type: "password",
                    username: "", //用户名
                    password: "", //密码
                    actype: "mobile",
                    clientId: "",
                    code: "1234", //验证码,
                    areaCode: "", //国际区号的
                    clientIdRsa: "",
                    captcha: ""
                },
                thirdlogindata: [],
                loginlogo: "",
                company: "",
                //是否开启人机验证,true为开启,false为不开启
                isencryption: true,
            };
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
            // gtouchstart: function gtouchstart(item) {
            //     timeOutEvent = setTimeout(function() {
            //         vm.longPress(item)
            //         alert("呵呵")
            //     }, 500);
            //     return false;
            // },
            //人机验证
            onVerify: function(response) {
                // console.log('Verify: ' + response)
                this.loginUserisEncrypt.captcha = response
            },
            onExpired: function() {
                console.log('Expired')
            },
            //重置
            reset() {},
            // 
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
                this.loginUser.areaCode = quhaos;
                // this.$emit('goTo', e) //向父组件传值
            },
            // (navigator.language || navigator.browserLanguage).toLowerCase()
            glanguage() {
                var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
                // lang = lang.substr(0, 2); //截取lang前2位字符
                ////// console.log('浏览器的语言是1' + lang);
                // lang = lang.toLowerCase();
                //////// console.log('浏览器的语言是2' + lang);
            },
            // 第三方登录，后台动态获取的内容
            ThirdSystemResource() {
                this.$axios.get(this.api.globalApi.thirdLogin, )
                    .then(res => {
                        // console.log(res)
                        // 数组的
                        //谷歌秘钥
                        this.thirdlogindata = res.data.data.thirds
                        this.company = res.data.data.plat.company;
                        window.localStorage.setItem("loginlogo", res.data.data.plat.icon);
                        this.loginlogo = window.localStorage.getItem('loginlogo')
                        this.sitekeydata = res.data.data.plat.recaptchaPubkey;
                        if (res.data.data.plat.recaptchaIf) {
                            if (res.data.data.plat.recaptchaIf == 1) {
                                this.ishowrenrenji = true;
                                this.gverification = false;
                            } else if (res.data.data.plat.recaptchaIf != 1) {
                                this.ishowrenrenji = false;
                                this.ishowrenrenji = true;
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            // 国家区号选择的
            mounted() {
                // this.$emit("excountry", countries[this.countryCode]);
                window.addEventListener('click', this.getSrcList) //添加监听事件
            },
            //切换到邮箱注册
            logintoemail() {
                this.$router.push({
                    path: "/emaillogin"
                });
            },
            //注册的选择
            //去邮箱注册
            emailreg() {
                this.$router.push({
                    path: "/emailregister"
                });
            },
            //去手机注册
            phonereg() {
                this.$router.push({
                    path: "/register"
                });
            },
            //去邮箱的忘记密码
            emailforget() {
                this.$router.push({
                    path: "/emailforgetpassword"
                });
            },
            phoneforget() {
                this.$router.push({
                    path: "/forgetpassword"
                });
            },
            //微信第三方的登录
            weChat(acTypeCode) {
                if (acTypeCode == "line") {
                    window.location.href = store.state.baseUrl + "/uaa/apid/line/login?toPage=index&loginType=" + acTypeCode;
                } else {
                    window.location.href = store.state.baseUrl + "/uaa/apid/wxLoginUser?toPage=index&loginType=" + acTypeCode;
                }
                // https://testwapapi.desew.com/uaa/apid/wxLoginUser 
                // https://testwapapi.desew.com/uaa/apid/line/login
                // 前两个微信的
            },
            forgetpassword() {
                this.showtwoforget = true;
            },
            //登录的
            login() {
                if ($cookies.get('access_token')) {
                    $cookies.remove('access_token');
                }
                //获取国家的区号
                let _this = this;
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if (this.loginUser.username == "") {
                    this.$toast(this.$t('m.tlphoneEmpty'))
                } else if (!reg.test(this.loginUser.username)) {
                    this.$toast(this.$t('m.tlphoneError'))
                } else if (this.loginUser.password == "") {
                    this.$toast(this.$t('m.tlPasswordEmpty'))
                } else {
                    let _this = this;
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
                                this.loginUserisEncrypt.clientId = this.loginUser.clientId
                                // 图形验证码
                                // this.loginUserisEncrypt.code = this.codeInput
                                this.loginUserisEncrypt.areaCode = this.loginUser.areaCode
                                //加密
                                var pwdKey = new RSAUtils.getKeyPair(res.data.data.exponent, "", res.data.data.modulus);
                                this.loginUserisEncrypt.username = RSAUtils.encryptedStringOfReversed(pwdKey, this.loginUser.username);
                                this.loginUserisEncrypt.password = RSAUtils.encryptedStringOfReversed(pwdKey, this.loginUser.password);
                                this.loginUserisEncrypt.clientIdRsa = res.data.data.clientIdRsa;
                                // let comments = this.loginUserisEncrypt;
                                // let loginvalue = qs.stringify(comments);
                                $cookies.remove('tour_token');
                                $cookies.remove('access_token');
                                let baseAuth = store.state.baseUrl + '/uaa/oauth/token'
                                this.$http
                                    .post(baseAuth, this.loginUserisEncrypt, {
                                        headers: {
                                            Authorization: store.state.baseAuth
                                        }
                                    })
                                    .then(res => {
                                        if (res.status == 200) {
                                            // 登录成功
                                            this.$toast(this.$t('m.tlloginSuccess'))
                                            //登录成功设置access_token
                                            _this.userTpken = "bearer" + " " + res.data.access_token;
                                            $cookies.set("access_token", _this.userTpken);
                                            //保存用户的手机号
                                            localStorage.setItem("loginphone", this.loginUser.username)
                                            window.localStorage.removeItem('tour_token')
                                            window.localStorage.removeItem('tourusertype')
                                            window.localStorage.removeItem('response')
                                            //去首页
                                            this.$router.replace("/");
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
                                    });
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    } else {
                        //2,不加密
                        if (this.codeInput == "") {
                            this.$toast(this.$t('m.GraphicCodeEmpty'))
                        }
                        this.loginUser.code = this.codeInput;
                        // let comments = this.loginUser;
                        // let comValue = qs.stringify(comments);
                        let baseAuth = store.state.baseUrl + '/uaa/oauth/token'
                        this.$http
                            .post(baseAuth, this.loginUser, {
                                headers: {
                                    Authorization: store.state.baseAuth
                                }
                            })
                            .then(res => {
                                // 登录成功
                                this.$toast(this.$t('m.tlloginSuccess'))
                                // 设置token
                                _this.userTpken = "bearer" + " " + res.data.access_token;
                                $cookies.set("access_token", _this.userTpken);
                                //保存用户的手机号
                                localStorage.setItem("loginphone", this.loginUser.username)
                                window.localStorage.removeItem('tour_token')
                                window.localStorage.removeItem('tourusertype')
                                window.localStorage.removeItem('response')
                                //去首页
                                // sessionStorage.clear()
                                this.$router.replace("/");
                                //去首页
                                this.$router.replace("/");
                            })
                            .catch(err => {
                                if (err.body.error_description) {
                                    this.$toast(err.body.error_description)
                                } else if (err.body.error) {
                                    this.$toast(err.body.error)
                                } else {
                                    this.$toast(this.$t('m.tlloginFailed'))
                                }
                                $cookies.remove("access_token");
                                this.reset()
                            });
                    }
                }
            },
            //去注册页面
            toregister() {
                this.showoneregist = true;
            },
            //图形验证码
            vlicode() {
                this.$axios
                    .post(this.api.globalApi.vlicode, '', {
                        headers: {
                            Authorization: ""
                        }
                    })
                    .then(res => {
                        var imgData = "data:image/png;base64," + res.data.data.code;
                        this.loginUser.clientId = res.data.data.clientId;
                        this.codeUrl = imgData;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
        },
        created() {

            // 获取二维码的
            this.vlicode();
            this.ThirdSystemResource();
            // 获取第三方微信登录的
            this.quhao = this.arrs //手机的国家区号areaCode的代码设置
            if (window.localStorage.getItem("quhaos")) {
                //////// console.log("true");
                let quhao = window.localStorage.getItem("quhaos");
                this.quhaoimg = quhao;
                this.arrs.forEach(e => {
                    ////// console.log(e.quhaos);
                    if (this.quhaoimg == e.quhaos) {
                        this.ctr = e.quhaoimg;
                        this.loginUser.areaCode = e.quhaos;
                    }
                });
            } else {
                this.ctr = this.arrs[0].quhaoimg //默认的国籍号显示
                this.loginUser.areaCode = this.arrs[0].quhaos //默认的国籍区号
            }
            // 调用语言的
            this.glanguage();
            // 手机号码
        },
        mounted() {
            if (window.localStorage.getItem("loginphone") != null) {
                this.loginUser.username = window.localStorage.getItem("loginphone");
            }
        },
    };
</script>

<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }
    #login {
        width: 100%; // height: 100vh;
        height: 100%;
        background: url("../../assets/image/login/back.png") no-repeat;
        background-size: cover;
        background-position: 100% 100%;
        .main_login {
            width: 100%; // height: 100vh;
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
                // background-color: red;
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
            } //手机号输入框
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
                    height: 100%;
                    width: 3.45rem;
                    img {
                        height: .85rem;
                        margin-left: .3rem;
                    }
                }
            } // 描述
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
                    width: 3.45rem;
                    display: flex;
                    align-items: center;
                    img {
                        width: .825rem;
                        height: .875rem;
                        margin-left: .5rem;
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
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                color: #FFFFFF;
                &:active {
                    background-color: rgba(255, 255, 255, 0.7) !important; // background-color: red !important;
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
                height: fit-content;
                border-bottom: 1Px solid transparent;
                border-color: rgba(255, 255, 255, 0.3);
                padding: 1.325rem 0 .475rem;
                .pic {
                    height: fit-content;
                    width: 3.45rem;
                    display: flex;
                    align-items: center;
                    img {
                        width: .825rem;
                        height: .875rem;
                        margin-left: .5rem;
                    }
                }
                .write_input {
                    height: .85rem;
                    min-width: 5rem;
                    font-size: 0.75rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                    color: rgba(238, 238, 238, 1);
                    background: none;
                    border: none;
                    flex: 1;
                } //图形验证码的大盒子
                .vlicodeImg {
                    width: 3.325rem;
                    height: 1.25rem;
                    background: rgba(220, 220, 220, 1);
                    border-radius: .1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 100%;
                        height: 100%;
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
        // margin-top: 1.3rem;
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