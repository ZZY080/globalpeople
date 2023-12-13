import {HTT_URL} from "../configs/config"
// 请求拦截器
function requestInterceptor(config){
    // 在这里可以进行一些处理，例如添加通用的请求头
    config.header={
        "Content-Type":"application/json",
        "Authorization":"Bearer "+wx.getStorageSync('token')
    };
    config.url=HTT_URL+config.url;
    return config;
}

// 创建一个封装的网络请求
export function httpRequest(url,method,data,header={}){
    // 构造请求配置
    let config = {
        url,
        method,
        data
    }
    config = requestInterceptor(config)
    return new Promise((resolve,reject)=>{
        wx.request({
          url: config.url,
          method:method,
          data:data,
          header:header,
          success:(res)=>{
              if(res.statusCode==200){
                  // 请求成功，返回数据
                  resolve(res.data);
              }else {
                  reject({
                      code:res.statusCode,
                      message:"请求失败"
                  })
              }
          },
          fail:(err)=>{
              // 请求失败
              reject(err);
          }
        })
    })
}

