import TireModel from "../models/TireModel.js";
import {getCurrentDate,getTirePressure,getTireBrand,checkPressure} from "../../utils/util.js"


// 安全气囊控制系统
export let srcs = async(req,res,next)=>{
    //  读取 碰撞传感器 车辆速度传感器 重力感应传感器 加速度计 把这些数据传给 ECU(车辆控制单元)
    let data ={code:1,data:{rush:300}};
}

// 轮胎压力检测系统
export let gettpms = async (req,res,next)=>{
    // 获取来自传感器存入数据库的数据
    const tire=await TireModel.find({tire_id:"202003021003"});;
    let last = tire.length;
    // 进行判断
    let data =tire[last-1].tire_pressure;
    let msg =[];
    checkPressure(data,msg);
    res.send({
        code:200,
        data:data,
        msg:msg,
    });
    try{

    }catch(e){

    }
}
export let posttpms = async (req,res,next)=>{
    // 将传感器的数据存入数据库
    let tire_id="202003021003";
    let tire_brand=getTireBrand();
    let tire_pressure=getTirePressure();
    let tire_ws=Math.round(400+Math.random()*4000);
    let tire_pt = getCurrentDate();


    // 进行判断
    try{
        await TireModel.create({
            tire_id,
            tire_brand,
            tire_pressure,
            tire_ws,
            tire_pt,
        })

    }catch(e){
        return res.send({
            code:400,
            msg:"车胎数据插入失败,请对相关传感器进行检查",
        })
    }
    res.send({
        code:200,
        msg:"车胎数据插入成功！"
    })
}