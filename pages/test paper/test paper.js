
let errorOptions=[];
let doneOptions=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:[],
    value: -1,
    value1: [-1, -1],
    current:1,
    subject:null,
    select:'',
    mselect:'',
    titlesLength:0,
    doneLength:0,
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
  onLoad(options) {
    const token=wx.getStorageSync('token')
    wx.request({
      url: 'https://practice.halfmaple.vip/question/v1/list', 
      method: 'GET',
      data: { 
        knowledgeBaseId:options.id
      },  // 请求体中传递 code
      header: {
        'Content-Type': 'application/json', 
        'Cache-Control': 'no-cache',  // 禁用缓存
        'Authorization':`Bearer ${token}`,
      },
      success: (response) => {
        console.log("后端返回数据：", response.data.data.list);
        this.setData({
          titles:response.data.data.list
        })
        console.log('titles',this.data.titles)
        if (this.data.titles.length > 0) {
          let subject = this.data.titles[0];
          console.log('subject',subject)
          this.setData({
            subject:subject,
            titlesLength:this.data.titles.length,
            score:0
          })
          doneOptions=[];
          errorOptions=[];
        }
      },
    });
    
    
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
    let subject=this.data.titles[num-1];
    this.setData({
      isdisable:true,
      showAnswer:true,
      doneLength:doneOptions.length,
    })

   if(this.data.titles[num-2].answer.content==this.data.select){
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
    
    if(num>this.data.titles.length)
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
    let titles=this.data.titles
    let isCorrect=false//判断是否正确
    let score=this.data.score//计算正确数量

    let userSelect=this.data.mselect
    if(!userSelect){
      wx.showToast({
        title: '请做选择',
        icon:'none'
      })
      return
    }//如果为空显示‘请做选择’

    let num=this.data.current+1;//当前题目数量+1
    let subject=titles[num-1];//subject为下一个题目
    console.log('下一个题目',subject);

    let arr1=this.data.titles[num-2].answer.content;
    let len1=arr1.length;//答案长度

    let arr2=this.data.mselect;
    let len2=arr2.length;//用户选择长度
    
    if(len1==len2){
      let rightNum=0;
      arr2.forEach(item=>{
        if(arr1.indexOf(item)>-1){
          rightNum++;
        }
      })//判断正确选项个数
      if(rightNum==len1){
        score=score+1
        isCorrect=true
      }else{
        isCorrect=false
      }
    }else{
      isCorrect=false
    }

    let subjectNow =titles[num-2]
    subjectNow.select=userSelect
    subjectNow.iscorrect=isCorrect

    doneOptions.push(subjectNow)
    
    if(isCorrect)
    {
      this.setData({
        iscorrect:isCorrect,
        select:userSelect,
        isdisable:true,
        showAnswer:true
      })
      wx.showToast({
        title: '答对啦！',
      })
    }else{
      this.setData({
        iscorrect:isCorrect,
        select:userSelect,
        isdisable:true,
        showAnswer:true
      })
      errorOptions.push(subjectNow)
      wx.showToast({
        icon:'none',
        title: '答错了',
      })
    }

    console.log('已完成',doneOptions)
    console.log('错题',errorOptions)

    if(num>this.data.titles.length)
    {
      this.setData({
        finalScore:score
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
        iscorrect:false
      })
    }

  },
  
  pre(){
    let num=this.data.current-1;
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
    let undonesubject=this.data.titles[num-1];

    if(num>doneOptions.length+1)
    {
      wx.showToast({
        icon:'none',
        title: '已经是最新一题了',
      })
      return 
    }

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
