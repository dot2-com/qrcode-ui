//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.myDevice = wx.getSystemInfoSync()

    for (var i = 0; i < 156; i++) {
      this.globalData.imgUrl[i] = 'https://qcloudtest-1256525699.cos.ap-guangzhou.myqcloud.com/emotion/' + (i + 1) + '.png'
    }
  },
  globalData: {
    userInfo: null,
    myDevice:null,
    imgUrl:[],
  }
})