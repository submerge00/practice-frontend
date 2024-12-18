// pages/paper/paper.js
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
    array: [{
      name:'大学计算机期末考试',
      description:'123'
    },
    {
      name:'计算机二级office',
      description:''
    },
    {
      name:'毛概期末考试',
    
    },
    {
      name:'中国近代史期末考试', 
      description:''
  },
  {
    name:'马克思原理期末考试',
    description:''
},
{
  name:'形式与政策',
  description:''
},
      ],
    filteredList:[],
    value:''
  },

  methods: {
    toStart(e)
    {
      console.log(e)
      const itemId = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `../collection detail/collection detail?id=${itemId}`,
      })
    },
    changeHandle(e) {
      const { value } = e.detail;
      this.setData({
        value,
      });
    },

    blurHandle() {
      this.setData({
        actionText: '',
      });
    },
    onLoad(){
      const token=wx.getStorageSync('token')
      wx.request({
        url: 'https://practice.halfmaple.vip/knowledge/v1/list', 
        method: 'GET',
        data: { 
          
        },  // 请求体中传递 code
        header: {
          'Content-Type': 'application/json', 
          'Cache-Control': 'no-cache',  // 禁用缓存
          'Authorization':`Bearer ${token}`,
        },
        success: (response) => {
          console.log("后端返回数据：", response.data.data.list);
          this.setData({
            array:response.data.data.list
          })
           this.setData({
            filteredList:this.data.array
         })
          console.log('array',this.data.array)
        },
      });
      
    },
    submitHandle(){
      const searchValue = this.data.value.toLowerCase();
      console.log(searchValue)
      const filteredList = this.data.array.filter(item =>
        item.name.toLowerCase().includes(searchValue)
      );
      if (filteredList.length === 0) {
        wx.showToast({
          title: '无法搜索到相关题库，请您新建',
          icon: 'none',
          duration: 2000
        });
      }
      this.setData({ filteredList });
    },
    
  },
});