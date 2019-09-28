// 全局过滤器

//1,时间处理hotcount超过1000转换成k,10000转成w
const numadd = function (value) {
    if (value < 1000) {
        return value;
    } else if (value >= 1000 && value < 10000) {
        return Math.floor(value / 1000) + 'k'
    } else if (value >= 10000) {
        return Math.floor(value / 10000) + 'w'
    }
}

// 2,时间处理 将秒数转成数字时间
const numsecond = function (value) {
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    if (secondTime < 10) {
        var result = "0" + "" + parseInt(secondTime) + "";
    } else {
        var result = "" + parseInt(secondTime) + "";
    }
    if (minuteTime > 0) {
        if (minuteTime < 10) {
            result = "0" + "" + parseInt(minuteTime) + ":" + result;
        } else {
            result = "" + parseInt(minuteTime) + ":" + result;
        }
    }
    if (hourTime > 0) {
        if (hourTime < 10) {
            result = "0" + "" + parseInt(hourTime) + ":" + result;
        } else {
            result = "" + parseInt(hourTime) + ":" + result;
        }
    }
    return result;

}

//Date对象转化为yyyy-MM-dd格式
// const numadd = function (value) {

const datatranstion = function dateFormat(dateObj) {
    var year = dateObj.getFullYear();
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
    // return year + "/" + month + "/" + day;
}

export default {
    numadd,
    numsecond,
    datatranstion
}
// 使用  {{oldValue | newValue}}
// 使用  {{oldValue | numadd}}