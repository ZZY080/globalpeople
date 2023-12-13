// 引入mongodb
import mongoose from "../dbs/mongodb.js";

// 建立汽车表
const CarSchema = new mongoose.Schema(
    {
        car_id:{
            type:String,
        },
        car_brand:{
            type:String,
        },
        car_produce_time:{
            type:String,
        }
    }
)

// 建立汽车数据库模型
const CarModel = mongoose.model("Car",CarSchema,"cars");
export default  CarModel;