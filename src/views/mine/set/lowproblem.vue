<template>
    <div id="agreement">
        <!-- 1，顶部导航 -->
        <div class="nav">
            <div class="left" @click="go_left">
                <img src="../../../assets/image/login/back_leftde.png" alt="">
            </div>
            <div class="center">{{$t('m.commonproblem')}}</div>
            <div class="right"></div>
        </div>
        <!-- 常见问题板块内容区域 -->
        <!-- 1, 问题一-->
        <div class="taluruleonenav">
            {{$t('m.problemone')}}
        </div>
        <div class="taluruleone">
            <div>
            {{$t('m.problemquestone')}}
                
            </div>
        </div>
        <!-- 2，问题二 -->
        <div class="taluruletwonav">
            {{$t('m.problemtwo')}}
        </div>
        <div class="taluruletwo">
            <div>
            {{$t('m.problemquesttwo')}}
               
            </div>
        </div>
        <!-- 3,问题三 -->
        <div class="talurulethreenav">
            {{$t('m.problemthree')}}
            
        </div>
        <div class="talurulethree">
            <div>
            {{$t('m.problemquestthree')}}
                
            </div>
        </div>
        <!-- 4， -->
        <div class="talurulethreenav">
            {{$t('m.problemfour')}}
            
        </div>
        <div class="talurulethree">
            <div>
            {{$t('m.problemquestfour')}}
            </div>
        </div>
        <!-- 5 -->
        <div class="talurulethreenav">
           {{$t('m.problemfive')}}
        </div>
        <div class="talurulethree">
            <div>
                {{$t('m.problemquestfive')}}
            </div>
        </div>
        <!-- 6 -->
        <div class="talurulethreenav">
                {{$t('m.problemsix')}}
          
        </div>
        <div class="talurulethree">
            <div>
          {{$t('m.problemquestsix')}}
            </div>
        </div>
        <!-- 7 -->
        <div class="talurulethreenav">
          {{$t('m.problemseven')}}
          
        </div>
        <div class="talurulethree">
            <div>
          {{$t('m.problemquestseven')}}
            
            </div>
        </div>
        <!-- 8 -->
        <div class="talurulethreenav">
          {{$t('m.problemeight')}}
            
        </div>
        <div class="talurulethree">
            <div>
          {{$t('m.problemquesteight')}}
      
                
                   

            </div>
            <div>
          {{$t('m.problemquesteighttwo')}}
             
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
        height: 100%;
        background-color: #f5f5f5;
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
    } // 2，主要区域的
    // 问题一
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
        margin: 1.025rem 0 0 .828rem;
    } // 问题一答
    .taluruleone {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        margin: 0 auto;
        margin-top: .2rem;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
     .talurulethreenav {
        width: auto;
        height: .675rem;
        font-size: .7rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin:1rem .5rem 0 .75rem;
    }
    .talurulethree {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        margin: 0 auto;
        margin-top: 1rem;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    
    
    // 问题二
    .taluruletwonav {
        width: auto;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 1rem .5rem 0 .75rem;
    }
    .taluruletwo {
        width: 17.2rem;
        height: auto;
        font-size: .7rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 1.2rem;
        margin: 0 auto;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }

</style>