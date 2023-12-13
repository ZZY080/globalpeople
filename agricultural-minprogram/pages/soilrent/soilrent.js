// pages/produce/produce.js
import {
  IP,
  soillisturl,
  PIC_MIN_HEIGHT,
  PIC_MAX_HEIGHT
} from "../../configs/config.js";
import {
  randomHeight
} from "../../utils/util.js";
import {
  get,
} from "../../utils/http.js";
let leftHeight = 0;
let rightHeight = 0;
let commonHeight = 210;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP: IP,
    isLoadingFinsh: false,
    productdata: [],
    product_pic_height: 0,
    page: 1,
    leftGoods: [],
    rightGoods: [],
    userInfo: {},
    isChangePage:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    that.setData({
      userInfo: userInfo,
    }, function () {
      that.getGoodsList();
    })
  },
  // 获取商品数据
  async getGoodsList() {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let {
      user_id
    } = that.data.userInfo;
    let {
      leftGoods,
      rightGoods,
      productdata,
      page
    } = that.data;
    const {
      data,
      msg,
      status
    } = await get(soillisturl + `?user_id=${user_id}&page=${page}`);
    if (status != 200) {
      return wx.showToast({
        title: '加载数据出错',
      })
    }
    if (data.length == 0) {
      return wx.showToast({
        title: '数据加载完毕',
      })
    }
    let newproductdata = data.map((item, index) => {
      item.pic_height = randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT);
      return item;
    });
    newproductdata=productdata.concat(newproductdata).filter((item,index,arra)=>{
      return  arra.findIndex(subItem=>item.soil_id==subItem.soil_id)==index;
    })
    that.setData({
      productdata:newproductdata,
    }, function () {
      let {
        productdata,
        leftGoods,
        rightGoods,
        isChangePage,
      } = that.data;
      productdata.slice((page-1)*15,page*15).forEach((item) => {
        wx.getImageInfo({
          src: item.cover,
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
            }, function () {
              wx.hideLoading();
              that.setData({
                isLoadingFinsh: true,
              })
            })
          },
          fail(res) {}
        })
      });
    })


  },
  handleDetail(e) {
    let {
      soil_id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/soilrentdetail/soilrentdetail?soil_id=${soil_id}`,
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
    let that = this;
    let {
      page
    } = that.data;
    that.setData({
      page: page + 1,
    }, function () {
      that.getGoodsList();
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})