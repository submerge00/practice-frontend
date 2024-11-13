// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '/image/屏幕截图 2024-10-16 131614.png',
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
});
/*
轮播图
*/
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

Component({
  data: {
    current: 0,
    autoplay: false,
    duration: 500,
    interval: 5000,
    swiperList,
  },

  methods: {
    onChange(e) {
      const {
        detail: { current, source },
      } = e;
      console.log(current, source);
    },
    toPaper()
    {
      wx.navigateTo({
        url: '../paper/paper',
      })
    },
    toCollection()
    {
      wx.navigateTo({
        url: '../collection/collection',
      })
    },
    toWrong()
    {
      wx.navigateTo({
        url: '../wrong/wrong',
      })
    },
    toClassify()
    {
      wx.navigateTo({
        url: '../classify/classify',
      })
    },
  },
});
/*
图标
*/