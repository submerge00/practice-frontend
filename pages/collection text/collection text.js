// pages/errorOptions/errorOptions.js
let titles=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    current:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let arr=wx.getStorageSync('collections')
    let index=wx.getStorageSync('index')
    if(arr&&arr.length>0)
    {
      titles=arr
    }
    this.setData({
      subject:titles[index],
      total:titles.length,
      current:index+1
    })
    console.log('错题集',titles)
  },

  pre(){
    if(this.data.current-1<=0){
      wx.showToast({
        title: '已经是第一个了',
        icon:'none'
      })
    }else{
      this.setData({
        current:this.data.current-1,
        subject:titles[this.data.current-2]
      })
    }
  },
  next(){
    if(this.data.current+1>titles.length){
      wx.showToast({
        title: '已经是最后一个了',
        icon:'none'
      })
    }else{
      this.setData({
        current:this.data.current+1,
        subject:titles[this.data.current]
      })
    }

  }
})