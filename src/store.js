import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var isProd = false;
// var isProd=true;
export default new Vuex.Store({
    state: {
        //存储token
        // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
        isProd: isProd,
        // baseUrl: isProd ? 'https://api.cnkink.com' : "https://apidev.taolu.biz",
        // 新的测试地址
        baseUrl: isProd ? 'https://api.cnkink.com' : "https://testwapapi.desew.com/",
        baseAuth: isProd ? 'Basic d2ViX2FwcDp0bF91YSpzejIwMTkjMTIz' : 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
        accountType: {LOGIN: 1, EMAIL: 2, MOBILE: 3, WECHAT: 4, QQ: 5},
        tendencyType: {MAIL: 1, FEMAIL: 2, CDTS: 5, OTHER: 9},
        liveType: {VIDEO: 1, AUDIO: 2},
        liveStatus: {LIVE: 1, HIS: 2, OVER: 2, DELETE: 3, USER_DELETE: 4},
        userType: {USER: 1, ANCHOR: 2, ASSISTANT: 4, TOURIST: 7, MANAGE: 8, ADMIN: 9},
        sexType: {MAIL: 1, FEMAIL: 2, CDTS: 5, OTHER: 9},
        sexRole: {SLAVE: 's', MASTER: 'm', OTHER: 'o'},
        SOURCE_TYPE: 'H5',
        lang: 'CN',
        //直播间的活动开启的按钮
        isshownewactive:false,
        //会员充值开启的按钮
        isjoinmember:true,
        //我的收益开启的按钮
        myincome:false,
        //试看的按钮的开关
        isvideotrysee:false,
        // 套路守则的开关
        routinecode:true,
        vipType: {vip:"vip", none:"none"},
        //baseAuth: 'Basic d2ViX2FwcDp0bF91YSpzejIwMTkjMTIz'
        //this.$store.state.baseUrl
    },
    mutations: {
        // 修改token，并将token存入localStorage
        // changeLogin (state, user) {
        //   state.Authorization = user.Authorization;
        //   localStorage.setItem('Authorization', user.Authorization);
        // }
    },
    actions: {

    }
});