var config = require('./../../config.js')
var id
var dataType
function timeCalc(time) {
  var now = new Date()
  var timeDiff = parseInt((now - time) / 1000)     //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + time.getMonth() + time.getDate()
    } else {
      return time.getMonth() + 1 + '-' + time.getDate()
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



Page({

  /**
   * 页面的初始数据
   */
  data: {
    "question": '',
    avatar_url: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAxNDEsIDI2LCAxKSI+CiAgICA8cGF0aCBkPSJNMjQgNEMxMi45NSA0IDQgMTIuOTUgNCAyNHM4Ljk1IDIwIDIwIDIwIDIwLTguOTUgMjAtMjBTMzUuMDUgNCAyNCA0em0wIDZjMy4zMSAwIDYgMi42OSA2IDYgMCAzLjMyLTIuNjkgNi02IDZzLTYtMi42OC02LTZjMC0zLjMxIDIuNjktNiA2LTZ6bTAgMjguNGMtNS4wMSAwLTkuNDEtMi41Ni0xMi02LjQ0LjA1LTMuOTcgOC4wMS02LjE2IDEyLTYuMTZzMTEuOTQgMi4xOSAxMiA2LjE2Yy0yLjU5IDMuODgtNi45OSA2LjQ0LTEyIDYuNDR6Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==',
    answer_url: 'data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMTg3LCAxODcsIDE4NywgMSkiPgogICAgPHBhdGggZD0iTTM4IDZIMTBjLTIuMjEgMC00IDEuNzktNCA0djI4YzAgMi4yMSAxLjc5IDQgNCA0aDI4YzIuMjEgMCA0LTEuNzkgNC00VjEwYzAtMi4yMS0xLjc5LTQtNC00ek0xOCAzNGgtNFYyMGg0djE0em04IDBoLTRWMTRoNHYyMHptOCAwaC00di04aDR2OHoiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik0wIDBoNDh2NDhIMHoiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+',
    back_url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMTMgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Q2hldnJvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQmFycy9OYXZpZ2F0aW9uLUJhci9fL0xpZ2h0L0xlZnQtQ29tYmluYXRpb25zL0JhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC4wMDAwMDAsIC0xMS4wMDAwMDApIiBmaWxsPSIjMDA3QUZGIj4KICAgICAgICAgICAgPGcgaWQ9IkJhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuMDM3MTM0OSwyMS41ODI2NjczIEwwLjc5MjE1MTg1MiwxMi40NDU4MDQyIEMwLjQwMjYxNjA0OSwxMi4wNjExODg4IDAuNDAyNjE2MDQ5LDExLjQzOTgxMDIgMC43OTIxNTE4NTIsMTEuMDU0MTk1OCBMMTAuMDM3MTM0OSwxLjkxNzMzMjY3IEMxMC41OTk0NjQ4LDEuMzYwODg5MTEgMTEuNTE0Mzc0NSwxLjM2MDg4OTExIDEyLjA3NzcwMzIsMS45MTczMzI2NyBDMTIuNjQwMDMzMSwyLjQ3Mzc3NjIyIDEyLjY0MDAzMzEsMy4zNzY4NzMxMyAxMi4wNzc3MDMyLDMuOTMzMzE2NjggTDQuMTY5MTI3NjIsMTEuNzUwNDk5NSBMMTIuMDc3NzAzMiwxOS41NjU2ODQzIEMxMi42NDAwMzMxLDIwLjEyMzEyNjkgMTIuNjQwMDMzMSwyMS4wMjYyMjM4IDEyLjA3NzcwMzIsMjEuNTgyNjY3MyBDMTEuNTE0Mzc0NSwyMi4xMzkxMTA5IDEwLjU5OTQ2NDgsMjIuMTM5MTEwOSAxMC4wMzcxMzQ5LDIxLjU4MjY2NzMiIGlkPSJDaGV2cm9uIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
    userName: '',
    pubTime: '',
    questionInfo: '',
    answerNum: '',
    questionTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     id=options.id
     dataType=options.type
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url:config.service.detail,
      method: 'get',
      data: {object_id: id,
             object_type: dataType 
      },
      success: function(res){
        let result = res.data.result[0]
        if(!result){ 
          wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
        }
        that.setData({
          questionTitle: result.question_title,
          userName: result.user_id,
          pubTime: timeCalc(new Date(result.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))),
          questionInfo: result.question_info,
          answerNum: result.answernum
        })
      }
    })
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})