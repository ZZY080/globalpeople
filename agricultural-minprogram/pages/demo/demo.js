// pages/demo/demo.js
import {
  key
} from "../../configs/config.js";
import AMapWX from "../../libs/amap-wx.js";
var markersData = [];
Page({
  data: {
    longitude: 121.517439,
    latitude: 31.34541,
    markers: [{
        id: 0,
        latitude: 31.34541,
        longitude: 121.517439,
        width: 23,
        height: 33
      },
      {
        id: 1,
        latitude: 31.281641,
        longitude: 121.558293,
        width: 24,
        height: 34
      }
    ]
  },

  onLoad: function () {
    let that = this;
    let myAMapWX = new AMapWX({
      key: key
    });

    myAMapWX.getPoiAround({
      success: function (data) {
        console.log("高德地图调用成功:", data);
      },
      fail: function (info) {
        // 失败回调
        console.log("高德地图调用失败:", info)
      }
    });

  },
})