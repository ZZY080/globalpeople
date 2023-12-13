// components/navigationBar/navigationBar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String,
            value:"",
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 状态栏高度
        statusBarHeight:wx.getStorageSync("statusBarHeight")+"px",
        // 导航栏高度
        navigationBarHeight:wx.getStorageSync('navigationBarHeight')+"px",
        // 导航栏和状态栏高度
        navigationBarAndStatusBarHeight:wx.getStorageSync('statusBarHeight')+wx.getStorageSync('navigationBarHeight')+"px",
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
