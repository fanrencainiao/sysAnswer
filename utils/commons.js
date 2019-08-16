
var NetWork = {
  online: true,
  //监听网络状态
  networkListener: function (onCallBack, offCallBack) {
    window.addEventListener('online', function () {
      console.log("===========网络链接了.....");
      NetWork.online = true;
      onCallBack();
    });
    window.addEventListener('offline', function () {
      console.log("=======网络断开了.....");
      NetWork.online = false;
      offCallBack();
    });
  }
}

var Utils = {
  regText: "(\\s|\\n|<br>|^)(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?(&|&amp;)//=]*)",
  isUrl: function (e) {
    return new RegExp(this.regText, "i").test(e)
  },
  htmlDecode: function (e) {
    return e && 0 != e.length ? e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : ""
  },
  hrefEncode: function (e) {
    var a = e.match(/&lt;a href=(?:'|").*?(?:'|").*?&gt;.*?&lt;\/a&gt;/g);
    if (a) {
      for (var n, i, o = 0, r = a.length; o < r; ++o)
        n = /&lt;a href=(?:'|")(.*?)(?:'|").*?&gt;.*?&lt;\/a&gt;/.exec(a[o]),
          n && n[1] && (i = n[1], this.isUrl(i) && (e = e.replace(n[0], this.htmlDecode(n[0])).replace(n[1], n[1])));
      return e
    }
    return e.replace(new RegExp(this.regText, "ig"), function () {
      return '<a target="_blank" href="' + arguments[0].replace(/^(\s|\n)/, "") + '">' + arguments[0] + "</a> "
    })
  },

  /*根据对象的属性 排序方法
   obj  要排序的对象集合
      var list= {a:{id:5,name:a},b:{id:2,name:a},c:{id:8,name:c},d:{id:6,name:d}}
   key 需要排序的属性  
   key2  key 的值为 0 就用 key2 排序

   desc  1 :升序  -1 降序
   举例 objSort(list,"id",1)
   
   返回 [b,a,d,c]
*/
  objSort: function (obj, key, desc, key2) {
    var arr = Object.keys(obj);

    return arr.sort(function (a, b) {
      if (0 == obj[a][key]) {
        if (1 == desc)
          return (obj[a][key2] - obj[b][key2]);
        else
          return -(obj[a][key2] - obj[b][key2]);
      }
      if (1 == desc)
        return (obj[a][key] - obj[b][key]);
      else
        return -(obj[a][key] - obj[b][key]);
    });

  },

  removeArrValue: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }


  }



}



String.prototype.replaceAll = function (s1, s2) {

  return this.replace(new RegExp(s1, "gm"), s2);
}


//判断字符串已什么开头的
String.prototype.startWith = function (compareStr) {
  return this.indexOf(compareStr) == 0;
}

String.prototype.endWith = function (str) {
  if (str == null || str == "" || this.length == 0 || str.length > this.length) {
    return false;
  }
  if (str == this.substring(this.length - str.length)) {
    return true;
  } else {
    return false;
  }
};

var startWith = function (str, compareStr) {
  return str.indexOf(compareStr) == 0;
}
var endWith = function (that, str) {
  if (str == null || str == "" || that.length == 0 || str.length > that.length) {
    return false;
  }
  if (str == that.substring(that.length - str.length)) {
    return true;
  } else {
    return false;
  }
};
var replaceAll = function (that, s1, s2) {

  return that.replace(new RegExp(s1, "gm"), s2);
}





function getCurrentSeconds() {
  return Math.round(new Date().getTime() / 1000);
}
/*Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		// month
		"d+" : this.getDate(),
		// day
		"h+" : this.getHours(),
		// hour
		"m+" : this.getMinutes(),
		// minute
		"s+" : this.getSeconds(),
		// second
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		// quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format) || /(Y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};*/

// 时间统一函数
//type  1 上午10:00  否则 10:00   
function getTimeText(argument, type) {
  if (0 == argument)
    return "";
  var timeDesc = "";
  var timeSend = new Date(argument * 1000);//*1000
  var nowTime = new Date();
  var delaySeconds = ((nowTime.getTime()) - timeSend.getTime()) / 1000;
  if (delaySeconds < 65) {
    if (type) {
      timeDesc = "刚刚";
    } else {
      timeDesc = timeSend.format("hh:mm");
    }
  } else if (delaySeconds < 60 * 30) {
    if (type) {
      timeDesc = parseInt(delaySeconds / 60) + " 分钟前";
    } else {
      timeDesc = timeSend.format("hh:mm");
    }
  } else if (delaySeconds < 60 * 60 * 24) {
    if (nowTime.getDay() - timeSend.getDay() == 0) {
      //今天
      if (type) {
        timeDesc = (timeSend.getHours() < 13 ? "上午" : "下午") + timeSend.format("hh:mm");
      } else {
        timeDesc = timeSend.format("hh:mm");
      }
    } else {
      //昨天
      timeDesc = "昨天" + timeSend.format("hh:mm");
      // if(type){
      // 	timeDesc=(timeSend.getHours()<13 ? "昨天上午":"昨天下午")+timeSend.format("hh:mm");
      // }else{
      // 	 timeDesc="昨天"+timeSend.format("hh:mm");
      // }
    }
  } else {
    if (type) {
      timeDesc = timeSend.format("MM-dd hh:mm");
    } else {
      timeDesc = timeSend.format("MM-dd hh:mm");
    }
  }

  return timeDesc;


}




function obj2string(o) {
  var r = [];
  if (null == o)
    return 'null';
  if (typeof o == "string") {
    return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
  }
  if (typeof o == "object") {
    if (!o.sort) {
      for (var i in o) {
        r.push(i + ":" + obj2string(o[i]));
      }
      if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
        r.push("toString:" + o.toString.toString());
      }
      r = "{" + r.join() + "}";
    } else {
      for (var i = 0; i < o.length; i++) {
        r.push(obj2string(o[i]))
      }
      r = "[" + r.join() + "]";
    }
    return r;
  }
  return o.toString();
}










module.exports = {
  getCurrentSeconds: getCurrentSeconds,
  getTimeText: getTimeText,
  startWith: startWith,
  endWith: endWith,
  replaceAll: replaceAll,
  shikuLog: function (obj) {
    //log 打印
    console.log("shikuLog " + obj);
  }
}



//时间转换
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}