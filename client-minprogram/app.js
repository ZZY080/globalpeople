// app.js
App({
  onLaunch() {
    const {statusBarHeight,platform} = wx.getSystemInfoSync();
    const {top,height}=wx.getMenuButtonBoundingClientRect();
    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight);
    // 胶囊高度
    wx.setStorageSync('menuButtonHeight', height?height:32);
    // 判断胶囊按钮信息是否成功获取
    if(top&&top!==0&&height&&height!==0){
        // 获取成功进行计算
        const navigationBarHeight=(top-statusBarHeight)*2+height;
        // 导航栏高度
        wx.setStorageSync('navigationBarHeight', navigationBarHeight);
    }else {
        // 获取失败导航栏的高度
        wx.setStorageSync('navigationBarHeight', platform==="android"?48:40);
    }
   
   
   
  },
  globalData: {
    userInfo: null,
    IP:"http://192.168.31.34:8080",
  }
})
