<template>
    <div id="reg">
        <div class="main">
            <!-- 顶部的 -->
            <div class="top">
                <div class="back" @click="back">
                    <img src="../../assets/image/icon/shouye_icon_more@2x.png" alt="">
                </div>
                <span>{{$t('m.phonefp')}}</span>
                <div class="right">
                </div>
            </div>
            <!-- 输入手机号的和邮箱注册的 -->
            <div class="Infoone">
                <!-- 区号的保存 -->
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
                <input v-model.trim="smsSend.mobile" class="inputNum" type="text" value="" :placeholder="$t('m.penerphone')" />
            </div>
            <!-- 此处暂时省略滑块验证 -->
            <!-- 输入手机的图形验证码 -->
            <div class="vlicode">
                      
                <div class="pic">
                    <img src="../../assets/image/login/emailforgrt.svg" alt="">
                </div>
                <input type="text" v-model="codeInput" :placeholder="$t('m.pentervcode')" class="write_input">
                <div class="vlicodeImg" @click="vlicode">
                    <img :src="codeImg" alt="">
                </div>
            </div>
            <!-- 获取手机的短信验证码 -->
            <div class="Infotwo">
                <div class="pic">
                    <img src="../../assets/image/login/icon-code.png" alt="">
                </div>
                <input v-model.trim="registUser.code" class="code" type="text" value="" :placeholder="$t('m.pentercode')" />
                <span v-show="show" @click="sendcode" class="codetxt" type="button">{{btntxt}}</span>
                <span v-show="!show" class="codetxt" type="button">{{count}} {{$t('m.sget')}}</span>
            </div>
            <!-- 请设置填写密码 -->
            <div class="password">
                <div class="pic">
                    <img src="../../assets/image/login/zhucezhanghao_icon_mima@2x.png" alt="">
                </div>
                <input type="password" :placeholder="$t('m.psetpwd')" v-model="registUser.newPassword">
            </div>
            <!-- 忘记密码的按钮 -->
            <div class="login_btn" @click="register()">
                <!-- <input type="button" value="注册"> -->
                <van-button class="btn" size="large">{{$t('m.changepassword')}}</van-button>
            </div>
            <!-- 用户协议 -->
            <!-- <div class="us" @click="us()">
                                                                                注册即代表您同意 <span>《套路用户协议》</span>
                                                                            </div> -->
        </div>
    </div>
</template>

<script>
    // 导入国家的
    import qs from 'qs'
    // 导入区号的数据
    import arrs from '../../lib/loginCountry/arrs.js'
    export default {
        data() {
            return {
                isShow: false,
                ctr: '',
                quhao: "",
                quhaoimg: "",
                arrs: arrs,
                //国家区号的
                // 验证码的
                btntxt: this.$t('m.getcode'),
                time: 0,
                show: true,
                count: '',
                timer: null,
                codeInput: '',
                codeImg: '',
                //请求短信验证码接口时需要提交的参数
                smsSend: {
                    "acType": "mobile", //类型
                    "mobile": "", //手机号,                       
                    "clientId": '', //用户id,
                    "type": "forgot", //类型
                    "code": "", //短信验证码
                    "areaCode": "", //国家区号的
                },
                //忘记密码的
                registUser: {
                    "account": "", //手机号
                    "actype": "mobile",
                    "code": "", //短信验证码
                    "newPassword": "",
                    'codeInput': '',
                    "areaCode": "", //国家区号的
                },
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
                this.loginUser.areaCode = quhaos;
                // this.$emit('goTo', e) //向父组件传值
            },
            // 发送短信验证码的验证
            sendcode() {
                let _this = this;
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if (this.smsSend.mobile == '') {
                    this.$toast(this.$t('m.tlphoneEmpty'))
                } else if (!reg.test(this.smsSend.mobile)) {
                    this.$toast(this.$t('m.tlphoneError'))
                } else if (this.codeInput == '') {
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else {
                    this.time = 60;
                    this.disabled = true;
                    //验证码的时间设置 可有可无
                    this.getCode();
                    //手机号争取后调取接口
                    this.smsSend.code = this.codeInput;
                    let smsSendcomments = this.smsSend;
                    let comValuesmsSend = qs.stringify(smsSendcomments);
                    //console.log(this.smsSend.mobile);
                    this.$axios.post(this.api.globalApi.smsCode,
                            comValuesmsSend
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
            //验证码的倒计时
            // timer() {
            //     if (this.time > 0) {
            //         this.time--;
            //         this.btntxt = this.time + "s后获取";
            //         setTimeout(this.timer, 1000);
            //     } else {
            //         this.time = 0;
            //         this.btntxt = "获取验证码";
            //         this.disabled = false;
            //     }
            // },
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
            //手机忘记密码
            register() {
                let that = this;
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                // 获取国家的区号
                if (this.smsSend.mobile == '') {
                    this.$toast(this.$t('m.tlphoneEmpty'))
                } else if (!reg.test(this.smsSend.mobile)) {
                    this.$toast(this.$t('m.tlphoneError'))
                } else if (this.codeInput == '') {
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else if (this.registUser.code == "") {
                    this.$toast(this.$t('m.SMSVerificationCode'))
                } else if (this.registUser.newPassword == '') {
                    this.$toast(this.$t('m.tlPasswordEmpty'))
                } else {
                    this.registUser.account = this.smsSend.mobile; //手机号
                    this.registUser.codeInput = this.codeInput; //输入的图形码
                    let commentforget = this.registUser;
                    let forgot = qs.stringify(commentforget);
                    this.$axios.post(this.api.globalApi.mobileForgetPassword, forgot)
                        .then(res => {
                            // 
                            if (res.status == 200) {
                                // 注册成功就跳转到登录页
                                that.$toast(that.$t('m.registrationSuccess'))
                                this.$router.replace("/login")
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
            us() {
                this.$router.push({
                    path: '/agreement'
                })
            },
            //返回
            back() {
                this.$router.push({
                    path: '/login'
                });
            },
            //图形验证码的接口
            vlicode() {
                this.$axios.post(this.api.globalApi.vlicode)
                    .then(res => {
                        // //console.log("啦啦啦");
                        // //console.log(res.data.data.clientId);
                        // //console.log(res.data.data.code);
                        //获取后台返回的图片，拼接成图片的地址，然后返回
                        var imgData = ('data:image/png;base64,' + res.data.data.code);
                        //获取后端返回的客户端的id
                        this.smsSend.clientId = res.data.data.clientId;
                        // //console.log("呵呵呵呵");
                        // //console.log(this.smsSend.clientId);
                        // registUser.codeUrl
                        // var imgData = ( data.data && 'data:image/png;base64,' + data.data.code || '');
                        //把获取的图片路径赋值到图片上面去
                        this.codeImg = imgData;
                        // //console.log(imgData);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        // 页面加载完成后就调用一次图形验证码来刷新图形验证码
        created() {
            this.vlicode();
            this.quhao = this.arrs;
            //手机的国家区号areaCode的代码设置
            if (window.localStorage.getItem("quhaos")) {
                let quhao = window.localStorage.getItem("quhaos");
                this.quhaoimg = quhao;
                this.arrs.forEach(e => {
                    if (this.quhaoimg == e.quhaos) {
                        // 1,用户选择的图片
                        this.ctr = e.quhaoimg;
                        // 短信验证码区号
                        this.smsSend.areaCode = e.quhaos;
                        //手机忘记密码的国际区号
                        this.registUser.areaCode = e.quhaos;
                    }
                });
            } else {
                //1,默认的国籍号显示
                this.ctr = this.arrs[0].quhaoimg
                //2,默认发送手机短信验证码区号
                this.smsSend.areaCode = this.arrs[0].quhaos
                //3,默认手机忘记密码的短信验证码区号
                this.registUser.areaCode = this.arrs[0].quhaos
            }
        },
        mounted() {
            window.addEventListener('click', this.getSrcList) //添加监听事件
        },
    }
</script>

<style lang="scss" scoped>
    #reg {
        height: 100vh;
        width: 100%; // background-color: #fafafa;
        background-color: #fafafa;
    }
    .main {
        width: 100%;
        height: 100vh;
        .top {
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            background: #fff;
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
            margin: 0 auto;
            margin-top: 2rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .pic {
                height: 2rem;
                width: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                position: relative;
            }
            .inputNum {
                flex: 1;
                border: none;
                color: black;
                font-size: .65rem;
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
        //图形验证码的大盒子
        .vlicode {
            width: 15rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: 1rem;
            .pic {
                width: 2rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                img {
                    width: .8rem;
                    height: .9rem;
                }
            }
            .write_input {
                flex: 1;
                list-style: none;
                border: none;
                font-size: .65rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: black;
                height: 100%;
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
            .vlicodeImg {
                width: 4.5rem;
                background: rgba(51, 51, 51, 1);
                border-radius: .1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 4.7rem;
                    height: 1.2rem;
                    background: rgba(51, 51, 51, 1);
                    border-radius: .1rem;
                }
            }
        } //手机短信的验证码
        .Infotwo {
            width: 15rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            margin-top: 1rem;
            .pic {
                width: 2rem;
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                img {
                    width: .8rem;
                    height: .9rem;
                }
            }
            .code {
                flex: 1;
                height: 100%;
                border-radius: .15rem;
                font-size: .65rem;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: black;
                border: none;
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
                color: white;
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
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            margin: 0 auto;
            margin-top: .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .pic {
                width: 2rem;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .75rem;
                img {
                    width: .8rem;
                    height: .9rem
                }
            }
            input {
                border: none;
                height: 100%;
                flex: 1;
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
        } //忘记密码的按钮
        .login_btn {
            width: 15rem;
            height: 2rem;
            background: rgba(67, 67, 67, 1);
            border-radius: .25rem;
            margin: 0 auto;
            margin-top: 3.5rem;
            .btn {
                width: 100%;
                height: 100%;
                font-size: .7rem;
                border-radius: .25rem;
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                background: rgba(67, 67, 67, 1);
                line-height: 2rem;
            }
        } //用户协议
        .us {
            width: 15rem;
            height: .55rem;
            font-size: .55rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            text-align: center;
            color: #999999;
            margin: 0 auto;
            span {
                font-size: .55rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: #333333;
            }
        }
    } // 2，登录的国家区号选择
    @import '../../assets/style/country'
</style>