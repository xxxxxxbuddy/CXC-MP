var config=require("./../../config.js")
const app = getApp();
const {timeCalc} = require('../../utils/util.js')

// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: '',
    praise_url: app.globalData.praise_url,
    back_url: app.globalData.back_url,
    id: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answer_id = options.answer_id
    var that = this
    wx.request({
      url: config.service.answer_detail,
      data:{
        answer_id: answer_id
      },
      success: function(res){
        console.log(res.data)
        var i=0;
        for(var item of res.data.result){
          item.comment_time = new Date(item.comment_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.comment_time = timeCalc(item.comment_time);
          i=i+1;
        } 
        that.setData({
          commentList: res.data.result
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
    var object_id = [];
    var that = this;

    if (that.data.id) {
      for (var item in that.data.id) {
        if (that.data.id[item]) {
          object_id.push(item)
        }
      }
      console.log(object_id)
      wx.request({
        url: config.service.praise,
        data: {
          user_type: app.globalData.userInfo.user_type,
          user_id: app.globalData.userInfo.user_id,
          object_type: 1,
          object_id: object_id
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
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
  jumpToHome: function (e) {
    console.log(e)
    wx.navigateTo({
      url: './../home/home?userType=' + e.target.dataset.type + '&userId=' + e.currentTarget.id,
    })
  },
  like: function (e) {
    console.log(e)
    var that = this

    let id = e.target.dataset.id
    if (that.data.id[id]) {
      let count = -1
      for (var com of that.data.commentList) {
        count++
        if (com.comment_id == id) {
          that.data.commentList[count].praisenum--;
          that.data.id[id] = false;
          that.setData({
            commentList: that.data.commentList,
          })
          break
        }
      }

    }
    else {
      let count = -1
      for (var com of that.data.commentList) {
        count++
        if (com.comment_id == id) {
          that.data.commentList[count].praisenum++;
          that.data.id[id] = true;
          that.setData({
            commentList: that.data.commentList,
          })
          break
        }
      }
    }
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})