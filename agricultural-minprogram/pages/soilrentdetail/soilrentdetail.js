// pages/produce/produce.js
import {
  IP,
  soilcollecturl,
  soillikeurl,
  PIC_MIN_HEIGHT,
  soildetail,
  PIC_MAX_HEIGHT
} from "../../configs/config.js";
import {
  randomHeight
} from "../../utils/util.js";
import {
  get,
  put
} from "../../utils/http.js";
let leftHeight = 0;
let rightHeight = 0;
let commonHeight = 210;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoadingFinsh:false,
    IP: IP,
    swipperData: [],
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
    bannerData: [{
        id: 0,
        bgpic: IP + "/assets/images/arg_blue.png",
        title: "土地面积",
        desc: "40平方米"
      },
      {
        id: 1,
        bgpic: IP + "/assets/images/arg_yellow.png",
        title: "土地位置",
        desc: "南京市鼓楼区xxxx",

      },
      {
        id: 2,
        bgpic: IP + "/assets/images/arg_green.png",
        title: "土地租金",
        desc: "2000元/年"
      },
    ],
    product_pic_height: 0,
    page: 1,
    leftGoods: [],
    rightGoods: [],
    soil_id: "",
    user_info: "",
    soil_iscollect: false,
    soil_area: "",
    soil_loaction: "",
    soil_price: "",
    soil_islike: false,
    soil_active:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let {
      soil_id
    } = options;
    let user_info = wx.getStorageSync('userInfo');
    that.setData({
      soil_id: soil_id,
      user_info: user_info,
    }, function () {
      that.init();
      that.getSoilDetailData();
    })

  },

  

  handPhotoDetail(e) {
    let that = this;
    let imgArray = that.data.swipperData;
    let {
      current
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgArray // 需要预览的图片http链接列表
    })
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
  async getSoilDetailData() {
    wx.showLoading({
      title: '数据加载中',
    })
    let that = this;
    let {
      soil_id,
      user_info
    } = that.data;
    const {
      data,
      msg,
      status
    } = await get(`${soildetail}/${user_info.user_id}/${soil_id}`);
    that.setData({
      swipperData: data["soil_pic"],
      soil_iscollect: data["soil_iscollect"],
      soil_islike: data["soil_islike"],
      soil_area: data["soil_area"],
      soil_loaction: data["soil_location"],
      soil_price: data["soil_price"],
      soil_active:data["soil_active"]
    },function(){
      wx.hideLoading();
      that.setData({
        isLoadingFinsh:true,
      })
    })

  },
  handLocationDetail() {
    wx.openLocation({
      longitude: 118.786560, // 目标位置经度
      latitude: 31.940193, // 目标位置纬度
      scale: 18, // 地图缩放级别，范围5-18
      name: '南京市禄口机场', // 位置名
      address: '南京市禄口机场', // 地址的详细说明
      success: function (res) {
        // 打开成功
        console.log('成功打开本地高德地图 App');
      },
      fail: function (err) {
        // 打开失败
        console.log('打开本地高德地图 App 失败：', err);
      }
    });

  },
  handlePayDetail(e){
    let {money,time,soil_id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/pay/pay?time=${time}&money=${money}&soil_id=${soil_id}`,
    })
  },
  async handleCollect() {
    let that = this;
    let {
      user_info,
      soil_id
    } = that.data;
    const {
      status,
      data,
      msg
    } = await put(`${soilcollecturl}/${user_info.user_id}/${soil_id}`);
    const {
      soil_iscollect
    } = data;
    that.setData({
      soil_iscollect: soil_iscollect,
    })
  },
  async handleLike() {
    let that = this;
    let {
      user_info,
      soil_id
    } = that.data;
    const {
      status,
      data,
      msg
    } = await put(`${soillikeurl}/${user_info.user_id}/${soil_id}`);
    const {
      soil_islike
    } = data;
    that.setData({
      soil_islike: soil_islike,
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