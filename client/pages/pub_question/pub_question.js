// pages/pub_question/pub_question.js
var config = require('../../config')
var util = require('../../utils/util.js')
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      user_type: app.globalData.userInfo.user_type,
      user_id: app.globalData.userInfo.user_id,
    },
    upload_icon:'upload.png',
    question_title:'',
    question_info:'',
    power:{
      object_power:1,
      detail_power:[]
    }
  },
  //获取问题名称
  question_title_input: function (e) {
    this.setData({
      question_title: e.detail.value
    })
  },
  //获取问题内容
  question_info_input: function (e) {
    this.setData({
      question_info: e.detail.value
    })
  },
  //设置权限
  set_power: function (e) {
    var that = this;
    let userJson = JSON.stringify(this.data.user)
    wx.navigateTo({
      url: '../power/power?userJson=' + userJson,
    })
  },
  //发布问题
  pub: function (e) {
    var that = this;
    wx.request({
      method: 'get',
      url: config.service.pub_question,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        power: that.data.power,
        question_title: that.data.question_title,
        question_info: that.data.question_info,
        image: that.data.upload_icon,
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '问题发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../main/main',
          })
        }, 2000) 
      },
      fail: function (res) {
        console.log('上传失败');
        wx.showToast({
          title: '问题发布失败',
          icon: 'warn',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../main/main',
          })
        }, 2000) 
       }
    })
  },
  uploadPic: function(e){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]
        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              upload_icon: res.data.imgUrl
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
  }





})