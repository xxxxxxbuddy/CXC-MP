Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMTMgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Q2hldnJvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQmFycy9OYXZpZ2F0aW9uLUJhci9fL0xpZ2h0L0xlZnQtQ29tYmluYXRpb25zL0JhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC4wMDAwMDAsIC0xMS4wMDAwMDApIiBmaWxsPSIjMDA3QUZGIj4KICAgICAgICAgICAgPGcgaWQ9IkJhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuMDM3MTM0OSwyMS41ODI2NjczIEwwLjc5MjE1MTg1MiwxMi40NDU4MDQyIEMwLjQwMjYxNjA0OSwxMi4wNjExODg4IDAuNDAyNjE2MDQ5LDExLjQzOTgxMDIgMC43OTIxNTE4NTIsMTEuMDU0MTk1OCBMMTAuMDM3MTM0OSwxLjkxNzMzMjY3IEMxMC41OTk0NjQ4LDEuMzYwODg5MTEgMTEuNTE0Mzc0NSwxLjM2MDg4OTExIDEyLjA3NzcwMzIsMS45MTczMzI2NyBDMTIuNjQwMDMzMSwyLjQ3Mzc3NjIyIDEyLjY0MDAzMzEsMy4zNzY4NzMxMyAxMi4wNzc3MDMyLDMuOTMzMzE2NjggTDQuMTY5MTI3NjIsMTEuNzUwNDk5NSBMMTIuMDc3NzAzMiwxOS41NjU2ODQzIEMxMi42NDAwMzMxLDIwLjEyMzEyNjkgMTIuNjQwMDMzMSwyMS4wMjYyMjM4IDEyLjA3NzcwMzIsMjEuNTgyNjY3MyBDMTEuNTE0Mzc0NSwyMi4xMzkxMTA5IDEwLjU5OTQ2NDgsMjIuMTM5MTEwOSAxMC4wMzcxMzQ5LDIxLjU4MjY2NzMiIGlkPSJDaGV2cm9uIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==',
    isActive1: 'rgba(255, 149, 0, 1)',
    isActive2: '',
    isActive3: '',
    border1: '2rpx solid rgba(255, 149, 0, 1)',
    border2: '',
    border3: ''
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
  chooseTab1: function(){
    this.setData({
      isActive1: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border1: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border3: ''
    })
  },
  chooseTab2: function () {
    this.setData({
      isActive2: 'rgba(255, 149, 0, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border2: '2rpx solid rgba(255, 149, 0, 1)',
      border1: '',
      border3: ''
    })
  },
  chooseTab3: function () {
    this.setData({
      isActive3: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      border3: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border1: ''
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})