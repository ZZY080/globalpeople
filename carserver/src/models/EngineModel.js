// 引入mongodb
import mongoose from "../dbs/mongodb.js";

// 建立引擎表
const EngineSchema = new mongoose.Schema(
    {
        // 引擎id
        engine_id:{
            type:String,
        },
        // 引擎品牌
        engine_brand:{
            type:String,
        },
        // 引擎转速
        engine_rpm:{
            type:String,
        },
        // 节气门位置 
        engine_tps:{
            type:String,
        },
        // 引擎进气温度 intake air temperature
        engine_iat:{
            type:String,
        },
        // 引擎进气压力 intake air  pressure 
        engine_iap:{
            type:String,
        },
        // 引擎冷却液温度 coolant temperature
        engine_ct:{
            type:String,
        },
        // 氧传感器数据
        engine_o2:{
            type:String,
        },
        // 燃油压力 fuel pressure
        engine_fp:{
            type:String,
        },
        // 燃油消耗 fuel consumption
        engine_fc:{
            type:String,
        },
        // 空气流量传感器 Air Flow
        engine_af:{
            type:String,
        },
        // 目标点火角度 target ignition angle
        engine_tia:{
            type:String,
        },
        // 喷嘴
        // 火花塞状态 Spark plug status
        engine_sps:{
            type:String,
        },
        // 引擎生产时间
        engine_produce_time:{
            type:String,
        }

    }
);

// 建立引擎数据库模型
const EngineModel = mongoose.model("Engine",EngineSchema,"engine");
export default EngineModel;