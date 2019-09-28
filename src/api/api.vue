<script>
  // 全局公共接口api
  // 调用  this.api.his
  // 调用  this.api.globalApi.thirdLogin
  //回放
  const his = '/av/apiu/liveRoom/his';
  //免费视频，折扣视频
  const discount = "av/apiu/freeVideo/lists";
  //公共接口api
  const globalApi = {
    // 1,登录/注册/重置密码相关
    //第三方登录,登录页logo获取等相关
    thirdLogin: '/uaa/apid/currentPlat',
    //图形验证码
    vlicode: '/uaa/apid/validCode',
    // 短信验证码
    smsCode: '/uaa/apid/user/sendSms',
    // 邮箱验证码
    emailCode:'/uaa/apid/user/sendMail',
    //手机注册/邮箱注册同一个
    mobileRegister: '/uaa/apid/user/regist',
    // 手机忘记密码/邮箱忘记密码同一个
    mobileForgetPassword:'/uaa/apid/user/passwordRecover',
    // 2,视频播放模块相关
    //进入房间
    intoRoom:'/av/apiu/liveRoom/intoRoom',
    //进入房间的试看
    intoRoomTry:'/av/apiu/liveRoom/intoRoomTry',
    //关注的接口/按照热度和时间
    subAnchors:'/av/apiu/liveRoom/subAnchors',
    //个人主页的回放
    homepage:'/av/apiu/liveRoom/owner',
    // 用户/主播个人信息
    intoRoomUserinfo:'/uaa/apiu/user/get',
    // 3,购买/支付
    // 购买视频
    purchase:'/pay/apiu/userPay/purchase',
    // 购买记录
    buyList:'/av/apiu/userPayData/buyList',
    // 获取支付列表
    queryPayType:'/pay/apiu/orderPayoption/queryPayType',
    // 4,我的mine相关
    // 获取当前用户的数据
    currentUser:'/uaa/apiu/currentUser',
    // 
    // 5,配置/字典/标签/系统消息等获取
    // 标签获取
    itemNames:'/config/apid/lookup/itemNames',
    // 系统消息的分类
    systemMyCategory:'/av/apiu/systemMsg/myCategory',
    // 系统消息的子消息
    systemMyMsgList:'/av/apiu/systemMsg/myMsgList',
    // 6,设置相关
    // 绑定手机
    bindAccount:'/uaa/apiu/user/bindAccount',
    // 登出
    loginOut:'/uaa/apiu/user/logout',
    // 7,第三方的
    // 获取七牛云的token
    qiniuUpToken:'/uaa/apiu/uptoken'


  }
  export default {
    his,
    discount,
    globalApi
  }
</script>