const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

function quickSort(arr){
  //如果数组<=1,则直接返回
  if(arr.length<=1){return arr;}
  var pivotIndex=Math.floor(arr.length/2);
  //找基准，并把基准从原数组删除 
  var pivot=arr.splice(pivotIndex,1)[0];
  //定义左右数组
  var left=[];
  var right=[];

  //比基准小的放在right，比基准大的放在left
  for(var i=0;i<arr.length;i++){
      if(arr[i].hot<=pivot.hot){
          right.push(arr[i]);
      }
      else{
          left.push(arr[i]);
      }
  }
  //递归
  return quickSort(left).concat([pivot],quickSort(right));
}

function timeCalc(time) {
  var now = new Date()
    var timeDiff = parseInt((now - time) / 1000) - 28800    //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    } else {
      return time.getMonth()+1 + '-' + time.getDate();
    }
  } else if (timeDiff >= 518400) {
    return '六天前'
  } else if (timeDiff >= 432000) {
    return '五天前'
  } else if (timeDiff >= 345600) {
    return '四天前'
  } else if (timeDiff >= 259200) {
    return '三天前'
  } else if (timeDiff >= 172800) {
    return '二天前'
  } else if (timeDiff >= 86400) {
    return '一天前'
  } else if (timeDiff >= 3600) {
    return parseInt(timeDiff / 60 / 60) + '小时前'
  } else return parseInt(timeDiff / 60) + '分钟前'
  
}

module.exports = { formatTime, showBusy, showSuccess, showModel, quickSort, timeCalc }

