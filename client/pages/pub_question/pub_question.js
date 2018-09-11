// pages/pub_question/pub_question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
  },
  set_power:function(e){
    console.log('xasjc');
    wx.navigateTo({
      url: '../power/power',
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})