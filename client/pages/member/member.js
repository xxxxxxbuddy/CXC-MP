var config = require("./../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: {},
    communityName: '',
    back_url: getApp().globalData.back_url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.service.community_member, 
      data:{
        community_id: options.community_id   //options.communityId
      },
      success: function(res){
        console.log(res)
        that.setData({
          memberList: res.data.result,
          communityName: options.communityName
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
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  jumpToHome: function(e){
    console.log(e)
    wx.navigateTo({
      url: './../home/home?userType=' + e.target.dataset.type + '&userId=' + e.currentTarget.id,
    })
  }
})