var myFn = require('/request.js');
var common = require('/commons.js');
let appConfig = require("/AppConfig")["default"];
module.exports = {

  getConfig: function (callback) {
    myFn.invoke({
      type: "GET",
      url: '/config',
      data: {},
      async: false,
      success: function (result) {
        callback(result.data);

      },
      error: function (result) {

      }
    });
  },
  getCurrentTime: function (callback) {
    myFn.invoke({
      type: "GET",
      url: '/getCurrentTime',
      data: {},
      async: false,
      success: function (result) {
        if (1 == result.resultCode) {
          callback(result.data);
        }
      },
      error: function (result) {
      }
    });
  },
  sendOnline: function () {
    XmppSdk.send($pres().tree());
  },
  login: function (telephone, password, callback) {

    myFn.invoke({
      type: "GET",
      url: '/user/login',
      data: {
        telephone: telephone,
        password: password
      },
      async: false,
      success: function (result) {
        callback(result.data);

      },
      error: function (result) {
      }
    });
  },
  getUser: function (userId, callback, isHttp) {

    myFn.invoke({
      url: '/user/get',
      data: {
        userId: userId
      },
      async: false,
      success: function (result) {
        if (1 == result.resultCode) {
          // DataMap.userMap[userId]=result.data;
          callback(result.data);
        }
      },
      error: function (result) {
      }
    });
  },
  getMyItemBank:function(){
    myFn.invoke({
      url: '/user/get',
      data: {
        userId: userId
      },
      async: false,
      success: function (result) {
        if (1 == result.resultCode) {
          // DataMap.userMap[userId]=result.data;
          callback(result.data);
        }
      },
      error: function (result) {
      }
    });
  }
}






