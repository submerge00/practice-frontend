const token = wx.getStorageSync('token')
Page({
  data: {
    databaseList: [],
    filteredList: [], 
    showModal: false, 
    newSubject: { name: '', description: '', isPublic: 0 },
    searchValue: '' // 保存输入框的值
  },

  onLoad() {
    // 初始化时显示所有数据
    this.fetchData();
  },

  // 获取题库列表数据
  fetchData() {
    wx.request({
      url: 'https://practice.halfmaple.vip/knowledge/v1/list', 
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
      success: (res) => {
        console.log("接口返回数据：", res.data);
        if (res.data && res.data.code === 0 && Array.isArray(res.data.data.list)) {
          const mappedList = res.data.data.list.map(item => ({
            id: item.ID,
            name: item.Title,  // 将 Title 映射为 name
            description: item.Description,  // 将 Description 映射为 description
          }));
          
          this.setData({
            databaseList: mappedList,
            filteredList: mappedList, // 默认显示全部
          });
        } else {
          wx.showToast({
            title: '数据格式错误',
            icon: 'none',
          });
        }
      },
      fail: (err) => {
        console.error("请求失败：", err);
        wx.showToast({
          title: '获取数据失败，请稍后重试',
          icon: 'none',
        });
      },
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
  const filteredList = this.data.databaseList.filter(item => {
    return item.name.toLowerCase().includes(searchValue) ||
           item.description.toLowerCase().includes(searchValue);
  });
  if (filteredList.length === 0) {
    // 清空搜索结果，显示空列表
    this.setData({ filteredList: [] });
    //弹窗提示
    wx.showToast({
      title: '无法搜索到相关题库，请您新建',
      icon: 'none',
      duration: 2000,
      complete: ()=> {
         // 弹窗消失后恢复显示所有题库
         this.setData({ filteredList: this.data.databaseList });
      }
    });
  } else {
    // 如果找到匹配的题库，更新 filteredList
    this.setData({ filteredList });
  }
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

  // 处理输入框中的题库名输入
  handleInputChange(e) {
    this.setData({
      'newSubject.name': e.detail.value
    });
  },
 // 处理输入框中的题库描述输入
  handleDescriptionChange(e) {
    console.log("description changed:", e.detail.value);
    this.setData({
      'newSubject.description': e.detail.value
    });
  },
  // 处理题库的公开或非公开属性
  onRadioChange(e) {
    this.setData({
      'newSubject.isPublic': parseInt(e.detail.value)
    });
  },

  // 点击确认按钮时统一提交所有信息
  addSubject() {
    const { newSubject } = this.data;
    console.log("newSubject:", newSubject); // 打印 newSubject
    // 校验名称和简介是否为空
    if (!newSubject.name || !newSubject.description) {
      wx.showToast({ title: "名称或简介不能为空", icon: "none" });
      return;
    }
  
      // 构造请求体
  const newSubjectData = {
    title: newSubject.name,            // 用户输入的题库名称
    description: newSubject.description,  // 用户输入的题库描述
    public: newSubject.isPublic === 1,    // 转换 isPublic 为布尔值
  };

  wx.request({
    url: 'https://practice.halfmaple.vip/knowledge/v1',  
    method: 'POST',
    data: newSubjectData,
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${wx.getStorageSync('token')}`, 
    },
    success: (response) => {
      console.log("接口返回数据：", response);

      // 检查接口返回的结果
      if (response.data && response.data.code === 0) {
        // 如果成功，更新本地数据
        const newId = this.data.databaseList.length + 1;
        const addedSubject = {
          id: newId,
          name: newSubject.name,
          description: newSubject.description,
          isPublic: newSubject.isPublic === 1,
        };

        this.setData({
          databaseList: [...this.data.databaseList, addedSubject],
          filteredList: [...this.data.filteredList, addedSubject], 
          showModal: false,
          newSubject: { name: '', description: '', isPublic: 0 }, 
        });

        wx.showToast({ title: "题库添加成功", icon: "success" });
      } else {
        // 如果接口返回失败，显示错误信息
        wx.showToast({
          title: '添加失败，请稍后重试',
          icon: 'none',
        });
      }
    },
    fail: (error) => {
      console.error("请求失败：", error);
      wx.showToast({
        title: '网络错误，请稍后重试',
        icon: 'none',
      });
    },
  });
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
