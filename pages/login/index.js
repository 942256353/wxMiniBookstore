
/**
 * index.js
*/
import { registAPI, loginAPI } from "../../utils/api/login"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "", //用户名符合手机号或者邮箱规则
    password: "", //以字符或_开头,数字/字母 6-10位
    loginStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  setInputVal(e) {
    console.log(e)
    let key = e.currentTarget.dataset.key;
    let value = e.detail.value;
    let obj = {};
    obj[key] = value
    this.setData(obj)
  },
  //按钮点击
  handleLR() {
    //正则验证
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;  //手机
    const emailReg = /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+(\.[0-9a-zA-Z_]+)+$/; //邮箱 xxx@xxx.a.c.cn/com
    const passwordReg = /^[a-zA-Z_][0-9a-zA-Z_]{5,9}$/; //邮箱
    const u = this.data.username;
    const p = this.data.password;
    if(!phoneReg.test(u)&&!emailReg.test(u)){
      wx.showToast({
        title:'请输入符合规则的用户名',
        icon:'none'
      })
      return
    }
    if(!passwordReg.test(p)){
      wx.showToast({
        title:'请输入符合规则的密码',
        icon:'none'
      })
      return
    }
    const params = {
      userName: this.data.username,
      userPassword: this.data.password
    }
    if (this.data.loginStatus) {
      this.loginFun(params);
    } else {
      this.registFun(params);
    }
  },
  //登录
  loginFun(params) {
    loginAPI(params).then(res => {
      //跳转首页
      console.log(res)
      wx.setStorageSync('loginInfo', JSON.stringify(res.body||{}));
      wx.reLaunch({
        url: '/pages/index/index'
      })
    })
  },
  //注册
  registFun(params) {
    registAPI(params).then(res => {
      this.setData({
        loginStatus: true
      })
    })
  },
  //注册
  handleSwitchStatus() {
    this.setData({
      loginStatus: !this.data.loginStatus
    })
  },
  // //获取用户手机号
  // getPhone(e){
  //   console.log("获取手机号结果",e)
  // },
  // //获取用户
  // getUserInfo(e){
  //   console.log("获取信息结果",e)
  // }
})