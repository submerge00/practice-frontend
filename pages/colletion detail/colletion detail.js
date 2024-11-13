// pages/wrong detail/wrong detail.js
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
    array: [
      {
        question: "下列哪个数是偶数？",
        options: ["A. 3", "B. 5", "C. 8", "D. 7"],
        answer: "C"
      },
      {
        question: "如果一个三角形的两边长分别为4厘米和6厘米，那么第三边的可能长度（单位：厘米）是？",
        options: ["A. 1", "B. 10", "C. 2", "D. 9"],
        answer: "D"
      }],
    

  },

  methods: {
    toStart()
    {
      wx.navigateTo({
        url: '../colletion text/colletion text',
      })
    }
    
  },
});