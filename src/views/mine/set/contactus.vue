<template>
    <div id="agreement">
        <!-- 1，顶部导航 -->
        <div class="nav">
            <div class="left" @click="go_left">
                <img src="../../../assets/image/login/back_leftde.png" alt="">
            </div>
            <div class="center">{{$t('m.contactus')}}</div>
            <div class="right"></div>
        </div>
        <!-- 2,官方LINE ID -->
        <div class="lineid">
            <span>官方LINE  ID:</span>
            <span>bdsmkf </span>
        </div>
        <!-- 3,官方的邮箱email -->
        <div class="linemail">
            <span>官方邮箱Email:</span>
            <span>bdsmkf2019@gmail.com</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            //返回上一级
            go_left() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss" scoped>
    #agreement {
        width: 100%;
        height: 100vh;
        padding-top: 2.2rem;
        background-color: #f5f5f5;
    }
    .nav {
        width: 100%;
        height: 2.2rem;
        background-color: #ffffff;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        .left {
            margin-left: .75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: .375rem;
                height: .675rem;
                background: rgba(51, 51, 51, 1);
            }
        }
        .center {
            font-size: .85rem;
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .right {
            font-size: .65rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-right: .75rem;
        }
    } // 
    .lineid {
        width: 100vw;
        height: 2.2rem;
        margin-top: .5rem;
        line-height: 2.2rem;
        background-color: #ffffff;
        span {
            font-size: .75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            &:nth-of-type(1) {
                margin-left: .8rem;
                margin-right: 1.25rem;
            }
            &:nth-of-type(2) {
                font-size: 15px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }
    } // 3,官方的邮箱
    .linemail {
        width: 100vw;
        height: 2.2rem;
        margin-top: 1px;
        line-height: 2.2rem;
        background-color: #ffffff;
        span {
            font-size: .75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            &:nth-of-type(1) {
                margin-left: .8rem;
                margin-right: .7rem;
            }
            &:nth-of-type(2) {
                font-size: 15px;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(102, 102, 102, 1);
            }
        }
    }
</style>