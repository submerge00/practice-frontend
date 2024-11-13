// pages/test paper/test paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
Component({
  data: {
    value: -1,
    value1: [-1, -1],
    array: ['A.大学计算机期末考试', 'B.计算机二级office', 'C.毛概期末考试', 'D.中国近代史期末考试'],
    TorF:['正确','错误'],
  },
  methods: {
    onChange(e) {
      this.setData({ value: e.detail.value });
    },
    onChange1(e) {
      this.setData({ value1: e.detail.value });
    },
    toStart()
    {
      wx.navigateTo({
        url: '../all/all',
      })
    }
  },
});
