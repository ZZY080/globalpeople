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
    productdata: [{
        id: 0,
        src: "https://img0.baidu.com/it/u=3022471857,1407304478&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 1,
        src: "https://img0.baidu.com/it/u=2215715549,4273949142&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)

      },
      {
        id: 2,
        src: "https://img0.baidu.com/it/u=948183101,2871174750&fm=253&fmt=auto&app=120&f=JPEG?w=1202&h=800",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 3,
        src: "https://img2.baidu.com/it/u=3799953226,1311596428&fm=253&fmt=auto&app=138&f=JPEG?w=914&h=500",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
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
  handleDetail(){
    wx.navigateTo({
      url: '/pages/productselldetail/productselldetail',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})