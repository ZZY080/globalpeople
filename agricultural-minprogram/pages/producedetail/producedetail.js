// pages/produce/produce.js
import {
  IP,
  PIC_MIN_HEIGHT,
  PIC_MAX_HEIGHT
} from "../../configs/config.js";
import {
  randomHeight
} from "../../utils/util.js";
let leftHeight = 0;
let rightHeight = 0;
let commonHeight = 210;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP: IP,
    navData:[
      {
        id:0,
        icon:IP+"/assets/images/arg_env.png",
        desc:"土地租赁",
        type:"1",
        url:"/pages/soilrent/soilrent"
      },
      {
        id:1,
        icon:IP+"/assets/images/arg_pur.png",
        desc:"种子选购",
        type:"2",
        url:"/pages/seedbuy/seedbuy",
      },
      {
        id:2,
        icon:IP+"/assets/images/arg_pre.png",
        desc:"耕地准备",
        type:"3",
      },
      {
        id:3,
        icon:IP+"/assets/images/arg_use.png",
        desc:"农药施用",
        type:"4",
      },
      {
        id:4,
        icon:IP+"/assets/images/arg_man.png",
        desc:"水肥管理",
        type:"5",
      },
      {
        id:5,
        icon:IP+"/assets/images/arg_sun.png",
        desc:"光照管理",
        type:"6",

      },
      {
        id:6,
        icon:IP+"/assets/images/arg_oper.png",
        desc:"机械操作",
        type:"7",
      },
      {
        id:7,
        icon:IP+"/assets/images/arg_master.png",
        desc:"时机掌握",
        type:"8",
      },
      {
        id:8,
        icon:IP+"/assets/images/arg_def.png",
        desc:"病虫害防治",
        type:"9",
      },
      {
        id:0,
        icon:IP+"/assets/images/arg_pick.png",
        desc:"成熟采摘",
        type:"10",
      },
    ],
    productdata: [{
        id: 0,
        src: "https://img.jsdesign2.com/assets/img/651ae3dc00b795b1063899af.png#804a97ce70379fae7acdf40873750039",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 1,
        src: "https://img.jsdesign2.com/assets/img/6479e80d2cd2df1e00a00dc6.png#00fe4e99235e185909490e860e64e873",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)

      },
      {
        id: 2,
        src: "https://img.jsdesign2.com/assets/img/64f545fe39b8638d4b13981b.png#7670976a6af237a4790ffaaf7a8a8585",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 3,
        src: "https://img.jsdesign2.com/assets/img/643e33229bf41dffbcd0f6f9.png#48c7f5cb9647ad5fbf86c99e1d809b01",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
    ],
    bannerData:[
      {
        id:0,
        bgpic:IP+"/assets/images/arg_blue.png",
        title:"高产优质",
        desc:"土壤肥沃"
      },
      {
        id:1,
        bgpic:IP+"/assets/images/arg_yellow.png",
        title:"高产优质",
        desc:"土壤肥沃模具费sdf看看电视付款了"
      },
      {
        id:2,
        bgpic:IP+"/assets/images/arg_green.png",
        title:"高产优质",
        desc:"土壤肥沃"
      },
    ],
    product_pic_height: 0,
    page: 1,
    leftGoods: [],
    rightGoods: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },
  init() {
    let that = this;
    leftHeight = 0;
    rightHeight = 0;
    that.setData({
      leftGoods: [],
      rightGoods: [],
    }, () => {
      that.getGoodsList();
    })

  },
  // 获取商品数据
  getGoodsList() {
    let that = this;
    let {
      leftGoods,
      rightGoods,
      productdata
    } = that.data;



    productdata.forEach((item) => {
      wx.getImageInfo({
        src: item.src,
        success(res) {
          let {
            width,
            height
          } = res;
          // 计算图片宽高比
          const aspectRatio = width / height;
          // 计算图片真实渲染的高度
          let realHeight = 340 / aspectRatio;
          if (leftHeight <= rightHeight) {
            leftGoods.push(item);
            leftHeight = leftHeight + realHeight + commonHeight;
          } else {
            rightGoods.push(item);
            rightHeight = rightHeight + realHeight + commonHeight;
          }
          that.setData({
            leftGoods,
            rightGoods,
          })

        },
        fail(res) {
          console.log(223)
        }
      })

    })

  },
  // 跳转到详情页
  handleDetail(e){
    let {url} = e.currentTarget.dataset;
   wx.navigateTo({
     url: `${url}`,
   })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("首页触底");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})