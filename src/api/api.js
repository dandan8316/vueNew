// 全局公共接口函数  
//外部调用this.commonMethods.abctest()
const apiMethods = {
    // 1,无参
    abctest: () => {
        // console.log("hhaha----++++");
    },
    // 2,少参
    gethehe: (data, hao) => {
        // console.log(data)
        // console.log(hao)
    },
    // 3,多参任意参
    two: (...vars) => {
        let len = vars.length;
        for (let i = 0; i < len; i++) {
            // i是索引 从0开始
            // vars[i]是对应的值
            // console.log(vars[0]);
            // console.log("调用参数" + i + "是:" + vars[i] + "\n");
        }
    },











};

export default apiMethods