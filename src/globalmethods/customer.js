// 全局公共方法 简写形式

// 方法的调用   this.$方法名()
const customerMethods = {
    //1,点击用户信息进入用户的个人主页
    toUserInfo(id, headpic, descs, path) {
        window.localStorage.setItem("frompath", path)
        window.localStorage.setItem("findUserId", id)
        window.localStorage.setItem("headpic", headpic)
        this.$router.push({
            path: "/topersonzhubo",
            query: {
                findUserId: id
            }
        });
    },
    // 获取浏览器参数
     GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
      }
    

}




export default customerMethods;