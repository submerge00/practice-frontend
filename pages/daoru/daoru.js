// pages/daoru/daoru.js
Page({
  data: {
    types: [
      { label: '单选题', value: 'single_choice' },
      { label: '多选题', value: 'multiple_choice' },
      { label: '判断题', value: 'true_or_false' },
    ],
    selectedType: '', // 用户选择的题型
    typePickerVisible: false, // 控制picker的显示
    typePickerValue: [], // 保存选择的题型值
    stem: '', 
    options: { A: '', B: '', C: '', D: '' }, // 选项内容
    correctOption: [], 
    analysis: '', 
    knowledgeBaseId: '', 
  },

  // 页面加载时获取题库 ID
  onLoad(options) {
    const { id } = options;  // 获取页面跳转时传递的 id 参数
    if (id) {
      this.setData({
        knowledgeBaseId: id,  // 设置传递的 ID
      });
    }
  },
    
  // 用于处理题干输入
  onStemInput(e) {
    this.setData({ stem: e.detail.value });
  },

  // 用于处理选项输入
  onOptionInput(e) {
    const option = e.currentTarget.dataset.option;
    this.setData({ [`options.${option}`]: e.detail.value });
  },

  // 处理多选题的选项变化
  handleMultipleChoiceChange(e) {
    // 获取选中的选项数组
    const selectedValues = e.detail.value;

    // 更新 correctOption 为选中的选项数组
    this.setData({
      correctOption: selectedValues,
    });
  },

    // 处理多选题的选项变化
    handleMultipleChoiceChange(e) {
      // 获取选中的选项数组
      const selectedValues = e.detail.value;
      // 更新 correctOption 为选中的选项数组
      this.setData({
        correctOption: selectedValues,
      });
    },

  // 处理正确选项选择
  onCorrectOptionChange(e) {
    const value = e.detail.value;  
  if (this.data.selectedType === '单选题') {
    // 单选题，correctOption 直接存储选中的值
    this.setData({ correctOption: value });
  } else if (this.data.selectedType === '判断题') {
    // 判断题，correctOption 存储选中的值（直接为 'A' 或 'B'）
    this.setData({ correctOption: value });
  }
  },

  // 处理题目解析输入
  onAnalysisInput(e) {
    this.setData({ analysis: e.detail.value });
  },

  //显示picker
  onTypePicker() {
    this.setData({
      typePickerVisible: true,
    });
  },

  // 处理题型选择
  onPickerChange(e) {
    const selectedType = this.data.types.find(type => type.value === e.detail.value[0]);
    this.setData({
      selectedType: selectedType ? selectedType.label : '',
      typePickerVisible: false, 
      typePickerValue: e.detail.value,
    });
  },

  // 关闭选择器
  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },

  // 提交表单
  onSubmit() {
    if (!this.data.stem || !this.data.correctOption) {
      wx.showToast({
        title: '题干或正确答案不能为空',
        icon: 'none'
      });
      return;
    }

  // 根据题型动态设置 `type` 字段
  let questionType = '';
  let options = [];

  if (this.data.selectedType === '单选题') {
    questionType = 'single_choice';
    options = [
      { id: 'A', content: this.data.options.A },
      { id: 'B', content: this.data.options.B },
      { id: 'C', content: this.data.options.C },
      { id: 'D', content: this.data.options.D }
    ];
  } else if (this.data.selectedType === '多选题') {
    questionType = 'multiple_choice';
    options = [
      { id: 'A', content: this.data.options.A },
      { id: 'B', content: this.data.options.B },
      { id: 'C', content: this.data.options.C },
      { id: 'D', content: this.data.options.D }
    ];
  } else if (this.data.selectedType === '判断题') {
    questionType = 'true_or_false';
    options = [
      { id: 'A', content: '正确' },
      { id: 'B', content: '错误' }
    ];
  }

  if (this.data.selectedType === '单选题') {
    questionType = 'single_choice';
  } else if (this.data.selectedType === '多选题') {
    questionType = 'multiple_choice';
  } else if (this.data.selectedType === '判断题') {
    questionType = 'true_or_false';
  }
    // 根据题型组织数据
    const questionData = {
      type: questionType, 
      knowledge_base_id: this.data.knowledgeBaseId,
      question: this.data.stem,
      options: {
        options: options
      },
      answer: {
        content: [this.data.correctOption]
      },
      explanation: this.data.analysis,
      tag: {
        content: ["example_tag"]
      }
    };

    console.log('请求体数据:', JSON.stringify(questionData, null, 2));
 
        // 发起请求
    wx.request({
      url: 'https://practice.halfmaple.vip/question/v1', 
      method: 'POST',
      data: questionData,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wx.getStorageSync('token')}`,
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 0) {
          wx.showToast({
            title: '题目已导入',
            icon: 'success'
          });
          this.onCancel(); // 清空表单数据并返回
        } else {
          console.error('错误信息:', res.data.message || res.data.error  || '未知错误');
          wx.showToast({
            title: '导入失败，请稍后再试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: 'none'
        });
        console.error('请求失败：', err);
      }
    });
  },

  // 取消操作
  onCancel() {
    // 清空表单数据
    this.setData({
      stem: '',
      options: { A: '', B: '', C: '', D: '' },
      correctOption: '',
      analysis: '',
      selectedType:'',
    }, () => {
      wx.navigateBack({
        delta: 1 // 返回上一页
      });      
    });
  },

  onTitlePicker() {
    this.setData({ cityVisible: true, cityTitle: '选择城市' });
  },

  // 选择题型时显示picker
  onWithoutTitlePicker() {
    this.setData({ city2Visible: true, city2Title: '' });
  },

  //跳转到批量导入页面
  BatchImport() {
      // 在数据清空完成后再跳转页面
     wx.navigateTo({
       url: '/pages/batch_import/batch_import',
     })
  },

  onShareAppMessage() {}
})

