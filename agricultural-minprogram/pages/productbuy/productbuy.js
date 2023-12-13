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
          src: "https://img.jsdesign2.com/assets/img/64ed5c01c06cd9a027ec4d81.png#8467f7c9c6c19376bc239bf626d49e42",
          pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
        },
        {
          id: 1,
          src: "https://img.jsdesign2.com/assets/img/6537a7524e7dc44222d7575b.png#8ecb42fd069978519050b6444e52a547",
          pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
  
        },
        {
          id: 2,
          src: "https://img.jsdesign2.com/assets/img/655c03a0723adfea2d8788b4.png#699f595ce7926d0c104c060fc58d7599",
          pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
        },
        {
          id: 3,
          src: "https://img.jsdesign2.com/assets/img/655c039e43b95387d45b9c9c.png#8d5dfc78cca60da44372bb37f15c1531",
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
    // 跳转到详情页
  handleDetail(){
    wx.navigateTo({
      url: '/pages/productbuydetail/productbuydetail',
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