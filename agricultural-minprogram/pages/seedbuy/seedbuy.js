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
        src: "https://img1.baidu.com/it/u=991085989,1414037496&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"向日葵种子",
        desc:"当向日葵成熟后采摘可变成瓜子"
      },
      {
        id: 1,
        src: "https://t15.baidu.com/it/u=292079162,1330039436&fm=224&app=112&f=JPEG?w=500&h=500",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"西红柿种子",
        desc:"为您提供农业技术咨询和培训服务，助力您的农业生产发展"
      },
      {
        id: 2,
        src: "https://img1.baidu.com/it/u=2347365528,97365739&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"西瓜种子",
        desc:"提供各类农机具租赁信息，满足您的农业生产需求"
      },
      {
        id: 3,
        src: "https://img0.baidu.com/it/u=3614366811,1147713513&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=455",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"葡萄种子",
        desc:"提供土地规划、土壤检测、农业保护等土地管理服务",
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
  handleDetail(e){
    let {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/seedbuydetail/seedbuydetail?id=${id}`,
    })
  },
  handleLike(){
    console.log(1)
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
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})