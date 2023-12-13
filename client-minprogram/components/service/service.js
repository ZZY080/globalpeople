// components/service/service.js
const app = getApp();
const {IP} = app.globalData
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
        tapItems:[
            // {
            //     id:0,
            //     imgsrc:"../../assets/images/certificate.png",
            //     desc:"证书补办"
            // },
            // {
            //     id:1,
            //     imgsrc:"../../assets/images/news.png",
            //     desc:"校友期刊"
            // },
            // {
            //     id:2,
            //     imgsrc:"../../assets/images/classmate.png",
            //     desc:"找校友"
            // },
            {
                id:3,
                imgsrc:IP+"/assets/images/birthday.png",
                desc:"生日祝福"
            },
            {
                id:4,
                imgsrc:IP+"/assets/images/calendar.png",
                desc:"校历"
            },
            {
                id:5,
                imgsrc:IP+"/assets/images/memory.png",
                desc:"记忆",
                url:"/pages/memorize/memorize",
            },
            {
                id:6,
                imgsrc:IP+"/assets/images/new-people.png",
                desc:"迎新"
            },
            {
                id:7,
                imgsrc:IP+"/assets/images/takephotos.png",
                desc:"萌新合影"
            },
            {
                id:8,
                imgsrc:IP+"/assets/images/agriculture.png",
                desc:"务农活动"
            },
        ],
        IP:IP,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleDetail(e){
           let {url} = e.currentTarget.dataset;
           wx.navigateTo({
             url: `${url}`,
           })
        },
    }
})
