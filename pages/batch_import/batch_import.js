// pages/batch_import/batch_import.js
Page({
  data: {
    fileName: '', // 保存文件的名称
    filePath: ''  // 保存文件的路径
  },

  // 单题导入按钮点击事件
  SingleImport() {
    wx.navigateBack({
      delta: 1 // 返回上一页
    });
  },

  // 选择文件并上传
  onChooseFile() {
    wx.chooseMessageFile({
      count: 1, // 限制选择一个文件
      type: 'file', // 文件类型
      success: (res) => {
        // 获取文件路径和名称
        const tempFilePath = res.tempFiles[0].path;
        const fileName = res.tempFiles[0].name;

        // 更新文件名和文件路径到页面数据中
        this.setData({
          fileName: fileName,
          filePath: tempFilePath
        });

        // 上传文件到服务器
        this.uploadFile(tempFilePath);
      },
      fail: (err) => {
        console.log('文件选择失败', err);
      }
    });
  },

  // 文件上传功能
  uploadFile(filePath) {
    wx.uploadFile({
      url: 'https://your-server-url.com/upload', // 替换成你的服务器上传接口
      filePath: filePath,
      name: 'file', // 后端接收文件的字段名
      formData: {
        'user': 'test' // 其他额外的表单数据（如果有）
      },
      success: (res) => {
        const data = JSON.parse(res.data);
        console.log('文件上传成功：', data);
        wx.showToast({
          title: '文件上传成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.log('文件上传失败', err);
        wx.showToast({
          title: '文件上传失败',
          icon: 'none'
        });
      }
    });
  },

  onLoad(options) {

  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
