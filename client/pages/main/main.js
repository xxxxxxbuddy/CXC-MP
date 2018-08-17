// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "isActive1": "",
    "isActive2": "",
    "isActive3": "",
    "border1": "",
    "border2": "",
    "border3": ""
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
  chooseTag1: function(){
    this.setData({
      isActive1: "#fff",
      isActive2: "",
      isActive3: "",
      border1: "1px solid rgba(255, 255, 140, 1)",
      border2: "",
      border3: ""
    })
  },
  chooseTag2: function(){
    this.setData({
      isActive2: "#fff",
      isActive1: "",
      isActive3: "",
      border2: "1px solid rgba(255, 255, 140, 1)",
      border1: "",
      border3: ""
    })
  },
  chooseTag3: function(){
    this.setData({
      isActive3: "#fff",
      isActive2: "",
      isActive1: "",
      border3: "1px solid rgba(255, 255, 140, 1)",
      border2: "",
      border1: ""
    })
  }
})