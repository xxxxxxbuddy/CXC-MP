var config = require('./../../config.js')
const app=getApp();
var id
const {timeCalc} = require('../../utils/util.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:{},
    "question": '',
    avatar_url: app.globalData.default_url,
    answer_url: app.globalData.answernum_url,
    back_url: app.globalData.back_url,
    avatar_icon: app.globalData.default_url,
    comment_icon: app.globalData.comment_url,
    like_icon:app.globalData.praise_url,
    navH: app.globalData.navHeight,
    maskOpacity: "0",
    mask_z_index: -1,
    userName: '',
    pubTime: '',
    questionInfo: '',
    answerNum: '',
    questionTitle: '',
    answerList: '',
    commentAwsPos: '-100%',
    userId: '',
    userType: '',
    answer_id: '',
    object_id: '',
    following: "none",
    unfollowing: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     id=options.id
    var that = this
    wx.request({
      url: config.service.detail,
      method: 'get', 
      data: {
        object_id: id,
        object_type: 1
      },
      success: function (res) {
        console.log(res);
        let result = res.data.result
        let answer = res.data.answer
        if (!result) {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
        wx.request({
          url: config.service.focus_state,
          data: {
            focus_type: 'other',
            object_type: 1,
            object_id: id,
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          },success: function(res){
            try{
              that.setData({
                questionTitle: result.question_title,
                userType: res.data.result.user_type,
                userId: res.data.result.user_id,
                userName: result.user_name,
                pubTime: timeCalc(new Date(result.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))),
                questionInfo: result.question_info,
                answerNum: result.answernum,
                answerList: answer,
                object_id: id,
                following: !!res.data.result ? '' : 'none',
                unfollowing: !!res.data.result ? 'none' : ''
              })
            }catch(err) {
              console.error(err);
            }
          }
        })
      },
      fail: function(){
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '加载失败',
          icon: 'none'
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
    var object_id = [];
    var that=this;

    if(that.data.id){
      for (var item in that.data.id) {
        if (that.data.id[item]) {
          object_id.push(item)
        }
      }
      console.log(object_id)
      wx.request({
        url: config.service.praise,
        data: {
          user_type: app.globalData.userInfo.user_type,
          user_id: app.globalData.userInfo.user_id,
          object_type: 0,
          object_id: object_id
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
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
  commentAws: function(e){
    wx.navigateTo({
      url: "./../comment/comment?answer_id="+e.target.dataset.answerid
    })
  },
  ansQuestion: function (e) {
    this.setData({
      commentAwsPos: 0,
      maskOpacity: "0.3",
      mask_z_index: "2"
    })
  },
  closeComment: function () {
    this.setData({
      commentAwsPos: "-100%",
      maskOpacity: "0",
      mask_z_index: -1
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  like: function(e){
    console.log(e)
    var that = this

    let id = e.target.dataset.id
    if(that.data.id[id]){
      let count = -1
      for (var ans of that.data.answerList) {
        count++
        if (ans.answer_id == id) {
          that.data.answerList[count].praisenum--;
          that.data.id[id]= false;
          that.setData({
            answerList: that.data.answerList,
          })
          break
        }
      }

    }
    else {
      let count = -1
      for (var ans of that.data.answerList) {
        count++
        if (ans.answer_id == id) {
          that.data.answerList[count].praisenum++;
          that.data.id[id] = true;
          that.setData({
            answerList: that.data.answerList,
          })
          break
        }
      }
    } 
  },
  submitAns: function(e){
    var that= this
     //回答问题，传输数据举例{user_type: 0/1, user_id:18211949726, answer_info: '你好，我也好',object_type:0,object_id:1}
    wx.request({
      url: config.service.answer,
      data: {
        user_type: app.globalData.userInfo.user_type,      //app.globalData.user_type,
        user_id: app.globalData.userInfo.user_id,   //app.globalData.user_id,
        answer_info: e.detail.value.answerInfo,
        object_type: 1,
        object_id: this.data.object_id
      },
      success: function(){
        wx.showToast({
          title: '回答成功！',
          icon: 'none'
        })
        that.setData({
          commentAwsPos: "-100%",
          maskOpacity: "0",
          mask_z_index: -1
        })
        wx.request({
          url: config.service.detail,
          method: 'get',
          data: {
            object_id: id,
            object_type: 1
          },
          success: function (res) {
            console.log(res);
            let result = res.data.result
            let answer = res.data.answer
            if (!result) {
              wx.navigateBack({
                delta: 1
              })
              wx.showToast({
                title: '加载失败',
                icon: 'none'
              })
            }
            wx.request({
              url: config.service.focus_state,
              data: {
                focus_type: 'other',
                object_type: 1,
                object_id: that.object_id,
                user_type: app.globalData.userInfo.user_type,
                user_id: app.globalData.userInfo.user_id
              }, success: function (res) {
                try {
                  that.setData({
                    answerNum: result.answernum,
                    answerList: answer,
                    object_id: id
                  })
                } catch (err) {
                  console.error(err);
                }
              }
            })
          },
          fail: function () {
            wx.navigateBack({
              delta: 1
            })
            wx.showToast({
              title: '加载失败',
              icon: 'none'
            })
          }
        })
      },
      fail: function(){
        wx.showToast({
          title: '网络错误，回复失败',
          icon: 'none'
        })
      }
    })
  },
  follow: function(){
    var that = this
    wx.request({
      url: config.service.focus,
      data:{
        focus_type: 'other',
        object_type: 1,
        object_id: that.data.object_id,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          following: "",
          unfollowing: "none"
        })
        wx.showToast({
          title: '关注成功',
          icon: 'none'
        })
      },fail: function(){
        wx.showToast({
          title: '关注失败',
          icon: "none"
        })
      }
    })
  },
  unfollow: function(){
    var that = this
    wx.request({
      url: config.service.defocus,
      data: {
        focus_type: 'other',
        object_type: 1,
        object_id: that.data.object_id,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          following: "none",
          unfollowing: ""
        })
        wx.showToast({
          title: '取消关注成功',
          icon: 'none'
        })
      }, fail: function () {
        wx.showToast({
          title: '取消关注失败',
          icon: "none"
        })
      }
    })
  },
  jumpToHome: function(e){
    var that=this;
    wx.navigateTo({
      url: './../home/home?userType=' + that.data.userType + "&userId=" + that.data.userId,
    })
  },
  jumpToOtherHome: function(e){

    console.log(e)
    wx.navigateTo({
      url: './../home/home?userType=' + e.currentTarget.dataset.type + '&userId=' + e.currentTarget.id,
    })
  }
})
