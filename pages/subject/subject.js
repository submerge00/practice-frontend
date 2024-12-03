// pages/paper/paper.js
import ActionSheet, { ActionSheetTheme } from '../../miniprogram_npm/tdesign-miniprogram/action-sheet/index';
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
    value: '',

  },

  methods: {
    toStart()
    {
      wx.navigateTo({
        url: '../test paper/test paper',
      })
    },
    onChange(e) {
      console.log(e.detail.value);
    },
    showDescAction(e) {
      console.log(e)
      const item = e.currentTarget.dataset.item;
      ActionSheet.show({
        theme: ActionSheetTheme.List,
        selector: '#t-action-sheet',
        context: this,
        description:item.description,
        items: [
          {
            label: '顺序练习',
          },
          {
            label: '随机答题',
          },
          
        ],
      });
    },
    handleSelected(e) {
      if(e.detail.selected.label=='随机答题')
      {
        wx.navigateTo({
          url: '../test paper/test paper',
        })
      }
    }
    
  },
  
  
});