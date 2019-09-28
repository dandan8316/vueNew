// 全局公共方法     复杂形式
//调用this.getlang()
exports.install = function (Vue, options) {

    Vue.prototype.getlang = function () {
        var lang = window.localStorage.userlang;
        if (!lang) {
            if (window.localStorage.getItem("lang")) {
                lang = window.localStorage.getItem("lang")
            } else {
                lang = store.state.lang;
            }
        }
        if (lang == 'zh') {
            lang = 'CN';
        }
        return lang;
    };

};