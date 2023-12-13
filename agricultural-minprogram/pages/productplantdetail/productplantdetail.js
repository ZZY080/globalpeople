import {
  IP,
  PIC_MIN_HEIGHT,
  PIC_MAX_HEIGHT
} from "../../configs/config.js";
import {
  randomHeight
} from "../../utils/util.js";
import * as echarts from '../../components/ec-canvas/echarts';
let chart = null;
let leftHeight = 0;
let rightHeight = 0;
let commonHeight = 210;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP: IP,
    navData: [{
        id: 0,
        icon: IP + "/assets/images/arg_env.png",
        desc: "种植环境",
      },
      {
        id: 1,
        icon: IP + "/assets/images/arg_pur.png",
        desc: "种子选购",
      },
      {
        id: 2,
        icon: IP + "/assets/images/arg_pre.png",
        desc: "耕地准备",
      },
      {
        id: 3,
        icon: IP + "/assets/images/arg_use.png",
        desc: "农药施用",
      },
      {
        id: 4,
        icon: IP + "/assets/images/arg_man.png",
        desc: "水肥管理",
      },
      {
        id: 5,
        icon: IP + "/assets/images/arg_sun.png",
        desc: "光照管理",
      },
      {
        id: 6,
        icon: IP + "/assets/images/arg_oper.png",
        desc: "机械操作",
      },
      {
        id: 7,
        icon: IP + "/assets/images/arg_master.png",
        desc: "时机掌握",
      },
      {
        id: 8,
        icon: IP + "/assets/images/arg_def.png",
        desc: "病虫害防治",
      },
      {
        id: 0,
        icon: IP + "/assets/images/arg_pick.png",
        desc: "成熟采摘",
      },
    ],
    productdata: [{
        id: 0,
        src: "https://img.jsdesign2.com/assets/img/64546dc060ff107878d6ebc1.png#05de4a64f65eeb18a78fa5d6ecd394a3",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 1,
        src: "https://img.jsdesign2.com/assets/img/655c067f36b76e1b4650eb5c.png#531a906429a67149680d1a2b7bb1a9e7",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)

      },
      {
        id: 2,
        src: "https://img.jsdesign2.com/assets/img/655c068036b76e1b4650eb66.png#6c7c2286acf18d3343fe44a0a6f77b13",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
      {
        id: 3,
        src: "https://img.jsdesign2.com/assets/img/649274b9a25848aa8c84b18a.png#83df78bf5b734cce507b6e0b89a3ea8b",
        pic_height: randomHeight(PIC_MIN_HEIGHT, PIC_MAX_HEIGHT)
      },
    ],
    bannerData: [{
        id: 0,
        bgpic: IP + "/assets/images/arg_blue.png",
        title: "高产优质",
        desc: "土壤肥沃"
      },
      {
        id: 1,
        bgpic: IP + "/assets/images/arg_yellow.png",
        title: "高产优质",
        desc: "土壤肥沃模具费sdf看看电视付款了"
      },
      {
        id: 2,
        bgpic: IP + "/assets/images/arg_green.png",
        title: "高产优质",
        desc: "土壤肥沃"
      },
    ],
    product_pic_height: 0,
    page: 1,
    leftGoods: [],
    rightGoods: [],
    ec: {
      onInit: initChart,
    }
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
// 初始化图标函数
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  // 显示Echarts图表类型信息
  // 显示Echarts图表类型信息，可以去Echarts官网复制粘贴
  let option = {
    
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        show: false  // 隐藏横坐标标签
      },
      axisLine: {
        show: false  // 隐藏纵坐标轴线
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false  // 隐藏横坐标标签
      },
      axisLine: {
        show: false  // 隐藏纵坐标轴线
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        symbol: 'none' // 去掉折线图中的圆点
      }
    ]
  }
  chart.setOption(option);
  return chart;

}