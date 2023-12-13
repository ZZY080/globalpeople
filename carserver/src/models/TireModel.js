// 引入mongodb
import mongoose from "../dbs/mongodb.js";

// 建立轮胎表
const TireSchema = new mongoose.Schema(
    {
        tire_id:{
            type:String,
        },
        tire_brand:{
            type:String,
        },
        // 四个轮胎的胎压
        tire_pressure:{
            type:Array,
        },
        // 轮胎转速
        tire_ws:{
            type:String,
        },
        tire_pt:{
            type:String,
        }   
    }
);


// 建立轮胎数据库模型
const TireModel = mongoose.model("Tire",TireSchema,"tires");
export default  TireModel;