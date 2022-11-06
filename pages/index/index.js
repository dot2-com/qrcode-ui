// index.ts
// 获取应用实例
const app = getApp()

const API_HOST = "https://qr.dot2.com"

Page({
  data: {
    link: "",
    link_data: {},
    qrcode_url: "",
    tmp_qrcode_url: "",
    tips: "",
  },
  onLoad(options) {
    wx.showToast({
      title: "options.link:" + options.link,
    })
    wx.showLoading({
      title: "加载二维码",
    })
    console.log(options)
    if (options.link) {
      this.setData({
        link: options.link,
      })
      wx.setNavigationBarTitle({
        title: '点击二维码加好友',
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
      method: "POST",
      url: API_HOST + "/api/v1/links/get_by_link/" + this.data.link,
      success: (res) => {
        console.log(res)
        const data = res.data;
        console.log(data)
        if (data.code == 0) {
          this.setData({
            link_data: data.data,
            qrcode_url: API_HOST + "/api/v1/upload/" + data.data.qrcode,
          });
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
    // wx.setNavigationBarTitle({
    //   title: '点击添加微信好友'
    // })
  },
  longPress() {
    this.visitLink(true); // 点击
  },
  copyText(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    });
  },
  visitLink(click) {
    wx.request({
      method: "GET",
      url: API_HOST + "/api/v1/links/visit_link/" + this.data.link + (click ? "?click=true&peek=true" : ""),
      success: (res) => {
        console.log(res)
        const data = res.data;
        console.log(res.data)
        if (data.code == 0) {
          console.log(data.data);
        } else {
          this.setData({
            tips: data.msg,
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})
