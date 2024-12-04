Page({
 /**
 * 页面的初始数据
 */
data: {
  login: {
    show: false,
    line: false,
    avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  },
  phoneNumber: '',
},

/**
 * 登录监听
 */
loginToServer() {
  wx.login({
    success: (res) => {
      console.log("wx.login 返回数据：", res); 

      // if (res.code) {
      //   console.log("正在进行wx.request调用...");
      //   wx.request({
      //     url: 'https://practice.halfmaple.vip/user/v1/login/wechat', 
      //     method: 'POST',
      //     data: { 
      //       code: res.code,
      //       errMsg: res.errorMsg
      //     },  // 请求体中传递 code
      //     header: {
      //       'Content-Type': 'application/json', 
      //       'Cache-Control': 'no-cache'  // 禁用缓存
      //     },
      //     success: (response) => {
      //       console.log("后端返回数据：", response); 

      //       if (response.data && response.data.data && response.data.data.token) {
      //         wx.setStorageSync('token', response.data.data.token); // 保存 token

      //         // 更新页面状态
      //         this.setData({
      //           login: {
      //             show: true,
      //             line: true,
      //             avatar: response.data.data.avatar || this.data.login.avatar, // 设置头像
      //           },
      //         });

      //         // 显示登录成功的提示
      //         wx.showToast({
      //           title: '登录成功',
      //           icon: 'success',
      //         });
      //       } else {
      //         wx.showToast({
      //           title: '登录失败，请稍后重试',
      //           icon: 'none',
      //         });
      //       }
      //     },
      //     fail: (error) => {
      //       console.error("请求失败，错误信息：", error); // 打印请求失败的错误信息
      //       wx.showToast({
      //         title: '网络错误，请稍后重试',
      //         icon: 'none',
      //       });
      //     },
      //   });
      // } else {
      //   console.error("登录失败！", res.errMsg);  // 打印错误信息
      //   wx.showToast({
      //     title: '获取登录状态失败',
      //     icon: 'none',
      //   });
      // }
    // },
    // fail: () => {
    //   wx.showToast({
    //     title: '微信登录失败',
    //     icon: 'none',
    //   });
    },
  });
},

/**
 * 绑定手机号
 */
bindPhoneNumber(e) {
  const token = wx.getStorageSync('token'); // 获取存储的用户 token
  if (!token) {
    wx.showToast({
      title: '请先登录',
      icon: 'none',
    });
    return;
  }

  if (e.detail.encryptedData && e.detail.iv) {
    wx.request({
      url: 'https://your-server-domain/api/bind-phone',
      method: 'POST',
      header: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      },
      success: (response) => {
        if (response.data && response.data.phoneNumber) {
          this.setData({
            phoneNumber: response.data.phoneNumber,
          });

          wx.showToast({
            title: '手机号绑定成功',
            icon: 'success',
          });
        } else {
          wx.showToast({
            title: '绑定失败，请稍后重试',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
        });
      },
    });
  } else {
    wx.showToast({
      title: '手机号获取失败',
      icon: 'none',
    });
  }
},

/**
 * 退出登录
 */
exitClick() {
  let that = this;
  wx.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success(res) {
      if (res.confirm) {
        // 清除本地 token
        wx.removeStorageSync('token');

        // 重置页面状态
        that.setData({
          login: {
            show: false,
            line: false,
            avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          },
          phoneNumber: '',
        });

        wx.showToast({
          title: '已退出登录',
          icon: 'success',
        });
      }
    },
  });
},

/**
 * 页面生命周期函数
 */
onLoad(options) {
  // 这里可以判断是否已登录
  const token = wx.getStorageSync('token');
  if (token) {
    this.setData({
      login: {
        show: true,
        line: true,
      },
    });
  }
}
});
