const app = getApp()

Page({
  data: {
    link: "",
    host: "",
    qrcode_url: "",
  },
  onLoad(options) {

    wx.showLoading({
      title: "加载二维码",
    })
    console.log(options)
    if (options.link) {
      this.setData({
        link: options.link,
        host: options.host,
      })

      wx.setNavigationBarColor({
        backgroundColor: '#ffffff',
        frontColor: '#444',
      })

    }

    if (!this.data.link) {
      console.log("请通过链接跳转")
      wx.hideLoading();
      return;
    }

    this.get_qrcode()


  },
  get_qrcode() {
    wx.request({
      method: "GET",
      url: this.data.host + "/api/links/" + this.data.link,
      success: (res) => {
        console.log(res)
        const data = res.data;
        console.log(data)
        if (data.code == 0) {
          this.setData({
            qrcode_url: this.data.host + "/upload/" + data.data.qrcode,
          });
          wx.setNavigationBarTitle({
            title: data.data.title ?? '点击二维码加好友',
          })
        }

        wx.hideLoading();
      },
      fail: function (err) {
        console.log(err)
        wx.hideLoading();
      }
    })
  },
  onShow() {
    console.log('App Show')
    wx.hideHomeButton()
    wx.hideShareMenu()
  },
})
