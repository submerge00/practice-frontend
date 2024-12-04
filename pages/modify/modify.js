Page({
  data: {
    options: [
      { label: "A", content: "2" },
      { label: "B", content: "4" },
      { label: "C", content: "6" },
      { label: "D", content: "8" }
    ],
    showEditModal: false,        // 编辑选项的弹出框
    showAddOptionModal: false,   // 新增选项的弹出框
    editOptionContent: "",      // 编辑选项内容
    newOptionContent: "",       // 新增选项内容
    editIndex: null             // 当前编辑的选项索引
  },

  // 点击新增选项按钮
  onIconTap() {
    this.setData({
      showAddOptionModal: true,   // 显示新增选项的弹框
      newOptionContent: ""        // 清空新增选项内容
    });
  },

  // 点击编辑图标
  onEditOption(e) {
    const index = e.currentTarget.dataset.index;
    const option = this.data.options[index];
    
    this.setData({
      showEditModal: true,         // 显示编辑框
      editOptionContent: option.content, // 载入选项内容
      editIndex: index            // 记录当前编辑的选项索引
    });
  },

  // 输入框内容变化时触发（新增选项）
  onNewOptionInputChange(e) {
    this.setData({
      newOptionContent: e.detail.value // 更新新增选项内容
    });
  },

  // 输入框内容变化时触发（编辑选项）
  onInputChange(e) {
    this.setData({
      editOptionContent: e.detail.value // 更新编辑选项内容
    });
  },

  // 保存新增选项
  onSaveAddOption() {
    const { newOptionContent, options } = this.data;

    if (!newOptionContent) {
      wx.showToast({ title: "选项内容不能为空", icon: "none" });
      return;
    }

    // 生成新的选项（自动生成标签）
    const newOption = {
      label: String.fromCharCode(65 + options.length), // 自动生成选项标签（A, B, C, D...）
      content: newOptionContent
    };

    // 更新选项列表
    this.setData({
      options: [...options, newOption],      // 将新选项加入到选项数组中
      showAddOptionModal: false,            // 关闭新增选项弹框
      newOptionContent: ""                  // 清空新增选项内容
    });

    wx.showToast({ title: "新增选项成功", icon: "success" });
  },

  // 取消新增选项
  onCancelAddOption() {
    this.setData({
      showAddOptionModal: false,  // 关闭新增选项弹框
      newOptionContent: ""        // 清空输入框内容
    });
  },

  // 保存编辑选项
  onSaveEdit() {
    const { editOptionContent, editIndex, options } = this.data;
    if (!editOptionContent) {
      wx.showToast({ title: "内容不能为空", icon: "none" });
      return;
    }

    // 更新选项内容
    options[editIndex].content = editOptionContent;

    this.setData({
      options,             // 更新选项数组
      showEditModal: false // 关闭编辑框
    });

    wx.showToast({ title: "修改成功", icon: "success" });
  },

  // 取消编辑选项
  onCancelEdit() {
    this.setData({
      showEditModal: false, // 关闭编辑框
    });
  }
});
