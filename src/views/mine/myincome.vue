<template>
    <div id="joinmember">
        <!-- 顶部的返回按钮 -->
        <section class="nav">
            <van-nav-bar title="会员套餐" fixed left-arrow @click-left="onClickLeft" /></van-nav-bar>
        </section>
        <!-- 现金引收益 -->
        <div class="cashincome">
            <div class="top">现金引收益</div>
            <div class="money">
                <span>¥</span>
                <span>100000.00</span>
            </div>
        </div>
        <!-- 本年度累积收益 -->
        <div class="Cumincome">
            <div class="top">本年度累积收益</div>
            <div class="money">
                <span>¥</span>
                <span>50000.08</span>
            </div>
        </div>
        <!-- 收益说明 -->
        <div class="Incomestatement">
            <p>
                収益の説明：
            </p>
            <p> 収益の説直ちに現金にする直ちに現金にする直ちに現金にする直ちに現金にする直ちに現金にする</p>
        </div>
        <!-- 立即赚钱 -->
        <div class="immediately">
            <span>
                直ちに現金にする
                </span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        updated() {},
        methods: {
            // 1,返回上一级
            onClickLeft() {
                this.$router.go(-1)
            },
        },
    }
</script>
<style lang="scss" scoped>
    .nav {
        width: 100%;
        height: 2.3rem;
    } // 1，会员套餐
    .van-nav-bar {
        position: fixed;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        height: 2.3rem;
        line-height: 2.3rem;
        background-color: #fff;
    }
    .van-nav-bar__left {
        left: .75rem
    }
    .van-nav-bar__left,
    .van-nav-bar__right {
        bottom: 0;
        font-size: .7rem;
        position: absolute;
    }
    .van-nav-bar .van-icon {
        color: #333333;
        vertical-align: middle;
    }
    .van-nav-bar__arrow {
        min-width: 1em;
        font-size: .8rem;
    }
    .van-nav-bar__title {
        font-size: .85rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 2.3rem;
    } // 
    #joinmember {
        background-color: #F5F5F5;
        width: 100%;
        height: 100vh;
    } // 广告的
    // 现金引收益
    .cashincome {
        margin-top: .5rem;
        width: 100%;
        height: 6.125rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-bottom: .05rem solid #cccccc;
        .top {
            position: absolute;
            left: .5rem;
            top: .5rem;
            font-size: .75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
        }
        .money {
            span {
                font-size: 1.2rem;
                font-family: PingFang-SC-Bold;
                font-weight: bold;
                color: rgba(255, 96, 0, 1);
            }
        }
    } // 本年度累积收益
    .Cumincome {
        width: 100%;
        height: 6.125rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        .top {
            position: absolute;
            left: .5rem;
            top: .5rem;
            font-size: .75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
        }
        .money {
            span {
                font-size: 1.2rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
            }
        }
    } // 收益说明
    .Incomestatement {
        width: 17.225rem;
        height: auto;
        margin: 0 auto;
        margin-top: .7rem;
        font-size: .55rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    } // 立即赚钱
    .immediately {
        width: 15rem;
        height: 2rem;
        background: rgba(51, 51, 51, 1);
        border-radius: .25rem;
        margin: 0 auto;
        margin-top: 5.05rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            font-size: .85rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(245, 245, 245, 1);
        }
    }
</style>