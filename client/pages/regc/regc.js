var qcloud = require('../../vendor/wafer2-client-sdk/lib/regc.js')
var config = require('../../config')
// pages/index/login.js
Page({
  data: {
    userName: 'limumu',
    job:'teacher',
    corporation:'hust'
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  jobInput: function (e) {
    this.setData({
      job: e.detail.value
    })
  },
  corporationInput: function (e) {
    this.setData({
      corporation: e.detail.value
    })
  },
  //获取用户输入的密码
  loginBtnClick: function (e) {
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
    var that=this;
  
    wx.request({
      method:'get',
      url: config.service.myfans,
      data:{
        user_type: 0, user_id: 18211949726},
      success:function(res){
        console.log(res.data);
        
      },
      fail:function(res){
        console.log('上传失败');
      }
    }) 
    
  }
  ,
  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})