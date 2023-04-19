// app.js
App({
    onLaunch(options){
        console.log("小程序生命周期初始化",options)
    },
    onShow (options) {
      // Do something when show
      console.log("展示",options)
      this.globalData.times =+ new Date()
    },
    onHide () {
      // Do something when hide.
      console.log("隐藏")
    },
    onError (msg) {
      console.log(msg)
    },
    globalData:{
      // baseUrl:"http://xiaoxie.free.idcfengye.com/api"
      baseUrl:"http://127.0.0.1:612"
    },
    getUserInfo(){
      console.log("全局方法")
    }
})
