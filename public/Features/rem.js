// 基准大小
const baseSize = 20
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 375
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
  if(document.documentElement.clientWidth>750){
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2.73)) + 'px'
  }
  if(document.documentElement.clientWidth>1024){
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 5.12)) + 'px'
  }
  if(document.documentElement.clientWidth>1920){
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 7.94)) + 'px'
  }
  if(document.documentElement.clientWidth>2980){
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 13.33)) + 'px'
  }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}