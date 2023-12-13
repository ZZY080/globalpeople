// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const userInfo = wx.setStorageSync('userInfo',{user_id:"656d72e6c98ed7146c5b433c",token:""}) || {};
    this.globalData.userInfo={user_id:"656d72e6c98ed7146c5b433c",token:""};
  },
  globalData: {
    userInfo: null
  }
})
