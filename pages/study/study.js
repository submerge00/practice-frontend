Page({
  data: {
    databaseList: [
      { id: 1, title: "题库1", description: "题库简介概述", isPublic: 0 },
      { id: 2, title: "题库2", description: "折磨生出苦难，苦难又会加剧折磨...", isPublic: 1 },
      { id: 3, title: "题库3", description: "折磨生出苦难，最终总结真实的恩典...", isPublic: 0 }
    ],
    filteredList: [], 
    showModal: false, 
    newSubject: { name: '', description: '', isPublic: 0 },
    searchValue: '' // 保存输入框的值
  },

  onLoad() {
    // 初始化时显示所有数据
    this.setData({
      filteredList: this.data.databaseList
    });
  },

  // 输入框内容变化时触发
  onInputChange(e) {
    const searchValue = e.detail.value;
    this.setData({
      searchValue: searchValue
    });
  },

  // 点击搜索按钮时触发
  onSearchTap() {
    const searchValue = this.data.searchValue.toLowerCase();
    const filteredList = this.data.databaseList.filter(item =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue)
    );
      // 如果没有搜索到任何结果，弹出toast提示
      if (filteredList.length === 0) {
        wx.showToast({
          title: '无法搜索到相关题库，请您新建',
          icon: 'none',
          duration: 2000
        });
      }
    this.setData({ filteredList });
  },

  onImport(e) {
    const itemId = e.currentTarget.dataset.id; // 获取当前点击的题库 ID
    wx.navigateTo({
      url: `/pages/daoru/daoru?id=${itemId}`, // 跳转到导入页面并传递 ID
    });
  },
  onModify(e) {
    const itemId = e.currentTarget.dataset.id; // 获取当前点击的题库 ID
    wx.navigateTo({
      url: `/pages/modify/modify?id=${itemId}`, // 跳转到修改页面并传递 ID
    });
  },

  // 处理输入框中的科目名变化
  handleInputChange(e) {
    this.setData({
      'newSubject.name': e.detail.value
    });
  },

  handleDescriptionChange(e) {
    console.log("description changed:", e.detail.value);
    this.setData({
      'newSubject.description': e.detail.value
    });
  },

  onRadioChange(e) {
    this.setData({
      'newSubject.isPublic': parseInt(e.detail.value)
    });
  },

  // 点击确认按钮时统一提交所有信息
  addSubject() {
    const { newSubject } = this.data;
    console.log("newSubject:", newSubject); // 打印 newSubject
  
    if (!newSubject.name || !newSubject.description) {
      wx.showToast({ title: "名称或简介不能为空", icon: "none" });
      return;
    }
  
    const newId = this.data.databaseList.length + 1;
    const newSubjectData = {
      id: newId,
      title: newSubject.name,
      description: newSubject.description,
      isPublic: newSubject.isPublic
    };
  
    this.setData({
      databaseList: [...this.data.databaseList, newSubjectData],
      filteredList: [...this.data.filteredList, newSubjectData], // 更新搜索结果列表
      showModal: false,
      newSubject: { name: '', description: '', isPublic: 0 } // 清空输入框
    });
  
    wx.showToast({ title: "题库添加成功", icon: "success" });
  },

  // 关闭模态框
  closeModal() {
    this.setData({
      showModal: false,
      newSubject: { name: '', description: '', isPublic: 0 } // 清空输入
    });
  },

  // 打开输入框模态框
  showInputModal() {
    this.setData({
      showModal: true
    });
  }
});
