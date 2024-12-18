// pages/paper/paper.js
import ActionSheet, { ActionSheetTheme } from '../../miniprogram_npm/tdesign-miniprogram/action-sheet/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

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
        description:item.Description,
        items: [
          {
            label: '顺序练习',
            id:item.ID
          },
          {
            label: '随机答题',
            id:item.ID
          },
          
        ],
      });
    },
    handleSelected(e) {
      console.log(e)
      const itemId = e.detail.selected.id
      if(e.detail.selected.label=='随机答题')
      {
        wx.navigateTo({
          url: `../test paper/test paper?id=${itemId}`,
        })
      }
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
    onReachBottom() {

    },
    
  },
  
  
});