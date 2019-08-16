//index.js
//获取应用实例
const app = getApp()
let mySdk = require('../../utils/MYSDK.js');
let utilMd5 = require('../../utils/md5.js');
Page({
  data: {
    motto: '秦时明月汉时关',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("进入")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMyItemBank: function (e) {
    let me = this;
    // detail
    var telephone = e.detail.value.telephone;
    // realname
    var password = e.detail.value.password;

    telephone = utilMd5.hexMD5(telephone);
    password = utilMd5.hexMD5(password);

    console.log("telephone " + telephone);
    mySdk.getMyItemBank(telephone, password, function (result) {
      // me.onLogin(result);
      wx.redirectTo({
        url: "../load/load"
      });
    });
  }
})
