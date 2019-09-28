<template>
    <div class="setbox">
        <van-nav-bar :title="$t('m.bindphonenumber')" :right-text="$t('m.jump')" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <!-- 输入手机号的和邮箱注册的 -->
        <div class="Infoone">
            <!-- <i class="iconfont select ">+86</i> -->
            <!-- 区号的选择----------------------------------------------->
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
            <input v-model="smsSend.mobile" class="inputNum" type="text" value="" :placeholder="$t('m.loginphone')" />
        </div>
        <!-- 获取手机的短信验证码 -->
        <div class="Infotwo">
            <div class="pic"><img src="../../assets/image/login/icon-code.png"></div>
            <input v-model="bindphone.code" class="code" type="text" value="" :placeholder="$t('m.logincode')" />
            <span v-show="show" @click="sendcode" class="codetxt" disabled type="button">{{btntxt}}</span>
            <span v-show="!show" class="codetxt" type="button" :disabled="isforbid">{{count}} {{$t('m.sget')}}</span>
        </div>
        <!--    绑定的按钮 -->
        <div class="login_btn" @click="setover">
            <van-button class="btn" size="large">{{$t('m.complete')}}</van-button>
        </div>
    </div>
</template>

<script>
    import arrs from '../../lib/loginCountry/arrs'
    import qs from 'qs'
    export default {
        // components: {
        //     arrs
        // },
        // 区号的选择
        data() {
            return {
                // 国家区号的
                isShow: false,
                ctr: '',
                quhao: "",
                quhaoimg: "",
                //获取短信验证码的
                isforbid: 'false',
                btntxt: this.$t('m.getcode'),
                time: 0,
                show: true,
                count: '',
                timer: null,
                //请求短信验证码接口时需要提交的参数
                smsSend: {
                    mobile: "", //手机号,              
                    type: "bind", //类型
                    code: "",
                    "areaCode": "" //国际区号的
                },
                bindphone: {
                    "account": '',
                    "actype": 'mobile',
                    "code": '',
                    "areaCode": "" //国际区号的
                },
                // 国家区号的js文件
                arrs:arrs
            }
        },
        created() {
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
                        this.bindphone.areaCode = e.quhaos;
                        
                    }
                });
            } else {
                //1,默认的国籍号显示
                this.ctr = this.arrs[0].quhaoimg
                //2,默认发送手机短信验证码区号
                this.smsSend.areaCode = this.arrs[0].quhaos
                //3,默认手机忘记密码的短信验证码区号
                this.bindphone.areaCode = this.arrs[0].quhaos
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
                this.smsSend.areaCode = quhaos;
                this.bindphone.areaCode = quhaos;
                // this.$emit('goTo', e) //向父组件传值
            },
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                this.$router.push({
                    path: '/index'
                })
            },
            showToast() {
                this.$toast.loading({
                    mask: true,
                    message: ''
                });
            },
            showerr() {
                this.$toast("账号已存在")
            },
            showbind() {
                this.$toast("绑定成功")
            },
            // 发送短信验证码的验证
            sendcode() {
                // this.smsSend.areaCode = this.currentData.dialCode;
                let _this = this;
                if (this.smsSend.mobile == '') {
                    this.$toast("手机号不能为空");
                } else {
                    this.time = 60;
                    this.disabled = true;
                    //验证码的时间设置 可有可无
                    this.getCode();
                    //手机号争取后调取接口
                    let loginsms = this.smsSend;
                    let comValue = qs.stringify(loginsms);
                    this.$axios.post(this.api.globalApi.smsCode, comValue)
                        .then(res => {
                            //console.log(res)
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }
            },
            //短信验证码的动画
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
            // 绑定手机
            setover() {
                // this.bindphone.areaCode = this.currentData.dialCode;
                if (this.smsSend.mobile == '') {
                    this.$toast('电话号码为空')
                } else if (this.bindphone.code == '') {
                    this.$toast('短信验证码为空')
                } else {
                    this.bindphone.account = this.smsSend.mobile;
                    let overgame = qs.stringify(this.bindphone);
                    this.$axios.post(this.api.globalApi.bindAccount, overgame)
                        .then(res => {
                            this.showbind()
                        })
                        .catch(err => {
                            if (err.status !== 200) {
                                this.showerr()
                            }
                            console.error(err);
                        })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    // 2，登录的国家区号选择
    .setbox {
        width: 100%;
        height: 100vh;
        .van-nav-bar {
            height: 2.25rem;
            .van-nav-bar__title {
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
            .van-nav-bar__text {
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }
            .van-icon {
                color: #333333;
            }
        } //手机绑定账号
        .Infoone {
            width: 15rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            margin: 0 auto;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .pic {
                height: 2rem;
                width: 1rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-right: 0.8rem;
                position: relative;
                padding-left: 0.85rem;
            }
            .inputNum {
                margin-left: 2.2rem;
                width: 80%;
                border: none;
                padding-left: .15rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                font-size: .65rem;
                &::-webkit-input-placeholder {
                    /* placeholder颜色  */
                    color: #aab2bd;
                    /* placeholder字体大小  */
                    font-size: .6rem;
                }
            }
        } //手机短信的验证码
        .Infotwo {
            margin: 0 auto;
            margin-top: 1rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 2rem;
            width: 15rem;
            height: 2rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .25rem;
            .pic {
                height: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: .85rem;
                    height: .95rem;
                    margin-left: .5rem;
                }
            }
            .code {
                height: 2rem;
                font-size: 0.7rem;
                background: none;
                border: none;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500; // width: 6.5rem;
                width: auto;
                margin-left: .25rem;
            }
            .codetxt {
                width: 5rem;
                border-radius: .2rem;
                background: rgba(67, 67, 67, 1);
                border-radius: .1rem;
                color: #f8f8f8;
                height: 100%;
                text-align: center;
                margin-right: .2rem;
                font-size: .65rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                height: 1.2rem;
                line-height: 1.2rem;
                margin-left: auto;
            }
        } // 手机密码设置
        //绑定按钮
        .login_btn {
            margin: 3.5rem auto .25rem;
            width: 15rem;
            height: 2rem;
            background: rgba(67, 67, 67, 1);
            border-radius: .25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn {
                background: rgba(67, 67, 67, 1);
                width: 100%;
                height: 100%;
                border-radius: .25rem;
                font-size: .85rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 2rem;
            }
        }
    }
    
    @import "../../assets/style/country";
</style>