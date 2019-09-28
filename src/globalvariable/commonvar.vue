<script>
  // 公共常量存储
  // edit.vue文件中的
  // 1，七牛云文件上传的接口地址
  const qiniuserverSrc = 'http://up-z1.qiniu.com/';
  // 2，图片上传的后台返回的图片url基地址
  const qiniuimgSrc = 'http://qiniufile.taolusm.com/';
  // 五折活动的七牛云的图片基地址
  const qiniumainSrc = 'http://qiniufile.taolusm.com/';
  // 3，是否开启活动
  const isshownewactive = true;
  const log = {
    name: "xiaoming",
    heh: "*****"
  }
  export default {
    qiniuserverSrc,
    qiniuimgSrc,
    isshownewactive,
    qiniumainSrc,
    log
  }
  // 调用  this.commonvar.qiniuserverSrc
  // 调用  this.commonvar.log.name
</script>