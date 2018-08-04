//index.js
//获取应用实例
const app = getApp()
var config = require('./../../config.js')
Page({
  data: {
    background_url: './../images/background.jpg',
    logo_url: './..images/logo.jpg',
    avatar_img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTklEQVRYR7WXS4iOURjHf38iFlJ2xkYitymXScplbFgoNS4rimJlIdYWlJK1srEhkcuC0iw1SsZ9atIIk0t2yMLKLdJfJ9/7NfPO933nvOedebfn//yfX+8553meIzI+2/OBlcCyRvhr4JWkT1XtVCXA9mrgPLC+TdxT4LCk56m+yQC29wDXgJkR89/APkm3UiCSAGz3AI+BGSmmwB9go6ShmD4KYHs6MAosjpmV1t+FMyLpb6e4FID9wOWKyQv5QUmX6gLcBML+53y3Je2qC/AC6M7JDryRtLQuwHtgUSbAR0kL6gLcA7ZkAjyUtKkuwFngWCbAOUlH6wKsA55lAvRIGq4FEIJt3wG2VYTol9QXi4nWgQbAPOAJsCRm2FgfATZI+h7TJwE0IOYCoajsjJheAI5I+hVLHtaTAGwHXUh8AlgTMQ6d8CpwUdLXGEQUwHaoZKeBFTGz0vqXcHsk3cg6hLZD270O7K6YuCwPfeRQu6bU8g/Yng2Ek9+xiFQAGwD6JP0ox0wAaOx3P7CjQoIU6QNgu6RvY8WtAE4BJ1McMzRXJB1oC2B7LRCmmGkZ5qkhYVJ6VIjH/QHb94HNqU6ZuhFJqyYA2A4j19tM06phWyXdHVeIbJ8Bjld1ytQ3z0JzC2yHWt9u3s/M0zbss6TwuPlfim3PAsIdjVbGSSTpCi+pAmAh8GESzVOsuiW9LADqDB0pyVppeiUNFgChw3WcXHKzdIhbLmm0AAhPrlCAmvdzChKOtRyU1Fu+hnOAvUDXFCb/CYR5YaDojv8AmzivIS6oo+8AAAAASUVORK5CYII=',
    enterprise_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABxUlEQVRYR+2XMUgcQRSGvx+0MmAIpBHSpxFMe1YJpBBNI8dhJwjpYm0jxJRKylTpDDZykCJYCoaEYCloY2EZsBIUsQiGPJlkJqx7O7c7e3fa3Ja3M/N9O/M/3o2450d1+Wb2GHgDrEmyuuvUEvDwb8BT4DOwIOm6jkSygJk9An54eGDuAa8kXaVKJAl4+FdgsgB0ALyQdJ4iUVmgBB6Yx17itKpEJYGK8MD8CTyXdFJFolQgER6YZ17iqEyiq0BNeGBeAjOSXGCjT1TAzMaB75HAlX1YeP8LaEraiU0oFPBwV1rPqpK6jPsDLEnaLBrTIdBneJa5LOlDXuKWwADhgbshaSUr8V/gDuCB647CHYk7Gv4K3CE8SLhQzrv+ITN7ALjG0o/ApWT2X//IzzCzFrCdslLC2JakdmEGwo9DgeEOVNgBV7/vfOVk8/QQ2ALGuoSyLyHclfSyCGJmrr5nBy3QluRKteMxM1dizaHAcAd63YGGv3jE1uklhA1J+2W9wDWoL8BcxOCTpMVIFXwEXkfmHQJT+Xtk7D/hKLAKTAMjmQXdJfStJNe+i8rwCbAOTGRe/gbcV7+XdJGfVHovSGi1tYbeAObs1SkWzS4+AAAAAElFTkSuQmCC',
    individual_back: './../images/icon/return(2).png',
    enterprise_back: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDElEQVRYR+2WO2hVQRCGv1/FRq1CUESCJBJBBIm2Vj4LQZuIIFYKNoqtqCBa+OostFGDjYIiiYWVISlEFB9gJxZWFhoCgpWCj/DLwirX4+553EvubbLNKXZm/+/MzsyO6PFSj/VZAGgcAdtXgX3ALknvO73CRgC2zwNno+huSZNdA7B9BLjVItg9ANt7gYfAoq4D2N4KTANLC+Ge/wjY3gg8B1Yk7np+AWwPAK+AlZlE+wHMAp+AF8Aj4ImkX00SM1kFtvui+GCTw4CPwDngtqS5Or7/AdheBjwFRuockLF5CxyQFL6lKwVwLzhXOdbY/w6ckHSjzDYFMAOsqiFQ1+SUpMs54xRAaLMThZqvK5azOy7pemozl4TFrtcpwDdgnaQQ3X9W9i2wfRq40Klyi/9dSYdqAwRD29eAYxmIB8BPYDhWzOIK2FCW/ZK+tNqVvoa2w/59YH9ZJ7S9HNgOhKvbU5I/RyXdrA0Qo7AEeAxsK0AkW7HtTcA4MJSAHpc02gggQqSaU/YtiBG5EweXVr03krY0BogQoT0/A9bHAyofo0QOfZbU3xZAhFgNvAbCd6ekqbLEsx2u7yWwOdp9kLS2bYAIsQG4BByU9LWqTG2HKnkXE3Na0o6OAKoEU/u2x4DDwBlJF3sBEBIvzAxrJIUZ4u9qNBW38/d/fGyflHSleEbXAHLwCwA9j8BvXwKiISFtuX0AAAAASUVORK5CYII=',
    userInfo: {},
    jobList: ['职业','学生','自由职业者','其他'],
    companyList: ['公司类别','1','2'],
    index1: 0,
    index2: 0,
    state: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    individualName: '',
    individualJob: '0',
    individualCompany: '',
    enterpriseName: '',
    enterpriseType: '0',
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
  individualPickerChange: function (e) {
    this.setData({
      index1: e.detail.value
    })
    this.data.individualJob = e.detail.value
  },
  enterprisePickerChange: function (e) {
    this.setData({
      index2: e.detail.value
    })
    this.data.enterpriseType = e.detail.value
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
      translateLeft: '',
      translateRight: 'transform: translateX(100%);transition:all 0.2s;',
      individualShow: 'transform: translateX(100%);transition:all 0.2s;'
    })
  },
    translateLeft: function() {
      this.setData({
        translateRight: '',
        translateLeft: 'transform: translateX(-100%);transition:all 0.2s;',
        enterpriseShow: 'transform: translateX(-100%);transition:all 0.2s;',
      })
  },
  individualBack: function(){
    this.setData({
      translateRight: 'transform: translateX(0);transition:all 0.2s;',
      individualShow: 'transform: translateX(-100%);transition:all 0.2s;'
  })
  },
  enterpriseBack: function(){
    this.setData({
      translateLeft: 'transform: translateX(0);transition:all 0.2s;',
      enterpriseShow: 'transform: translateX(100%);transition:all 0.2s;'
    })
  },
  nameInput: function(e){
    this.data.individualName = e.detail.value
  },
  corporationInput: function(e){
    this.data.individualCompany = e.detail.value
  },
  companyNameInput: function(e){
    this.data.enterpriseName = e.detail.value
  },
  companyTypePick: function(e){
    this.data.enterpriseType = e.detail.value
  },
  checkIndividualInfo: function(){
    var that = this
    var individualInfo = this.data.individualInfo
    if(!this.data.individualName){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    }else if(this.data.individualJob==0){
      wx.showToast({
        title: '请选择职业',
        icon: 'none'
      })
    }else if(!this.data.individualCompany){
      wx.showToast({
        title: '请输入单位',
        icon: 'none'
      })
    }
  },
  checkEnterpriseInfo: function () {
    var enterpriseInfo = this.data.enterpriseInfo
    if (!enterpriseName) {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none'
      })
    } else if (enterpriseType == 0) {
      this.data.state = false;
      wx.showToast({
        title: '请选择公司类别',
        icon: 'none'
      })
    }else{
      this.data.state = true
    }
  },
  submitInfo: function(e){
    var that = this
    if(this.data.state)
      console.log(e.detail.value)
    wx.request({
      url: config.service.regcurl,
      method: 'get',
      data: {
        individual_name: e.detail.value.individualName,
        individual_job: e.detail.value.individualJob,
        individual_company: e.detail.value.individualCompany
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        console.log(res.data)
      } 
    })
  }
})
