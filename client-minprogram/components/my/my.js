// components/my/my.js
const app = getApp();
const {IP} = app.globalData;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabBarTitle:{
            type:Array,
        },
        tabBarIndex:{
            type:Number,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        IP:IP,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    lifetimes:{
      
    }
    
})
