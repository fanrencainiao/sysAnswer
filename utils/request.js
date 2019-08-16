
let appConfig = require("AppConfig")["default"];
let common = require('commons.js');
// let utilMd5 = require('md5.js');

module.exports = {
  invoke: function (obj) {
    var type = "GET";
    var async = false;
    if (obj.type) {
      type = obj.type;
    }
    if (obj.async) {
      async = obj.async;
    }
    // if(!obj.data.secret){
    // 	obj.data=this.createCommApiSecret(obj.data);
    // }
    var params = {
      method: type,
      async: false,
      url: obj.url,
      data: obj.data,
      dataType: 'json',

      success: function (result) {
        result = result.data;
        if (1030101 == result.resultCode) {
          //缺少访问令牌
          console.log("===> " + obj.url + " >> " + result.resultMsg);
          wx.showToast({
            title: result.resultMsg
          });
        } else if (1030102 == result.resultCode) {
          //访问令牌过期
          console.log("===> " + obj.url + " >> " + result.resultMsg);
          wx.showToast({
            title: result.resultMsg
          });

        } else if (1010101 == result.resultCode) {
          console.log("===> " + obj.url + " >> " + result.resultMsg);
        } else if (1 != result.resultCode && !isNil(result.resultMsg)) {
          wx.showToast({
            title: result.resultMsg
          });
          return;
        } else if (result.resultMsg != "") {
          // wx.showToast({
          //       title: result.resultMsg
          //     });
        }
        obj.success(result);
      },
      error: function (result) {
        wx.showToast({
          title: result.resultMsg
        });

      },
      complete: function () {
      }
    };
 
    params.url = appConfig.apiUrl + params.url;
 

    wx.request(params);
  },
  


  isContains: function (str, substr) {
    return str.indexOf(substr) >= 0;
  },
  isNil: function (s) {
    return isNil(s);
  },
  notNull: function (s) {
    return !isNil(s);
  },
  //截取指定长度的字符串 text:文本  length ：长度
  getText: function (text, length) {
    if (this.isNil(text))
      return " ";
    if (!length)
      length = 15;
    if (text.length <= length)
      return text;
    text = text.substring(0, length) + "...";
    return text;

  },
  strToJson: function (str) {
    return eval("(" + str + ")");
  },

  randomUUID: function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = new Array(36), rnd = 0, r;
    for (var i = 0; i < 36; i++) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        uuid[i] = '-';
      } else if (i == 14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02)
          rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('').replace(/-/gm, '').toLowerCase();
  },
 

 
  parseContent: function (content) {
    var emojlKeys = new Array();
    if (this.isNil(content))
      return content;
    var s = content;
    var fromIndex = 0;
    while (fromIndex != -1) {
      fromIndex = s.indexOf("[", fromIndex);
      if (fromIndex == -1)
        break;
      else {
        var stop = s.indexOf("]", fromIndex);
        if (stop == -1)
          break;
        else {
          var emojlKey = s.substring(fromIndex, stop + 1);
          emojlKeys.push(emojlKey);
          fromIndex = fromIndex + 1;
        }
      }
    }
  }
} 