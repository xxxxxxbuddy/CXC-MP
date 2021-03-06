var config = require("./../../config.js")
const app=getApp();
var list
const {timeCalc, quickSort} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityName: '',
    questionNum: 0,
    projectNum: 0,
    memberNum: 0,
    rightArrow: app.globalData.rightArrow_url,
    back_url: app.globalData.back_url,
    communityMember: [],
    communityIntroduce: '',
    communityImage: '',
    allArray: {},
    communityId: '',
    selectedIndex: [],
    inviteList: {},
    selectedList: {},
    translateY: '100%'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let id = options.community_id 
    var result
    wx.request({
      url: config.service.community_PQ,
      data:{
        community_id: id
      },
      success: function(res){
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = item.project_finish.slice(0, 10)
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          result = quickSort(result)
          //console.log(result)
        } else {
          wx.showToast({
            title: '暂无动态',
            icon: 'none'
          })
        }
        //console.log(res)
        wx.request({
          url: config.service.community_member,
          data: {
            community_id: id   //options.communityId
          },
          success: function (e) {
            console.log(e)
            console.log(res)
            let imageList = []
            if(e.data.result.length >= 6){
              for(var i = 0;i < 6;i++){
                imageList[i] = e.data.result[i].user_image
              }
              that.setData({
                communityMember: imageList,
                communityImage: res.data.community.community_image,
                communityName: res.data.community.community_name,
                questionNum: res.data.community.questionnum,
                projectNum: res.data.community.projectnum,
                memberNum: res.data.community.usernum,
                communityIntroduce: res.data.community.community_introduce,
                allArray: result,
                communityId: options.community.community_id
              })
            }else{
              for (var i = 0; i < e.data.result.length; i++) {
                imageList[i] = e.data.result[i].user_image
              }
              that.setData({
                communityMember: imageList,
                communityName: res.data.community.community_name,
                communityImage: res.data.community.community_image,
                questionNum: res.data.community.questionnum,
                projectNum: res.data.community.projectnum,
                memberNum: res.data.community.usernum,
                communityIntroduce: res.data.community.community_introduce,
                allArray: result,
                communityId: options.community_id
              })
            }
          },
          fail: function(){
            wx.showToast({
              title: '加载失败',
              icon: 'none'
            })
          }
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
  checkMembers: function(){
    wx.navigateTo({
      url: './../member/member?community_id=' + this.data.communityId + "&communityName=" + this.data.communityName
    })
  },
  invite: function(){
    var that = this
    var list
    var flag = false
    wx.request({
      url: config.service.myfans,
      data:{
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          inviteList : res.data.result
        })
        wx.request({
          url: config.service.myidol,
          data: {
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          },
          success: function (res) {
            console.log(res.data)
            list = that.data.inviteList.concat(res.data.result)
            that.setData({
              inviteList: list
            })
            
          },
          complete: function(){
            for (var item in that.data.inviteList) {
              flag = true
            }
            if (!flag) {
              wx.showToast({
                title: '暂无可邀请用户',
                icon: 'none'
              })
            } else {
              that.setData({
                translateY: 0,
              })
            }
          }
        })
      }
    })
   
  },
  cancel: function(){
    this.setData({
      translateY: '100%'
    })
  },
  checkboxChange: function(e){
    console.log(Object.keys(e.detail.value))
    if(e.detail.value.length>0){
      this.setData({
        selected: true,
        selectedIndex: Object.keys(e.detail.value)
      })
    }else{
      console.log('a')
      this.setData({

        selected: false
      })
    }
  },
  done: function(){
    var that = this
    var i =0
     for(var item of that.data.selectedIndex){
       console.log(item)
       if (that.data.inviteList[item].hasOwnProperty('fans_id')){
         console.log("fan")
         let obj = {
           guest_type: that.data.inviteList[item].fans_type,
           guest_id: that.data.inviteList[item].fans_id
         }
         that.data.selectedList[i] = obj
       }else{
         console.log("idol")
         let obj = {
           guest_type: that.data.inviteList[item].idol_type,
           guest_id: that.data.inviteList[item].idol_id
         }
         console.log(obj)
         that.data.selectedList[i] = obj
       }
       i++

       }

    wx.request({
      url: config.service.invite,
      data:{
        host_type: 1,//app.globalData.userInfo.user_type,
        host_id: "400123456",//app.globalData.userInfo.user_id,
        invite_type: 'C',
        invite_id: 1,//that.data.communityId,
        guest: that.data.selectedList
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          translateY: '100%'
        })
        wx.showToast({
          title: '邀请成功',
        })
      },
      fail: function(){
        wx.showToast({
          title: '网络错误，邀请失败',
          icon: 'none'
        })
      }
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})


//邀请回答项目/问题、圈子,传递数据举例{host_type: 0, host_id: '18211949725', invite_type: 'P'/'Q'/'C', invite_id: 圈子id/项目id/问题id,guest:[{guest_type:0,guest_id:'18211949725'},{}]}
// invite: `${host}/weapp/invite`,