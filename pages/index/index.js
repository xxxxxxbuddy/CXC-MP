//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background_url: './../images/background.jpg',
    logo_url: './..images/logo.jpg',
    avatar_img: './../images/avatar_img.png',
    individual_url: './../images/individual.png',
    enterprise_url: './../images/enterprise.png',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    individualInfo: {
      name: '',
      job: '',
      corporation: ''
    },
    enterpriseInfo: {
      companyName: '',
      companyType: ''
    },
    translateRight: '',
    translateLeft: '',
    individualShow: '',
    enterpriseShow: ''
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.navigateTo({
      url: './../main/main',
    })
  },

  translateRight: function(){
    this.setData({
      translateRight: 'transform: translateX(100%);transition:all 0.2s;',
      individualShow: 'transform: translateX(100%);transition:all 0.2s;'
    })
  },
    translateLeft: function() {
      this.setData({
        translateLeft: 'transform: translateX(-100%);transition:all 0.2s;',
        enterpriseShow: 'transform: translateX(-100%);transition:all 0.2s;',
      })
  }
})
