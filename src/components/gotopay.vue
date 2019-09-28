<template>
    <div>
        <!-- 金币不足跳转到购买的页面-->
        <van-popup v-model="isshowtopay" :close-on-click-overlay="false" :lazy-render="false" @click-overlay="sonclosepaybox">
            <div class="buybox2">
                <div class="top">
                    <span>{{$t('m.goldover')}}</span>
                </div>
                <!-- <div class="buypayit" @click="videoconfirmpay"> -->
                <div class="buypayit" @click="sontopay">
                    <span>{{$t('m.gopay')}}</span>
                </div>
                <div class="backgo" @click="closepaybox">
                    <span>{{$t('m.back')}}</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name: "gotopay",
        props: {
            gotopay: Boolean,
        },
        data() {
            return {
                isshowtopay: this.gotopay
            }
        },
        watch: {
            deep: true,
            gotopay: function(newValue, oldValue) {
                this.isshowtopay = newValue
            },
        },
        methods: {
            //关闭盒子
            closepaybox() {
                this.$emit("topayclosepay", false);
            },
            //遮罩
            sonclosepaybox() {
                this.$emit("topayclosepay", false);
            },
            //去充值
            sontopay(){
                this.closepaybox()
                this.$router.push({
                    path:'/mygold',
                    query:{
                        routerPath:this.$route.path
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/popup.scss';
</style>