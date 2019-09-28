<template>
    <div>
        <van-popup v-model="isshowtour" :close-on-click-overlay="true" :lazy-render="false" :round="true" id="tourpup" @click-overlay="clickOverlay">
            <div class="buybox2tourst">
                <div class="top"><span>{{$t('m.torlogin')}}</span></div>
                <img src="../assets/image/icon/biaoqianlan_icon_me02@3x.png" class="toplive" id="buybox3">
                <div class="buypayit" @click="videoconfirmpayone">
                    <!-- <div class="buypayit"> -->
                    <span>{{$t('m.torstloginregist')}}</span>
                </div>
                <div class="backgo" @click="videocancelpaytwo">
                    <van-icon name="cross" />
                </div>
                <div class="third_login">
                    <div></div>
                    <span>{{$t('m.Thirdpartylogin')}}</span>
                    <div></div>
                </div>
                <div class="linelogin" @click="linelogin">
                    <!-- <div class="linelogin"> -->
                    <img src="https://myapp.smlvs.com/line.png" alt="">
                </div>
                <div class="linedes">
                    LINE
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    export default {
        name: "touristbox",
        props: {
            isshowtourlogin: Boolean,
        },
        data() {
            return {
                isshowtour: this.isshowtourlogin,
            }
        },
        watch: {
            deep: true,
            //未登录
            isshowtourlogin: function(newValue, oldValue) {
                this.isshowtour = newValue;
            },
        },
        created() {
            // console.log(this.isshowtourlogin, "---------");
        },
        methods: {
            //关闭按钮和遮罩层
            //1,关闭盒子
            videocancelpaytwo() {
                this.$emit("closetourstbox", false);
            },
            //2,关闭遮罩层
            clickOverlay() {
                this.$emit("closetourstbox", false);
            },
            // 3,点击登录去登录页
            // 游客登录的
            videoconfirmpayone() {
                this.videocancelpaytwo()
                this.$router.replace({
                    path: '/login'
                })
            },
            //4,line登录
            linelogin() {
                // 先关闭盒子
                this.videocancelpaytwo()
                window.location.href = this.$store.state.baseUrl + "/uaa/apid/line/login?toPage=index&loginType=" + "line";
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/popup.scss';
</style>