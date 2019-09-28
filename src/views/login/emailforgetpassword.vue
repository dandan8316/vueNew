<template>
    <div id="reg">
        <div class="main">
            <!-- 顶部的 -->
            <div class="top">
                <div class="back" @click="back">
                    <img src="../../assets/image/icon/shouye_icon_more@2x.png" alt="">
                </div>
                <span>{{$t('m.emailfp')}}</span>
                <div class="right">
                </div>
            </div>
            <!-- 输入手机号的和邮箱注册的 -->
            <div class="Infoone">
                <!-- <i class="iconfont select ">email</i> -->
                <span class="iconfont select "><img src="../../assets/image/login/email.svg" alt=""></span>
                <input v-model.trim="emailSend.email" class="inputNum" type="text" value="" :placeholder="$t('m.penteremail')" />
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
                <input v-model.trim="registUser.code" class="code" type="text" value="" :placeholder="$t('m.logincode')" />
                <span v-show="show" @click="sendcode" class="codetxt" type="button">{{btntxt}}</span>
                <span v-show="!show" class="codetxt" type="button">{{count}}{{$t('m.sget')}}</span>
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
    import qs from 'qs'
    import {
        prototype
    } from 'events';
    export default {
        data() {
            return {
                btntxt: this.$t('m.getcode'),
                time: 0,
                show: true,
                count: '',
                timer: null,
                codeInput: '',
                codeImg: '',
                //请求短信验证码接口时需要提交的参数
                emailSend: {
                    "acType": "email", //类型
                    "email": "", //手机号,                       
                    "clientId": '', //用户id,
                    "type": "forgot", //类型
                    "code": "", //短信验证码
                },
                //忘记密码的
                registUser: {
                    "account": "", //手机号
                    "actype": "email",
                    "code": "", //短信验证码
                    "newPassword": "",
                    'codeInput': '',
                },
            }
        },
        methods: {
            // 发送短信验证码的验证
            sendcode() {
                let _this = this;
                var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
                if (this.emailSend.email == '') {
                    this.$toast(this.$t('m.tlemailEmpty'))
                } else if (!reg.test(this.emailSend.email)) {
                    this.$toast(this.$t('m.tlemailError'))
                } else if (this.codeInput == '') {
                    // this.$toast("图形验证码为空");
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else {
                    this.time = 60;
                    this.disabled = true;
                    //验证码的时间设置 可有可无
                    this.getCode();
                    //手机号争取后调取接口
                    this.emailSend.code = this.codeInput;
                    // let smsSendcomments = this.smsSend;
                    // let comValuesmsSend = qs.stringify(smsSendcomments);
                    this.$axios.get(this.api.globalApi.emailCode, {
                            params: {
                                email: this.emailSend.email,
                                type: this.emailSend.type,
                                code: this.emailSend.code,
                                clientId: this.emailSend.clientId
                            }
                        })
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
            //重置按钮的正则匹配 
            register() {
                let that = this;
                var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
                if (this.emailSend.email == '') {
                    this.$toast(this.$t('m.tlemailEmpty'))
                } else if (!reg.test(this.emailSend.email)) {
                    this.$toast(this.$t('m.tlemailError'))
                } else if (this.codeInput == '') {
                    this.$toast(this.$t('m.GraphicCodeEmpty'))
                } else if (this.registUser.code == '') {
                    this.$toast(this.$t('m.emailVerification'))
                } else if (this.registUser.newPassword == '') {
                    this.$toast(this.$t('m.tlPasswordEmpty'))
                } else {
                    this.registUser.account = this.emailSend.email; //手机号
                    this.registUser.codeInput = this.codeInput; //输入的图形码
                    let commentforget = this.registUser;
                    let forgot = qs.stringify(commentforget);
                    this.$axios.post(this.api.globalApi.mobileForgetPassword, forgot)
                        .then(res => {
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
                        this.emailSend.clientId = res.data.data.clientId;
                        //把获取的图片路径赋值到图片上面去
                        this.codeImg = imgData;
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        },
        // 页面加载完成后就调用一次图形验证码来刷新图形验证码
        created() {
            this.vlicode();
        }
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
                width: 1.75rem;
                height: 100%;
                padding-left: .75rem;
                display: flex;
                align-items: center;
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
            .select {
                width: 2rem;
                height: 2rem; // font-size: .7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: .75rem;
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    width: 18.55rem;
                    font-size: .65rem;
                    font-family: PingFang-SC-Regular;
                    font-weight: 400;
                }
                img {
                    width: .8rem;
                    height: .9rem;
                    display: inline-block;
                }
            }
            .inputNum {
                flex: 1;
                border: none; // padding-left: .15rem;
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
                height: 100%; // padding-left: 0.1rem;
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
                color: rgba(255, 255, 255, 1); // margin-right: .3rem;
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
                flex: 1; // padding-left: .25rem;
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
    }
</style>