var config = require('../../../config');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_url: app.globalData.back_url,
    isActive1: 'rgba(255, 149, 0, 1)',
    isActive2: '',
    isActive3: '',
    border1: '2rpx solid rgba(255, 149, 0, 1)',
    border2: '',
    border3: '',
    transform1: '0',
    transform2: '100%',
    transform3: '200%',
    z1: '2',
    z2: '1',
    z3: '1',
    questionList: [],
    projectList: [],
    idolList: [],
    idolArray: '',
    entrance: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.id != undefined){
      let userType = options.type
      let userId = options.id
      wx.request({
        url: config.service.myfocus,
        method: 'get',
        data: {
          user_type: userType,
          user_id: userId
        },
        success: function (res) {
          console.log(res)
          that.setData({
            projectList: res.data.project,
            questionList: res.data.question,
            idolList: res.data.idol,
            entrance: false
          })
        }
      })
    }else{
      wx.request({
        url: config.service.myfocus,
        method: 'get',
        data: {
          user_type: app.globalData.userInfo.user_type,
          user_id: app.globalData.userInfo.user_id
        },
        success: function (res) {
          console.log(res)
          that.setData({
            projectList: res.data.project,
            questionList: res.data.question,
            idolList: res.data.idol
          })
        }
      })
    }
    
    
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
  chooseTab1: function () {
    this.setData({
      isActive1: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border1: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border3: '',
      transform1: '0',
      transform2: '100%',
      transform3: '200%',
      z1: '2',
      z2: '1',
      z3: '1'
    })
  },
  chooseTab2: function () {
    this.setData({
      isActive2: 'rgba(255, 149, 0, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border2: '2rpx solid rgba(255, 149, 0, 1)',
      border1: '',
      border3: '',
      transform1: '-100%',
      transform2: '0',
      transform3: '100%',
      z1: '1',
      z2: '2',
      z3: '1'
    })
  },
  chooseTab3: function () {
    this.setData({
      isActive3: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      border3: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border1: '',
      transform1: '-200%',
      transform2: '-100%',
      transform3: '0',
      z1: '1',
      z2: '1',
      z3: '2'
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  jumpToDetail: function (e) {
    if(e.currentTarget.dataset.type == 1){
      wx.navigateTo({
        url: './../../question_detail/question_detail?id=' + e.currentTarget.id,
      })
    }else{
      wx.navigateTo({
        url: './../../project_detail/project_detail?id=' + e.currentTarget.id,
      })
    }

  },
  jumpToIndividualHome: function(e){
    wx.navigateTo({
      url: './../../home/home?userType=0&userId=' + e.currentTarget.id,
    })
  },
  jumpToCompanyHome: function (e) {
    wx.navigateTo({
      url: './../../home/home?userType=1&UserId=' + e.currentTarget.id,
    })
  }
})