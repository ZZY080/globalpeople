import os from "os"

// 获取局域网
export  function getLocalIpAddress(){
    const networkInterfaces = os.networkInterfaces();
    for(const interfaceName in networkInterfaces){
        const networkInterface = networkInterfaces[interfaceName];
        for(const iface of networkInterface){
            if(iface.family === "IPv4" && !iface.internal){
                return iface.address;
            }
        }
    }
    return "127.0.0.1"
}

// 获取当前时间
export function getCurrentDate(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    month = month>9?month:"0"+month;
    day = day>9?day:"0"+day;
    hour=hour>9?hour:"0"+hour;
    minute = minute>9?minute:"0"+minute;
    second=second>9?second:"0"+second;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
// 生成模拟胎压数据
export function getTirePressure(){
    let data=[];
    for(let i=0;i<4;i++){
        let randnum=Math.round(220+Math.random()*30);
        data.push(randnum);
    }
    return data;
}
// 生成随机的车胎品牌
export function getTireBrand(){
    let data=["倍耐力",
    "邓禄普","固特异",
    "韩泰","马牌",
    "朝阳","普利斯通","佳通","吉利斯","正新","万力"];
    let length=data.length;
    let index = Math.floor(Math.random()*length);
    return data[index];
}
export function checkPressure(data,msg){
    let tire_pos=["左前轮胎","右前轮胎","左后轮胎","右后轮胎"];
    data.forEach((item,index)=>{
        if(item>=230 && item<=250){
            msg[index]=tire_pos[index]+"胎压值正常"+",请主人放心开车!"
        }else{
            msg[index]=tire_pos[index]+"胎压值不正常请及时检查"
        }
    });
    return msg;
}