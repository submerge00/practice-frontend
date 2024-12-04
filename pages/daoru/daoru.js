// pages/daoru/daoru.js
Page({
  data: {
    questionTypes: ['单选', '多选', '判断'],
    selectedType: '单选',
    stem: '',
    imageUrl: '',
    options: { A: '', B: '', C: '', D: '' },
    correctOption: '',
    analysis: '',
    city2Text: '',
    city2Value: [],
    city2Title: '',
    types: [
      { label: '单选题', value: '单选题' },
      { label: '多选题', value: '多选题' },
      { label: '判断题', value: '判断题' },
    ],
  },

  
  onTypeChange(e) {
    this.setData({ selectedType: e.detail.value });
  },

  onStemInput(e) {
    this.setData({ stem: e.detail.value });
  },

  onUploadImage() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({ imageUrl: res.tempFilePaths[0] });
      }
    });
  },

  onOptionInput(e) {
    const option = e.currentTarget.dataset.option;
    this.setData({ [`options.${option}`]: e.detail.value });
  },

  onCorrectOptionChange(e) {
    this.setData({ correctOption: this.data.options[e.detail.value] });
  },

  onAnalysisInput(e) {
    this.setData({ analysis: e.detail.value });
  },

  onSubmit() {
    if (!this.data.stem || !this.data.correctOption) {
      wx.showToast({
        title: '题干或正确答案不能为空',
        icon: 'none'
      });
      return;
    }

    console.log('提交内容：', this.data);
    wx.showToast({
      title: '题目已导入',
      icon: 'success'
    });
    this.onCancel();
  },

  onCancel() {
    // 清空表单数据
    this.setData({
      selectedType: '单选',
      stem: '',
      imageUrl: '',
      options: { A: '', B: '', C: '', D: '' },
      correctOption: '',
      analysis: ''
    }, () => {
      // 在数据清空完成后再跳转页面
      wx.navigateBack({
        delta: 1 // 返回上一页
      });      
    });
  },
  

  onColumnChange(e) {
    console.log('picker pick:', e);
  },

  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;

    console.log('picker change:', e.detail);
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
  },

  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  onTitlePicker() {
    this.setData({ cityVisible: true, cityTitle: '选择城市' });
  },

  onWithoutTitlePicker() {
    this.setData({ city2Visible: true, city2Title: '' });
  },

  BatchImport() {
      // 在数据清空完成后再跳转页面
     wx.navigateTo({
       url: '/pages/batch_import/batch_import',
     })
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

