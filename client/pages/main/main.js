// pages/main/main.js
var config = require('./../../config.js')
var resource
const app = getApp()
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
  var timeDiff = parseInt((now - time) / 1000)     //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + time.getMonth() + time.getDate()
    } else {
      return time.getMonth()+1 + '-' + time.getDate()
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
    'user_type':0,
    'user_id': '18211949725', 
    "publish_url": "data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMSkiPgogICAgPHBhdGggZD0iTTM4IDI2SDI2djEyaC00VjI2SDEwdi00aDEyVjEwaDR2MTJoMTJ2NHoiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik0wIDBoNDh2NDhIMHoiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+",
    "myInfo_url": "data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMSkiPgogICAgPHBhdGggZD0iTTI0IDRDMTIuOTUgNCA0IDEyLjk1IDQgMjRzOC45NSAyMCAyMCAyMCAyMC04Ljk1IDIwLTIwUzM1LjA1IDQgMjQgNHptMCA2YzMuMzEgMCA2IDIuNjkgNiA2IDAgMy4zMi0yLjY5IDYtNiA2cy02LTIuNjgtNi02YzAtMy4zMSAyLjY5LTYgNi02em0wIDI4LjRjLTUuMDEgMC05LjQxLTIuNTYtMTItNi40NC4wNS0zLjk3IDguMDEtNi4xNiAxMi02LjE2czExLjk0IDIuMTkgMTIgNi4xNmMtMi41OSAzLjg4LTYuOTkgNi40NC0xMiA2LjQ0eiI+PC9wYXRoPgogICAgPHBhdGggZD0iTTAgMGg0OHY0OEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPgo8L3N2Zz4=",
    "searchIcon_url": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3RpY2tlcnNoZWV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjUzOTk5OTk2MiI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkLUNvcHktOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4LjAwMDAwMCwgLTM1MS4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPGcgaWQ9ImFwcC1iYXItKy1zdGF0dXMtYmFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMzA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9InNlYXJjaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUuMDAwMDAwLCA0NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUuNTAyLDkuNDkxIEwxNC43MDgsOS40OTEgTDE0LjQzMiw5Ljc2NSBDMTUuNDA3LDEwLjkwMiAxNiwxMi4zNzYgMTYsMTMuOTkxIEMxNiwxNy41ODEgMTMuMDksMjAuNDkxIDkuNSwyMC40OTEgQzUuOTEsMjAuNDkxIDMsMTcuNTgxIDMsMTMuOTkxIEMzLDEwLjQwMSA1LjkxLDcuNDkxIDkuNSw3LjQ5MSBDMTEuMTE1LDcuNDkxIDEyLjU4OCw4LjA4MyAxMy43MjUsOS4wNTcgTDE0LjAwMSw4Ljc4MyBMMTQuMDAxLDcuOTkxIEwxOC45OTksMyBMMjAuNDksNC40OTEgTDE1LjUwMiw5LjQ5MSBMMTUuNTAyLDkuNDkxIFogTTkuNSw5LjQ5MSBDNy4wMTQsOS40OTEgNSwxMS41MDUgNSwxMy45OTEgQzUsMTYuNDc2IDcuMDE0LDE4LjQ5MSA5LjUsMTguNDkxIEMxMS45ODUsMTguNDkxIDE0LDE2LjQ3NiAxNCwxMy45OTEgQzE0LDExLjUwNSAxMS45ODUsOS40OTEgOS41LDkuNDkxIEw5LjUsOS40OTEgWiIgaWQ9IlNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS43NDUwMDAsIDExLjc0NTUwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTEuNzQ1MDAwLCAtMTEuNzQ1NTAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    "pubUpdates_url": "data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMTY2LCAxNjYsIDE2NiwgMSkiPgogICAgPHBhdGggZD0iTTYgMzQuNVY0Mmg3LjVsMjIuMTMtMjIuMTMtNy41LTcuNUw2IDM0LjV6bTM1LjQxLTIwLjQxYy43OC0uNzguNzgtMi4wNSAwLTIuODNsLTQuNjctNC42N2MtLjc4LS43OC0yLjA1LS43OC0yLjgzIDBsLTMuNjYgMy42NiA3LjUgNy41IDMuNjYtMy42NnoiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik0wIDBoNDh2NDhIMHoiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+",
    "pubProject_url": "data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9InJnYmEoMTY2LCAxNjYsIDE2NiwgMSkiPgogICAgPHBhdGggZD0iTTAgMGg0OHY0OEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPgogICAgPHBhdGggZD0iTTI4IDRIMTJDOS43OSA0IDguMDIgNS43OSA4LjAyIDhMOCA0MGMwIDIuMjEgMS43NyA0IDMuOTggNEgzNmMyLjIxIDAgNC0xLjc5IDQtNFYxNkwyOCA0em00IDI4aC02djZoLTR2LTZoLTZ2LTRoNnYtNmg0djZoNnY0em0tNi0xNFY3bDExIDExSDI2eiI+PC9wYXRoPgo8L3N2Zz4=",
    "pullDown_url": 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTM4MjEwMDEyMjIzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMwMjUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTIzLjM2NyA3NjguMDEyYzIuMjA4LTEuMDY3IDQuMjg2LTIuNDk0IDYuMTE4LTQuMzI2bDQyNS4wNjctNDI1LjA2OGM4Ljc3Ni04Ljc3NiA4Ljc3Ni0yMy4wMDQgMC0zMS43ODJsLTY3LjUzMy02Ny41MzNjLTguNzc2LTguNzc2LTIzLjAwNC04Ljc3Ni0zMS43ODIgMGwtMzQxLjY0MyAzNDEuNjQxLTM0MS42NDMtMzQxLjY0M2MtOC43NzYtOC43NzYtMjMuMDA1LTguNzc3LTMxLjc4MiAwbC02Ny41MzMgNjcuNTMzYy04Ljc3NiA4Ljc3Ni04Ljc3NSAyMy4wMDQgMC4wMDEgMzEuNzhsMzU3LjUyOSAzNTcuNTMxYzAuMDAxIDAuMDAxIDAuMDAyIDAuMDAxIDAuMDAyIDAuMDAybDY3LjUzMyA2Ny41MzNjMC41NDkgMC41NDkgMS4xMTkgMS4wNjIgMS43MDcgMS41NDEgNi44NiA1LjU5NyAxNi4yNDkgNi41MSAyMy45NTYgMi43ODR6IiBwLWlkPSIzMDI2IiBmaWxsPSIjYmZiZmJmIj48L3BhdGg+PC9zdmc+',
    "communityHeight": 52,
    "pullDownCommunityState": true,
    "iconRotate": 0,
    "pubBoxPosition": "-100%",
    "maskOpacity": "0",
    "mask_z_index": "0",
    "isActive1": "#fff",
    "isActive2": "",
    "border1": "1px solid rgba(255, 255, 140, 1)",
    "border2": "",
    "chosenCommunity": 'rgba(0, 187, 211, 1)',
    "questionTitle": '',
    "questionInfo": '',
    "questionArray": '',
    "projectArray": '',
    "communityList": '',
    "allArray": ''
    //"hideCommunity": "block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.getUserInfo({
      success: function(res){
        console.log(res)
      }
    })
    var that = this;
    wx.request({
      method: 'get',
      url: config.service.user_community,
      data: {
        user_type:this.data.user_type,
        user_id: this.data.user_id,
        need: 'name'
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          communityList: res.data.result
        })
      },
      fail: function(){
        wx.showToast({
          title: '圈子信息加载失败',
          icon: 'none'
        })
        that.setData({
          communityList: "[{community_id: '加载失败'}]"
        })
      }
      
    })
    var that = this
    wx.request({
      url: config.service.home_page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        /*加载问题*/
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = item.project_finish.slice(0,10)
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          var result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          result = quickSort(result)
          console.log(result)
          that.setData({
            //projectArray: projectArray,
            // questionArray: questionArray,
            allArray: result
          })
        } else {
          wx.showToast({
            title: '获取动态失败',
            icon: 'none'
          })
        }
        console.log(app.globalData.userInfo)

      },
      fail: function () {

      }
    })
      // window.addEventListener('scroll',function(){
      //   that.setData({
      //     hideCommunity: 'hidden'
      //   })
      // })
   
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
    wx.stopPullDownRefresh()
    var that = this 
    wx.request({
      url: config.service.home_page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          var result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          result = quickSort(result)
        /*加载问题*/
        that.setData({
          allArray: result
        })
        } else {
          wx.showToast({
            title: '获取动态失败',
            icon: 'none'
          })
      }   
    }
  })
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

  //跳转发布问题页面
  pub_question: function () {
    wx.navigateTo({
      url: '../pub_question/pub_question',
    })
  },
  //跳转发布项目页面
  pub_project: function() {
    wx.navigateTo({
      url: '../pub_project/pub_project',
    })
  },
  chooseTag1: function(){
    this.setData({
      isActive1: "#fff",
      isActive2: "",
      border1: "1px solid rgba(255, 255, 140, 1)",
      border2: "",
    })
  },
  chooseTag2: function(){
    this.setData({
      isActive2: "#fff",
      isActive1: "",
      border2: "1px solid rgba(255, 255, 140, 1)",
      border1: "",
    })
  },
  openPubBox: function(){
    this.setData({
      pubBoxPosition: "0",
      maskOpacity: "0.3",
      mask_z_index: "2"
    })
  },
  closePubBox: function(){
    this.setData({
      pubBoxPosition: "-100%",
      maskOpacity: "0",
      mask_z_index: "0"
    })
  },
  moreCommunity: function(){
    
    var that = this
    if(that.data.pullDownCommunityState){
      that.setData({
        communityHeight: '192',       //最多三排
        pullDownCommunityState: false,
        iconRotate: 180
      })
    }else{
      that.setData({
        communityHeight: '52',
        pullDownCommunityState: true,
        iconRotate: 0
      })
    }
  },
  chooseCommunity: function(e){
    var that=this;
    wx.request({
      url: config.service.community_PQ,
      data: {
        community_id: e.target.id
      },
      success: function(res){
        console.log(res)
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          var result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          result = quickSort(result)
          /*加载问题*/
          that.setData({
            allArray: result
          })
        } else {
          wx.showToast({
            title: '获取动态失败',
            icon: 'none'
          })
        }
      }
    })
  },
  jumpToDetail: function(e){
    let id = e.target.id //获得question_id或project_id
    let dataType = e.target.dataset.type
    if(dataType == 1){
      wx.navigateTo({
        url: './../question_detail/question_detail?id=' + id
      })
    }else{
      wx.navigateTo({
        url: './../project_detail/project_detail?id=' + id
      })
    }
    
  },
  jumpToSettings: function(e){
    wx.navigateTo({
      url: './../settings/settings',
    })
  }
  
})