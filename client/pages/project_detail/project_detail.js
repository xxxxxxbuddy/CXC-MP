var config = require("./../../config.js")
const app=getApp();
const {timeCalc} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_url: app.globalData.default_url,
    answer_url:app.globalData.answernum_url,
    back_url: app.globalData.back_url,
    avatar_icon: app.globalData.default_url,
    comment_icon: app.globalData.comment_url,
    like_icon: app.globalData.praise_url,
    navH: app.globalData.navHeight,
    maskOpacity: "0",
    mask_z_index: -1,
    userName: '',
    pubTime: '',
    projectInfo: '',
    projectRequire: "",
    projectType: '',
    projectState: '',
    projectCity: '',
    projectPeriod: '',
    projectDemand: '',
    projectBudget: '',
    commentAwsPos: '-100%',
    answerNum: '',
    projectTitle: '',
    answerList: '',
    objectId: '',
    following: 'none',
    unfollowing: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    var that = this
    wx.request({
      url: config.service.detail, 
      method: 'get',
      data: {
        object_id: id,
        object_type: 0,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
      },
      success: function (res) {
        console.log(res.data);
        let result = res.data.result
        let answer = res.data.answer
        if (!result) {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
        wx.request({
          url: config.service.focus_state,
          data: {
            focus_type: 'other',
            object_type: 0,
            object_id: id,
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          }, success: function (res) {
            try{
              that.setData({
                projectTitle: result.project_title,
                userName: result.user_name,
                pubTime: timeCalc(new Date(result.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))),
                projectInfo: result.project_require,
                projectType: result.project_type,
                projectBudget: result.project_budget,
                answerNum: result.answernum,
                answerList: answer,
                object_id: id,
                following: !!res.data.result ? '' : 'none',
                unfollowing: !!res.data.result ? 'none' : ''
              })
            }catch(err){
              console.log(err)
            }
          }
        })
      },
      fail: function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    })
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
  ansProject: function (e) {
    this.setData({
      commentAwsPos: 0,
      maskOpacity: "0.3",
      mask_z_index: "2"
    })
  },
  closeComment: function () {
    this.setData({
      commentAwsPos: "-100%",
      maskOpacity: "0",
      mask_z_index: -1
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submitAns: function (e) {
    var that = this
    //回答问题，传输数据举例{user_type: 0/1, user_id:18211949726, answer_info: '你好，我也好',object_type:0,object_id:1}
    wx.request({
      url: config.service.answer,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,  
        answer_info: e.detail.value.answerInfo,
        object_type: 0,
        object_id: this.data.object_id
      },
      success: function () {
        wx.showToast({
          title: '回答成功！',
          icon: 'none'
        })
        that.setData({
          commentAwsPos: "-100%",
          maskOpacity: "0",
          mask_z_index: -1
        })
      },fail: function(){
        wx.showToast({
          title: '回答失败',
          icon: 'none'
        })
      }
    })
  },
  commentAws: function (e) {
    wx.navigateTo({
      url: "./../comment/comment?answer_id=" + e.target.dataset.answerid
    })
  },
  follow: function () {
    var that = this
    wx.request({
      url: config.service.focus,
      data: {
        focus_type: 'other',
        object_type: 0,
        object_id: that.data.object_id,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          following: "",
          unfollowing: "none"
        })
        wx.showToast({
          title: '关注成功',
          icon: 'none'
        })
      }, fail: function () {
        wx.showToast({
          title: '关注失败',
          icon: "none"
        })
      }
    })
  },
  unfollow: function () {
    var that = this
    wx.request({
      url: config.service.defocus,
      data: {
        focus_type: 'other',
        object_type: 0,
        object_id: that.data.object_id,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          following: "none",
          unfollowing: ""
        })
        wx.showToast({
          title: '取消关注成功',
          icon: 'none'
        })
      }, fail: function () {
        wx.showToast({
          title: '取消关注失败',
          icon: "none"
        })
      }
    })
  }
})