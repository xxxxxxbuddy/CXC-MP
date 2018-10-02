var qcloud = require('../../vendor/wafer2-client-sdk/lib/regc.js')
var config = require('../../config')
// pages/index/login.js
Page({
  data: {
    userName: 'limumu',
    job:'teacher',
    corporation:'hust',
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
    //index.js
    //获取应用实例
    var that=this
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var src=res.userInfo.avatarUrl;
        console.log(src);
        that.setData({
          src:src
    })
  }
  })
  },

        /*
    wx.login({
      success: function (res) {
        console.log(res.code)
        console.log('输出res.code')
        //发送请求
        wx.request({
          method:'get',
          url: config.service.regs_company, //接口地址
          data: { 
            code: res.code,
            company_id: '18367722588',
            company_name: 'KFC', 
            company_type: '餐饮', 
            company_address: '华科喻园店', 
            company_introduce: '你好呀',
            image:that.data.src
           },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            console.log('结果输出')
            console.log(res.data)
          }
        })
      }
    })
    */
  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})