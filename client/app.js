// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//           //直接进入个人主页
//           wx.redirectTo({
//             url: './../main/main',
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    },
    globalData:{
      userInfo: null,
      user_id: 0,
      jobList: ['本科生','硕士','博士'],
      back_url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIyMXB4IiB2aWV3Qm94PSIwIDAgMTMgMjEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ3ICg0NTM5NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Q2hldnJvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iQmFycy9OYXZpZ2F0aW9uLUJhci9fL0xpZ2h0L0xlZnQtQ29tYmluYXRpb25zL0JhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC4wMDAwMDAsIC0xMS4wMDAwMDApIiBmaWxsPSIjMDA3QUZGIj4KICAgICAgICAgICAgPGcgaWQ9IkJhY2stQnV0dG9uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgMTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuMDM3MTM0OSwyMS41ODI2NjczIEwwLjc5MjE1MTg1MiwxMi40NDU4MDQyIEMwLjQwMjYxNjA0OSwxMi4wNjExODg4IDAuNDAyNjE2MDQ5LDExLjQzOTgxMDIgMC43OTIxNTE4NTIsMTEuMDU0MTk1OCBMMTAuMDM3MTM0OSwxLjkxNzMzMjY3IEMxMC41OTk0NjQ4LDEuMzYwODg5MTEgMTEuNTE0Mzc0NSwxLjM2MDg4OTExIDEyLjA3NzcwMzIsMS45MTczMzI2NyBDMTIuNjQwMDMzMSwyLjQ3Mzc3NjIyIDEyLjY0MDAzMzEsMy4zNzY4NzMxMyAxMi4wNzc3MDMyLDMuOTMzMzE2NjggTDQuMTY5MTI3NjIsMTEuNzUwNDk5NSBMMTIuMDc3NzAzMiwxOS41NjU2ODQzIEMxMi42NDAwMzMxLDIwLjEyMzEyNjkgMTIuNjQwMDMzMSwyMS4wMjYyMjM4IDEyLjA3NzcwMzIsMjEuNTgyNjY3MyBDMTEuNTE0Mzc0NSwyMi4xMzkxMTA5IDEwLjU5OTQ2NDgsMjIuMTM5MTEwOSAxMC4wMzcxMzQ5LDIxLjU4MjY2NzMiIGlkPSJDaGV2cm9uIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
    }
})