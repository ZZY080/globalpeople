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
        src: "https://img.jsdesign2.com/assets/img/64996df5c00690495f58f66a.png#8cfece160057923a42fe94d4c9ce7b3a",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"健康食品",
        desc:"选购健康有机的农产品，为您的健康保驾护航。"
      },
      {
        id: 1,
        src: "https://img.jsdesign2.com/assets/img/6454b46960ff10787804b54e.png#bf6faf93a685c46eac0e83c29002f2ac",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"精选谷物",
        desc:"挑选优质精选的谷物，为您提供充足能量。"

      },
      {
        id: 2,
        src: "https://img.jsdesign2.com/assets/img/64b9e6c610aed9ddcfc096ef.png#ce73c823d8db6a7cf0803a427bf260d4",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"新鲜蔬菜",
        desc:"品尝新鲜蔬菜的美味，营养更易吸收。"
      },
      {
        id: 3,
        src: "https://img.jsdesign2.com/assets/img/646ed73e717d88d0d632c735.png#f62c1c117ee59ee370de6e7a4dcced87",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT),
        title:"优质肉类",
        desc:"购买优质的肉类产品，享受美味与营养的双重盛宴。"
      },
    ],
    bannerData:[
      {
        id:0,
        bgpic:IP+"/assets/images/arg_blue.png",
        title:"已上架",
        desc:"新鲜优质农产品"
      },
      {
        id:1,
        bgpic:IP+"/assets/images/arg_yellow.png",
        title:"产地直供",
        desc:"新鲜优质农产品"
      },
      {
        id:2,
        bgpic:IP+"/assets/images/arg_green.png",
        title:"支持配送",
        desc:"新鲜优质农产品"
      },
    ],
    carData:[
      {
        id:0,
        carimg:"https://img.jsdesign2.com/assets/img/64eea6f7187d370af42bef0d.png#52f30c9e20d57269f7dd1146b0495fc7",
        title:"新鲜有机胡萝卜",
        desc:"每个都经过精心挑选，口感清脆，营养丰富",
        price:"24",
        count:"1",
        totalprice:"24",
      },
      {
        id:1,
        carimg:"https://img.jsdesign2.com/assets/img/65094736f3c153d741688d13.png#0e50ec0cf774cb5345a0c7912a59205e",
        title:"红富士苹果",
        desc:"甜度适中，口感爽脆，是健康零食的好选择",
        price:"658",
        count:"1",
        totalprice:"658",
      },
      {
        id:2,
        carimg:"https://img.jsdesign2.com/assets/img/655c067043b95387d45c00fb.png#aa0a950a68fcf563f9d948346373a88c", 
        title:"新鲜有机番茄",
        desc:"色泽鲜艳，口感酸甜可口，富含多种维生素",
        price:"278",
        count:"1",
        totalprice:"278",
      }
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