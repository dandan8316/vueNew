<template>
    <div id="edit">
        <!-- 导航栏 -->
        <van-nav-bar :title="$t('m.improvepersonalinformation')" :right-text="$t('m.save')" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <!-- 顶部区域 -->
        <div class="photocommit">
            <!-- 头像提交 -->
            <div class="photobox">
                <div class="photo">
                    <div class="iconchange">
                        <img class="head-img" :src="changeicon||changeicon2" ref="goodsImg" />
                    </div>
                    <van-uploader accept="image/png, image/jpeg,image/jpg,image/*" :after-read="afterRead" multiple>
                        <div class="camera">
                            <img src="../../assets/image/mine/homepage_icon_xiangji@2x.png" alt="">
                        </div>
                    </van-uploader>
                </div>
            </div>
            <!-- 照片提交说明 -->
            <div class="txttaps">
                <div>{{$t('m.successage')}}</div>
                <div>{{$t('m.successagetwo')}}</div>
            </div>
            <!-- 输入框的昵称 -->
            <div class="inputname">
                <input type="text" :placeholder="$t('m.enternickname')" v-model="nickname">
            </div>
            <!-- 昵称输入说明 -->
            <div class="bottom">
                <span>  {{$t('m.nickcaution')}}</span>
            </div>
        </div>
        <!-- 这是选择性别，角色，性取向的 -->
        <!-- 性别 -->
        <div class="sexoutbox">
            <div class="sexbox">
                <div class="leftsex">
                    <span>{{$t('m.sex')}}</span>
                    <span>*</span>
                </div>
                <div class="rightsex">
                    <div class="men" :class="{sex:a===d}" @click="dianji"><span>{{$t('m.man')}}
                                                        </span></div>
                    <div class="women" :class="{sex:b===d}" @click="dianji2"><span>{{$t('m.woman')}}</span></div>
                    <div class="cdts" :class="{sex:c===d}" @click="dianji3"><span>CDTS</span></div>
                </div>
            </div>
        </div>
        <!-- 角色 -->
        <div class="cosplayoutbox">
            <div class="cosplaybox">
                <div class="leftcosplay">
                    <span>{{$t('m.role')}}</span>
                    <span>*</span>
                </div>
                <div class="rightcosplay">
                    <div class="smen" :class="{cosplay:e===h}" @click="dianjis"><span>S</span></div>
                    <div class="mwomen" :class="{cosplay:f===h}" @click="dianji2m"><span>M</span></div>
                    <div class="ocdts" :class="{cosplay:g===h}" @click="dianji3o"><span>{{$t('m.other')}}</span></div>
                </div>
            </div>
        </div>
        <!-- 性取向-->
        <div class="sexselectoutbox">
            <div class="sexselectbox">
                <div class="leftsexselect">
                    <span>{{$t('m.sexorientation')}}</span>
                    <span>*</span>
                </div>
                <div class="rightsexselect">
                    <div class="sexmen" :class="{sexselect:i}" @click="dianjisexmen"><span>{{$t('m.man')}}</span></div>
                    <div class="sexwomen" :class="{sexselect:j}" @click="dianjisexwomen"><span>{{$t('m.woman')}}</span></div>
                    <div class="sexcdts" :class="{sexselect:k}" @click="dianjisexother"><span>CDTS</span></div>
                </div>
            </div>
        </div>
        <!-- 这是选择城市，星座，出生日期，身高，体重的------------------------- -->
        <!-- 城市 -->
        <div class="select">
            <!-- 城市 -->
            <van-cell :value="chensghiselect" is-link :title="$t('m.city')" @click="chengshi">
                <template slot="title">
                                                <span class="custom-text">{{$t('m.city')}}</span>                             <van-tag color="#fff">*</van-tag>
</template>
            </van-cell>
            <!-- 星座 -->
             <van-cell :title="$t('m.constellation')" is-link :value="showxinzuoselect" @click="xinzuo"  />
             <!-- 出生日期 -->
             <van-cell :title="$t('m.dataBirthday')" is-link :value="showbirthday"  @click="popup" />
             <!-- 身高 -->
           <van-cell :title="$t('m.height')" is-link :value="showheightselect+'cm'" @click="lala"  />
           <!-- 体重 -->
           <van-cell :title="$t('m.weight')" is-link :value="showtizhongselect+'kg'" @click="lala1"  />
         </div> 

        <!-- 这是底部弹出框的-------------------------------------- -->
        <!-- 选择城市的 -->
            <van-popup v-model="chengsi" position="bottom">
            <van-area :area-list="areaList" :columns-num="2" title=""   @cancel="onCancelchengshi" @confirm="onConfirmchengshi" />
        </van-popup>
        <!-- 星座的弹框 -->
      <van-popup v-model="showxinzuo" position="bottom" :overlay="true">
            <van-picker show-toolbar  :columns="columns" @cancel="onCancelxinzuo" @confirm="onConfirmxinzuo" />            
     </van-popup>
    <!-- 出生日期 -->
       <van-popup v-model="showbirth" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date"  @confirm="dandan" @cancel="biretcancel" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
        </van-popup>   
        <!-- 身高 -->
              <van-popup v-model="showheight" position="bottom" :overlay="true">
            <van-picker show-toolbar  :columns="height" @cancel="onCancelheight" @confirm="onConfirmheight"/>            
     </van-popup>

    <!-- 体重 -->
 <van-popup v-model="showtizhong" position="bottom" :overlay="true">
 <van-picker show-toolbar  :columns="tizhong" @cancel="onCanceltizhong" @confirm="onConfirmtizhong" />            
     </van-popup>

    <!-- 语音识别的功能 -->
    <div class="voice" style="display:none;">
        <span>{{$t('m.VoiceProfile')}}</span>
         <input type="text"   :placeholder="$t('m.voiceplaceholder')"  />  
    </div>
     <!-- 个人简介 -->
 <div class="person_bottom">
          <van-cell :title="$t('m.personprofile')" value=""   />
     <van-cell-group>
  <van-field
    v-model="message"
    type="textarea"
    :placeholder="$t('m.writepersonprofile')"
    rows="1"
    autosize
  />
</van-cell-group class="person_bottom">
 </div>
       
    </div>
</template>

<script>
    import qs from 'qs'
    // 省市联动的json数据
    import areaList from '../../lib/userInfoEdit/area'
    //导入身高的js文件
    import heightdata from '../../lib/userInfoEdit/height'
    //导入体重的js文件
    import weightdata from '../../lib/userInfoEdit/weight'
    // 导入星座的数据
    import xindata from '../../lib/userInfoEdit/xinzuo'
    import {
        fstat
    } from 'fs';
    export default {
        components: {
            // 地区数据
            areaList,
            // 身高
            heightdata,
            // 体重
            weightdata,
            // 星座
            xindata
        },
        data() {
            return {
                //保存修改的按钮
                setupdata: {
                    // id: '', //id。
                    nickname: 'TL', //昵称。
                    headpic: "", //头像。
                    // userId: '', //。
                    city: '北京市', //城市
                    constellation: '白羊座', //星座
                    birthdate: '', //出生日期
                    height: '120', //身高
                    weight: '30', //体重
                    sex: '1', //性别
                    sexRole: '2', //角色
                    tendency: '1', //性取向
                    descs: this.$t('m.writedownyourdesc'), //个人简介
                },
                nickname: '', //昵称
                checked: true,
                changeicon: require('../../assets/image/mine/biaoqianlan_icon_wode02@2x.png'),
                changeicon2: require('../../assets/image/mine/biaoqianlan_icon_wode02@2x.png'),
                icon: {
                    normal: require('../../assets/image/mine/edit.png'),
                    active: require('../../assets/image/mine/gerenxinxi_icon_cdts02@2x.png')
                },
                message: '',
                //图片上传获取token的参数
                imgUpdata: {
                    type: 'cms'
                },
                imgtoken: {
                    token: "",
                    imgUrl: '',
                    imgmore: ''
                },
                formimg: '',
                // 性别
                a: "1",
                b: "2",
                c: "5",
                d: "1",
                //角色
                e: "1",
                f: "2",
                g: "5",
                h: "1",
                //性取向
                nan: '',
                smen: '',
                omen: '',
                i: false,
                j: false,
                k: false,
                // 城市
                chengsi: false,
                chensghiselect: '请选择',
                areaList: areaList,
                //显示生日的弹出框
                showxinzuo: false,
                showxinzuoselect: "请选择",
                columns: xindata,
                //出生日期的,
                showbirthday: "请选择", //vant-cell显示的
                showbirth: false, //是否显示底部的popup
                minDate: new Date(1940, 1, 1),
                maxDate: new Date(2030, 1, 1),
                currentDate: new Date(),
                // 身高
                showheight: false,
                showheightselect: "请选择",
                height: heightdata,
                //体重
                showtizhong: false,
                showtizhongselect: "请选择",
                tizhong: weightdata //体重的数据           
            }
        },
        created() {
            // 获取用户的数据
            this.$axios.get(this.api.globalApi.currentUser, )
                .then(res => {
                    //拉取用户已有的数据
                    // if (res.data.data.user.id) {
                    //     this.setupdata.id = res.data.data.user.id;
                    // }
                    if (res.data.data.user.headpic) {
                        this.changeicon = res.data.data.user.headpic; //头像
                        this.setupdata.headpic = res.data.data.user.headpic; //头像
                    }
                    if (res.data.data.user.nickname) {
                        this.nickname = res.data.data.user.nickname; //昵称
                        this.setupdata.nickname = res.data.data.user.nickname; //昵称
                    }
                    if (res.data.data.user.city) {
                        this.chensghiselect = res.data.data.user.city; //城市
                        this.setupdata.city = res.data.data.user.city; //城市
                    }
                    if (res.data.data.user.constellation) {
                        this.showxinzuoselect = res.data.data.user.constellation; //星座    
                        this.setupdata.constellation = res.data.data.user.constellation; //星座             
                    }
                    if (res.data.data.user.birthdate) {
                        this.showbirthday = res.data.data.user.birthdate; //生日
                        this.setupdata.birthdate = res.data.data.user.birthdate; //生日
                    }
                    if (res.data.data.user.height) {
                        this.showheightselect = res.data.data.user.height; //身高
                        this.setupdata.height = res.data.data.user.height; //身高
                    }
                    if (res.data.data.user.weight) {
                        this.showtizhongselect = res.data.data.user.weight; //体重
                        this.setupdata.weight = res.data.data.user.weight; //体重
                    }
                    if (res.data.data.user.descs) {
                        this.message = res.data.data.user.descs; //描述
                        this.setupdata.descs = res.data.data.user.descs; //描述
                    }
                    // 性别
                    if (res.data.data.user.sex == "1") {
                        this.d = "1";
                        this.setupdata.sex = '1'
                    } else if (res.data.data.user.sex == "2") {
                        this.d = "2";
                        this.setupdata.sex = '2'
                    } else if (res.data.data.user.sex == "5") {
                        this.d = "5";
                        this.setupdata.sex = '5'
                    } //角色的
                    if (res.data.data.user.sexRole == "1") {
                        this.h = "1";
                        this.setupdata.sexRole = '1'
                    } else if (res.data.data.user.sexRole == "2") {
                        this.h = "2";
                        this.setupdata.sexRole = '2'
                    } else if (res.data.data.user.sexRole == "5") {
                        this.h = "5";
                        this.setupdata.sexRole = '5'
                    } //性取向
                    let str = res.data.data.user.tendency;
                    //console.log(str);
                    var regs = RegExp(/1/);
                    if (regs.exec(str)) {
                        this.i = true;
                        this.nan = 1;
                    } else if (!regs.exec(str)) {
                        this.i = false;
                        this.nan = "";
                    }
                    var regm = RegExp(/2/);
                    if (regm.exec(str)) {
                        this.j = true;
                        this.smen = 2;
                    } else if (!regm.exec(str)) {
                        this.j = false;
                        this.smen = "";
                    }
                    var rego = RegExp(/5/);
                    if (rego.exec(str)) {
                        this.k = true;
                        this.omen = 5
                    } else if (!rego.exec(str)) {
                        this.k = false;
                        this.omen = "";
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            //获取七牛云的token
            let comments = this.imgUpdata;
            let comValue = qs.stringify(comments);
            //获取七牛云的token
            this.$axios.post(this.api.globalApi.qiniuUpToken, comValue)
                .then(res => {
                    //console.log(res);
                    //console.log(res.data.data.uptoken);
                    this.imgtoken.token = res.data.data.uptoken;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        methods: {
            //文件的读取
            //图片的头像的上传
            afterRead(res) {
                //console.log(res);
                //console.log(res.file.name);
                // //console.log(res.content);
                //将原图片显示为选择的图片
                this.$refs.goodsImg.src = res.content;
                // this.heh = res.content;
                let formData = new FormData();
                formData.append("file", res.file); //文件
                formData.append("file", res.file.name); //文件名
                formData.append('token', this.imgtoken.token); //token
                let str = res.file.name;
                let img_load = str.split(".")[1];
                // //console.log(img_load);
                this.imgtoken.imgmore = '.' + img_load;
                // let dataq = qs.stringify(formData);
                this.$axios.post(this.commonvar.qiniuserverSrc, formData)
                    .then(res => {
                        // //console.log("okl啊")
                        var add = this.commonvar.qiniuimgSrc
                        var he = add + res.data.key;
                        // //console.log('触发啦');
                        // //console.log(he);
                        this.setupdata.headpic = he;
                    })
                    .catch(err => {
                        // //console.log();
                    })
            },
            //返回上一级
            onClickLeft() {
                this.$router.go(-1);
            },
            //保存
            // 选择性别 角色 性取向
            dianji() {
                this.d = "1";
                //console.log(this.d);
            },
            dianji2() {
                this.d = "2";
                //console.log(this.d);
            },
            dianji3() {
                this.d = "5";
                //console.log(this.d);
            },
            //角色的方法
            dianjis() {
                this.h = "1";
                //console.log(this.h);
            },
            dianji2m() {
                this.h = "2";
                //console.log(this.h);
            },
            dianji3o() {
                this.h = "5";
                //console.log(this.h);
            },
            //1,性取向
            dianjisexmen() {
                this.i = !this.i;
                if (this.i == true) {
                    this.nan = "1";
                } else if (this.i == false) {
                    this.nan = '';
                    //console.log("为空");
                }
                //console.log(this.nan);
            },
            //2,性取向
            dianjisexwomen() {
                this.j = !this.j;
                if (this.j == true) {
                    this.smen = '2';
                } else if (this.j == false) {
                    this.smen = '';
                    //console.log("为空");
                }
                //console.log(this.smen);
            },
            //3,性取向
            dianjisexother() {
                this.k = !this.k;
                if (this.k == true) {
                    this.omen = "5";
                } else if (this.k == false) {
                    this.omen = '';
                    //console.log("为空");
                }
                //console.log(this.omen);
            },
            // 保存按钮
            onClickRight() {
                this.setupdata.tendency = this.nan + this.smen + this.omen;
                //性取向
                // this.setupdata.constellation = this.showxinzuoselect;
                // this.setupdata.sexRole = this.h; //角色              
                // this.setupdata.sex = this.d; //性别
                // this.setupdata.descs = this.message; //个人简介
                // this.setupdata.nickname = this.nickname; //昵称
                // let updatasetupdata = JSON.stringify(this.setupdata)
                // let setupdata = qs.stringify(this.setupdata); //序列化
                //console.log('出发啦');
                this.$axios.post('/uaa/apiu/user/update', this.setupdata, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {
                        //console.log(res)
                        this.$toast("保存成功");
                        // this.$router.go(0);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
            //城市的选择
            chengshi() {
                this.chengsi = true;
            },
            onCancelchengshi() {
                this.chengsi = false;
            },
            onConfirmchengshi(value) {
                // console.log(value);
                // console.log(value[0].name);                
                // console.log(value[1].name);
                let tlData = value[0].name + value[1].name;
                // console.log(tlData);
                this.chensghiselect = tlData;
                this.setupdata.city = tlData;
                this.chengsi = false;
            },
            // onChangechengshi(picker, value, index) {
            //     let val = picker.getValues();
            //     let a1 = val[0].name;
            //     let a2 = val[1].name;
            //     let hehe = a1 + a2;
            //     this.chensghiselect = hehe;
            //     this.setupdata.city = hehe;
            // console.log(hehe);
            //console.log(this.setupdata.city);
            // },
            //星座的选择
            xinzuo() {
                this.showxinzuo = true;
            },
            // onChangexinzuo(picker, value, index) {
            //     // //console.log(`当前值：${value}, 当前索引：${index}`);
            //     // //console.log(value);
            //     this.showxinzuoselect = value;
            //     this.setupdata.constellation = value;
            // },
            onCancelxinzuo(picker, value, index) {
                this.showxinzuo = false;
            },
            onConfirmxinzuo(value) {
                // console.log(value);
                this.showxinzuoselect = value;
                this.setupdata.constellation = value;
                this.showxinzuo = false;
            },
            //出生日期的
            popup: function() {
                if (!this.showbirth) {
                    this.showbirth = true;
                } else {
                    this.showbirth = false;
                }
            },
            formatter(type, value) {　　
                if (type === 'year') {　　
                    return `${value}年`;　　
                } else if (type === 'month') {　　
                    return `${value}月`　　
                } else if (type === 'day') {　　
                    return `${value}日`　　
                }　　
                return value;　　
            },
            //出生日期的确认的
            // hehe() {
            //     // 格式化时间 YY-MM--DD
            //     var date = this.currentDate;
            //     var seperator = "-";
            //     var year = date.getFullYear();
            //     var month = date.getMonth() + 1;
            //     var nowDate = date.getDate();
            //     //console.log("当前的时间是");
            //     if (month >= 1 && month <= 9) {
            //         month = "0" + month;
            //     }
            //     if (nowDate >= 0 && nowDate <= 9) {
            //         nowDate = "0" + nowDate;
            //     }
            //     //console.log(year + seperator + month + seperator + nowDate);
            //     this.showbirthday = year + seperator + month + seperator + nowDate;; //把时间赋值给选择框
            //     this.setupdata.birthdate = year + seperator + month + seperator + nowDate; //把当前选择的时间赋值给参数
            // },
            // 出生日期的确认的按钮
            dandan() {
                var date = this.currentDate;
                var seperator = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var nowDate = date.getDate();
                //console.log("当前的时间是");
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (nowDate >= 0 && nowDate <= 9) {
                    nowDate = "0" + nowDate;
                }
                //console.log(year + seperator + month + seperator + nowDate);
                this.showbirthday = year + seperator + month + seperator + nowDate;; //把时间赋值给选择框
                this.setupdata.birthdate = year + seperator + month + seperator + nowDate; //把当前选择的时间赋值给参数
                console.log(this.setupdata.birthdate);
                this.showbirth = false;
            },
            //出生日期的取消
            biretcancel() {
                this.showbirth = false;
            },
            //身高的选择
            lala() {
                this.showheight = true;
            },
            // onChangeheight(picker, value, index) {
            //     //console.log(value);
            //     this.showheightselect = value;
            //     this.setupdata.height = value.substring(0, 3);
            // },
            onCancelheight(picker, value, index) {
                this.showheight = false;
            },
            onConfirmheight(value) {
                console.log(value);
                this.showheightselect = value.substring(0, 3);
                this.setupdata.height = value.substring(0, 3);
                this.showheight = false;
            },
            //体重的选择
            lala1() {
                this.showtizhong = true;
            },
            // onChangetizhong(picker, value, index) {
            //     // //console.log(`当前值：${value}, 当前索引：${index}`);
            //     //console.log(value);
            //     this.showtizhongselect = value;
            //     // this.weight = value;
            //     if (value.length == 4) {
            //         this.setupdata.weight = value.substring(0, 2);
            //     } else {
            //         this.setupdata.weight = value.substring(0, 3);
            //     }
            // },
            onCanceltizhong(picker, value, index) {
                this.showtizhong = false;
            },
            onConfirmtizhong(value) {
                // console.log(value);
                if (value.length == 4) {
                    this.setupdata.weight = value.substring(0, 2);
                    this.showtizhongselect = value.substring(0, 2);;
                } else {
                    this.setupdata.weight = value.substring(0, 3);
                    this.showtizhongselect = value.substring(0, 3);;
                }
                this.showtizhong = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    #edit {
        background-color: #f5f5f5;
        width: 100%;
        height: 100vh;
    } //vant头部导航的左中右
    .van-nav-bar {
        height: 2.2rem;
        border-bottom: .05rem solid #d7d7d7;
    } // 左边的返回箭头
    .van-nav-bar .van-icon {
        color: #333333;
        vertical-align: middle;
    } // 中间的文字title
    .van-nav-bar__title {
        margin: 0 auto;
        max-width: 60%;
        color: #323233;
        font-size: 16px;
        font-weight: 500;
        width: 202px;
        font-family: PingFang-SC-Medium;
        color: rgba(51, 51, 51, 1);
    } // 右边的保存按钮
    .van-nav-bar__text {
        color: #333333;
    } //上传个人头像
    .photocommit {
        width: 100%;
        height: 10.175rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: flex-start;
        background-color: #fff;
        margin-bottom: .5rem;
        .photobox {
            width: 100%;
            height: 3.5rem;
            display: flex;
            justify-content: center;
            margin-top: .75rem;
            .photo {
                width: 3.5rem;
                height: 3.5rem; // background: url('../../assets/image/mine/biaoqianlan_icon_wode02@2x.png') no-repeat center;
                position: relative;
                .iconchange {
                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .van-uploader {
                    position: absolute;
                    width: 1.3rem;
                    height: 1.3rem;
                    bottom: 0;
                    right: 0;
                }
                .camera {
                    position: absolute;
                    width: 1.3rem;
                    height: 1.3rem;
                    bottom: 0;
                    right: 0;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .txttaps {
            text-align: center;
            div {
                font-size: .6rem;
            }
        }
        .inputname {
            width: 100%;
            height: 1.75rem;
            display: flex;
            justify-content: center;
            align-items: center;
            input {
                display: inline-block;
                width: 90%;
                height: 100%;
                font-size: .6rem;
                padding-left: .25rem;
                border-radius: .25rem;
                outline: none;
                list-style: none;
                border: 1Px solid #979797;
            }
        }
        .bottom {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: .5rem;
            span {
                font-size: .5rem;
            }
        }
    } //选择城市 星座 出生日期  身高 体重
    .select {
        width: 100%;
        .van-cell {
            height: 2.75rem;
            background-color: #fff;
            .van-cell__title {
                font-size: .65rem;
            }
            .van-tag {
                background-color: #fff;
                color: red;
            }
            .custom-text {
                font-size: .65rem;
            }
        }
    } //语音简介
    .voice {
        width: 100%;
        height: 2.75rem;
        margin-top: .5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: .6rem;
        background-color: #fff;
        margin-bottom: .5rem;
        input {
            list-style: none;
            border: none;
            background-color: #fff;
        }
        span {
            font-size: .65rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-left: .75rem;
            margin-right: 1.5rem;
        }
    }
    .person_bottom {
        margin-bottom: .5rem;
    } // 选择性别 角色 性取向
    .sexoutbox {
        width: 100%;
        height: 2.75rem;
        background-color: #fff;
        .sexbox {
            width: 92%;
            height: 2.75rem;
            margin: 0 auto;
            background: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.5px solid #f9f9f9;
            .leftsex {
                display: flex;
                span {
                    font-size: .6rem;
                    &:nth-of-type(1) {}
                    &:nth-of-type(2) {
                        color: red;
                    }
                }
            }
            .rightsex {
                display: flex;
                justify-content: center;
                align-items: center;
                .men,
                .women,
                .cdts {
                    width: 2.25rem;
                    height: 1.15rem;
                    border: 0.5px dashed #d8d8d8;
                    margin-left: .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: .6rem;
                        color: #d8d8d8;
                    }
                }
            }
        }
    }
    .sex {
        background-color: #333333;
        color: #fff;
    } //角色
    .cosplayoutbox {
        width: 100%;
        height: 2.75rem;
        background-color: #fff;
        .cosplaybox {
            width: 92%;
            height: 2.75rem;
            margin: 0 auto;
            background: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.5px solid #f9f9f9;
            .leftcosplay {
                display: flex;
                span {
                    font-size: .6rem;
                    &:nth-of-type(2) {
                        color: red;
                    }
                }
            }
            .rightcosplay {
                display: flex;
                justify-content: center;
                align-items: center;
                .smen,
                .mwomen,
                .ocdts {
                    width: 2.25rem;
                    height: 1.15rem;
                    border: 0.5px dashed #d8d8d8;
                    margin-left: .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: .6rem;
                        color: #d8d8d8;
                    }
                }
            }
        }
    }
    .cosplay {
        background-color: #333333;
        color: #fff;
    } //性取向
    .sexselectoutbox {
        margin-bottom: .5rem;
        width: 100%;
        height: 2.75rem;
        background-color: #fff;
        .sexselectbox {
            width: 92%;
            height: 2.75rem;
            margin: 0 auto;
            background: rgba(255, 255, 255, 1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 0.5px solid #f9f9f9;
            .leftsexselect {
                display: flex;
                span {
                    font-size: .6rem;
                    &:nth-of-type(2) {
                        color: red;
                    }
                }
            }
            .rightsexselect {
                display: flex;
                justify-content: center;
                align-items: center;
                .sexmen,
                .sexwomen,
                .sexcdts {
                    width: 2.25rem;
                    height: 1.15rem;
                    border: 0.5px dashed #d8d8d8;
                    margin-left: .5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: .6rem;
                        color: #d8d8d8;
                    }
                }
            }
        }
    }
    .sexselect {
        background-color: #333333;
        color: #fff;
    }
</style>