// pages/success/success.js
import {IP} from "../../configs/config.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP:IP,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(()=>{
      wx.switchTab({
        url: '/pages/producedetail/producedetail',
      })
    },3000)
  },
  handleDetail(e){
    let that = this;
    let {type} = e.currentTarget.dataset;
    // 返回首页
    if(type==1){
      wx.switchTab({
        url: '/pages/producedetail/producedetail',
      })
    }
    // 返回订单页
    if(type==2){

    }
    
    // "pages/soilrentdetail/soilrentdetail"
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