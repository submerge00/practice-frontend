const titles=[{
  title:'1+1=?',
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
let errorOptions=[];
let doneOptions=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: -1,
    value1: [-1, -1],
    current:1,
    subject:null,
    select:'',
    mselect:[],
    titlesLength:0,
    doneLength:0,
    percent:0,
    score:0,
    finalScore:-1,
    isdisable:false,
    showAnswer:false,
    defaultVal: true,
    iscorrect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let subject=titles[0]
    console.log('subject',subject)
    this.setData({
      subject:subject,
      titlesLength:titles.length,
      score:0
    })
    doneOptions=[];
    errorOptions=[];
  },

  onChange(e) {
    this.setData({ value: e.detail.value });
    let select=e.detail.value;
    this.setData({
      select:select
    })
  },
  onChange1(e) {
    this.setData({ value1: e.detail.value });
    let mselect=e.detail.value;
   
    this.setData({
      mselect:mselect
    })
  },
  submit(){

    let userSelect=this.data.select
    if(!userSelect){
      wx.showToast({
        title: '请做选择',
        icon:'none'
      })
      return
    }

    let num=this.data.current+1;
    let subject=titles[num-1];
    this.setData({
      percent:((num-1)/titles.length)*100,
      isdisable:true,
      showAnswer:true,
      doneLength:doneOptions.length,
    })

   if(titles[num-2].answer==this.data.select){
     this.setData({
       score:this.data.score+1,
       iscorrect:true
     })
      wx.showToast({
        title: '答对啦！',
      })
    }else{
      this.setData({
        iscorrect:false
      })
      let subjectNow=this.data.subject
      subjectNow.select=userSelect
      console.log('错题',subjectNow)
      errorOptions.push(subjectNow)
      wx.showToast({
        icon:'none',
        title: '答错了',
      })
    }

    let subjectNow=this.data.subject
    subjectNow.select=userSelect
    console.log('已完成',subjectNow)
    doneOptions.push(subjectNow)
    
    if(num>titles.length)
    {
      this.setData({
        finalScore:this.data.score
      })
      wx.showToast({
        icon:'none',
        title: '已经是最后一题了',
      })
      return 
    }
    
    if(this.data.defaultVal)
    {
      this.setData({
      subject:subject,
      current:num,
      value: -1,
      select:'',
      isdisable:false,
      showAnswer:false,
      iscorrect:false
    })
    }
    

  },
  msubmit(){

    let userSelect=this.data.mselect
    if(!userSelect){
      wx.showToast({
        title: '请做选择',
        icon:'none'
      })
      return
    }

    console.log('用户选择了',this.data.mselect);
    let num=this.data.current+1;
    let subject=titles[num-1];
    this.setData({
      percent:((num-1)/titles.length)*100,
      isdisable:true,
      showAnswer:'true'
    })

    let arr1=titles[num-2].answer;
    let len1=arr1.length;

    let arr2=this.data.mselect;
    let len2=arr2.length;
    
    if(len1==len2){
      let rightNum=0;
      arr2.forEach(item=>{
        if(arr1.indexOf(item)>-1){
          rightNum++;
        }
      })
      if(rightNum==len1){
        this.setData({
          score:this.data.score+1,
          iscorrect:'true'
        })
        wx.showToast({
          title: '答对啦',
        })
      }else{
        this.setData({
          iscorrect:'false'
        })
        let subjectNow=this.data.subject
      subjectNow.select=userSelect
      console.log('错题',subjectNow)
      errorOptions.push(subjectNow)
        wx.showToast({
          icon:'none',
          title: '答错了',
        })
      }
    }else{
      this.setData({
        iscorrect:'false'
      })
      let subjectNow=this.data.subject
      subjectNow.select=userSelect
      console.log('错题',subjectNow)
      errorOptions.push(subjectNow)
      wx.showToast({
        icon:'none',
        title: '答错了',
      })
    }

    let subjectNow=this.data.subject
    subjectNow.select=userSelect
    subjectNow.iscorrect=this.data.iscorrect
    console.log('已完成',subjectNow)
    doneOptions.push(subjectNow)

    if(num>titles.length)
    {
      this.setData({
        finalScore:this.data.score
      })
      wx.showToast({
        icon:'none',
        title: '已经是最后一题了',
      })
      return 
    }

    if(this.data.defaultVal)
    {
      this.setData({
        subject:subject,
        current:num,
        value1: [-1, -1],
        mselect:[],
        doneLength:doneOptions.length,
        isdisable:false,
        showAnswer:false,
        iscorrect:'false'
      })
    }
  },
  
  pre(){
    let num=this.data.current-1;
    this.setData({
      percent:((num-1)/titles.length)*100
    })
       
    if(num<=0)
    {
      wx.showToast({
        icon:'none',
        title: '已经是第一题了',
      })
      return 
    }
    let subject=doneOptions[num-1];
    this.setData({
      subject:subject,
      current:num,
      value:subject.select,
      value1:subject.select,
      select:subject.select,
      isdisable:true,
      showAnswer:true,
      iscorrect:subject.iscorrect
    })
  },
  next(){
    let num=this.data.current+1;
    let undonesubject=titles[num-1];

    if(num>doneOptions.length+1)
    {
      wx.showToast({
        icon:'none',
        title: '已经是最新一题了',
      })
      return 
    }

    this.setData({
      percent:((num-1)/titles.length)*100
    })

    if(num==doneOptions.length+1)
    {
      this.setData({
        subject:undonesubject,
        current:num,
        value:-1,
        select:'',
        value1: [-1, -1],
        mselect:[],
        isdisable:false,
        showAnswer:false,
        iscorrect:false
      })
      return 
    }   

    let subject=doneOptions[num-1];
    this.setData({
      subject:subject,
      current:num,
      value:subject.select,
      value1:subject.select,
      select:subject.select,
      isdisable:true,
      showAnswer:true,
      iscorrect:subject.iscorrect
    })
  },
  seeError()
  {
    wx.setStorageSync('errorOptions', errorOptions)
    wx.navigateTo({
      url: '../errorOptions/errorOptions',
    })
  },
  handleChange(e) {
    this.setData({
      defaultVal:e.detail.value
    });
  }
})
