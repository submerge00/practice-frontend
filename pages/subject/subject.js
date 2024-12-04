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
    },
    onReachBottom() {

    },
    
  },
  
  
});