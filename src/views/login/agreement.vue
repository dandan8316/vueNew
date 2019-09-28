<template>
    <div id="agreement">
        <!-- 1，顶部导航 -->
        <div class="nav">
            <div class="left" @click="go_left">
                <img src="../../assets/image/login/back_leftde.png" alt="">
            </div>
            <div class="center">{{$t('m.routinecode')}}</div>
            <div class="right"></div>
        </div>
        <!-- 2，套路守则内容 -->
        <h1>{{$t('m.tlszh1')}}</h1>
        <div class="statement">
          {{$t('m.tlszstatement')}}
        </div>
        <!-- 套路直播发布规则一 -->
        <div class="taluruleonenav">
          {{$t('m.tlufabu')}}
         
        </div>
        <div class="taluruleone">
            <div>
          {{$t('m.taluruleonenavone')}}
                
            </div>
            <div>
          {{$t('m.taluruleonenavtwo')}}
              
            </div>
        </div>
        <!-- 套路直播发布规则二 -->
        <div class="talurulethreenav">
          {{$t('m.talurulethreenav')}}
           
        </div>
        <div class="talurulethree">
            <div>
          {{$t('m.talurulethree')}}
              
            </div>
            <div>
               {{$t('m.talurulethreeone')}}
            </div>
        </div>
        <!-- 套路直播发布规则三 -->
        <div class="talurulethreenav">
               {{$t('m.talurulethreetwo')}}
     
        </div>
        <div class="talurulethree">
            <div>
               {{$t('m.tlsz4')}}
               
            </div>
            <div>
               {{$t('m.tlsz5')}}
                
            </div>
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
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
        }
        .right {
            font-size: .65rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-right: .75rem;
        }
    } // 2，套路守则的
    h1 {
        height: 1.7rem;
        font-size: .9rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin: 0 auto;
        margin-top: .6rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .statement {
        width: 17.2rem;
        height: 1.7rem;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        text-indent: 2em;
        margin-top: .775rem;
    } // 套路守则1
    .taluruleonenav {
        width: auto;
        height: .675rem;
        font-size: .7rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1.2rem 0 0 .75rem;
    }
    .taluruleone {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        margin: 0 auto;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: .65rem;
        }
    } // 规则二
    .talurulethreenav {
        width: auto;
        height: .675rem;
        font-size: .7rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1.325rem 0 0 .75rem;
    }
    .talurulethree {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        margin: 0 auto;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: .65rem;
        }
    } // 规则三
    .talurulethreenav {
        width: auto;
        height: .675rem;
        font-size: .7rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1.375rem 0 0 .75rem;
    }
    .talurulethree {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1rem;
        margin: 0 auto;
        margin-bottom: .5rem;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: .65rem;
        }
    }
</style>