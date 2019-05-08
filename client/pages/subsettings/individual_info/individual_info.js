var config = require('./../../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_url: app.globalData.back_url,
    sex: '男',
    company: '',
    jobRange: [],
    typeRange: [],
    job: 0,
    type: 0,
    introduce: '',
    flag: false,
    individual: true,
    corporation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this
    wx.request({
      url: config.service.my_message,
      method: 'get',
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        var info = res.data.result
        console.log(res)
        if(info.individual_name){
          that.setData({
            individual: true,
            corporation: false,
            sex: info.individual_sex,
            job: info.individual_job,
            company: info.individual_corporation,
            introduce: info.individual_introduce,
            userInfo: app.globalData.userInfo,
            jobRange: app.globalData.jobList,
          })
        }else{
          that.setData({
            individual: false,
            corporation: true,
            introduce: info.company_introduce,
            typeRange: app.globalData.typeList,
            type: info.company_type,
            company: info.company_address,
            userName: app.globalData.userInfo.user_name,
            userInfo: app.globalData.userInfo,
          })
        }

      }
    })
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
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  jobChange: function(e){
    
    this.setData({
      job: e.detail.value
    })
  },
  typeChange: function (e) {

    this.setData({
      type: e.detail.value
    })
  },
  corporationInput: function(e){
    this.setData({
      company: e.detail.value
    })
  },
  checkInfo: function(){
    var that = this
    if(!that.data.company){
      wx.showToast({
        title: '请输入所属单位',
        icon: 'none'
      })
    }else{
      that.setData({
        flag: true
      })
    }
  },
  introduceInput: function(e) {
    console.log(e);
    this.setData({
      introduce: e.detail.value
    })
  },
  submitInfo: function(e){
    var that = this;
    if(!this.data.flag){
      wx.showToast({
        title: '请输入全部信息',
        icon: 'none'
      })
      return
    } 
    wx.request({
      url: config.service.change_message,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        individual_job: that.data.job,
        individual_corporation: that.data.company,
        individual_introduce: e.detail.value.introduce
      },
      success: function(){
        console.log(e.detail.value)
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      }
    })
  }
})