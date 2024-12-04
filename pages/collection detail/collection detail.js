// pages/wrong detail/wrong detail.js
const titles=[{
  title:'1+1=?',
  id:'',
  type:'单选题',
  answer:'A',
  explain:'1+1=2',
  options:[{
    code:'A',
    option:'2'
  },{
    code:'B',
    option:'3'
  },{
    code:'C',
    option:'4'
  },{
    code:'D',
    option:'5'
  },
  ]
},{
  title:'1+1<?',
  type:'多选题',
  answer:['B','C','D'],
  options:[{
    code:'A',
    option:'2'
  },{
    code:'B',
    option:'3'
  },{
    code:'C',
    option:'4'
  },{
    code:'D',
    option:'5'
  },
  ]
},{
  title:'1+1=2',
  type:'判断题',
  answer:'A',
  options:[{
    code:'A',
    option:'正确'
  },{
    code:'B',
    option:'错误'
  },
  ]
},];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects:null
  },

  onReachBottom() {

  },

 
})
Component({
  data: {
    
  },

  methods: {
    toStart(e)
    {
      console.log(e)
      let collections=titles;
      let index=e.currentTarget.dataset.index;
      wx.setStorageSync('collections', collections)
      wx.setStorageSync('index', index)
      wx.navigateTo({
        url: '../collection text/collection text',
      })
    },
    onLoad() {
      let subjects=titles;
      this.setData({
        subjects:subjects
      })
    },
  
  },
});