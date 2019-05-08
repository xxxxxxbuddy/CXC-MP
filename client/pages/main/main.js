// pages/main/main.js
var config = require('./../../config.js')
var resource
const {timeCalc, quickSort} = require('../../utils/util.js')
const app = getApp()


  //高亮搜索结果中的搜索内容
function highLight(content, result) {
    var reg = new RegExp(content, "igm");
    return result.replace(reg, "<span style='color: red;'>$&</span>");
}

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    'user_type':app.globalData.user_type,
    'user_id': app.globalData.user_id, 
    "publish_url": app.globalData.pub_url,
     close: app.globalData.close_url,
    "myInfo_url": app.globalData.me3_url,
    "searchIcon_url": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3RpY2tlcnNoZWV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjUzOTk5OTk2MiI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkLUNvcHktOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4LjAwMDAwMCwgLTM1MS4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPGcgaWQ9ImFwcC1iYXItKy1zdGF0dXMtYmFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMzA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9InNlYXJjaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUuMDAwMDAwLCA0NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUuNTAyLDkuNDkxIEwxNC43MDgsOS40OTEgTDE0LjQzMiw5Ljc2NSBDMTUuNDA3LDEwLjkwMiAxNiwxMi4zNzYgMTYsMTMuOTkxIEMxNiwxNy41ODEgMTMuMDksMjAuNDkxIDkuNSwyMC40OTEgQzUuOTEsMjAuNDkxIDMsMTcuNTgxIDMsMTMuOTkxIEMzLDEwLjQwMSA1LjkxLDcuNDkxIDkuNSw3LjQ5MSBDMTEuMTE1LDcuNDkxIDEyLjU4OCw4LjA4MyAxMy43MjUsOS4wNTcgTDE0LjAwMSw4Ljc4MyBMMTQuMDAxLDcuOTkxIEwxOC45OTksMyBMMjAuNDksNC40OTEgTDE1LjUwMiw5LjQ5MSBMMTUuNTAyLDkuNDkxIFogTTkuNSw5LjQ5MSBDNy4wMTQsOS40OTEgNSwxMS41MDUgNSwxMy45OTEgQzUsMTYuNDc2IDcuMDE0LDE4LjQ5MSA5LjUsMTguNDkxIEMxMS45ODUsMTguNDkxIDE0LDE2LjQ3NiAxNCwxMy45OTEgQzE0LDExLjUwNSAxMS45ODUsOS40OTEgOS41LDkuNDkxIEw5LjUsOS40OTEgWiIgaWQ9IlNoYXBlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS43NDUwMDAsIDExLjc0NTUwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMTEuNzQ1MDAwLCAtMTEuNzQ1NTAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
    "pubquestion_url": app.globalData.pub_q_url,
    "pubProject_url":app.globalData.pub_p_url,
    "pullDown_url": app.globalData.pullDown_url,
    "communityHeight": 58,
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
    "allArray": '',
    "searching": '',
    "searchWidth": "480rpx",
    "iconLeft": "110rpx",
    "bgColor": 'rgba(0, 187, 211, 1)',
    "questionList": {},
    "projectList": {},
    "userList": {},
    "content": ''
    //"hideCommunity": "block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    try {
      if(!wx.getStorageSync('user')) {
        wx.redirectTo({
          url: '../index/index',
        })
      }
    }catch(e) {
      wx.redirectTo({
        url: 'pages/index/index',
      })
    }
    var that = this;
    wx.request({
      method: 'get',
      url: config.service.user_community,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        need: 'name'
      },
      success: function(res){
        console.log("加载圈子信息：\n")
        console.log(res.data);
        that.setData({
          communityList: res.data
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
    //console.log(app.globalData.userInfo)
    wx.request({
      url: config.service.home_page,
      method: 'get',
      data:{
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //
        /*加载问题*/
        if (res.data.code == 1 ) {
          console.log(res.data)
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = new Date(item.project_finish.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_finish = item.project_finish.getFullYear() + "-" + item.project_finish.getMonth() + "-" + item.project_finish.getDate();
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          var result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          if (result) result = quickSort(result)
          console.log(result)
          that.setData({
            //projectArray: projectArray,
            // questionArray: questionArray,
            allArray: result
          })
        } else {
          wx.showToast({
            title: '无新动态',
            icon: 'none'
          })
        }

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
    if(this.data.isActive1) {
      this.chooseTag1()
    }else {
      this.chooseTag2();
    }
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

  /**
   * 搜索
   */


  onSearch: function(){
    this.setData({
      searching: 'none',
      searchWidth: '86%',
      iconLeft: '30rpx',
      bgColor: '#fff'
    })
  },
  quitSearch: function(){
    this.setData({
      searching: '',
      searchWidth: '480rpx',
      iconLeft: '110rpx',
      bgColor: 'rgba(0, 187, 211, 1)',
        
    })
  },
  search: function(e){
    this.setData({
      content: e.detail.value
    })
    var that = this
    console.log(e)
    // this.setData({
    //     content: e.detail.value
    // })
    wx.request({
      url: config.service.search,
        data: {
            content: e.detail.value
        },
      success: function(res){
          console.log(res)
          if(res.data.code == 0){            //code为0 表示无相关搜索结果 
            wx.showToast({
                title: '无相关搜索结果',
                icon: 'none'
            })
          }else{
            if(res.data.question.length > 0) {
              res.data.question.forEach(item => {
                item.question_title = highLight(that.data.content, item.question_title);
                item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"));
                item.question_time = timeCalc(item.question_time);
              });
            }
            if(res.data.project.length > 0) {
              res.data.project.forEach(item => {
                item.project_title = highLight(that.data.content, item.project_title);
                item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"));
                item.project_time = timeCalc(item.project_time);
              });
            }
            if(res.data.user.length > 0) {
              res.data.user.forEach(item => {
                item.user_name = highLight(that.data.content, item.user_name);
              })
            }
              that.setData({
                  content: e.detail.value,
                  questionList: res.data.question,
                  projectList: res.data.project,
                  userList: res.data.user
              })
              console.log(that.data.questionList);
          }
          }
        ,fail: function(){
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })

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
    var that =this
    wx.request({
      url: config.service.home_page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        need: 'name'
      },
      success: function (res) {
        //console.log(res.data)
        /*加载问题*/
        if (res.data.code == 1) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = new Date(item.project_finish.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_finish = item.project_finish.getFullYear() + "-" + item.project_finish.getMonth() + "-" + item.project_finish.getDate();
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
            that.setData({
                allArray: []
            })
          wx.showToast({
            title: '无新动态',
            icon: 'none'
          })
        }
      }
    })
    this.setData({
      isActive1: "#fff",
      isActive2: "",
      border1: "1px solid rgba(255, 255, 140, 1)",
      border2: "",
    })
  },
  chooseTag2: function(){
    var that = this
    wx.request({
      url: config.service.myfocus,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res.data.data)
        if (res.data.code == 1) {
          for (var item of res.data.project) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = new Date(item.project_finish.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_finish = item.project_finish.getFullYear() + "-" + item.project_finish.getMonth() + "-" + item.project_finish.getDate();
          }
          for (var item of res.data.question) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          var result = res.data.project.concat(res.data.question)
          /**按热度排序**/
          result = quickSort(result)
          console.log(result)
          that.setData({
            allArray: result
          })
        } else {
          wx.showToast({
            title: '暂无关注动态',
            icon: 'none'
          })
        }
      },
      fail: function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    })
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
        communityHeight: '58',
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
        community_id: e.target.id,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res)
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = new Date(item.project_finish.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_finish = item.project_finish.getFullYear() + "-" + item.project_finish.getMonth() + "-" + item.project_finish.getDate();
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
  chooseAllCommunity: function(){
    var that = this
    wx.request({
      url: config.service.home_page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data:{
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        /*加载问题*/
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = new Date(item.project_finish.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_finish = item.project_finish.getFullYear() + "-" + item.project_finish.getMonth() + "-" + item.project_finish.getDate();
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
         that.setData({
             allArray: []
         })
          wx.showToast({
            title: '无新动态',
            icon: 'none'
          })
        }
      }
    })
  },
  jumpToHome(e) {
    console.log(e)
    wx.navigateTo({
      url: '../home/home?userType=' + e.currentTarget.dataset.type + '&userId=' + e.currentTarget.dataset.id
    })
  },
  jumpToDetail: function(e){
    let id = e.target.dataset.id //获得question_id或project_id
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