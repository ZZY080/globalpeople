// pages/pay/pay.js
import {
  IP,
  soilrenturl,
} from "../../configs/config.js";
import {getCurrentDate,addCurrentDate} from "../../utils/util.js";
import {post} from "../../utils/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP: IP,
    money: "",
    time: "",
    orderMap:{"年":1,"2年":2,"3年":3},
    soil_id:"",
    paySelect: [{
        imgsrc: `${IP}/assets/images/arg_wechatpay.png`,
        desc: "微信支付",
        icon: `${IP}/assets/images/arg_select.png`,
        method: "wechatpay"
      },
      {
        imgsrc: `${IP}/assets/images/arg_alipay.png`,
        desc: "支付宝",
        icon: `${IP}/assets/images/arg_select.png`,
        method: "alipay"
      }
    ],
    payMap:{
      "wechatpay":"微信支付",
      "alipay":"支付宝支付"
    },
    payMethod: "",
    payKeyword: {
      "wechatpay": {
        icon: `${IP}/assets/images/arg_wechatpay.png`,
        desc: "微信支付"
      },
      "alipay": {
        icon: `${IP}/assets/images/arg_alipay.png`,
        desc: "支付宝支付"
      }
    },
    showPay: false,
    keyboard: false,
    inputPassword: [],
    password: "681013",
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    let {
      time,
      money,soil_id
    } = options;
    let userInfo= wx.getStorageSync('userInfo');
    that.setData({
      time: time,
      money: money,
      soil_id:soil_id,
      userInfo:userInfo,
    }, function () {
    })
  },
  handleMethod(e) {
    let that = this;

    that.setData({
      payMethod: e.detail.value,
    })
  },
  handleConfirmPay() {
    let that = this;
    let {
      payMethod,
      showPay,
      password,
      keyboard
    } = that.data;

    if (payMethod == "") {
      return wx.showToast({
        title: '请选择支付方式',
      })
    }
    that.setData({
      showPay: true,
      keyboard: true
    })
  },
  handlePasswordClosed() {
    let that = this;
    that.setData({
      showPay: false,
      keyboard: false,
      inputPassword:[],
    })
  },
  handlePasswordBox(){
    let that = this;
    that.setData({
      keyboard: true,
    })
  },
  handKeyboardClosed() {
    let that = this;
    that.setData({
      keyboard: false,
    })
  },
  handleKeyboardValue(e) {
    let that = this;
    let {
      inputPassword
    } = that.data;
    let {
      num
    } = e.currentTarget.dataset;
    inputPassword.push(num);
    if (inputPassword.length > 6) {
      inputPassword.pop();
    }
    that.setData({
      inputPassword: inputPassword,
    },function () {
      let {
        inputPassword,
        password
      } = that.data;
      if (inputPassword.length == 6) {
        let passwordStr = inputPassword.join("");
        if (passwordStr == password) {
          wx.showLoading({
            title: '支付中...',
          })
          setTimeout(async function () {
            wx.hideLoading();
           
            let {soil_id,userInfo,time,orderMap,payMethod,payMap} = that.data;
            let urs_start_date=getCurrentDate();
            let urs_end_date=addCurrentDate(urs_start_date,orderMap[time]);
           const res= await post(`${soilrenturl}`,{
              "user_id":userInfo.user_id,
              "soil_id":soil_id,
              "urs_start_date":urs_start_date,
              "urs_end_date":urs_end_date,
              "urs_paymethod":payMap[payMethod],
              "urs_price":"1233",
              "urs_status":"1"
            })
            let{status}=res;
            if(status==200){
              wx.redirectTo({
                url: '/pages/success/success',
              });
            }
            if(status==400){
              wx.showToast({
                title: '此土地已被购买',
              });
              that.setData({
                showPay:false,
                keyboard:false,
              })
            }
           
          }, 2000)
        } else {
          wx.showToast({
            title: '密码错误',
          });
          that.setData({
            inputPassword:[],
          })

        }



      }
    })


  },
  handleKeyboardClear() {
    let that = this;
    let {
      inputPassword
    } = that.data;
    inputPassword.pop();
    that.setData({
      inputPassword: inputPassword,
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