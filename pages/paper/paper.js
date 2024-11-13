// pages/paper/paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },




  /**
   * 生命周期函数_监听页面加载
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
    array: ['大学计算机期末考试', '计算机二级office', '毛概期末考试', '中国近代史期末考试', '马克思原理期末考试','形式与政策','1','2'],
    

  },

  methods: {
    toStart()
    {
      wx.navigateTo({
        url: '../selectpaper/selectpaper',
      })
    }
    
  },
});