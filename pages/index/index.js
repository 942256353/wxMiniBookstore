// index.js
const app = getApp();
import { login, register } from "../../utils/api/index"
Page({
  data: {
    refshStatus: true,
    msg: "hello",
    vid: 123,
    usernameVal: "",
    passwordVal: "",
    list: [{
      name: "标题1",
      age: 9,
      id: 1,
      tags: ["娱乐", "加精"]
    },
    {
      name: "标题2",
      age: 16,
      id: 2,
      tags: ["置顶", "国际"]
    },
    {
      name: "标题3",
      age: 22,
      id: 3,
      tags: ["民生", "民声"]
    }],
    hobbyList: [
      { id: 1, name: "篮球" },
      { id: 2, name: "足球" },
      { id: 3, name: "乒乓球" },
      { id: 4, name: "橄榄球" },
      { id: 5, name: "高尔夫球" },
      { id: 6, name: "羽毛球" },
      { id: 7, name: "画画" },
    ]
  },
  onLoad() {
    console.log("页面生命周期")
  },
  onShow: function () {
    // 页面出现在前台时执行
  },
  onReady: function () {
    console.log("小程序进入时间", app.globalData.times)
    app.getUserInfo()
    // 页面首次渲染完毕时执行
    setTimeout(() => {
      this.setData({
        msg: "2233"
      })
    }, 2000)
  },
  onHide: function () {
    // 页面从前台变为后台时执行
  },
  onUnload: function () {
    // 页面销毁时执行
  },
  //事件声明
  handClickEvent(e) {
    let { id } = e.currentTarget.dataset;
    console.log("我被点击了", id)
  },
  //点击跳转
  handClickToEvent() {
    console.log("111")
    wx.navigateTo({
      url: '/packageA/pages/news/index?id=1&type=2,&name=tom'
    })
  },
  //滚动到底部
  bindscrolltolower() {
    this.setData({
      list: this.data.list.concat(this.data.list)
    })
  },
  bindrefresherrefresh() {
    console.log("刷新")
    this.setData({
      refshStatus: false,
      list: [{
        name: "刷新标题1",
        age: 9,
        id: 1,
        tags: ["刷新娱乐", "加精"]
      },
      {
        name: "刷新标题2",
        age: 16,
        id: 2,
        tags: ["刷新置顶", "国际"]
      },
      {
        name: "刷新标题3",
        age: 22,
        id: 3,
        tags: ["刷新民生", "民声"]
      }]
    })
  },
  usernameInput(e) {
    let value = e.detail.value;
    this.setData({
      usernameVal: value
    })
  },
  passwordInput(e) {
    let value = e.detail.value;
    this.setData({
      passwordVal: value
    })
  },
  submitHandle() {
    console.log("提交的数据为：" + this.data.passwordVal)
    //注册
    // register({
    //   username: this.data.usernameVal,
    //   password: this.data.passwordVal
    // }).then(res => {
    //   console.log(res)
    //   let { code, message } = res.status;
    //   console.log(code)
    //   if (code == 200) {
    //     wx.showToast({
    //       title: message,
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   } else {
    //     console.log(message)
    //     wx.showToast({
    //       title: '注册失败',
    //       icon: 'error',
    //       duration: 2000
    //     })
    //   }
    // }).catch(err => {
    //   let str = JSON.stringify(err);
    //   wx.showToast({
    //     title: str,
    //     icon: 'error',
    //     duration: 2000
    //   })
    // })
    //登录
    login( {
      username: this.data.usernameVal,
      password: this.data.passwordVal
    }).then(res => {
      console.log(res)
      let { code, message } = res;
      console.log(code)
      if (code == 200) {
        wx.showToast({
          title: message,
          icon: 'success',
          duration: 2000
        })
      } else {
        console.log(message)
        wx.showToast({
          title: '注册失败',
          icon: 'error',
          duration: 2000
        })
      }
    }).catch(err => {
      let str = JSON.stringify(err);
      wx.showToast({
        title: str,
        icon: 'error',
        duration: 2000
      })
    })
  },
  radioChange(e) {
    console.log("单选性别", e.detail.value)
  },
  checkboxChange(e) {
    console.log("多选爱好", e.detail.value)
  },
})




